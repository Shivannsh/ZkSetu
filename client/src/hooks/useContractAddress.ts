import {
  Chain
} from "wagmi";
import { baseSepolia } from "../baseSepolia";

import { contractAddresses } from '../helpers/deployed_addresses';


export function useRampContractAddress(chain: Chain = baseSepolia) {
  let contractsForNetwork = contractAddresses[chain.network];
  if (contractsForNetwork) {
    return contractsForNetwork.ramp;
  } else {
    return "";
  }
}

export function useUSDCContractAddress(chain: Chain = baseSepolia) {
  let contractsForNetwork = contractAddresses[chain.network];
  if (contractsForNetwork) {
    return contractsForNetwork.usdc;
  } else {
    return "";
  }
}
