# Web3 infrastructure

## Introduction

**Apillon's Infrastructure Service** provides developers with the essential infrastructure required to build modern Web3 applications. Our infrastructure services currently include:

- **RPC Service**: Reliable and high-performance access to blockchain networks
- **Indexing Service**: Efficient data indexing and querying capabilities

These services are designed to simplify Web3 development while ensuring scalability and reliability for your decentralized applications.

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
