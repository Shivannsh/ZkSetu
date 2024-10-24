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
//   uint256 venmoId;
//   ClaimStatus status;
//   uint256 encryptedOffRamperVenmoId;
//   uint256 claimExpirationTime;
//   uint256 minAmountToPay;
// }

export interface OnRampOrderClaim {
  claimId: number;
  offRamper: string;
  offRamperUpiID_usernameHash: string;
  status: OrderClaimStatus;
  encryptedOffRamperUpiID: string;
  claimExpirationTime: number;
}