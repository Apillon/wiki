# NFTs API

API is for creating and managing NFTs. To prepare images and metadata for your NFT collection you can use the Storage API. To learn more about metadata standards you can visit: [https://docs.opensea.io/docs/metadata-standards](https://docs.opensea.io/docs/metadata-standards)

### Get NFT Collection

> Get NFT collection by UUID

<CodeDiv>GET /nfts/collections/:uuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name | Description                                                        | Required |
| ---- | ------------------------------------------------------------------ | -------- |
| uuid | Unique key of collection. Key is displayed in developer dashboard. | true     |

#### Possible errors

| Code     | Description                       |
| -------- | --------------------------------- |
| 40300000 | Not allowed to access collection. |
| 50012009 | Collection does not exist.        |

#### Response Fields

| Name             | Type       | Description                                                                                            |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| createTime       | `DateTime` | Collection create time.                                                                                |
| updateTime       | `DateTime` | Collection last update time.                                                                           |
| collectionUuid   | `string`   | Unique key of a collection.                                                                            |
| symbol           | `string`   | NFT collection symbol (usually 3-4 characters long).                                                   |
| name             | `string`   | NFT collection name.                                                                                   |
| description      | `string`   | NFT collection description.                                                                            |
| maxSupply        | `number`   | Maximal number of NFTs ever in existence (0 stands for unlimited).                                     |
| bucketUuid       | `string`   | UUID of the bucket where metadata is stored.                                                           |
| baseUri          | `string`   | Base URI for collection metadata (token id and file extension is appended to it).                      |
| baseExtension    | `string`   | File extension that is auto appended after token id to form a full URL.                                |
| isSoulbound      | `boolean`  | Soul bound tokens are NFTs that are bounded to wallet and not transferable.                            |
| isRevokable      | `boolean`  | For revocable collection owner can destroy NFTs at any time.                                           |
| isAutoIncrement  | `boolean`  | If set to false, enables minting NFTs with a custom token ID                                           |
| royaltiesFees    | `number`   | Percentage (between 0 and 100) of each NFT sale sent to wallet specified under royalties address.      |
| royaltiesAddress | `string`   | Address where royalties are sent to.                                                                   |
| collectionStatus | `number`   | Apillon internal/database collection status.                                                           |
| contractAddress  | `string`   | Smart address of contract for deployed collection.                                                     |
| transactionHash  | `string`   | Deployment transaction hash/id.                                                                        |
| deployerAddress  | `string`   | Wallet address of deployer.                                                                            |
| chain            | `number`   | Blockchain id on which you want to release your collection.                                            |
| drop             | `boolean`  | Determines if collection is mintable by public.                                                        |
| dropStart        | `number`   | UNIX timestamp which determines public mint opening date and time.                                     |
| dropPrice        | `number`   | Price of NFT at mint stage in token that is used on `chain`.                                           |
| dropReserve      | `number`   | Amount of NFTs reserved by owner.                                                                      |

  </div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/nfts/collections/:uuid' \
--header 'Authorization: Basic :credentials'
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b5935c73-204d-4365-9f9a-6a1792adab5b",
  "status": 200,
  "data": {
    "createTime": "2023-06-13T10:15:58.000Z",
    "updateTime": "2023-06-13T10:15:58.000Z",
    "collectionUuid": "d6355fd3-640d-4803-a4d9-79d875abcb5a",
    "symbol": "NFT",
    "name": "NFT Collection",
    "description": "NFT Collection Description",
    "maxSupply": 1000,
    "bucketUuid": "a9425ff7-4802-4a38-b771-84a790112c30",
    "baseUri": "https://ipfs.apillon.io/metadata/",
    "baseExtension": ".json",
    "isSoulbound": false,
    "isRevokable": true,
    "royaltiesFees": 0.1,
    "royaltiesAddress": "0x4156edbafc5091507de2dd2a53ded551a346f83b",
    "collectionStatus": 0,
    "contractAddress": "0x452101C96A1Cf2cBDfa5BB5353e4a7F235241557",
    "transactionHash": "0x6b97424de3367cd0335b08265787b83053b62bee2d1c8bec1f776936bea4fb26",
    "deployerAddress": "0x4156edbafc5091507de2dd2a53ded551a346f83b",
    "chain": 1287,
    "drop": true,
    "dropStart": 1687251003,
    "dropPrice": 0.1,
    "dropReserve": 5
  }
}
```

</CodeGroupItem>
</CodeGroup>
  </div>
</div>

##### Collection Statuses

| Number | Description                              |
| ------ | ---------------------------------------- |
| 0      | Collection was created.                  |
| 1      | Deploying collection was initiated.      |
| 2      | Collection is being deployed.            |
| 3      | Collection was deployed successfully.    |
| 4      | Collection was transferred successfully. |
| 5      | Failed deploying collection.             |

### List NFT Collections

> List NFT collections. Items are paginated and can be filtered and ordered through query parameters.

<CodeDiv>GET /nfts/collections</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Query parameters

All query parameters from [listing request](1-apillon-api.md#listing-requests) plus:

| Name             | Description                                                                                           | Required |
| ---------------- | ----------------------------------------------------------------------------------------------------- | -------- |
| collectionStatus | Collection status. Find available statuses [here](#collection-statuses).                              | false    |

#### Response

Response is a list of items described [under Response Fields above](#get-nft-collection).

  </div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/nfts/collections' \
--header 'Authorization: Basic :credentials'
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b5935c73-204d-4365-9f9a-6a1792adab5b",
  "status": 200,
  "data": {
    "items": [
      {
        "createTime": "2023-06-13T10:15:58.000Z",
        "updateTime": "2023-06-13T10:15:58.000Z",
        "collectionUuid": "d6355fd3-640d-4803-a4d9-79d875abcb5a",
        "symbol": "NFT",
        "name": "NFT Collection",
        "description": "NFT Collection Description",
        "maxSupply": 1000,
        "bucketUuid": "a9425ff7-4802-4a38-b771-84a790112c30",
        "baseUri": "https://ipfs.apillon.io/metadata/",
        "baseExtension": ".json",
        "isSoulbound": false,
        "isRevokable": true,
        "royaltiesFees": 0.1,
        "royaltiesAddress": "0x4156edbafc5091507de2dd2a53ded551a346f83b",
        "collectionStatus": 0,
        "contractAddress": "0x452101C96A1Cf2cBDfa5BB5353e4a7F235241557",
        "transactionHash": "0x6b97424de3367cd0335b08265787b83053b62bee2d1c8bec1f776936bea4fb26",
        "deployerAddress": "0x4156edbafc5091507de2dd2a53ded551a346f83b",
        "chain": 1287,
        "drop": true,
        "dropStart": 1687251003,
        "dropPrice": 0.1,
        "dropReserve": 5
      }
    ],
    "total": 1
  }
}
```

</CodeGroupItem>
</CodeGroup>
  </div>
</div>

### List Collection Transactions

> List NFT collections. Items are paginated and can be filtered and ordered through query parameters.

<CodeDiv>GET /nfts/collections/:uuid/transactions</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name | Description                                                        | Required |
| ---- | ------------------------------------------------------------------ | -------- |
| uuid | Unique key of collection. Key is displayed in developer dashboard. | true     |

#### Query parameters

All query parameters from [listing request](1-apillon-api.md#listing-requests) plus:

| Name              | Description                                                                                             | Required |
| ----------------- | ------------------------------------------------------------------------------------------------------- | -------- |
| transactionStatus | Transaction status.                                                                                     | false    |
| transactionType   | Transaction type.                                                                                       | false    |

#### Response Fields

| Name              | Type       | Description                                                 |
| ----------------- | ---------- | ----------------------------------------------------------- |
| chainId           | `number`   | Blockchain id on which you want to release your collection. |
| transactionType   | `number`   | Transaction type.                                           |
| transactionStatus | `number`   | Transaction status                                          |
| transactionHash   | `number`   | Transaction hash/id.                                        |
| updateTime        | `DateTime` | Transaction last update time.                               |
| createTime        | `DateTime` | Transaction create time.                                    |

  </div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/nfts/collections/:uuid/transactions' \
--header 'Authorization: Basic :credentials'
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b5935c73-204d-4365-9f9a-6a1792adab5b",
  "status": 200,
  "data": {
    "items": [
      {
        "chainId": 1287,
        "transactionType": 1,
        "transactionStatus": 1,
        "transactionHash": "0xb988c8cda7ec8b441611b208360e0aace9c294e1ca5672375b21e815890a54d1",
        "updateTime": "2023-06-13T10:15:58.000Z",
        "createTime": "2023-06-13T10:15:58.000Z"
      }
    ],
    "total": 1
  }
}
```

</CodeGroupItem>
</CodeGroup>
  </div>
</div>

##### Transaction Types

| Number | Description                 |
| ------ | --------------------------- |
| 1      | Deploy Contract             |
| 2      | Transfer Contract Ownership |
| 3      | Mint NFT                    |
| 4      | Set Collection Base URI     |
| 5      | Burn NFT                    |

##### Transaction Status

| Number | Description |
| ------ | ----------- |
| 1      | Pending     |
| 2      | Confirmed   |
| 3      | Failed      |
| 4      | Error       |

### Create NFT Collection

> API endpoint that creates NFT collection and deploys it on selected network.

An NFT Collection can be created with a few features/functionalities:

- drop: collection can be minted/purchased by users
- revokable: NFTs can be revoked by collection owner who can burn them
- soulbound: NFTs are bound to wallet address and can't be transferred
- royalties: owner can enable royalties to earn specified percentage per each NFT trade

The types of NFTs supported are generic collections, which represents an extension of the ERC-721 standard for EVM collections and the PSP-34 standard / Native NFTs for substrate collections. You can read more about these standards [here](/web3-services/4-nfts.html#nft-files)

Additionally, 2 chain types/environments are supported: EVM and Substrate.

#### Create Substrate NFT Collection
<br>
<CodeDiv>POST /nfts/collections/substrate</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body fields

| Name             | Type      | Description                                                                                                | Required |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------- | -------- |
| chain            | `number`  | Blockchain ID on which you want to release your collection. Options: (`8` - Astar)                        | true     |
| symbol           | `string`  | NFT collection symbol (usually 3-4 characters long).                                                       | true     |
| name             | `string`  | NFT collection name.                                                                                       | true     |
| description      | `string`  | NFT collection description.                                                                                | false    |
| maxSupply        | `number`  | Maximal number of NFTs ever in existence (0 stands for unlimited).                                         | true     |
| baseUri          | `string`  | Base URI for collection metadata (token id and file extension is appended to it).                          | true     |
| baseExtension    | `string`  | File extension that is auto appended after token id to form a full URL.                                    | true     |
| royaltiesAddress | `string`  | Address where royalties are sent to.                                                                       | true     |
| royaltiesFees    | `number`  | Percentage of royalties earned per each NFT trade.                                                         | true     |
| drop             | `boolean` | Determines if collection is mintable by public.                                                            | true     |
| dropStart\*      | `number`  | UNIX timestamp (in seconds) which determines public mint opening date and time.                            | true     |
| dropPrice\*      | `number`  | Price of NFT at mint stage.                                                                                | true     |
| dropReserve\*    | `number`  | Amount of NFTs reserved by owner.                                                                          | true     |

**Notes:**

\*`dropStart`, `dropPrice` and `dropReserve` are only used if `drop` is set to boolean `true`.

#### Possible errors

Beside validation errors (with 422 http status code) these are the error codes may be returned:

| Code     | Description                                   |
| -------- | --------------------------------------------- |
| 40012002 | Collection quota reached                      |
| 50012003 | Failed deploying NFT contract on chain.       |
| 50012010 | Failed to create bucket for storing metadata. |

#### Response

Response payload is described [under Response Fields above](#get-nft-collection).

  </div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/nfts/collections/substrate' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic :credentials' \
--data '{
    "chain": 8,
    "symbol": "NFT",
    "name": "NFT Collection",
    "description": "NFT Collection description",
    "maxSupply": 1000,
    "baseUri": "https://ipfs.apillon.io/metadata/",
    "baseExtension": "json",
    "royaltiesAddress": "5TdmScYtgDGg13mG1pvQ5zAooMXMK45bHBt3meGDXrNBKua",
    "royaltiesFees": 10,
    "drop": true,
    "dropStart": 1687251003,
    "dropReserve": 5,
    "dropPrice": 0.1
}'
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b5935c73-204d-4365-9f9a-6a1792adab5b",
  "status": 200,
  "data": {
    "createTime": "2023-06-13T10:15:58.000Z",
    "updateTime": "2023-06-13T10:15:58.000Z",
    "chain": 8,
    "collectionUuid": "d6355fd3-640d-4803-a4d9-79d875abcb5a",
    "symbol": "NFT",
    "name": "NFT Collection",
    "description": "NFT Collection Description",
    "maxSupply": 1000,
    "bucketUuid": "a9425ff7-4802-4a38-b771-84a790112c30",
    "baseUri": "https://ipfs.apillon.io/metadata/",
    "baseExtension": ".json",
    "isSoulbound": false,
    "isRevokable": false,
    "royaltiesFees": 0.1,
    "royaltiesAddress": "5TdmScYtgDGg13mG1pvQ5zAooMXMK45bHBt3meGDXrNBKua",
    "collectionStatus": 0,
    "contractAddress": "XjuXMnFxcJoAgMCdUQKvvt2Daykq4H9rsCfYEVpF6noFP5u",
    "transactionHash": "0xb59d8497feb121b0ca0b8480df72a456333edddc68ad65f23b6b8b9028e3a6b3",
    "deployerAddress": "WmMcyrPY4fivB5FUPN85QPhCMKtnrjmUyAgtXC2oW2XbcnY",
    "drop": true,
    "dropStart": 1687251003,
    "dropPrice": 0.1,
    "dropReserve": 5
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

#### Create EVM NFT Collection
<br>
<CodeDiv>POST /nfts/collections/evm</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body fields

All the fields from [substrate collection](/build/4-nfts-api.html#create-substrate-nft-collection), plus:

| Name             | Type      | Description                                                                                                | Required |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------- | -------- |
| chain            | `number`  | Blockchain ID on which you want to release your collection. Options: (`1284` - Moonbeam, `1287` - Moonbase, `592` - Astar)                        | true     |
| isRevokable      | `boolean` | For revocable collection owner can destroy NFTs at any time. (default: false)                              | true     |
| isSoulbound      | `boolean` | Soul bound tokens are NFTs that are bound to wallet and not transferable. (default: false)                 | true     |
| isAutoIncrement  | `boolean` | If set to false, enables minting NFTs with a custom token ID, otherwise defaults to isAutoIncrement = true | false    |

#### Possible errors

Beside validation errors (with 422 http status code) these are the error codes may be returned:

| Code     | Description                                   |
| -------- | --------------------------------------------- |
| 40012002 | Collection quota reached                      |
| 50012003 | Failed deploying NFT contract on chain.       |
| 50012010 | Failed to create bucket for storing metadata. |

#### Response

Response payload is described [under Response Fields above](#get-nft-collection).

  </div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/nfts/collections/evm' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic :credentials' \
--data '{
    "chain": 1287,
    "symbol": "NFT",
    "name": "NFT Collection",
    "description": "NFT Collection description",
    "maxSupply": 1000,
    "baseUri": "https://ipfs.apillon.io/metadata/",
    "baseExtension": "json",
    "royaltiesAddress": "0x4156edbafc5091507de2dd2a53ded551a346f83b",
    "royaltiesFees": 10,
    "drop": true,
    "dropStart": 1687251003,
    "dropReserve": 5,
    "dropPrice": 0.1,
    "isRevokable": true,
    "isSoulbound": true
}'
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b5935c73-204d-4365-9f9a-6a1792adab5b",
  "status": 200,
  "data": {
    "createTime": "2023-06-13T10:15:58.000Z",
    "updateTime": "2023-06-13T10:15:58.000Z",
    "chain": 1287,
    "collectionUuid": "d6355fd3-640d-4803-a4d9-79d875abcb5a",
    "symbol": "NFT",
    "name": "NFT Collection",
    "description": "NFT Collection Description",
    "maxSupply": 1000,
    "bucketUuid": "a9425ff7-4802-4a38-b771-84a790112c30",
    "baseUri": "https://ipfs.apillon.io/metadata/",
    "baseExtension": ".json",
    "royaltiesFees": 0.1,
    "royaltiesAddress": "0x4156edbafc5091507de2dd2a53ded551a346f83b",
    "collectionStatus": 0,
    "contractAddress": "0x452101C96A1Cf2cBDfa5BB5353e4a7F235241557",
    "transactionHash": "0x6b97424de3367cd0335b08265787b83053b62bee2d1c8bec1f776936bea4fb26",
    "deployerAddress": "0x4156edbafc5091507de2dd2a53ded551a346f83b",
    "drop": true,
    "dropStart": 1687251003,
    "dropPrice": 0.1,
    "dropReserve": 5,
    "isRevokable": true,
    "isSoulbound": true
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>


#### Create Unique NFT Collection
<br>
<CodeDiv>POST /nfts/collections/unique</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body fields

| Name           | Type      | Description                                                                                | Required |
|----------------|-----------|--------------------------------------------------------------------------------------------|----------|
| symbol         | `string`  | NFT collection symbol (usually 3-4 characters long).                                       | true     |
| name           | `string`  | NFT collection name.                                                                       | true     |
| description    | `string`  | NFT collection description.                                                                | false    |
| maxSupply      | `number`  | Maximal number of NFTs ever in existence (0 stands for unlimited).                         | true     |
| isRevokable    | `boolean` | For revocable collection owner can destroy NFTs at any time. (default: false)              | true     |
| isSoulbound    | `boolean` | Soul bound tokens are NFTs that are bound to wallet and not transferable. (default: false) | true     |
| metadata       | `object`  | Object containing metadata for different token ids (more details bellow).                  | true     |

#### Metadata field
Metadata field is an object with token ids as keys and token metadata as values. Here are the fields for each token metadata:

| Name              | Type     | Description                                                                             | Required   |
|-------------------|----------|-----------------------------------------------------------------------------------------|------------|
| name              | `string` | NFT name.                                                                               | true       |
| description       | `string` | NFT description.                                                                        | false      |
| image             | `string` | NFT image URL.                                                                          | true       |
| image_details     | `object` | Additional details about the image from the image field (see table bellow).             | false      |
| attributes        | `array`  | Array of NFT attributes (see table bellow).                                             | true       |
| animation_url     | `string` | NFT animation URL.                                                                      | false      |
| animation_details | `object` | Additional details about the animation from the animation_url field (see table bellow). | false      |
| youtube_url       | `string` | URL to a YouTube video associated with the NFT.                                         | false      |
| created_by        | `string` | Address of the creator of the NFT.                                                      | false      |
| external_url      | `string` | URL to an external resource providing more information about the NFT.                   | false      |
| background_color  | `string` | Background color of the NFT.                                                            | false      |
| locale            | `string` | Locale of the NFT.                                                                      | false      |

##### Metadata field attributes
Attributes field of metadata field is an array of NFT traits described bellow:

| Name          | Type      | Description                                       | Required |
|---------------|-----------|---------------------------------------------------|----------|
| value         | `string`  | Trait value.                                      | true     |
| trait_type    | `string`  | Name of the trait.                                | true     |
| display_type  | `string`  | Type for displaying trait (`number`, `date`,...). | false    |

##### Metadata field image_details and animation_details
| Name   | Type     | Description                                                                              | Required |
|--------|----------|------------------------------------------------------------------------------------------|----------|
| name   | `string` | Name of the image (for captions, etc.).                                                  | false    |
| type   | `enum`   | Type of content (`image`,`animation`,`video`,`audio`,`spatial`,`pdf`,`document`,`other`) | false    |
| bytes  | `number` | Size of the image file in bytes.                                                         | false    |
| format | `string` | Format of the image file (e.g., PNG, JPEG).                                              | false    |
| sha256 | `string` | SHA-256 hash of the image file.                                                          | false    |
| width  | `number` | Width of the image in pixels.                                                            | false    |
| height | `number` | Height of the image in pixels.                                                           | false    |
| order  | `number` | Order of the image.                                                                      | false    |

You can find more information about metadata in [Unique docs](https://docs.unique.network/reference/schemas/#nft-token-schema-v2-detailed-description).


#### Possible errors

Beside validation errors (with 422 http status code) these are the error codes may be returned:

| Code     | Description                                   |
|----------|-----------------------------------------------|
| 40012002 | Collection quota reached                      |
| 50012003 | Failed deploying NFT contract on chain.       |

#### Response

Response payload is described [under Response Fields above](#get-nft-collection).

  </div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/nfts/collections/unique' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic :credentials' \
--data '{
    "symbol": "NFT",
    "name": "NFT Collection",
    "description": "NFT Collection description",
    "maxSupply": 1000,
    "isRevokable": true,
    "isSoulbound": true,
    "metadata": {
        "1": {
            "name": "name",
            "description": "description",
            "image": "image",
            "attributes": [
                {
                    "value": "value",
                    "trait_type": "trait_type",
                    "display_type": "display_type"
                }
            ]
        },
        "2": {
            "name": "name",
            "description": "description",
            "image": "image",
            "attributes": [
                {
                    "value": "value",
                    "trait_type": "trait_type",
                    "display_type": "display_type"
                },
                {
                    "value": "value",
                    "trait_type": "trait_type",
                    "display_type": "display_type"
                }
            ]
        },
    }
}'
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b5935c73-204d-4365-9f9a-6a1792adab5b",
  "status": 200,
  "data": {
    "createTime": "2023-06-13T10:15:58.000Z",
    "updateTime": "2023-06-13T10:15:58.000Z",
    "chain": 11,
    "collectionUuid": "d6355fd3-640d-4803-a4d9-79d875abcb5a",
    "symbol": "NFT",
    "name": "NFT Collection",
    "description": "NFT Collection Description",
    "maxSupply": 1000,
    "bucketUuid": null,
    "baseUri": null,
    "baseExtension": "",
    "royaltiesFees": 0,
    "royaltiesAddress": null,
    "collectionStatus": 0,
    "contractAddress": "XjuXMnFxcJoAgMCdUQKvvt2Daykq4H9rsCfYEVpF6noFP5u",
    "transactionHash": "0xb59d8497feb121b0ca0b8480df72a456333edddc68ad65f23b6b8b9028e3a6b3",
    "deployerAddress": "WmMcyrPY4fivB5FUPN85QPhCMKtnrjmUyAgtXC2oW2XbcnY",
    "drop": false,
    "dropStart": 0,
    "dropPrice": 0,
    "dropReserve": 0,
    "isRevokable": true,
    "isSoulbound": true,
    "isAutoIncrement": true
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

### Transfer Collection

> Transfer collection ownership from a wallet owned by caller to a new wallet address.

<CodeDiv>POST/nfts/collections/:uuid/transfer</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name | Description                                                        | Required |
| ---- | ------------------------------------------------------------------ | -------- |
| uuid | Unique key of collection. Key is displayed in developer dashboard. | true     |

#### Body fields

| Name    | Type     | Description                    | Required |
| ------- | -------- | ------------------------------ | -------- |
| address | `string` | Wallet address of a new owner. | true     |

#### Possible errors

Beside validation errors (with 422 http status code) these are the error codes may be returned:

| Code     | Description                                                                        |
| -------- | ---------------------------------------------------------------------------------- |
| 40012003 | Contract can't be transferred to wallet address that already owns this collection. |
| 40012004 | Transfer transaction already exists.                                               |
| 40300000 | Not allowed to access collection                                                   |
| 50012002 | Collection doesn't exist, wasn't deployed or was already transferred.              |
| 50012004 | Collection transfer failed.                                                        |

#### Response

Response payload is described [under Response Fields above](#get-nft-collection).

  </div>
  <div class="split_side">

  <CodeGroup>
  <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/nfts/collections/:uuid/transfer' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic :credentials' \
--data '{"address": "0x452101C96A1Cf2cBDfa5BB5353e4a7F235241551"}'
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b5935c73-204d-4365-9f9a-6a1792adab5b",
  "status": 200,
  "data": {
    "createTime": "2023-06-13T10:15:58.000Z",
    "updateTime": "2023-06-13T10:15:58.000Z",
    "collectionUuid": "d6355fd3-640d-4803-a4d9-79d875abcb5a",
    "symbol": "NFT",
    "name": "NFT Collection",
    "description": "NFT Collection Description",
    "maxSupply": 1000,
    "bucketUuid": "a9425ff7-4802-4a38-b771-84a790112c30",
    "baseUri": "https://ipfs.apillon.io/metadata/",
    "baseExtension": ".json",
    "isSoulbound": false,
    "isRevokable": true,
    "royaltiesFees": 0.1,
    "royaltiesAddress": "0x4156edbafc5091507de2dd2a53ded551a346f83b",
    "collectionStatus": 0,
    "contractAddress": "0x452101C96A1Cf2cBDfa5BB5353e4a7F235241557",
    "transactionHash": "0x6b97424de3367cd0335b08265787b83053b62bee2d1c8bec1f776936bea4fb26",
    "deployerAddress": "0x4156edbafc5091507de2dd2a53ded551a346f83b",
    "chain": 1287,
    "drop": true,
    "dropStart": 1687251003,
    "dropPrice": 0.1,
    "dropReserve": 5
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

### Mint Collection NFTs

> Mint specified amount of NFTs to a wallet address provided in request.

**Note:** if the collection is set as `drop` this endpoint can only mint reserved NFTs.

<CodeDiv>POST/nfts/collections/:uuid/mint</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name | Description                                                        | Required |
| ---- | ------------------------------------------------------------------ | -------- |
| uuid | Unique key of collection. Key is displayed in developer dashboard. | true     |

#### Body fields

| Name             | Type     | Description                     | Required |
| ---------------- | -------- | ------------------------------- | -------- |
| receivingAddress | `string` | Wallet address of NFT receiver. | true     |
| quantity         | `number` | Number of NFTs to mint.         | true     |

#### Possible errors

Beside validation errors (with 422 http status code) these are the error codes may be returned:

| Code     | Description                                                              |
| -------- | ------------------------------------------------------------------------ |
| 40300000 | Not allowed to access collection.                                        |
| 50012002 | Collection doesn't exist, wasn't deployed or was already transferred.    |
| 50012005 | Error minting NFT.                                                       |
| 50012007 | Total number of minted NFTs would exceed max supply for this collection. |
| 50012008 | All of the reserved NFTs were already minted.                            |

#### Response Fields

| Field   | Type      | Description       |
| ------- | --------- | ----------------- |
| success | `boolean` | Status of action. |

  </div>
  <div class="split_side">

  <CodeGroup>
  <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/nfts/collections/:uuid/mint' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic :credentials' \
--data '{"receivingAddress": "0x452101C96A1Cf2cBDfa5BB5353e4a7F235241557", "quantity": 1}'
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b5935c73-204d-4365-9f9a-6a1792adab5b",
  "status": 200,
  "data": {
    "success": true
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

### Burn Collection NFT

> Burn specific NFT belonging to collection specified.

**Note:** burning NFTs is only available if `isRevokable` is enabled on collection.

<CodeDiv>POST/nfts/collections/:uuid/burn</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name | Description                                                        | Required |
| ---- | ------------------------------------------------------------------ | -------- |
| uuid | Unique key of collection. Key is displayed in developer dashboard. | true     |

#### Body fields

| Name    | Type     | Description                                | Required |
| ------- | -------- | ------------------------------------------ | -------- |
| tokenId | `number` | Non fungible token id that we are burning. | true     |

#### Possible errors

Beside validation errors (with 422 http status code) these are the error codes may be returned:

| Code     | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| 40300000 | Not allowed to access collection.                                     |
| 50012002 | Collection doesn't exist, wasn't deployed or was already transferred. |
| 50012012 | Burning NFT failed.                                                   |

#### Response fields

| Field   | Type      | Description       |
| ------- | --------- | ----------------- |
| success | `boolean` | Status of action. |

  </div>
  <div class="split_side">

  <CodeGroup>
  <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/nfts/collections/:uuid/burn' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic :credentials' \
--data '{"tokenId": 1}'
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b5935c73-204d-4365-9f9a-6a1792adab5b",
  "status": 200,
  "data": {
    "status": true
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>
