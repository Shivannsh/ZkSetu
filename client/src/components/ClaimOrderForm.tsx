import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
} from 'wagmi'

import { Button } from "../components/Button";
import { Col, SubHeader } from "../components/Layout";
import { NumberedStep } from "../components/NumberedStep";
import { ReadOnlyInput } from "../components/ReadOnlyInput";
import { SingleLineInput } from "../components/SingleLineInput";
import { StyledLink } from "../components/StyledLink";
import { encryptMessage } from "../helpers/messagEncryption";

// this we have to update
import { generateVenmoIdHash } from "../helpers/venmoHash";
import { abi } from "../helpers/ramp.abi";
import { OnRampOrder } from "../helpers/types";
import { formatAmountsForTransactionParameter } from '../helpers/transactionFormat';
import { useRampContractAddress } from '../hooks/useContractAddress';
import { hash } from 'eth-crypto';


interface ClaimOrderFormProps {
  loggedInWalletAddress: string;
  senderRequestedAmountDisplay: number;
  selectedOrder: OnRampOrder;
  rampExplorerLink: string;
  usdcExplorerLink: string;
}

export const ClaimOrderForm: React.FC<ClaimOrderFormProps> = ({
  loggedInWalletAddress,
  senderRequestedAmountDisplay,
  selectedOrder,
  rampExplorerLink,
  usdcExplorerLink
}) => {
  const persistedVenmoIdKey = `persistedVenmoId_${loggedInWalletAddress}`;
  const [upiIdInput, setUpiIdInput] = useState<string>(localStorage.getItem(persistedVenmoIdKey) || "");
  const [upiUsername, setUpiUsername] = useState<string>("");
  const [requestedUSDAmountInput, setRequestedUSDAmountInput] = useState<number>(0);

  const [encryptedVenmoId, setEncryptedVenmoId] = useState<string>('');
  const [hashedVenmoId, setHashedVenmoId] = useState<string>('');

  const { chain } = useNetwork();

  /*
    Contract Writes
  */

  //
  // legacy: claimOrder(uint256 _orderNonce)
  // new:    claimOrder(uint256 _venmoId, uint256 _orderNonce, bytes calldata _encryptedVenmoId, uint256 _minAmountToPay)
  //
  const { config: writeClaimOrderConfig } = usePrepareContractWrite({
    addressOrName: useRampContractAddress(chain),
    contractInterface: abi,
    functionName: 'claimOrder',
    args: [
      upiIdInput,  
      upiUsername,
      selectedOrder.orderId,
      '0x' + encryptedVenmoId,
      formatAmountsForTransactionParameter(requestedUSDAmountInput)
    ],

    onError: (error: { message: any }) => {
      console.error(error.message);
    },
  });

  console.log('writeClaimOrderConfig');
  console.log(writeClaimOrderConfig);

  const {
    isLoading: isWriteClaimOrderLoading,
    write: writeClaimOrder
  } = useContractWrite(writeClaimOrderConfig);

  /*
    Hooks
  */

  useEffect(() => {
    setRequestedUSDAmountInput(0);
  }, [selectedOrder]);

  useEffect(() => {
    // create an async function inside the effect
    const updateVenmoId = async () => {
      if (upiIdInput && upiIdInput.length > 4) {
        const encryptedVenmoId = await encryptMessage(upiIdInput, selectedOrder.onRamperEncryptPublicKey);
        setEncryptedVenmoId(encryptedVenmoId);

        const hashedVenmoId = await generateVenmoIdHash(upiIdInput);
        setHashedVenmoId(hashedVenmoId);

      }
    }

    updateVenmoId();
  }, [upiIdInput]);

  /*
    Component
  */
  return (
    <ClaimOrderFormHeaderContainer>
      <SubHeader>Claim Order</SubHeader>
      <ClaimOrderBodyContainer>
        <SelectedOrderContainer>
          <ReadOnlyInput
            label="Order Creator"
            value={selectedOrder.onRamper}
          />
          <ReadOnlyInput
            label="Requested USDC Amount"
            value={senderRequestedAmountDisplay}
          />
        </SelectedOrderContainer>
        <NumberedInputContainer>
          <NumberedStep>
            Specify a numeric <StyledLink
              urlHyperlink="https://github.com/0xSachinK/zk-p2p-onramp/blob/main/README.md#fetching-venmo-id-instructions"
              label={'Venmo ID'} /> to receive USD at and a USD amount to receive. Your
            Venmo ID will be encrypted. Submitting this transaction will escrow {senderRequestedAmountDisplay}
            USDC. You will need to approve spending to the ramp <StyledLink
              urlHyperlink={rampExplorerLink}
              label={'smart contract'} />.
            If you are on Goerli, you will need to mint <StyledLink
              urlHyperlink={usdcExplorerLink}
              label={'fake USDC'} />.
          </NumberedStep>
        </NumberedInputContainer>
        <InputsContainer>
          <SingleLineInput
            label="UPI ID"
            value={upiIdInput}
            placeholder={'123456789@ptsbi'}
            onChange={(e) => {
              setUpiIdInput(e.currentTarget.value);
            }}
          />
          <SingleLineInput
            label="UPI UserName"
            value={upiUsername}
            placeholder={'VARUN SINGH'}
            onChange={(e) => {
              setUpiUsername(e.currentTarget.value.toUpperCase());
            }}
          />
        </InputsContainer>
        <Button
          disabled={isWriteClaimOrderLoading}
          onClick={async () => {
            console.log('Attempting to write claim order');
            writeClaimOrder?.();
          }}
        >
          Claim Order
        </Button>
      </ClaimOrderBodyContainer>
    </ClaimOrderFormHeaderContainer>
  );
};

const SelectedOrderContainer = styled(Col)`
  background: rgba(255, 255, 255, 0.1);
  gap: 1rem;
  border-radius: 4px;
  padding: 1rem;
  color: #fff;
`;

const ClaimOrderFormHeaderContainer = styled.div`
  gap: 1rem;
`;

const ClaimOrderBodyContainer = styled(Col)`
  gap: 2rem;
`;

const NumberedInputContainer = styled(Col)`
  gap: 1rem;
`;

const InputsContainer = styled(Col)`
  gap: 1rem;
`;





