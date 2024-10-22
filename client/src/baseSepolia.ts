import { Chain } from '@wagmi/core'

export const baseSepolia = {
  id: 84532,
  name: 'baseSepolia',
  network: 'baseSepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://base-sepolia.g.alchemy.com/v2/4G8SnWtpGGbMLwoolbtiXu99TKMw6vMs',
    default: 'https://base-sepolia.g.alchemy.com/v2/4G8SnWtpGGbMLwoolbtiXu99TKMw6vMs',
  },
  blockExplorers: {
    etherscan: { name: 'Blockscout', url: 'https://base-sepolia.blockscout.com/' },
    default: { name: 'BaseScan', url: 'https://sepolia-explorer.base.org/' },
  }
} as const satisfies Chain
