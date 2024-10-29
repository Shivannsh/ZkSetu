// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Ramp is Ownable {
    /* ============ Enums ============ */
    enum OrderStatus {
        Unopened,
        Open,
        Filled,
        Canceled
    }

    enum ClaimStatus {
        Unsubmitted,
        Submitted,
        Used,
        Clawback
    }

    /* ============ Structs ============ */
    struct Order {
        address onRamper;
        bytes onRamperEncryptPublicKey;
        uint256 amountToReceive;
        uint256 amountToPayINR;
        OrderStatus status;
    }

    struct OrderClaim {
        address offRamper;
        string upiID;
        bytes encryptedOffRamperVenmoId; // encrypt(offRamperVenmoId, onRamperEncryptPublicKey)
        bytes32 offRamperUpiID_usernameHash; // keccak(upiID,Username)
        ClaimStatus status;
        uint256 claimExpirationTime;
        uint256 minAmountToPay;
    }

    struct OrderWithId {
        uint256 id;
        Order order;
    }

    /* ============ Events ============ */
    event OrderPosted(
        uint256 orderId,
        address indexed onRamper,
        uint256 usdcAmount,
        uint256 amountToPayINR
    );
    event OrderClaimed(
        uint256 orderId,
        uint256 claimId,
        address indexed offRamper,
        string upiID
    );
    event OrderFulfilled(
        uint256 orderId,
        uint256 claimId,
        string transactionID
    );
    event OrderCanceled(uint256 orderId, address indexed onRamper);
    event Clawback(uint256 orderId, uint256 claimId, address indexed offRamper);

    /* ============ Public Variables ============ */
    uint256 public maxAmount;
    IERC20 public immutable usdc;
    uint256 public orderNonce;
    mapping(uint256 => uint256) public orderClaimNonce;
    mapping(uint256 => Order) public orders;
    mapping(uint256 => mapping(string => bool)) public orderClaimedByUpiId;
    mapping(uint256 => mapping(uint256 => OrderClaim)) public orderClaims;

    /* ============ Constructor ============ */
    constructor(IERC20 _usdc, uint256 _maxAmount) Ownable(msg.sender) {
        usdc = _usdc;
        maxAmount = _maxAmount;
        orderNonce = 1;
    }

    /* ============ Admin Functions ============ */
    function setMaxAmount(uint256 _maxAmount) external onlyOwner {
        maxAmount = _maxAmount;
    }

    /* ============ External Functions ============ */
    function postOrder(
        uint256 _usdcAmount,
        uint256 _amountToPayINR,
        bytes calldata _encryptPublicKey
    ) external {
        require(_usdcAmount != 0, "Amount can't be 0");
        require(
            _usdcAmount <= maxAmount,
            "Amount can't be greater than max amount"
        );
        require(_amountToPayINR != 0, "Amount can't be 0");

        Order memory order = Order({
            onRamper: msg.sender,
            onRamperEncryptPublicKey: _encryptPublicKey,
            amountToReceive: _usdcAmount,
            amountToPayINR: _amountToPayINR,
            status: OrderStatus.Open
        });

        orders[orderNonce] = order;

        emit OrderPosted(orderNonce, msg.sender, _usdcAmount, _amountToPayINR);
        orderNonce++;
    }

    function claimOrder(
        string memory _upiID,
        string calldata _upiUsername,
        uint256 _orderNonce,
        bytes calldata _encryptedVenmoId,
        uint256 _minAmountToPay
    ) external {
        require(
            orders[_orderNonce].status == OrderStatus.Open,
            "Order has already been filled, canceled, or doesn't exist"
        );
        require(
            !orderClaimedByUpiId[_orderNonce][_upiID],
            "Order already claimed by UPI ID"
        );
        require(
            msg.sender != orders[_orderNonce].onRamper,
            "Can't claim your own order"
        );

        bytes32 _offRamperUpiID_usernameHash = _hashUpiID_Username(
            _upiID,
            _upiUsername
        );

        OrderClaim memory claim = OrderClaim({
            offRamper: msg.sender,
            upiID: _upiID,
            offRamperUpiID_usernameHash: _offRamperUpiID_usernameHash,
            encryptedOffRamperVenmoId: _encryptedVenmoId,
            minAmountToPay: _minAmountToPay,
            status: ClaimStatus.Submitted,
            claimExpirationTime: block.timestamp + 1 days
        });

        uint256 claimNonce = orderClaimNonce[_orderNonce];
        orderClaims[_orderNonce][claimNonce] = claim;
        orderClaimNonce[_orderNonce] = claimNonce + 1;

        orderClaimedByUpiId[_orderNonce][_upiID] = true;
        usdc.transferFrom(
            msg.sender,
            address(this),
            orders[_orderNonce].amountToReceive
        );

        emit OrderClaimed(_orderNonce, claimNonce, msg.sender, _upiID);
    }

    function onRamp(
        uint256 _orderId,
        uint256 _claimId,
        string calldata _transactionID,
        uint256 _amount,
        string calldata _usernameUPI_name
    ) external {
        require(
            orders[_orderId].status == OrderStatus.Open,
            "Order is not open"
        );
        require(
            orderClaims[_orderId][_claimId].status == ClaimStatus.Submitted,
            "Claim not valid"
        );
        require(
            _amount >= orders[_orderId].amountToPayINR,
            "Amount is less than the amount the on-ramper is willing to receive"
        );

        bytes32 offramper_UpiID_username_hash = _hashUpiID_Username(
            orderClaims[_orderId][_claimId].upiID,
            _usernameUPI_name
        );

        require(
            offramper_UpiID_username_hash ==
                orderClaims[_orderId][_claimId].offRamperUpiID_usernameHash,
            "Hash of UpiID and UpiUsername doesn,t match"
        );

        orderClaims[_orderId][_claimId].status = ClaimStatus.Used;
        orders[_orderId].status = OrderStatus.Filled;
        usdc.transfer(
            orders[_orderId].onRamper,
            orders[_orderId].amountToReceive
        );

        emit OrderFulfilled(_orderId, _claimId, _transactionID);
    }

    function cancelOrder(uint256 _orderId) external {
        require(
            orders[_orderId].status == OrderStatus.Open,
            "Order already closed"
        );
        require(
            msg.sender == orders[_orderId].onRamper,
            "Only the order creator can cancel it"
        );

        orders[_orderId].status = OrderStatus.Canceled;

        emit OrderCanceled(_orderId, msg.sender);
    }

    function clawback(uint256 _orderId, uint256 _claimId) external {
        require(
            orderClaims[_orderId][_claimId].offRamper == msg.sender,
            "Invalid caller"
        );
        require(
            orderClaims[_orderId][_claimId].status == ClaimStatus.Submitted,
            "Invalid claim status"
        );

        if (orders[_orderId].status == OrderStatus.Open) {
            require(
                orderClaims[_orderId][_claimId].claimExpirationTime <
                    block.timestamp,
                "Claim not expired"
            );
        }

        orderClaims[_orderId][_claimId].status = ClaimStatus.Clawback;
        usdc.transfer(msg.sender, orders[_orderId].amountToReceive);

        emit Clawback(_orderId, _claimId, msg.sender);
    }

    /* ============ Internal Functions ============ */
    function _hashUpiID_Username(
        string memory _upiID,
        string calldata _upiUsername
    ) internal pure returns (bytes32) {
        return keccak256(abi.encode(_upiID, _upiUsername));
    }

    /* ============ View Functions ============ */
    function getClaimsForOrder(uint256 _orderId)
        external
        view
        returns (OrderClaim[] memory)
    {
        uint256 claimNonce = orderClaimNonce[_orderId];
        OrderClaim[] memory orderClaimsArray = new OrderClaim[](claimNonce);
        for (uint256 i = 0; i < claimNonce; i++) {
            orderClaimsArray[i] = orderClaims[_orderId][i];
        }
        return orderClaimsArray;
    }

    function getAllOrders() external view returns (OrderWithId[] memory) {
        OrderWithId[] memory ordersArray = new OrderWithId[](orderNonce - 1);
        for (uint256 i = 1; i < orderNonce; i++) {
            ordersArray[i - 1] = OrderWithId({id: i, order: orders[i]});
        }
        return ordersArray;
    }
}