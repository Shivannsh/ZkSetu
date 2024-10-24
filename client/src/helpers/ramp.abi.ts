export const abi = [
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_usdc",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_maxAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "orderId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "claimId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "offRamper",
                "type": "address"
            }
        ],
        "name": "Clawback",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "orderId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "onRamper",
                "type": "address"
            }
        ],
        "name": "OrderCanceled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "orderId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "claimId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "offRamper",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "upiID",
                "type": "string"
            }
        ],
        "name": "OrderClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "orderId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "claimId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "transactionID",
                "type": "string"
            }
        ],
        "name": "OrderFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "orderId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "onRamper",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "usdcAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountToPayINR",
                "type": "uint256"
            }
        ],
        "name": "OrderPosted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_orderId",
                "type": "uint256"
            }
        ],
        "name": "cancelOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_upiID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_upiUsername",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_orderNonce",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_encryptedVenmoId",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "_minAmountToPay",
                "type": "uint256"
            }
        ],
        "name": "claimOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_orderId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_claimId",
                "type": "uint256"
            }
        ],
        "name": "clawback",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllOrders",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "onRamper",
                                "type": "address"
                            },
                            {
                                "internalType": "bytes",
                                "name": "onRamperEncryptPublicKey",
                                "type": "bytes"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amountToReceive",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "amountToPayINR",
                                "type": "uint256"
                            },
                            {
                                "internalType": "enum Ramp.OrderStatus",
                                "name": "status",
                                "type": "uint8"
                            }
                        ],
                        "internalType": "struct Ramp.Order",
                        "name": "order",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct Ramp.OrderWithId[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_orderId",
                "type": "uint256"
            }
        ],
        "name": "getClaimsForOrder",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "offRamper",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "upiID",
                        "type": "string"
                    },
                    {
                        "internalType": "bytes",
                        "name": "encryptedOffRamperVenmoId",
                        "type": "bytes"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "offRamperUpiID_usernameHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "enum Ramp.ClaimStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "claimExpirationTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "minAmountToPay",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Ramp.OrderClaim[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_orderId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_claimId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_transactionID",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_usernameUPI_name",
                "type": "string"
            }
        ],
        "name": "onRamp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "orderClaimNonce",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "orderClaimedByUpiId",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "orderClaims",
        "outputs": [
            {
                "internalType": "address",
                "name": "offRamper",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "upiID",
                "type": "string"
            },
            {
                "internalType": "bytes",
                "name": "encryptedOffRamperVenmoId",
                "type": "bytes"
            },
            {
                "internalType": "bytes32",
                "name": "offRamperUpiID_usernameHash",
                "type": "bytes32"
            },
            {
                "internalType": "enum Ramp.ClaimStatus",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "claimExpirationTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "minAmountToPay",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "orderNonce",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "orders",
        "outputs": [
            {
                "internalType": "address",
                "name": "onRamper",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "onRamperEncryptPublicKey",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "amountToReceive",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountToPayINR",
                "type": "uint256"
            },
            {
                "internalType": "enum Ramp.OrderStatus",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_usdcAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amountToPayINR",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_encryptPublicKey",
                "type": "bytes"
            }
        ],
        "name": "postOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_maxAmount",
                "type": "uint256"
            }
        ],
        "name": "setMaxAmount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "usdc",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]