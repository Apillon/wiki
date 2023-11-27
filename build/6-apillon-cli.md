# Apillon CLI

[![npm version](https://badge.fury.io/js/@apillon%2Fcli.svg)](https://badge.fury.io/js/@apillon%2Fcli)
[![Twitter Follow](https://img.shields.io/twitter/follow/Apillon?style=social)](https://twitter.com/intent/follow?screen_name=Apillon)

Apillon CLI is a command-line interface for using Apillon Web3 services.

## Requirements

To be able to use Apillon CLI, you must register an account at [Apillon.io](https://app.apillon.io), create a project and generate an API key with appropriate permissions. Also Node.js (version 16 or later) is required.

## Installation

To install Apillon CLI run

```bash
npm install -g @apillon/cli
```

Afterwards you can use CLI with command

```bash
apillon <command> [options]
```

Alternately you don't need to install the Apillon CLI to use it. In that case run the desired command using `npx`:

```bash
npx @apillon/cli <command> [options]
```

> Note that when running without installation, you have to use `@apillon/cli` instead of `apillon` execution command.

### Global Options

- `--api-url <api url>`: Apillon API URL (default: Production API URL, can be set via the `APILLON_API_URL` environment
  variable).
- `--key <api key>`: Apillon API key (can be set via the `APILLON_API_KEY` environment variable).
- `--secret <api secret>`: Apillon API secret (can be set via the `APILLON_API_SECRET` environment variable).
- `--debug`: Output execution logs when running commands.
- `-V`, `--version`: Output the version number.

### Environment Variables

You can use environment variables to set the API URL, API key, and API secret:

- `APILLON_API_URL`: Apillon API URL.
- `APILLON_API_KEY`: Apillon API key.
- `APILLON_API_SECRET`: Apillon API secret.

If you have these variables set, you do not need to use the global options each time.

### Help

To display the help information for the CLI or a specific command, use the `-h` or `--help` option:

```sh
apillon -h
apillon hosting -h
npx @apillon/cli hosting deploy-website --help
```

### List pagination options

For commands that return a list of results, for example `apillon storage list-files`, or `apillon hosting list-websites`, there are global list pagination options that are available to use:

- `--limit <integer>`: Page limit
- `--order-by <string> `: Page order by (can be any property from the response data)
- `--page <integer>`: Page number
- `--search <string> `: Search by name or other object identifier

> For example responses and for an overview of all properties, refer to [the Apillon API wiki](https://wiki.apillon.io/build/1-apillon-api.html). Note: CLI responses may be dfferent from API responses.

# Commands

The Apillon CLI currently supports the following commands:

## Hosting

#### `hosting list-websites`

Lists all websites associated with your project.

**Example**

```sh
apillon hosting list-websites --search "My-Website" --limit 1
```

**Example response**

```json
{
  "items": [
    {
      "createTime": "2023-10-25T10:41:06.000Z",
      "updateTime": "2023-10-26T12:41:41.000Z",
      "uuid": "5b908779-3687-4592-a073-9bebbf86afe2",
      "name": "My Website",
      "description": "My own website",
      "domain": "https://my-website.com",
      "bucketUuid": "47251013-37c6-4b30-be2b-8583dea25c4c",
      "ipnsStaging": "k2k4r8ob2rf35wbmhhtzbq6nd4lhwv4qphwv9zl5smbzkuakwd50m6fd",
      "ipnsProduction": "k2k4r8pple7phwm9azqgxshxdzyb1fs4n1hy8k5kcq5bkm5jnpznthrb"
    },
    ...
  ],
  "total": 3
}
```

#### `hosting get-website`

Retrieves information about a specific website.

**Options**

- `--uuid <string>`: UUID of the website to get details for.

**Example**

```sh
apillon hosting get-website --uuid "123e4567-e89b-12d3-a456-426655440000"
```

#### `hosting deploy-website`

Deploys a website from a local folder directly to Apillon hosting production environment.

**Options**

- `<file-path>`: Path to the folder containing your website files.
- `--uuid <string>`: UUID of the website to upload files to.
- `-p, --preview`: Deploy to staging environment instead.

**Example**

```sh
apillon hosting deploy-website ./public_html --uuid "123e4567-e89b-12d3-a456-426655440000" -p
```

#### `hosting upload`

Uploads a local folder's contents to a website deployment bucket.

**Options**

- `<path>`: Path to the folder containing your website files.
- `--uuid <string>`: UUID of the website to upload files to.

**Example**

```sh
apillon hosting upload ./public_html --uuid "123e4567-e89b-12d3-a456-426655440000"
```

#### `hosting start-deployment`

Deploys a website to the specified environment, from files already uploaded to the hosting bucket.

**Options**

- `--uuid <string>`: UUID of the website to deploy.
- `--env <integer>`: The environment to deploy to.

Available choices:

```
TO_STAGING = 1
STAGING_TO_PRODUCTION = 2
DIRECTLY_TO_PRODUCTION = 3
```

**Example**

```sh
apillon hosting start-deployment --uuid "123e4567-e89b-12d3-a456-426655440000" --env 1
```

#### `hosting list-deployments`

Lists all deployments for a specific website.

**Options**

- `--uuid <string>`: UUID of the website to list deployments for.
- `--status <integer>`: The status of the deployments (DeploymentStatus enum, optional).

Available choices:

```
INITIATED = 0
IN_PROCESS = 1
SUCCESSFUL = 10
FAILED = 100
```

- `--env <integer>`: The environment of the deployments (DeploymentStatus enum, optional).

Available choices:

```
STAGING = 2
PRODUCTION = 3
```

**Example**

```sh
apillon hosting list-deployments --uuid "58a16026-1356-405b-97f9-efcc9dfac1dd" --order-by createTime --desc true
```

**Example response**

```json
{
  "items": [
    {
      "createTime": "2023-11-14T12:09:20.000Z",
      "updateTime": "2023-11-14T12:09:42.000Z",
      "uuid": "9b677fe2-1bb1-44d9-8956-e7749452f02d",
      "websiteUuid": "58a16026-1356-405b-97f9-efcc9dfac1dd",
      "cid": "QmPPBMsFccJVaLwvdhSh3zMbfEvonxoNSBLVd1kWK34Nps",
      "cidv1": "bafybeizpqaa5xb5r46d2voj35qtokhb3c3bekofe5fnistbs7s3g7nnvmq",
      "environment": "DIRECTLY_TO_PRODUCTION",
      "deploymentStatus": "SUCCESSFUL",
      "size": 7162,
      "number": 1
    },
    ...
  ],
  "total": 7
}
```

#### `hosting get-deployment`

Retrieves information about a specific deployment.

**Options**

- `-w, --website-uuid <string>`: UUID of the website.
- `-d, --deployment-uuid <string>`: UUID of the deployment

**Example**

```sh
apillon hosting get-deployment --website-uuid "123e4567-e89b-12d3-a456-426655440000" --deployment-uuid "987e6543-e21c-32f1-b123-426655441111"
```

## Storage Commands

#### `storage list-buckets`

Lists all storage buckets associated with your project.

**Example**

```sh
apillon storage list-buckets
```

**Example response**

```json
{
  "items": [
    {
      "createTime": "2023-11-15T09:56:53.000Z",
      "updateTime": "2023-11-23T08:55:46.000Z",
      "uuid": "91c57d55-e8e4-40b7-ad6a-81a82831bfb3",
      "name": "My Storage Bucket",
      "description": "For storing my images and videos",
      "size": 23576
    },
    ...
  ],
  "total": 2
}
```

#### `storage list-objects`

Retrieves objects (files and folders) from a specific bucket or bucket directory.

**Options**

- `-b, --bucket-uuid <string>`: UUID of the bucket to retrieve objects from.
- `-d, --directory-uuid <string>`: UUID of the directory to retrieve objects from (optional, default root folder).
- `--deleted`: Include objects deleted from the bucket.

**Example**

```sh
apillon storage list-objects --bucket-uuid "123e4567-e89b-12d3-a456-426655440000" --directory-uuid "987e6543-e21c-32f1-b123-426655441111"
```

**Example response**

```json
{
  "items": [
    {
      "createTime": "2023-11-23T08:55:45.000Z",
      "updateTime": "2023-11-23T08:55:46.000Z",
      "uuid": "14a7a891-877c-41ac-900c-7382347e1e77",
      "name": "index.html",
      "CID": "QmWX5CcNvnaVmgGBn4o82XW9uW1uLvsHQDdNrANrQeSdXm",
      "CIDv1": "bafybeidzrd7p5ddj67j2mud32cbnze2c7b2pvbhn7flfd22shnzuvgnima",
      "status": "AVAILABLE_ON_IPFS_AND_REPLICATED",
      "directoryUuid": null,
      "type": "FILE",
      "link": "https://ipfs-eu1.apillon.io/ipfs/bafybeidzrd7p5ddj67j2mud32cbnze2c7b2pvbhn7flfd22shnzuvgnima/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJiYWZ5YmVpZHpyZDdwNWRkajY3ajJtdWQzMmNibnplMmM3YjJwdmJobjdmbGZkMjJzaG56dXZnbmltYSIsInByb2plY3RfdXVpZCI6IjgwOWQzYjljLTMxNjMtNDgzMC1hZjg2LTJiNTMxYmZmNTUyZCIsImlhdCI6MTcwMDczNjM5Mywic3ViIjoiSVBGUy10b2tlbiJ9.nmq7BYdEYGXW6kHO9_ExOr3i5OBesWkN4TDI4QG6Fok",
      "path": null,
      "bucketUuid": "91c57d55-e8e4-40b7-ad6a-81a82831bfb3"
    },
    ...
  ],
  "total": 16
}
```

#### `storage list-files`

Retrieves files from a specific bucket.

**Options**

- `-b, --bucket-uuid <string>`: UUID of the bucket to retrieve files from.
- `-s, --file-status <integer>`: Filter by file status (FileStatus enum, optional).

Available choices:

```
UPLOAD_REQUEST_GENERATED = 1
UPLOADED = 2
AVAILABLE_ON_IPFS = 3
AVAILABLE_ON_IPFS_AND_REPLICATED = 4
```

**Example**

```sh
apillon storage list-files --bucket-uuid "123e4567-e89b-12d3-a456-426655440000" -s 2
```

**Example response**

```json
{
  "items": [
    {
      "createTime": "2023-11-15T09:58:04.000Z",
      "updateTime": "2023-11-15T09:58:10.000Z",
      "name": "style.css",
      "CID": "QmWX5CcNvnaVmgGBn4o82XW9uW1uLvsHQDdNrANrQeSdXm",
      "CIDv1": "bafybeidzrd7p5ddj67j2mud32cbnze2c7b2pvbhn7flfd22shnzuvgnima",
      "status": "AVAILABLE_ON_IPFS_AND_REPLICATED",
      "directoryUuid": null,
      "type": "FILE",
      "link": "https://ipfs-eu1.apillon.io/ipfs/bafybeidzrd7p5ddj67j2mud32cbnze2c7b2pvbhn7flfd22shnzuvgnima/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJiYWZ5YmVpZHpyZDdwNWRkajY3ajJtdWQzMmNibnplMmM3YjJwdmJobjdmbGZkMjJzaG56dXZnbmltYSIsInByb2plY3RfdXVpZCI6IjgwOWQzYjljLTMxNjMtNDgzMC1hZjg2LTJiNTMxYmZmNTUyZCIsImlhdCI6MTcwMDczNjM5Mywic3ViIjoiSVBGUy10b2tlbiJ9.nmq7BYdEYGXW6kHO9_ExOr3i5OBesWkN4TDI4QG6Fok",
      "path": null,
      "bucketUuid": "91c57d55-e8e4-40b7-ad6a-81a82831bfb3"
    },
    ...
  ],
  "total": 10
}
```

#### `storage upload`

Upload contents of a local folder to specified bucket.

**Options**

- `<folder-path>`: Path to the folder containing your files.
- `-b, --bucket-uuid <string>`: UUID of the bucket to upload files to.

**Example**

```sh
apillon storage upload ./my_folder --bucket-uuid "123e4567-e89b-12d3-a456-426655440000"
```

#### `storage get-file`

Retrieves information about a specific file in a bucket.

**Options**

- `-b, --bucket-uuid <string>`: UUID of the bucket.
- `-f, --file-uuid <string>`: UUID or CID of the file to retrieve.

**Example**

```sh
apillon storage get-file --bucket-uuid "123e4567-e89b-12d3-a456-426655440000" --file-uuid "file_uuid_or_cid"
```

#### `storage delete-file`

Deletes a specific file from a bucket.

**Options**

- `-b, --bucket-uuid <string>`: UUID of the bucket.
- `-f, --file-uuid <string>`: UUID or CID of the file to delete.

**Example**

```sh
apillon storage delete-file --bucket-uuid "123e4567-e89b-12d3-a456-426655440000" --file-uuid "file_uuid_or_cid"
```

## NFT Commands

#### `nfts list-collections`

Lists all NFT collections owned by the project related to the API key.

**Options**

- `--status <integer>`: UUID of the collection to retrieve (CollectionStatus enum, optional).

Available choices:

```
CREATED = 0
DEPLOY_INITIATED = 1
DEPLOYING = 2
DEPLOYED = 3
TRANSFERRED = 4
FAILED = 5
```

**Example**

```sh
apillon nfts list-collections --status 3
```

**Example response**

```json
{
  "items": [
    {
      "createTime": "2023-11-20T10:21:12.000Z",
      "updateTime": "2023-11-20T14:12:33.000Z",
      "uuid": "2cda3a9b-01b1-4b5e-9709-7087129d55d0",
      "symbol": "SE",
      "name": "SpaceExplorers",
      "description": "A collection of unique space exploration NFTs.",
      "collectionType": "GENERIC",
      "maxSupply": 1000,
      "baseUri": "https://moonbeamnfts.com/collections/spaceexplorers/",
      "baseExtension": ".json",
      "isSoulbound": false,
      "isRevokable": false,
      "drop": false,
      "dropPrice": 0.05,
      "dropStart": 1679875200,
      "dropReserve": 100,
      "royaltiesFees": 5,
      "royaltiesAddress": "0xaz5Bh6E56c5d3B58c944542de2bF18E7F65eED82",
      "collectionStatus": "TRANSFERRED",
      "contractAddress": "0x4e22162A6d0c91a088Cb57A72aB976ccA2A96B25",
      "transactionHash": null,
      "deployerAddress": "0xba015fgc6d80378a9a95f1687e9960857593983b",
      "chain": "MOONBASE"
    }
  ],
  "total": 1
}
```

#### `nfts get-collection`

Retrieves information about a specific NFT collection.

**Options**

- `--uuid <collection-uuid>`: UUID of the collection to retrieve.

**Example**

```sh
apillon nfts get-collection --uuid "123e4567-e89b-12d3-a456-426655440000"
```

#### `nfts create-collection`

Creates a new NFT collection. The JSON file needs to have the property structure as type `ICreateCollection`, which can be found in the [SDK docs](https://sdk-docs.apillon.io/interfaces/ICreateCollection.html). An example object can be also seen on the [NFT SDK docs](https://wiki.apillon.io/build/5-apillon-sdk.html#nfts).

**Options**

- `<file-path>`: Path to the JSON data file for the new collection.

**Example**

```sh
apillon nfts create-collection ./nft-data.json
```

#### `nfts mint-nft`

Mints NFTs for a collection with a specific UUID.

**Options**

- `--uuid <collection-uuid>`: UUID of the collection to mint NFTs to.
- `-a, --address <string>`: Address which will receive minted NFTs.
- `-q --quantity <integer>`: Number of NFTs to mint. (default 1).

**Example**

```sh
apillon nfts mint-nft --uuid "123e4567-e89b-12d3-a456-426655440000" --address "0xdAC17F958D2ee523a2206206994597C13D831ec7" --quantity 2
```

#### `nfts nest-mint-nft`

Nest mints NFT child collection to a parent collection with a specific UUID and parent NFT with id.

**Options**

- `-c, --parent-collection-uuid <collection-uuid>`: Parent collection UUID to which child NFTs will be minted to.
- `-p, --parent-nft-id <string>`: Parent collection NFT id to which child NFTs will be minted to.
- `-q, --quantity <integer>`: Number of child NFTs to mint (default 1).

**Example**

```sh
apillon nfts nest-mint-nft --parent-collection-uuid "123e4567-e89b-12d3-a456-426655440000" --parent-nft-id 5 --quantity 2
```

#### `nfts burn-nft`

Burns an NFT for a collection with a specific UUID.

**Options**

- `--uuid <collection-uuid>`: Collection UUID.
- `-t, --token-id <integer>`: NFT id which will be burned.

**Example**

```sh
apillon nfts burn-nft --uuid "123e4567-e89b-12d3-a456-426655440000" --token-id 123
```

#### `nfts transfer-collection`

Transfers NFT collection ownership to a new wallet address.

**Options**

- `--uuid <collection-uuid>`: Collection UUID.
- `-a, --address <string>`: Address which you want to transfer collection ownership to.

**Example**

```sh
apillon nfts transfer-collection --uuid "123e4567-e89b-12d3-a456-426655440000" --address "0xdAC17F958D2ee523a2206206994597C13D831ec7"
```

#### `nfts list-transactions`

Lists NFT transactions for a specific collection UUID.

**Options**

- `--uuid <collection-uuid>`: Collection UUID.
- `--status <integer>`: Transaction status (TransactionStatus enum, optional).

Available choices:

```
PENDING = 1
CONFIRMED = 2
FAILED = 3
ERROR = 4
```

- `--type <integer>`: Transaction type (TransactionType enum, optional).

Available choices:

```
DEPLOY_CONTRACT = 1
TRANSFER_CONTRACT_OWNERSHIP = 2
MINT_NFT = 3
SET_COLLECTION_BASE_URI = 4
BURN_NFT = 5
NEST_MINT_NFT = 6
```

**Example**

```sh
apillon nfts list-transactions --uuid "123e4567-e89b-12d3-a456-426655440000"
```

**Example response**

```json
{
  "items": [
    {
      "createTime": "2023-11-20T10:21:22.000Z",
      "updateTime": "2023-11-20T10:23:31.000Z",
      "chainId": "MOONBEAM",
      "transactionType": "DEPLOY_CONTRACT",
      "transactionStatus": "CONFIRMED",
      "transactionHash": "0xab99e630f9475df92768b1e5d73f43e291252d889dba81e8fcc0f0fbe690bc0b"
    },
    {
      "createTime": "2023-11-20T11:55:13.000Z",
      "updateTime": "2023-11-20T11:57:31.000Z",
      "chainId": "MOONBEAM",
      "transactionType": "MINT_NFT",
      "transactionStatus": "CONFIRMED",
      "transactionHash": "0x1ecfeeaeddfa0a39fc2ae1ec755d2736b2577866089fe1d619c84690fbdac05a"
    },
    ...
  ],
  "total": 4
}
```

## Using in CI/CD tools

CLI is particularly useful for CI/CD builds and pipelines.

### Deploying websites

Here's an example of how you can use the CLI tool in a CI/CD tool like GitHub Actions:

```yml
name: Deploy Website

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Create dist folder
        run: mkdir -p dist

      - name: Copy files
        run: |
          cp *.html dist/
          cp -r images dist/
          cp -r style dist/
          cp -r js dist/

      ####
      ## if you are using a framework for building web app, you can replace previous two step with the
      ## appropriate command for generating static webpage, like an example bellow.
      ## Find the correct command in your framework documentation. You may need to to change the
      ## name of the source folder in the last step (CLI call)
      ####

      # - name: Build app
      #   run: npm run build

      - name: Deploy website
        env:
          APILLON_API_KEY: ${{ secrets.APILLON_API_KEY }}
          APILLON_API_SECRET: ${{ secrets.APILLON_API_SECRET }}
          WEBSITE_UUID: ${{ secrets.WEBSITE_UUID }}
        run: |
          npm i -g @apillon/cli
          apillon hosting deploy-website ./dist --uuid $WEBSITE_UUID --key $APILLON_API_KEY --secret $APILLON_API_SECRET
```

In this example, the GitHub Actions workflow is triggered when a push event occurs on the master branch. The workflow performs the following steps:

1. Checks out the repository.
2. Sets up Node.js with version 16.
3. Creates a dist folder to store the website files.
4. Copies the necessary files (HTML, images, styles, and JavaScript) to the dist folder.
5. Deploys the website using the CLI tool. The required environment variables (APILLON_API_KEY, APILLON_API_SECRET, and WEBSITE_UUID) are provided as secrets. The npx command ensures that the latest version of the CLI tool is used.

Make sure to setup secret variables with the values from Apillon platform.

That's it! You can now use this example as a starting point to deploy your website using the CLI tool in a CI/CD pipeline with GitHub Actions.

You can also check a working example on [Github](https://github.com/Apillon/sdk/blob/master/.github/workflows/deploy-sdk-docs.yml)
