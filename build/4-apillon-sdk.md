# Apillon SDK

<div class="divider"></div>

Libraries and tools for interacting with your Apillon integration.
Apillon SDK reduces the amount of work required to use Apillons REST API. It reduces the boilerplate code you need to write
as well as compresses multi step flows into single operations.

## Requirements

- npm 8.4.0 or higher
- node.js 16.17.0 or higher
- Apillon API key and secret

## Getting started

SDK is available on [NPM](https://www.npmjs.com/package/@apillon/sdk) and you can also check it out directly on [GitHub](https://github.com/Apillon-web3/sdk).

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

### Standard flow example

```ts
import { Hosting } from "@apillon/sdk";

const hosting = new Hosting({
  apiKey: "",
  apiSecret: "",
});

const website = hosting.website("uuid");
await website.uploadFromFolder("./path/to/folder");
const { deploymentId } = await website.deploy(
  DeployToEnvironment.DIRECTLY_TO_PRODUCTION
);
await website.getDeployStatus(deploymentId);
```

### Initialization

> Create an instance of hosting module.

```ts
import { Hosting } from "@apillon/sdk";

const hosting = new Hosting({
  apiKey: "",
  apiSecret: "",
});
```

### List websites

> Get a list of all available websites.

```ts
const websites = await hosting.list();
```

### website

> Directly initialize website.

```ts
const website = hosting.website("uuid");
```

### Get website

> Initialize and get information of a website.

```ts
const website = await hosting.website("uuid").get();
```

### Upload from folder

> Upload new website files.

```ts
const website = hosting.website("uuid");
await website.uploadFromFolder("./path/to/folder");
```

### Deploy

> Deploy uploaded files to different environments.

```ts
import { DeployToEnvironment } from "@apillon/sdk";

const website = hosting.website("uuid");
const res = await website.deploy(DeployToEnvironment.TO_STAGING);
console.log(res.deploymentId);
```

#### Environments Enum

| Enum | Name                   | Description                                                             |
| ---- | ---------------------- | ----------------------------------------------------------------------- |
| 1    | TO_STAGING             | Deploys files to staging environment.                                   |
| 2    | STAGING_TO_PRODUCTION  | Deploys files that are currently in staging environment to production.  |
| 3    | DIRECTLY_TO_PRODUCTION | Deploys uploaded files directly to production environment.              |

### Get deploy status

> Gets deployment info.

```ts
const website = hosting.website("uuid");
await website.getDeployStatus("uuid");
```

## Storage

Storage module encapsulates functionalities for Storage service available on Apillon dashboard.

### Initialization

> Create an instance of storage module.

```ts
import { Storage } from "@apillon/sdk";

const storage = new Storage({
  apiKey: "",
  apiSecret: "",
});
```

### Bucket instance

> Creates a bucket instance.

```ts
const bucket = storage.bucket("uuid");
```

### Get bucket

> Gets bucket information.

```ts
const bucket = await storage.bucket("uuid").get();
```

## NFT

```

```
