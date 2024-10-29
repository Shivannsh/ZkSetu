import { Bytes } from "ethers";

export enum OrderStatus {
  UNOPENED = "unopened",
  OPEN = "open",
  FILLED = "filled",
  CANCELLED = "cancelled",
}

// struct Order {
//   address onRamper;
//   address onRamperEncryptPublicKey;
//   uint256 amountToReceive;
//   uint256 maxAmountToPay;
//   OrderStatus status;
// }
  
export interface OnRampOrder {
  orderId: number;
  onRamperEncryptPublicKey : string;
  onRamper: string;
  amountToReceive: number;
  amountToPayINR: number;
  status: OrderStatus;
}

export enum OrderClaimStatus {
  UNSUBMITTED = "unsubmitted",
  SUBMITTED = "submitted",
  USED = "used",
  CLAWBACK = "clawback"
}

// struct OrderClaim {
//   address offRamper;
//   uint256 UPIId;
//   ClaimStatus status;
//   uint256 encryptedOffRamperUPIId;
//   uint256 claimExpirationTime;
//   uint256 minAmountToPay;
// }

export interface OnRampOrderClaim {
  claimId: number;
  offRamper: string;
  hashedUPIID: string;
  offRamperUpiID_usernameHash: string; // this will never be used
  status: OrderClaimStatus;
  encryptedOffRamperUpiID: string;
  claimExpirationTime: number;
  minAmountToPay: number;
}