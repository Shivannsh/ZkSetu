# Zk-Setu: A Decentralized Fiat-to-Crypto Escrow System Powered by Aligned Layer

**Zk-Setu** is a decentralized escrow platform for fiat-to-crypto transactions that uses the Aligned layer for final verification. This platform ensures a trustless environment between buyers and sellers, leveraging zero-knowledge proofs and smart contracts on the Ethereum Holesky testnet. By utilizing Aligned, Zk-Setu provides an extra layer of verification, adding security and transparency to transactions.

## Project Overview

### Rationale
Zk-Setu was developed to solve the issue of trust in fiat-to-crypto exchanges by using a decentralized, proof-based approach. The Aligned layer plays a crucial role in verifying fiat payments, making the platform completely trustless and removing the need for intermediaries.

### Key Features
1. **Decentralized Fiat-to-Crypto Escrow**: Enables secure transactions between fiat and USDC, directly connecting buyers (OnRampers) and sellers (OffRampers).
2. **Aligned Layer Verification**: The Aligned layer provides the final verification for fiat payments, ensuring authenticity before funds are released.
3. **Zero-Knowledge Proofs**: Maintains user privacy and transaction integrity with ZK-proof-based payment validation.
4. **Smart Contract Escrow**: USDC is held in escrow and only released upon successful payment verification on the Aligned layer.

## How It Works

1. **Order Placement**: The OnRamper (buyer) places an order to purchase USDC, and the OffRamper (seller) fulfills the order by placing a corresponding sell order.
2. **Escrow Contract**: USDC is transferred to the escrow contract on Ethereum Holesky testnet upon fulfillment.
3. **Payment Verification on Aligned Layer**: Once the OnRamper provides proof of fiat payment, this proof is verified on the Aligned layer.
4. **Release of Funds**: Upon successful verification by the Aligned layer, the escrow contract releases USDC to the buyer.

## Challenges

- **Trustless Fiat-to-Crypto Escrow**: Ensuring transactions are completely trustless through decentralized proof verification.
- **Seamless Integration with Aligned**: Coordinating ZK-proof verification on the Aligned layer while maintaining efficiency and low costs.
- **Privacy and Scalability**: Balancing privacy, cost, and performance using the Aligned protocol for ZK-proof verification.

## Project Architecture

- **Frontend**: User interface for OnRampers and OffRampers to place and manage orders.
- **Smart Contracts**: Deployed on Ethereum Holesky testnet for escrow handling.
- **Aligned Layer**: Final proof verification is performed on the Aligned layer, ensuring the accuracy of fiat payments.

### Contract Addresses

- **Escrow Contract**: `0xec5b2381f56431970281EfdBD6900a4aC63ec6D7`
- **USDC Token Contract**: `0xd0aae14239CFF42373C8dBcbe8c9Cc850d965518`

- 
## Team

- **Ayush** - Full Stack Web3 Developer with a focus on decentralized applications and front-end frameworks. Ayush has extensive experience in building user-friendly and scalable Web3 interfaces.
- **Shivansh** - Blockchain Developer specializing in smart contract and back-end development for Web3 platforms. Shivansh has a strong background in EVM-compatible chains and secure contract implementation.
- **Gautam** - ZK Specialist with a deep understanding of zero-knowledge proof systems and privacy solutions for decentralized platforms. Gautam’s expertise in ZK technology is pivotal to Zk-Setu’s privacy and verification mechanisms.

## Project Roadmap

### Q4 2024
- Complete the integration of USDC-to-fiat escrow functionality.
- Implement Aligned layer verification for secure fiat transactions.
- Launch the initial platform on the Ethereum Holesky testnet for beta testing.

### Q1 2025
- Expand platform features to support additional fiat and crypto currencies.
- Integrate multiple fiat aggregators for broader accessibility.
- Optimize Aligned layer integration for faster and more cost-effective proof verification.

### Q2 2025
- Launch the Zk-Setu platform on Ethereum mainnet.
- Enhance platform scalability and user experience.
- Begin community outreach for feedback and platform growth.


## Getting Started

### Prerequisites
- Node.js
- Ethereum Wallet (Metamask, etc.)
- Aligned Protocol Access for ZK-proof verification

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/Zk-Setu.git
   cd Zk-Setu
