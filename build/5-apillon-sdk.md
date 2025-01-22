# Apillon SDK

[![npm version](https://badge.fury.io/js/@apillon%2Fsdk.svg)](https://badge.fury.io/js/@apillon%2Fsdk)
[![Twitter Follow](https://img.shields.io/twitter/follow/Apillon?style=social)](https://twitter.com/intent/follow?screen_name=Apillon)

Libraries and tools for interacting with your Apillon integration.
Apillon SDK reduces the amount of work required to use Apillons REST API. It reduces the boilerplate code you need to write
as well as compresses multi step flows into single operations.

## Requirements

- npm 10.0.0 or higher
- node.js 20.0.0 or higher
- Apillon API key and secret

## Getting started

To be able to use Apillon SDK, you must register an account at [Apillon.io](https://app.apillon.io), create a project and generate an API key with appropriate permissions.

SDK package is available on [NPM](https://www.npmjs.com/package/@apillon/sdk) and you can also check it out directly on [GitHub](https://github.com/Apillon/sdk).

### Installation

```sh
npm install @apillon/sdk
```

### Initialization

```ts
import { Hosting } from '@apillon/sdk';

const hosting = new Hosting({
  key: '',
  secret: '',
});
```

Apillon SDK consists of different modules depending on which service you want to use. All modules require the same initial config of `key` and `secret` shown above in `Hosting` module example.

Alternatively, you can populate the `APILLON_API_KEY` and `APILLON_API_SECRET` environment variables.

View each individual module examples in the sections below.

### Detailed docs

This wiki only contains the basic installation and examples of SDK usage. For additional information on using the SDK, see the [Detailed SDK documentation](https://sdk-docs.apillon.io/).

### Examples

Examples for using Apillon can be found in a demo repo [here](https://github.com/Apillon/apillon-sdk-demo). Instructions on running the examples are in the [README file](https://github.com/Apillon/apillon-sdk-demo/blob/master/README.md).

::: tip
You can run examples directly in your browser via [CodeSandbox](https://codesandbox.io/p/github/Apillon/apillon-sdk-demo/master).
:::

## Hosting

Hosting module encapsulates functionalities for Hosting service available on Apillon dashboard.

::: tip
You can only create a new webpage through the [dashboard hosting service](https://app.apillon.io/dashboard/service/hosting).
:::

The flow of deploying a new website looks like this:

1. Upload new website files
2. Trigger deploy to staging
3. Trigger deploy from staging to production

You can also directly deploy uploaded files to production.

For detailed hosting SDK method, class and property documentation visit [SDK hosting docs](https://sdk-docs.apillon.io/classes/Hosting.html).

### Usage example

```ts
import {
  DeployToEnvironment,
  DeploymentStatus,
  Hosting,
  LogLevel,
} from '@apillon/sdk';
import * as fs from 'fs';

const hosting = new Hosting({
  key: 'yourApiKey',
  secret: 'yourApiSecret',
  logLevel: LogLevel.VERBOSE,
});

// list all websites
await hosting.listWebsites({ orderBy: 'createTime' });

// create an instance of a website via uuid
const webpage1 = hosting.website('uuid');

// gets website information
await webpage1.get();

// Upload files from local folder
await webpage1.uploadFromFolder('./public');
// Or alternatively, send file buffers as upload parameters
const htmlBuffer = fs.readFileSync('./public/index.html');
await webpage1.uploadFiles(
  [
    {
      fileName: 'index.html',
      contentType: 'text/html',
      content: htmlBuffer,
    },
  ]
);

// deploys uploaded files to staging environment
await webpage1.deploy(DeployToEnvironment.TO_STAGING);

// lists all deployments of a website
await webpage1.listDeployments();

// gets a specific deployment
const deployment = await webpage1
  .deployment('3e0c66ea-317d-4e1f-bcd9-38026c3ea1ee')
  .get();

// checks if deployment was successful
if (deployment.deploymentStatus === DeploymentStatus.SUCCESSFUL) {
  // done
}
```

## Storage

Storage module encapsulates functionalities for Storage service available on Apillon dashboard.

For detailed storage SDK method, class and property documentation visit [SDK storage docs](https://sdk-docs.apillon.io/classes/Storage.html).

### Usage example

```ts
import { Storage, LogLevel, FileStatus } from '@apillon/sdk';
import * as fs from 'fs';

const storage = new Storage({
  key: 'yourApiKey',
  secret: 'yourApiSecret',
  logLevel: LogLevel.VERBOSE,
});

// list buckets
await storage.listBuckets({ limit: 5 });

// create and instance of a bucket directly through uuid
const bucket = storage.bucket('uuid');

// Upload files from local folder
await bucket.uploadFromFolder('./my-folder/files/');
// Or alternatively, send file buffers as upload parameters
const pdfBuffer = fs.readFileSync('./my-folder/files/document.pdf');
await bucket.uploadFiles(
  [
    {
      fileName: 'document.pdf',
      contentType: 'application/pdf',
      content: pdfBuffer,
    },
  ],
  // Upload the files in a new subdirectory in the bucket instead of in the root of the bucket
  { wrapWithDirectory: true, directoryPath: 'main/documents' }
);

// list objects (files, folders) in a bucket
await bucket.listObjects({
  directoryUuid: 'eaff2672-3012-46fb-9278-5efacc6cb616',
  markedForDeletion: false,
  limit: 5,
});

// list all files in a bucket no matter if they are in a folder or not
await bucket.listFiles({ fileStatus: FileStatus.UPLOADED });

// generate an IPFS link for a CID
const cid = 'bafybeigjhyc2tpvqfqsuvf3byo4e4a4v6spi6jk4qqvvtlpca6rsaf2cqi';
const link = await storage.generateIpfsLink(cid);

// gets a specific file in a bucket directly through uuid
const file = await bucket.file('2195521d-15cc-4f6e-abf2-13866f9c6e03').get();

// deletes a file via uuid
await bucket.file('2195521d-15cc-4f6e-abf2-13866f9c6e03').delete();
// deletes a directory via uuid
await bucket.directory('eddc52cf-92d2-436e-b6de-42d7cad621c3').delete();
```

### IPNS methods

The Storage module additionally contains methods for manipulating IPNS records for a specific storage any.

For detailed IPNS SDK method, class and property documentation visit [SDK IPNS docs](https://sdk-docs.apillon.io/classes/Ipns.html).

```ts
import { Storage, LogLevel } from '@apillon/sdk';

const storage = new Storage({
  key: 'yourApiKey',
  secret: 'yourApiSecret',
  logLevel: LogLevel.VERBOSE,
});

// create and instance of a bucket directly through uuid
const bucket = storage.bucket('uuid');
// list all existing IPNS records
const ipnsNames = await bucket.listIpnsNames({ ipnsName: 'Images IPNS' });
// create a new IPNS record
const newIpns = await bucket.createIpns({
  name: 'Music IPNS',
  description: 'IPNS for my music files',
  cid: 'QmS5NL2Rc6SCjFx7pvZHdTD8WGWjDt25WQskC7DsNKAatW',
});
// Get an IPNS record's details by UUID
const ipns = await bucket.ipns('ipns_uuid').get();
// Publish an IPNS record to point to a given CID
await ipns.publish('QmajaeC15ZpcnjBpX4ARRBU127fpcZ2svYEfEBhFRkRZbN');
// delete an IPNS record from the bucket
await ipns.delete();
```

## NFTs

NFT module encapsulates functionalities for NFT service available on Apillon dashboard.

For detailed NFT SDK method, class and property documentation visit [SDK NFT docs](https://sdk-docs.apillon.io/classes/Nft.html).

> **Warning**
> When you transfer ownership of the collection to another account Apillon will lose the ability to perform actions in your name (mint, burn, etc.). Before you transfer ownership make sure you do not need those functionalities via Apillon anymore.


### Usage example

```ts
import {
  CollectionType,
  EvmChain,
  LogLevel,
  Nft,
  TransactionStatus,
} from '@apillon/sdk';

const nft = new Nft({
  key: 'yourApiKey',
  secret: 'yourApiSecret',
  logLevel: LogLevel.VERBOSE,
});

// create a new collection
let collection = await nft.create({
  collectionType: CollectionType.GENERIC,
  chain: EvmChain.MOONBEAM,
  name: 'SpaceExplorers',
  symbol: 'SE',
  description: 'A collection of unique space exploration NFTs.',
  baseUri: 'https://moonbeamnfts.com/collections/spaceexplorers/',
  baseExtension: 'json',
  // If you omit the maxSupply parameter, the max supply will be unlimited
  maxSupply: 1000,
  isRevokable: false,
  isSoulbound: false,
  royaltiesAddress: '0x1234567890abcdef',
  royaltiesFees: 5,
  drop: true,
  dropStart: 1679875200,
  dropPrice: 0.05,
  dropReserve: 100,
});

// or create a substrate collection
const substrateCollection = await nft.createSubstrate({
  collectionType: CollectionType.GENERIC,
  chain: SubstrateChain.ASTAR,
  name: 'SpaceExplorers',
  symbol: 'SE',
  ...
});

// or create a unique collection
const uniqueCollection = await nft.createUnique({
  collectionType: CollectionType.GENERIC,
  chain: SubstrateChain.UNIQUE,
  name: 'UniqueArtworks',
  symbol: 'UA',
  description: 'A collection of one-of-a-kind digital artworks.',
  isRevokable: false,
  isSoulbound: false,
  metadata: {
    '1': {
      name: 'Unique NFT 1',
      description: 'Description for Unique NFT 1',
      image: 'https://example.com/nft1.png',
      attributes: {
        trait_type: 'color',
        value: 'red',
        display_type: 'string',
      },
    },
    '2': {
      name: 'Unique NFT 2',
      description: 'Description for Unique NFT 2',
      image: 'https://example.com/nft2.png',
      attributes: {
        trait_type: 'color',
        value: 'blue',
        display_type: 'string',
      },
    },
  },
});

// check if collection is deployed - available on chain
if (collection.collectionStatus == CollectionStatus.DEPLOYED) {
  console.log('Collection deployed: ', collection.transactionHash);
}

// search through collections
await nft.listCollections({ search: 'My NFT' });

// create and instance of collection directly through uuid
collection = await nft.collection('uuid').get();

// mint a new nft in the collection
await collection.mint({
  receivingAddress: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
  quantity: 1,
});

// nest mint a new nft if collection type is NESTABLE
await collection.nestMint(collection.uuid, 1, 1);

// burn/destroy a specific NFT by its ID if collection is set as revokable
await collection.burn('1');

// list confirmed transactions on a collection
await collection.listTransactions({
  transactionStatus: TransactionStatus.CONFIRMED,
});

// transfer ownership of a collection away from apillon platform to an address
// NOTE that this will disable the ability to mint/burn etc. from the SDK/API since only the owner
// has this ability
await collection.transferOwnership(
  '0x5BA8B0c24bA5307b67E619ad500a635204F73bF1'
);
```

## Identity

Identity module encapsulates functionalities for validating EVM and Polkadot wallet signatures, as well as fetching Polkadot Identity data for any wallet.

For detailed hosting SDK method, class and property documentation visit [SDK identity docs](https://sdk-docs.apillon.io/classes/Identity.html).

### Usage example

```ts
import { Identity, LogLevel } from '@apillon/sdk';

// Note: for signature-related methods API config is not required
const identity = new Identity({
  key: 'yourApiKey',
  secret: 'yourApiSecret',
  logLevel: LogLevel.VERBOSE,
});

// obtain on-chain identity data for a Polkadot wallet
const { polkadot, subsocial } = await identity.getWalletIdentity(address);

async function validateEvmWalletSignature() {
  // generate a custom message to be signed by the user's wallet
  const { message, timestamp } = await identity.generateSigningMessage(
    'Custom display message here',
  );

  // alternatively, you can generate you own signing message with timestamp like this:
  // const timestamp = new Date().getTime();
  // const message = 'Message from my Dapp';
  // const signingMessage = `${message}\n${timestamp}`;

  const walletAddress = '0xa79bg13g2...';

  // validate an EVM wallet's signature for a given message
  const { isValid, address } = await identity.validateEvmWalletSignature({
    message,
    signature, // signature obtained from the user's wallet by the client app
    walletAddress,
    /*
     * optional - check signature time validity by providing a timestamp
     * which indicates when the signature was generated
     */
    timestamp,
    // additionally, specify for how many minutes the timestamp is valid
    signatureValidityMinutes: 15,
  });

  console.log(isValid); // true
  console.log(address.toLowerCase() === walletAddress.toLowerCase()); // true
}

async function validatePolkadotWalletSignature() {
  // If you wish to generate the message yourself and validate the timestamp,
  // use a signing message as shown below:
  const timestamp = new Date().getTime();
  const message = 'Message from my Dapp';
  const signingMessage = `${message}\n${timestamp}`;

  // validate a Polkadot wallet's signature for a given signing message
  const { isValid } = await identity.validatePolkadotWalletSignature({
    message: signingMessage,
    signature, // signature obtained from the user's wallet by the client app
    walletAddress: '5HqHQDGcHqS...',
    timestamp,
    signatureValidityMinutes: 5,
  });
}

```
## Computing

The Computing module provides functionalities for managing computing contracts, including creating contracts, listing contracts, and interacting with specific contracts for operations like encryption and ownership transfer.

### Usage example

```ts
import { Computing } from '@apillon/sdk';

const computing = new Computing({
  key: 'yourApiKey',
  secret: 'yourApiSecret',
});

// List all computing contracts
const contracts = await computing.listContracts();

// Create a new computing contract
const newContract = await computing.createContract({
  name: 'New Contract',
  description: 'Description of the new contract',
  bucket_uuid,
  contractData: {
    nftContractAddress: '0xabc...',
    nftChainRpcUrl: ChainRpcUrl.ASTAR,
  },
});

// Interact with a specific computing contract
const contract = computing.contract(newContract.uuid);

// Get details of the contract
const contractDetails = await contract.get();

// List transactions of the contract
const transactions = await contract.listTransactions();

// Encrypt a file and upload it to the associated bucket
const encryptionResult = await contract.encryptFile({
  fileName: 'example.txt',
  content: Buffer.from('Hello, world!'),
  nftId: 1, // NFT ID used for decryption authentication
});

// Transfer ownership of the contract
const newOwnerAddress = '0xNewOwnerAddress';
const successResult = await contract.transferOwnership(newOwnerAddress);
console.log(
  `Ownership transfer was ${successResult ? 'successful' : 'unsuccessful'}.`,
);
```

## Cloud Functions

The Cloud Functions module provides functionalities for managing cloud functions, including creating functions, listing functions, and interacting with specific functions for operations like job creation and environment variable management.

### Usage example

```ts
import { CloudFunctions } from '@apillon/sdk';

const cloudFunctions = new CloudFunctions({ key: 'yourApiKey', secret: 'yourApiSecret' });

// Create a new cloud function
const newCloudFunction = await cloudFunctions.createCloudFunction({
  name: 'My Cloud Function',
  description: 'Description of my cloud function',
});

// List all cloud functions
const { items: cloudFunctionsList } = await cloudFunctions.listCloudFunctions();

// Get details of a specific cloud function
const cloudFunctionDetails = await cloudFunctions.cloudFunction(newCloudFunction.uuid).get();

// Create a job for the cloud function
const newJob = await cloudFunctions.cloudFunction(newCloudFunction.uuid).createJob({
  name: 'My Job',
  scriptCid: 'QmYtHkLrtGEybxXg53swTHuKPYMXQCbHGeBqpYjYbaVyFV',
});

// Set environment variables for the cloud function
const environmentVariables = [
  { key: 'VAR1', value: 'value1' },
  { key: 'VAR2', value: 'value2' },
];
await cloudFunctions.cloudFunction(newCloudFunction.uuid).setEnvironment(environmentVariables);

// List jobs for the cloud function
const { jobs: cloudFunctionJobs } = await cloudFunctions.cloudFunction(newCloudFunction.uuid).get();

// Delete a job for the cloud function
await cloudFunctionJobs[0].delete();
```

## RPCs

The RPC module provides functionalities for managing RPC API keys and listing available endpoints. This module is essential for interacting with the Apillon platform's RPC services dynamically.

### Usage example

```typescript
import { Rpc } from '@apillon/sdk';
import { getConfig } from './helpers/helper';

// Initialize the RPC module
const rpc = new Rpc({
  key: 'yourApiKey',
  secret: 'yourApiSecret',
});

// Create a new API key
const apiKey = await rpc.createApiKey({
  name: 'Test API Key',
  description: 'Test Description',
});
console.log('API Key created:', apiKey.name);

// List all API keys
const { items } = await rpc.listApiKeys();
console.log('Total API Keys:', items.length);

// Get a specific API key by ID
const apiKey = await rpc.apiKey(apiKeyId).get();
console.log('API Key UUID:', apiKey.uuid);

// List all available endpoints
const endpoints = await rpc.listEndpoints();
console.log('Total Endpoints:', endpoints.length);
```

## Social

The Social module provides functionalities for managing social hubs and channels within the Apillon platform. This includes creating, listing, and interacting with hubs and channels. In the background it utilizes Grill.chat, a mobile-friendly, anonymous chat application powered by Subsocial.

### Usage example

```ts
import { Social } from '@apillon/sdk';

const social = new Social({ key: 'yourApiKey', secret: 'yourApiSecret' });
// Create a new hub
const hub = await social.createHub({
  name: 'Apillon Hub',
  about: 'Hub for Apillon channels',
  tags: 'apillon,web3,build',
});

// Get a specific hub by UUID
const hubDetails = await social.hub(hub.uuid).get();
// List all Hubs
const hubs = await social.listHubs();

// Create a new channel within a hub
const channel = await social.createChannel({
  title: 'Web3 Channel',
  body: "Let's discuss Web3",
  tags: 'web3,crypto',
  hubUuid: hub.uuid,
});

// Get a specific channel by UUID
const channelDetails = await social.channel(channel.uuid).get();
// List all channels within a Hub
const channels = await social.listChannels({ hubUuid: hub.uuid });
```