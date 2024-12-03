# Smart Contracts

The Apillon Contract Service enables efficient deployment and comprehensive management of smart contracts across multiple
blockchain networks, providing a seamless and scalable solution for developers and enterprises.

This service currently supports deploying smart contracts on various EVM-compatible blockchain networks, including:
- [Astar Network](https://docs.astar.network/docs/build/introduction/astar_family)
- [Moonbeam Network](https://docs.moonbeam.network/builders/get-started/networks/moonbeam/)
- [Moonbase Network](https://docs.moonbeam.network/builders/get-started/networks/moonbase/)

## Smart Contract Deployment

Deploying a smart contract is straightforward with Apillon's streamlined process. To deploy a smart contract, follow these steps:

1. Log in to your [Apillon account](https://app.apillon.io/register).
2. Navigate to the "Contracts" section from the menu on the left and click on "New Smart Contract."
3. Select the desired smart contract for deployment.
4. Customize the contract through the provided configuration form and initiate the deployment.
5. Once deployed, utilize read and write methods to interact directly with the contract.

## Smart Contract Versioning

To ensure ongoing security and feature enhancements, Apillon employs versioned smart contracts. Each deployed contract
maintains a version to guarantee that the appropriate ABI (Application Binary Interface) is used during interactions,
safeguarding compatibility and providing a stable experience for contract users.

## Supported Smart Contract Types

Apillon supports various types of smart contracts to cater to different use cases and requirements. The currently supported smart contract types include ERC-20, ERC-721, and ERC-1155.

### ERC-20

ERC-20 is a widely adopted standard for fungible tokens on the Ethereum blockchain. These tokens are interchangeable and have the same value, making them ideal for use cases such as cryptocurrencies, utility tokens, and other digital assets. Apillon's ERC-20 smart contracts allow for seamless token creation, transfer, and management, ensuring compatibility with a wide range of wallets and exchanges.

### ERC-721

ERC-721 is the standard for non-fungible tokens (NFTs), which are unique and cannot be exchanged on a one-to-one basis like ERC-20 tokens. Each ERC-721 token has distinct properties and metadata, making them perfect for representing ownership of unique items such as digital art, collectibles, and real estate. Apillon's ERC-721 smart contracts provide robust functionality for minting, transferring, and managing NFTs, enabling developers to create and manage unique digital assets with ease.

### ERC-1155

ERC-1155 is a versatile standard that supports both fungible and non-fungible tokens within a single contract. This multi-token standard allows for more efficient transactions and storage, as multiple token types can be managed under one contract. Apillon's ERC-1155 smart contracts are ideal for applications that require a combination of fungible and non-fungible tokens, such as gaming assets, where a single contract can handle in-game currencies, items, and unique collectibles.

## Smart Contract API

To read more about the Smart Contract API, please refer to the [Apillon Smart Contracts API documentation](../build/14-smart-contracts-api.md).
