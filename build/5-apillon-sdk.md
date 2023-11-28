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

### Installation

```sh
npm install @apillon/sdk
```

### Initialization

```ts
import { Hosting } from "@apillon/sdk";

const hosting = new Hosting({
  key: "",
  secret: "",
});
```

Apillon SDK consists of different modules depending on which service you want to use. All modules require the same initial config of `key` and `secret` shown above in `Hosting` module example.

Alternatively, you can populate the `APILLON_API_KEY` and `APILLON_API_SECRET` environment variables.

View each individual module examples in the sections below.

### Detailed docs

This wiki only contains the basic installation and examples of SDK usage. For additional information on using the SDK, see the [Detailed SDK documentation](https://sdk-docs.apillon.io/).

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
} from "@apillon/sdk";
import * as fs from "fs";

const hosting = new Hosting({
  key: "yourApiKey",
  secret: "yourApiSecret",
  logLevel: LogLevel.NONE,
});

// list all websites
await hosting.listWebsites({ orderBy: "createdTime" });

// create an instance of a website via uuid
const webpage1 = hosting.website("uuid");

// gets website information
await webpage1.get();

// Upload files from local folder
await webpage1.uploadFromFolder("./my-foler/files/");
// Or alternatively, send file buffers as upload parameters
const htmlBuffer = fs.readFileSync("./public/index.html");
await webpage1.uploadFiles(
  [
    {
      fileName: "index.html",
      contentType: "text/html",
      path: null,
      content: htmlBuffer,
    },
  ],
  // Upload the files in a new subdirectory in the bucket instead of in the root of the bucket
  { wrapWithDirectory: true, directoryPath: "main/subdir" }
);

// deploys uploaded files to staging environment
await webpage1.deploy(DeployToEnvironment.TO_STAGING);

// lists all deployments of a website
await webpage1.listDeployments();

// gets a specific deployment
const deployment = await webpage1
  .deployment("3e0c66ea-317d-4e1f-bcd9-38026c3ea1ee")
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
import { Storage, LogLevel, FileStatus } from "@apillon/sdk";
import * as fs from "fs";

const storage = new Storage({
  key: "yourApiKey",
  secret: "yourApiSecret",
  logLevel: LogLevel.NONE,
});

// list buckets
await storage.listBuckets({ limit: 5 });

// create and instance of a bucket directly through uuid
const bucket = storage.bucket("uuid");

// Upload files from local folder
await bucket.uploadFromFolder("./my-foler/files/");
// Or alternatively, send file buffers as upload parameters
const htmlBuffer = fs.readFileSync("./public/index.html");
await bucket.uploadFiles(
  [
    {
      fileName: "index.html",
      contentType: "text/html",
      path: null,
      content: htmlBuffer,
    },
  ],
  // Upload the files in a new subdirectory in the bucket instead of in the root of the bucket
  { wrapWithDirectory: true, directoryPath: "main/subdir" }
);

// list objects (files, folders) in a bucket
await bucket.listObjects({
  directoryUuid: "eaff2672-3012-46fb-9278-5efacc6cb616",
  markedForDeletion: false,
  limit: 5,
});

// list all files in a bucket no matter if they are in a folder or not
await bucket.listFiles({ fileStatus: FileStatus.UPLOADED });

// gets a specific file in a bucket directly through uuid
const file = await bucket.file("2195521d-15cc-4f6e-abf2-13866f9c6e03").get();

// deletes a file via uuid
await bucket.deleteFile("2195521d-15cc-4f6e-abf2-13866f9c6e03");
```

## NFTs

NFT module encapsulates functionalities for NFT service available on Apillon dashboard.

For detailed NFT SDK method, class and property documentation visit [SDK NFT docs](https://sdk-docs.apillon.io/classes/Nft.html).

### Usage example

```ts
import {
  CollectionType,
  EvmChain,
  LogLevel,
  Nft,
  TransactionStatus,
} from "@apillon/sdk";

const nft = new Nft({
  key: "yourApiKey",
  secret: "yourApiSecret",
  logLevel: LogLevel.NONE,
});

// create a new collection
const collection1 = await nft.create({
  collectionType: CollectionType.GENERIC,
  chain: EvmChain.MOONBEAM,
  name: "SpaceExplorers",
  symbol: "SE",
  description: "A collection of unique space exploration NFTs.",
  baseUri: "https://moonbeamnfts.com/collections/spaceexplorers/",
  baseExtension: "json",
  maxSupply: 1000,
  isRevokable: false,
  isSoulbound: false,
  royaltiesAddress: "0x1234567890abcdef",
  royaltiesFees: 5,
  drop: true,
  dropStart: 1679875200,
  dropPrice: 0.05,
  dropReserve: 100,
});

// check if collection is deployed - available on chain
if (collection1.collectionStatus == CollectionStatus.DEPLOYED) {
  console.log("Collection deployed: ", collection1.transactionHash);
}

// search through collections
await nft.listCollections({ search: "My NFT" });

// create and instance of collection directly through uuid
const collection = await nft.collection("uuid").get();

// mint a new nft in the collection
await collection.mint("0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD", 1);

// nest mint a new nft if collection type is NESTABLE
await collection.nestMint(collection.uuid, 1, 1);

// burn/destroy a specific NFT by its ID if collection is set as revokable
await collection.burn("1");

// list confirmed transactions on a collection
await collection.listTransactions({
  transactionStatus: TransactionStatus.CONFIRMED,
});

// transfer ownership of a collection away from apillon platform to an address
// NOTE that this will disable the ability to mint/burn etc. from the SDK/API since only the owner
// has this ability
await collection.transferOwnership(
  "0x5BA8B0c24bA5307b67E619ad500a635204F73bF1"
);
```
