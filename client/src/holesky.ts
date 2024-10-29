import { Chain } from '@wagmi/core'

export const Holesky = {
  id: 17000,
  name: 'Holesky',
  network: 'Holesky',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: 'https://eth-holesky.g.alchemy.com/v2/44VAXHBaUMjTDOeGL0wSxN7MqjM5jSP1',
    default: 'https://eth-holesky.g.alchemy.com/v2/44VAXHBaUMjTDOeGL0wSxN7MqjM5jSP1',
  },
  blockExplorers: {
    etherscan: { name: 'Blockscout', url: 'https://base-sepolia.blockscout.com/' },
    default: { name: 'BaseScan', url: 'https://sepolia-explorer.base.org/' },
  }
} as const satisfies Chain
