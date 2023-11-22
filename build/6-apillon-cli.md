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

### Global list pagination options

For commands that return a list of results, for example `apillon storage list-files`, or `apillon hosting list-websites`, there are global list pagination options that are available to use:

- `-l, --limit <integer>`: Page limit
- `-o, --order-by <string> `: Page order by (can be any property from the response data)
- `-p, --page <integer>`: Page number
- `-s, --search <string> `: Search by name or other object identifier

> For example responses and for an overview of all properties, refer to [the Apillon API wiki](https://wiki.apillon.io/build/1-apillon-api.html). Note: CLI responses may be dfferent from API responses.

# Commands

The Apillon CLI currently supports the following commands:

## `Hosting`

To be able to deploy a website with Apillon CLI, you have to create a website deployment inside your project on [Apillon Developer dashboard](https://app.apillon.io/dashboard/service/hosting). Upon creating a website deployment, you will get the website UUID number, that you will need to run CLI hosting commands.

#### `hosting list-websites`

This command lists all websites associated with your project.

```sh
apillon hosting list-websites --search "My-Website" --limit 1
```

#### `hosting get-website`
This command retrieves information about a specific website.

**Options**
- `--uuid <string>`: UUID of the website to get details for.

#### `hosting deploy-website`
This command deployes website from a local folder directly to Apillon hosting production environment.

**Options**
- `<file-path>`: Path to the folder containing your website files.
- `--uuid <string>`: UUID of the website to upload files to.
- `-p, --preview`: Deploy to staging environment instead.

**Example**
```sh
apillon hosting deploy-website ./public_html --uuid your-website-uuid -p
```

#### `hosting upload`
Upload a file folder to a website deployment bucket.

**Options**
- `<file-path>`: Path to the folder containing your website files.
- `--uuid <string>`: UUID of the website to upload files to.

**Example**
```sh
apillon hosting upload ./public_html --uuid your-website-uuid
```

#### `hosting start-deployment`
This command deploys a website to the specified environment, from files already uploaded to the hosting bucket.

**Options**
- `--uuid <string>`: UUID of the website to deploy.
- `--env <integer>`: The environment to deploy to. Can be 1 - staging, 2 - staging to production, or 3 - direct to productiion.

**Example**
```sh
apillon hosting start-deployment --uuid your-website-uuid --env 3
```

#### `hosting list-deployments`
This command lists all deployments for a specific website.

**Options**
- `--status <integer>`: The status of the deployments (DeploymentStatus enum, optional).

Available choices:
```
TO_STAGING = 1
STAGING_TO_PRODUCTION = 2
DIRECTLY_TO_PRODUCTION = 3
```
- `--env <integer>`: The environment of the deployments (DeploymentStatus enum, optional).

Available choices:
```
INITIATED = 0
IN_PROCESS = 1
SUCCESSFUL = 10
FAILED = 100
```

#### `hosting get-deployment`
This command retrieves information about a specific deployment.

**Options**
- `-w, --website-uuid <string>`: UUID of the website.
- `-d, --deployment-uuid <string>`: UUID of the deployment

## `Storage`
#### `storage list-buckets`

This command lists all storage buckets associated with your project.

#### `storage list-objects`

This command retrieves objects (files and directories) recursively from a specific bucket.

**Options**
- `-b, --bucket-uuid <string>`: UUID of the bucket to retrieve objects from.
- `-d, --directory-uuid <string>`: UUID of the directory to retreive objects from (optional, default root folder)
- `--deleted`: Include objects deleted from the bucket

#### `storage list-files`
This command retrieves files from a specific bucket.

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

**Example response**
```json
[
  {
    "createTime": "2023-11-15T09:58:04.000Z",
    "updateTime": "2023-11-15T09:58:10.000Z",
    "name": "style.css",
    "CID": "QmR6nTwU4V1rRFAd7rqANmVTEYe6rPV3nwRWxVyq2K24ud",
    "status": "AVAILABLE_ON_IPFS_AND_REPLICATED",
    "type": "FILE",
    "bucketUuid": "91c57d55-e8e4-40b7-ad6a-81a82831bfb3"
  },
  {
    "createTime": "2023-11-15T09:58:04.000Z",
    "updateTime": "2023-11-15T09:58:09.000Z",
    "name": "index.html",
    "CID": "QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH",
    "status": "AVAILABLE_ON_IPFS",
    "type": "FILE",
    "bucketUuid": "91c57d55-e8e4-40b7-ad6a-81a82831bfb3"
  }
]
```

#### `storage upload`
This command uploads files to a specified bucket.

**Options**
- `<file-path>`: Path to the folder containing your files.
- `-b, --bucket-uuid <string>`: UUID of the bucket to upload files to.

**Example**
```sh
apillon storage upload ./my_folder --bucket-uuid your-bucket-uuid
```
#### `storage get-file`

This command retrieves information about a specific file in a bucket.

**Options**
- `-b, --bucket-uuid <string>`: UUID of the bucket.
- `-f, --file-uuid <string>`: UUID or CID of the file to retrieve.

#### `storage delete-file`

This command deletes a specific file from a bucket.

**Options**
- `-b, --bucket-uuid <string>`: UUID of the bucket.
- `-f, --file-uuid <string>`: UUID or CID of the file to delete.

## `NFTs`

#### `nfts list-collections`
This command lists all NFT collections owned by the project related to the API key.

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

#### `nfts get-collection`
This command retrieves information about a specific NFT collection.

**Options**
- `--uuid <collection-uuid>`: UUID of the collection to retrieve.

#### `nfts create-collection`
This command creates a new NFT collection. The JSON file needs to have the property structure as type `ICreateCollection`, which can be found in the SDK docs.

**Options**
- `<file-path>`: Path to the JSON data file for the new collection.

**Example**
```sh
apillon nfts create-collection ./nft-data.json
```

#### `nfts mint-nft`
This command mints NFTs for a collection with a specific UUID.

**Options**
- `--uuid <collection-uuid>`: UUID of the collection to mint NFTs to.
- `-a, --address <string>`: Address which will receive minted NFTs.
- `-q --quantity <integer>`: Number of NFTs to mint.

#### `nfts nest-mint-nft`
This command nest mints NFT child collection to a parent collection with a specific UUID and parent NFT with id.

**Options**
- `-c, --parent-colleciton-uuid <collection-uuid>`: Parent collection UUID to which child NFTs will be minted to.
- `-p, --parent-nft-id <string>`: Parent collection NFT id to which child NFTs will be minted to.
- `-q, --quantity <integer>`: Number of child NFTs to mint.

#### `nfts burn-nft`
This command burns NFT for a collection with a specific UUID.

**Options**
- `--uuid <collection-uuid>`: Collection UUID.
- `-t, --token-id <integer>`: NFT id which will be burned.

#### `nfts transfer-collection`
This command transfers NFT collection ownership to a new wallet address.

**Options**
- `--uuid <collection-uuid>`: Collection UUID.
- `-a, --address <string>`: Address which you want to transfer collection ownership to.

#### `nfts list-transactions`
This command lists NFT transactions for a specific collection UUID.

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
        run: npx --yes @apillon/cli hosting deploy-website ./dist --uuid $WEBSITE_UUID --key $APILLON_API_KEY --secret $APILLON_API_SECRET
```

In this example, the GitHub Actions workflow is triggered when a push event occurs on the master branch. The workflow performs the following steps:

1. Checks out the repository.
2. Sets up Node.js with version 16.
3. Creates a dist folder to store the website files.
4. Copies the necessary files (HTML, images, styles, and JavaScript) to the dist folder.
5. Deploys the website using the CLI tool. The required environment variables (APILLON_API_KEY, APILLON_API_SECRET, and WEBSITE_UUID) are provided as secrets. The npx command ensures that the latest version of the CLI tool is used.

Make sure to setup secret variables with the values from Apillon platform.

That's it! You can now use this example as a starting point to deploy your website using the CLI tool in a CI/CD pipeline with GitHub Actions.
