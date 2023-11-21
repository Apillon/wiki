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

SDK is available on [NPM](https://www.npmjs.com/package/@apillon/sdk) and you can also check it out directly on [GitHub](https://github.com/Apillon/sdk).

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

1. upload new website files
2. trigger deploy to staging
3. trigger deploy from staging to production

You can also directly deploy uploaded files to production.

### Usage example

```ts
import { Hosting } from "@apillon/sdk";

const hosting = new Hosting({ apillonConfig });
await hosting.listWebsites({ orderBy: 'createdTime' });
const webpage1 = hosting.website('uuid');
await webpage1.get();

await webpage1.uploadFromFolder('folder_path');
await webpage1.deploy(DeployToEnvironment.STAGING_TO_PRODUCTION);
await webpage1.listDeployments();
const deployment = await webpage1.deployment(deployment_uuid).get();
if (deployment.deploymentStatus === DeploymentStatus.SUCCESSFUL) {
  // done
}
```

## Storage

Storage module encapsulates functionalities for Storage service available on Apillon dashboard.

### Usage example

```ts
import { Storage } from "@apillon/sdk";

const storage = new Storage({ apillonConfig });
await storage.listBuckets({ limit: 5 });
const bucket = storage.bucket('uuid');
await bucket.uploadFromFolder('folder_path');
await bucket.listObjects({
  directoryUuid,
  markedForDeletion: false,
  limit: 5,
});
await bucket.listFiles({ fileStatus: FileStatus.UPLOADED });
const file = await bucket.file(file_uuid).get();
await bucket.deleteFile(file_uuid);
```

## NFTs

NFT module encapsulates functionalities for NFT service available on Apillon dashboard.

### Usage example

```ts
import { Nft } from "@apillon/sdk";

const nft = new Nft({ apillonConfig });
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
  await collection.mint(receiver, quantity);
  await collection.nestMint(collection.uuid, 1, quantity);
  await collection.burn(quantity);
  await collection.listTransactions();
  await collection.transferOwnership(to_address);
```

## Detailed docs

Detailed SDK method, class and property documentation is available [here](https://sdk-docs.apillon.io).