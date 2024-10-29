# Web3 infrastructure

## Introduction

**Apillon's Infrastructure Service** provides developers with the essential infrastructure required to build modern Web3 applications. Our infrastructure services currently include:

- **RPC Service**: Reliable and high-performance access to blockchain networks
- **Indexing Service**: Efficient data indexing and querying capabilities

These services are designed to simplify Web3 development while ensuring scalability and reliability for your decentralized applications.

## RPC Service

The RPC (Remote Procedure Call) service in Apillon's infrastructure provides seamless connectivity to blockchain networks, allowing developers to interact with blockchain data and execute smart contracts.
By utilizing [Dwellir](https://www.dwellir.com/) as the RPC provider, Apillon ensures reliable and efficient access to blockchain nodes. The service is designed for flexibility, enabling developers to create, manage, and optimize their own RPC endpoints through a user-friendly interface.

### Dwellir

**Dwellir** is a highly reliable and scalable RPC (Remote Procedure Call) provider that powers the Apillon infrastructure, enabling developers to interact with various blockchain networks.
Dwellir ensures secure, low-latency connections and high availability, allowing developers to execute smart contract functions, query blockchain data, and perform transactions seamlessly.

Core Services:
- **Multi-Blockchain Support**: Dwellir supports a wide range of blockchain networks, including popular ecosystems like EVM (Ethereum Virtual Machine), Substrate-based chains, and others, providing extensive coverage and flexibility.
- **High Availability and Redundancy**: Dwellir's infrastructure is designed with built-in redundancy and geo-distributed nodes, ensuring minimal downtime and reliable access to blockchain networks.
- **Secure Connections**: Supports both HTTPS and WSS (WebSocket Secure) protocols for encrypted communication, ensuring data privacy and integrity during transmission.
- **API Key Management**: Allows project owners to create, manage, and revoke API keys, offering fine-grained control over who can access RPC endpoints.

### How it works

1. **Activate RPC Service for a Project**: Project owner activates RPC service for their project in the Apillon dashboard.
2. **Create an RPC API Key**: Developers can generate an API key from the Apillon dashboard, which is used to authenticate requests to the RPC service.
3. **Set Favorite Endpoints**: Developers can mark the preferred RPC endpoints as "favorites" for selected API key to make them easily accessible through the Apillon dashboard.
4. **Manage API Keys**: Project owners can manage API keys in the Apillon dashboard, allowing for flexible management of access to RPC endpoints.
5. **Monitor Usage**: Developers can monitor the usage of their RPC keys in the Apillon dashboard, allowing for better control over their infrastructure costs.

### Pricing

The RPC service is available with two main plants:

**Free Plan** (default):
- **RPC Calls**: Up to 5 million RPC calls per month
- **API Keys**: Allows a single API key per user
- **Cost**: Free of charge

**Developer Plan**:
- **RPC Calls**: Increases the limit to 25 million RPC calls per month
- **API Keys**: Allows up to 5 API keys per user
- **Cost**: 49.99€ per month
 

## Indexing service

The Indexing Service is a crucial component of Apillon's infrastructure, designed to efficiently index and query blockchain data. It plays a vital role in powering our Web3 services and enhancing the overall user experience.
In the background, Apillon uses the [Subsquid](https://subsquid.io/) indexing framework and Subsquid Cloud to run indexing nodes.
Developers can create their own indexers or use one of the available templates, and can query more than 150 blockchain networks.

### SQD (Subsquid) Web3 Data Infrastructure

**SQD** is a powerful Web3 data infrastructure platform that offers:

- **High-Performance Data Indexing**: Processes blockchain data up to 100x faster than traditional providers
- **Comprehensive Network Coverage**: Supports 150+ blockchain networks including EVM, SVM, Substrate, and more
- **Cost-Efficient Infrastructure**: Eliminates egress fees, users only pay for compute resources
- **Core Services**:
  - SQD Network: A decentralized data lake for Web3
  - Squid SDK: Advanced blockchain indexing toolkit
  - SQD Cloud: Enterprise-grade hosted indexing service

Used by major projects like PancakeSwap, Railgun, and Chainsafe, SQD processes hundreds of thousands of terabytes of blockchain data while significantly reducing infrastructure costs.

### Workflow

1. **Create an indexer**: Developers create an indexer in the Apillon Indexer Dashboard.
2. **Adjust indexer source code**: Use one of the available templates for squid indexer or write your own.
3. **Deploy indexer**: Deploy your indexer through the Apillon CLI.
4. **Use indexer**: Use the indexer in your application.

### How it works

The indexing process follows a standardized workflow while allowing for flexible implementation approaches. Developers can leverage existing templates as a starting point and customize them according to their specific requirements. Before deployment, indexers can be thoroughly tested in a local environment to ensure proper functionality.

An indexer implementation consists of three core components:

- **Indexer Processor**: Handles data fetching and processing from the blockchain
- **Indexer Database**: Stores the processed blockchain data
- **Indexer API**: Provides GraphQL endpoint for querying the indexed data

To configure an indexer, developers need to specify:

- **RPC Node Endpoint**: Connection point to the blockchain network
- **Starting Block**: Initial block number from which to begin indexing
- **Target Events and Fields**: Specific blockchain events and data fields to monitor and process

The indexer processor continuously fetches new blocks from the specified starting point up to the latest block, processing the relevant data according to the configured rules and storing it in the indexer database.

The processed data becomes accessible through a GraphQL API, providing a flexible and efficient way to query the indexed blockchain data. This API supports complex queries, filtering, and data relationships, enabling developers to retrieve exactly the information they need for their applications.

### Pricing

Indexers are billed based on the amount of processed and stored data and the number of queries made to the indexer API.
Project need to have sufficient credit balance to deploy an indexer. The deployment itself is free of charge, Apillon charges for the working indexer only.
Indexers are billed daily - each day Apillon calculates price for the indexer and uses project's credit balance to pay for it.

If project's credit balance is insufficient, indexer will be hibernated and later deleted after few days if no action is taken.

## Conclusion

Apillon's Web3 Infrastructure services provide developers with powerful tools to build and scale decentralized applications. Through SQD integration, developers can efficiently index and query blockchain data across multiple networks, while maintaining cost-effectiveness and high performance. The platform's user-friendly approach, combined with its robust technical capabilities, makes it an ideal choice for projects of any size looking to leverage blockchain data effectively.
