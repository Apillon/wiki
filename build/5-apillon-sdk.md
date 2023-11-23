# Apillon SDK

[![npm version](https://badge.fury.io/js/@apillon%2Fsdk.svg)](https://badge.fury.io/js/@apillon%2Fsdk)
[![Twitter Follow](https://img.shields.io/twitter/follow/Apillon?style=social)](https://twitter.com/intent/follow?screen_name=Apillon)

Libraries and tools for interacting with your Apillon integration.
Apillon SDK reduces the amount of work required to use Apillons REST API. It reduces the boilerplate code you need to write
as well as compresses multi step flows into single operations.

## Requirements

- npm 8.4.0 or higher
- node.js 16.17.0 or higher
- Apillon API key and secret

## Getting started

To be able to use Apillon SDK, you must register an account at [Apillon.io](https://app.apillon.io), create a project and generate an API key with appropriate permissions.

SDK package is available on [NPM](https://www.npmjs.com/package/@apillon/sdk) and you can also check it out directly on [GitHub](https://github.com/Apillon/sdk).

For additional information on using the SDK, see the [Apillon documentation](https://wiki.apillon.io).

### Installation

```sh
npm install @apillon/sdk
```

### Initialization

```ts
import { Hosting } from "@apillon/sdk";

const hosting = new Hosting({
  apiKey: "",
  apiSecret: "",
});
```

Apillon SDK consists of different modules depending on which service you want to use. But all modules require the same initial config of `apiKey` and `apiSecret` shown above in `Hosting` module example.

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
  apiUrl: 'https://api.apillon.io',
  logLevel: LogLevel.VERBOSE,
});
await hosting.listWebsites({ orderBy: 'createdTime' });
const webpage1 = hosting.website('uuid');
await webpage1.get();

// Upload files from local folder
await webpage1.uploadFromFolder('./my-foler/files/');
// Or alternatively, send file buffers as upload parameters
const htmlBuffer = fs.readFileSync('./public/index.html');
await webpage1.uploadFiles(
  [
    {
      fileName: 'index.html',
      contentType: 'text/html',
      path: null,
      content: htmlBuffer,
    },
  ],
  // Upload the files in a new subdirectory in the bucket instead of in the root of the bucket
  { wrapWithDirectory: true, directoryPath: 'main/subdir' },
);

await webpage1.deploy(DeployToEnvironment.TO_STAGING);
await webpage1.listDeployments();
const deployment = await webpage1
  .deployment('3e0c66ea-317d-4e1f-bcd9-38026c3ea1ee')
  .get();
if (deployment.deploymentStatus === DeploymentStatus.SUCCESSFUL) {
  // done
}
```

### Detailed Hosting docs

Detailed hosting SDK method, class and property documentation is available [here](https://sdk-docs.apillon.io/classes/Hosting.html).

## Storage

Storage module encapsulates functionalities for Storage service available on Apillon dashboard.

### Usage example

```ts
import { Storage, LogLevel, FileStatus } from '@apillon/sdk';
import * as fs from 'fs';

const storage = new Storage({
  key: 'yourApiKey',
  secret: 'yourApiSecret',
  apiUrl: 'https://api.apillon.io',
  logLevel: LogLevel.VERBOSE,
});
await storage.listBuckets({ limit: 5 });
const bucket = storage.bucket('uuid');

// Upload files from local folder
await bucket.uploadFromFolder('./my-foler/files/');
// Or alternatively, send file buffers as upload parameters
const htmlBuffer = fs.readFileSync('./public/index.html');
await bucket.uploadFiles(
  [
    {
      fileName: 'index.html',
      contentType: 'text/html',
      path: null,
      content: htmlBuffer,
    },
  ],
  // Upload the files in a new subdirectory in the bucket instead of in the root of the bucket
  { wrapWithDirectory: true, directoryPath: 'main/subdir' },
);
await bucket.listObjects({
  directoryUuid: 'eaff2672-3012-46fb-9278-5efacc6cb616',
  markedForDeletion: false,
  limit: 5,
});
await bucket.listFiles({ fileStatus: FileStatus.UPLOADED });
const file = await bucket.file('2195521d-15cc-4f6e-abf2-13866f9c6e03').get();
await bucket.deleteFile('2195521d-15cc-4f6e-abf2-13866f9c6e03');
```

### Detailed Storage docs

Detailed Storage SDK method, class and property documentation is available [here](https://sdk-docs.apillon.io/classes/Storage.html).

## NFTs

NFT module encapsulates functionalities for NFT service available on Apillon dashboard.

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
  apiUrl: 'https://api.apillon.io',
  logLevel: LogLevel.VERBOSE,
});
await nft.create({
  collectionType: CollectionType.GENERIC,
  chain: EvmChain.MOONBEAM,
  name: 'SpaceExplorers',
  symbol: 'SE',
  description: 'A collection of unique space exploration NFTs.',
  baseUri: 'https://moonbeamnfts.com/collections/spaceexplorers/',
  baseExtension: 'json',
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
await nft.listCollections({ search: 'My NFT' });
const collection = await nft.collection('uuid').get();
await collection.mint('0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD', 1);
await collection.nestMint(collection.uuid, 1, 1);
await collection.burn('1');
await collection.listTransactions({
  transactionStatus: TransactionStatus.CONFIRMED,
});
await collection.transferOwnership(
  '0x5BA8B0c24bA5307b67E619ad500a635204F73bF1',
);
```

### Detailed NFT docs

Detailed NFT SDK method, class and property documentation is available [here](https://sdk-docs.apillon.io/classes/Nft.html).