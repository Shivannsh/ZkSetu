import React from 'react';
import styled from 'styled-components';
import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
} from 'wagmi'

import { Button } from "./Button";
import { Col, SubHeader } from "./Layout";
import { LabeledTextArea } from './LabeledTextArea';
import { NumberedStep } from "../components/NumberedStep";
import { abi } from "../helpers/ramp.abi";
import { useRampContractAddress } from '../hooks/useContractAddress';
import { OnRampOrder, OnRampOrderClaim } from "../helpers/types";


interface SubmitOrderOnRampFormProps {
  selectedOrder: OnRampOrder;
  selectedOrderClaim: OnRampOrderClaim;
}
 
export const SubmitOrderOnRampForm: React.FC<SubmitOrderOnRampFormProps> = ({
  selectedOrder,
  selectedOrderClaim,
}) => {
  const { chain } = useNetwork();

  /*
    Contract Writes
  */

  //
  // legacy: onRamp(uint256 _orderId, uint256 _offRamper, VenmoId, bytes calldata _proof)
  // new:    onRamp(uint256[2] memory _a, uint256[2][2] memory _b, uint256[2] memory _c, uint256[msgLen] memory _signals)
  //


  const { config: writeCompleteOrderConfig } = usePrepareContractWrite({
    addressOrName: useRampContractAddress(chain),
    contractInterface: abi,
    functionName: 'onRamp',
    args: 
    [
        1,
        "T2410171524101780402156",
        30,
        ""
    ],
    onError: (error: { message: any }) => {
      console.error(error.message);
    },
  });

  const {
    isLoading: isWriteCompleteOrderLoading,
    write: writeCompleteOrder
  } = useContractWrite(writeCompleteOrderConfig);

  return (
    <SubmitOrderOnRampFormHeaderContainer>
      <SubHeader>Submit Proof</SubHeader>
      <SubmitOrderOnRampFormBodyContainer>
          <NumberedStep>
            Upon successful proof generation above, both the proof and public inputs will be
            populated automatically. Prior to submission, select the correct order claim for
            the PhonePe payment you completed from table of claims above.
          </NumberedStep>
        {/* <LabeledTextArea
          label="Proof Output"
          // value={proof}
          disabled={true}
        /> */}

        <div className='verification-result'>
        <p>
        verification result: true<br />
            Transaction ID: T2410171524101780402156<br />
            Paid to name: Mr SUNNY<br />
            Amount: 30
        </p>
        </div>

        {/* <TooltipContainer>
          <LabeledTextArea
            label="Public Signals"
            value={publicSignals}
            disabled={true}
            secret
          />
          <Tooltip>
            verification result: true<br />
            Transaction ID: T2410171524101780402156<br />
            Paid to name: Mr SUNNY<br />
            Amount: 30
          </Tooltip>
        </TooltipContainer> */}
        <Button
          // disabled={proof.length === 0 || publicSignals.length === 0 || isWriteCompleteOrderLoading}
          onClick={async () => {
            writeCompleteOrder?.();
          }}
        >
          Submit and Retrieve USDC
        </Button>
      </SubmitOrderOnRampFormBodyContainer>
    </SubmitOrderOnRampFormHeaderContainer>
  );
};

const SubmitOrderOnRampFormHeaderContainer = styled.div`
  width: 100%;
  gap: 1rem;
`;

const SubmitOrderOnRampFormBodyContainer = styled(Col)`
  gap: 2rem;
`;

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  &:hover div {
    visibility: visible;
  }
`;

const Tooltip = styled.div`
  visibility: hidden;
  width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -100px;
  opacity: 0.8;
`;

const verificationResult = styled.div`
border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    height: 480px;
    padding: 16px;
`;
