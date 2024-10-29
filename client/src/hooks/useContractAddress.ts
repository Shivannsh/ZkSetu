import {
  Chain
} from "wagmi";
import { Holesky } from "../holesky";

import { contractAddresses } from '../helpers/deployed_addresses';


export function useRampContractAddress(chain: Chain = Holesky) {
  let contractsForNetwork = contractAddresses[chain.network];
  if (contractsForNetwork) {
    return contractsForNetwork.ramp;
  } else {
    return "";
  }
}

export function useUSDCContractAddress(chain: Chain = Holesky) {
  let contractsForNetwork = contractAddresses[chain.network];
  if (contractsForNetwork) {
    return contractsForNetwork.usdc;
  } else {
    return "";
  }
}
