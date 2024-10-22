import React, { useState } from 'react';
import { useAsync } from "react-use";
import styled from 'styled-components';
import axios from "axios";  
import { Button } from "./Button";
import { Col, SubHeader } from "./Layout";
import { LabeledTextArea } from './LabeledTextArea';
import { ProgressBar } from "../components/ProgressBar";
import { NumberedStep } from "../components/NumberedStep";
import { EmailInputTypeSwitch } from "./EmailInputTypeSwitch";
import { DragAndDropTextBox } from "./DragAndDropTextBox";

import { downloadProofFiles, generateProof } from "../helpers/zkp";
import { insert13Before10 } from "../scripts/generate_input";
import { OnRampOrder, OnRampOrderClaim } from "../helpers/types";

const generate_input = require("../scripts/generate_input");


interface SubmitOrderGenerateProofFormProps {
  loggedInWalletAddress: string;
  selectedOrder: OnRampOrder;
  selectedOrderClaim: OnRampOrderClaim;
  setSubmitOrderProof: (proof: string) => void;
  setSubmitOrderPublicSignals: (publicSignals: string) => void;
}
 
export const SubmitOrderGenerateProofForm: React.FC<SubmitOrderGenerateProofFormProps> = ({
  loggedInWalletAddress,
  selectedOrder,
  selectedOrderClaim,
  setSubmitOrderProof,
  setSubmitOrderPublicSignals
}) => {
  const storedValue = localStorage.getItem('isEmailInputPreferenceDrag');
  const [isEmailInputSettingDrag, setIsEmailInputSettingDrag] = useState<boolean>(
      storedValue !== null ? JSON.parse(storedValue) : true
  );
  
  const [emailFull, setEmailFull] = useState<string>("");

  const [displayMessage, setDisplayMessage] = useState<string>("Generate Proof");
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  const [status, setStatus] = useState<
    | "not-started"
    | "generating-input"
    | "downloading-proof-files"
    | "generating-proof"
    | "error-bad-input"
    | "error-failed-to-download"
    | "error-failed-to-prove"
    | "done"
    | "sending-on-chain"
    | "sent"
  >("not-started");

  const [stopwatch, setStopwatch] = useState<Record<string, number>>({
    startedDownloading: 0,
    finishedDownloading: 0,
    startedProving: 0,
    finishedProving: 0,
  });

  const recordTimeForActivity = (activity: string) => {
    setStopwatch((prev) => ({
      ...prev,
      [activity]: Date.now(),
    }));
  };

  const handleGenerateProof = async () => {
    if (emailFull.length === 0 || selectedOrderClaim.claimId === 1) {
      alert("Please select a valid order and provide email data.");
      return;
    }
  
    setDisplayMessage("Generating Proof...");
    setStatus("generating-proof");
  
    const formData = new FormData();
    const blob = new Blob([emailFull], { type: "text/plain" });
    formData.append("email_file", blob, "email.eml");
  
    try {
      const response = await axios.post("http://localhost:5000/verify-dkim", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data.message.includes("Email is verified")) {
        setStatus("done");
        setDisplayMessage("Proof Generated Successfully");
      } else {
        setStatus("error-failed-to-prove");
        setDisplayMessage("Verification Failed");
      }
    } catch (error) {
      setStatus("error-failed-to-prove");
      console.error("Error during proof generation:", error);
      setDisplayMessage("Error Generating Proof");
    }
  };

  const filename = "circuit";
  console.log(selectedOrderClaim.claimId);
  console.log(selectedOrder.orderId);
  var Buffer = require("buffer/").Buffer; // note: the trailing slash is important!

  // computed state
  const { value, error } = useAsync(async () => {
    try {
      const circuitInputs = await generate_input.generate_inputs(
        Buffer.from(atob(emailFull)),
        selectedOrder.orderId,
        selectedOrderClaim.claimId
      );
      return circuitInputs;
    } catch (e) {
      return {};
    }
  }, [emailFull, loggedInWalletAddress]);

  if (error) console.error(error);
  
  const circuitInputs = value || {};
  // console.log("Circuit inputs:", circuitInputs);

  const handleEmailInputTypeChanged = (checked: boolean) => {
    // Update state maintained in parent component
    setIsEmailInputSettingDrag(checked);

    // Store preference in local storage
    localStorage.setItem('isEmailInputPreferenceDrag', JSON.stringify(checked));
  };

  return (
    <ComponentWrapper>
      <SubHeader>Generate Proof</SubHeader>
      <Body>
        <NumberedStep>
          Select the claim you completed from the table above. To generate a proof, open the transaction
          email from PhonePe and select 'Show original' to view the full contents. You can either
          download and drag the .eml file into the box below or paste the contents directly. If this
          is your first time, you will then need to download proving keys. Allot ~1
          minutes for proof generation and do not close your browser.
        </NumberedStep>
        <InputWithTitleContainer>
          <HeaderContainer>
            <Title>
              {isEmailInputSettingDrag ? 'Drag and Drop .eml' : 'Paste Email'}
            </Title>
            <EmailInputTypeSwitch
              switchChecked={isEmailInputSettingDrag}
              onSwitchChange={handleEmailInputTypeChanged}
            />
          </HeaderContainer>
          {isEmailInputSettingDrag ? (
            <DragAndDropTextBox
              onFileDrop={(file: File) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  if (e.target) {
                    setEmailFull(e.target.result as string);
                    setIsEmailInputSettingDrag(false);
                  }
                };
                reader.readAsText(file);
              }}
            />
          ) : (
            <LabeledTextArea
              label=""
              value={emailFull}
              onChange={(e) => {
                setEmailFull(e.currentTarget.value);
              }}
            />
          )}
        </InputWithTitleContainer>
        <ButtonContainer>
          <Button
            onClick={handleGenerateProof}
            disabled={emailFull.length === 0 || selectedOrderClaim.claimId === 1}>
            {displayMessage}
          </Button>
        </ButtonContainer>
       
      </Body>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  width: 100%;
  gap: 1rem;
`;

const Body = styled(Col)`
  gap: 1rem;
`;

const InputWithTitleContainer = styled(Col)`
  gap: 0rem;
`;

const ProcessStatus = styled.div<{ status: string }>`
  font-size: 8px;
  padding: 8px;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // Adjust the space between the buttons
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h4`
  // Add any styles you want for your title here
`;

const TimerDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 8px;
`;

const TimerDisplay = ({ timers }: { timers: Record<string, number> }) => {
  return (
    <TimerDisplayContainer>
      {timers["startedDownloading"] && timers["finishedDownloading"] ? (
        <div>
          Zkey Download time:&nbsp;
          <span data-testid="download-time">{timers["finishedDownloading"] - timers["startedDownloading"]}</span>ms
        </div>
      ) : (
        <div></div>
      )}
      {timers["startedProving"] && timers["finishedProving"] ? (
        <div>
          Proof generation time:&nbsp;
          <span data-testid="proof-time">{timers["finishedProving"] - timers["startedProving"]}</span>ms
        </div>
      ) : (
        <div></div>
      )}
    </TimerDisplayContainer>
  );
};
