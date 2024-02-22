# Computing API

The Computing Contracts API provides functionality for managing computing contracts, including creation, listing, encryption, ownership transfer, and assigning content identifiers (CIDs) to NFTs.

## Create Computing Contract

> Create a new computing contract with specified details.

<CodeDiv>POST /computing/contracts</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body fields

| Field             | Type     | Description                                        | Required                                                                                     |
|-------------------|----------|----------------------------------------------------|----------------------------------------------------------------------------------------------|
| bucket_uuid       | `string` | UUID of the bucket for storing encrypted files from the computing contract. If this is not provided, a new bucket will be created      | No       |
| contractType      | `number` | Type of the computing contract. Available options: 1 = SCHRODINGER                                                                     | Yes      |
| name              | `string` | Name of the computing contract                                                                                                         | Yes      |
| description       | `string` | Description of the computing contract                                                                                                  | No       |
| nftContractAddress| `string` | Contract address of the NFT collection whose tokens will be used for file decryption                                                   | No       |
| nftChainRpcUrl    | `string` | RPC URL of the blockchain the NFT contract resides on                                                                                  | Yes      |
| restrictToOwner   | `boolean`| If true, only the owner can encrypt files via the contract (Default: true)                                                             | Yes      |

#### Possible Errors

| Code     | Description                                              |
|----------|--------------------------------------------------------- |
| 40412003 | Bucket from given `bucket_uuid` param not found          |
| 42200202 | Contract type not present                                |
| 42200203 | Contract type not valid                                  |
| 42200204 | Contract name not present                                |
| 42200205 | Contract name not valid (length in range 1-255)          |
| 42200206 | Contract description not valid (length in range 1-1000)  |
| 42200161 | NFT RPC URL not present                                  |
| 50012003 | Error deploying contract                                 |

#### Response

A response is an instance of the newly created [contract](/build/8-computing-api.html#response-fields-computing-contract).

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/computing/contracts" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
  \"name\": \"My Computing Contract\",
  \"description\": \"This contract is used for encrypting files associated with NFTs.\",
  \"bucket_uuid\": \"def456...\",
  \"contractType\": 1,
  \"nftContractAddress\": \"0x123456789abcdef0123456789abcdef0123456789\",
  \"nftChainRpcUrl\": \"https://rpc.api.moonbeam.network/\",
  \"restrictToOwner\": false
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "0ac0bb74-5d78-4116-9e4f-1c3e8e92f032",
  "status": 201,
  "data": {
    "createTime": "2024-02-20T13:59:06.290Z",
    "updateTime": "2024-02-20T13:59:06.289Z",
    "contractUuid": "defa1296-99f4-40de-8470-a2e8497e15ad",
    "bucketUuid": "bf5940dc-673e-46bf-9207-e280c00d4f6b",
    "name": "My Computing Contract",
    "description": "This contract is used for encrypting files associated with NFTs.",
    "contractType": 1,
    "contractStatus": 1,
    "contractAddress": null,
    "deployerAddress": "44h63RRAv5PPjFJVp11uSa6v...",
    "transactionHash": null,
    "data": {
      "nftContractAddress": "0xB601A99a1D1...",
      "nftChainRpcUrl": "https://rpc.api.moonbeam.network/",
      "restrictToOwner": false,
      "ipfsGatewayUrl": "https://ipfs.nectarnode.io/ipfs",
      "clusterId": "0x0000000000000000000000000000000000000000000000000000000000000001"
    }
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>


## List Computing Contracts

> List all computing contracts with optional filters.

<CodeDiv>GET /computing/contracts</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Query Parameters

All query parameters from [listing request](1-apillon-api.md#listing-requests), plus:

| Field          | Type     | Description                           | Required |
|----------------|----------|---------------------------------------|----------|
| contractStatus | `number` | `0` (created), `1` (deploy initiated), `2` (deploying), `3` (deployed), `4` (transferring), `5` (transferred), `6` (failed)      | No       |

#### Response

A list of [computing contracts](/build/8-computing-api.html#response-fields-computing-contract) that match the query parameters. Each entry in the list contains details about the contract.

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/computing/contracts?project_uuid=abc123&contract_uuid=def456&contractStatus=1" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "14cf1522-bfa2-4190-972a-918992102ec2",
  "status": 200,
  "data": {
    "items": [
      {
        "createTime": "2024-02-20T13:58:45.000Z",
        "updateTime": "2024-02-20T14:01:07.000Z",
        "contractUuid": "defa1296-99f4-40de-8470-a2e8497e15ad",
        "projectUuid": "4e913623-247b-4000-b650-8272430a3970",
        "bucketUuid": "bf5940dc-673e-46bf-9207-e280c00d4f6b",
        "name": "My Computing Contract",
        "description": "This contract is used for encrypting files associated with NFTs.",
        "contractType": 1,
        "contractStatus": 3,
        "contractAbiId": 1,
        "contractAddress": "0xbdec1edc9b45a3...",
        "deployerAddress": "44h63RRAv5PPjFJVp11uSa6v...",
        }
    ],
    "total": 1,
    "page": 1,
    "limit": 20
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

## Get Computing Contract

> Retrieve details of a specific computing contract by UUID.

<CodeDiv>GET /computing/contracts/:uuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Field | Type     | Description                        | Required |
|-------|----------|------------------------------------|----------|
| uuid  | `string` | The UUID of the computing contract | Yes      |

#### Response fields (Computing Contract)

Based on your request to generate a table for the response fields that matches the structure seen in the bucket API documentation, here is how you can format the response fields for the "Get Computing Contract" section:

| Field                     | Type      | Description                                                                                       |
|---------------------      |-----------|-------------------------------------------------------------------------------------------        |
| `contractUuid`            | `string`  | The unique identifier of the computing contract.                                                  |
| `bucketUuid`              | `string`  | The UUID of the bucket associated with this computing contract, where encrypted files are stored. |
| `name`                    | `string`  | The name of the computing contract.                                                               |
| `description`             | `string`  | A description of what the computing contract is used for.                                         |
| `contractType`            | `number`  | The type of computing contract. For example, `1` could represent SCHRODINGER.                     |
| `contractStatus`          | `number`  | The current status of the computing contract. Possible values: `0` (created), `1` (deploy initiated), `2` (deploying), `3` (deployed), `4` (transferring), `5` (transferred), `6` (failed)                                                    |
| `contractAddress`         | `string`  | The blockchain address of the computing contract. This can be `null` if not yet deployed.         |
| `deployerAddress`         | `string`  | The address of the entity that deployed the computing contract.                                   |
| `transactionHash`         | `string`  | The transaction hash of the contract deployment. This can be `null` if not yet deployed.          |
| `data`                    | `object`  | An object containing additional data related to the computing contract.                           |
| `data.nftContractAddress` | `string`  | The contract address of the NFT collection used for file decryption.                              |
| `data.nftChainRpcUrl`     | `string`  | The RPC URL of the blockchain where the NFT contract resides.                                     |
| `data.restrictToOwner`    | `boolean` | Indicates if only the owner can encrypt and decrypt files via the contract.                       |
| `data.ipfsGatewayUrl`     | `string`  | The URL of the IPFS gateway used by the computing contract.                                       |
| `data.clusterId`          | `string`  | An identifier for the cluster used by the computing contract.                                     |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/computing/contracts/defa1296-99f4-40de-8470-a2e8497e15ad" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "status": 200,
  "data": {
    "createTime": "2024-02-20T13:58:45.000Z",
    "updateTime": "2024-02-20T14:01:07.000Z",
    "contractUuid": "defa1296-99f4-40de-8470-a2e8497e15ad",
    "bucketUuid": "bf5940dc-673e-46bf-9207-e280c00d4f6b",
    "name": "My Computing Contract",
    "description": "This contract is used for encrypting files associated with NFTs.",
    "contractType": 1,
    "contractStatus": 3,
    "contractAddress": "0xbdec1edc9b45a31e1ebd38b1d1e464bbbddeb4fcd2687a39928029306039e48a",
    "deployerAddress": "44h63RRAv5PPjFJVp11uSa6v52wRLmW7S5fiMWAyp3tNLh82",
    "transactionHash": "0x4ea088f466eb08dc27d9d079cba1c5a35aeb1b5ff342b73bd456b9625dcd7093",
    "data": {
      "clusterId": "0x0000000000000000000000000000000000000000000000000000000000000001",
      "ipfsGatewayUrl": "https://ipfs.nectarnode.io/ipfs",
      "nftChainRpcUrl": "https://rpc.api.moonbeam.network/",
      "restrictToOwner": false,
      "nftContractAddress": "0xB601A99a1D1804c13780F9e53d661d8bEe6D3bF0"
    }
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

## List Contract Transactions

> List transactions for a specific computing contract.

<CodeDiv>GET /computing/contracts/:uuid/transactions</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Field | Type     | Description                        | Required |
|-------|----------|------------------------------------|----------|
| uuid  | `string` | The UUID of the computing contract | Yes      |

#### Query Parameters

All query parameters from [listing request](1-apillon-api.md#listing-requests), plus:

| Field          | Type     | Description                           | Required |
|----------------|----------|---------------------------------------|----------|
| `transactionType`          | `number`  | The type of transaction. Possible values: `1` (deploy contract), `2` (transfer contract ownership), `3` (deposit to contract cluster), `4` (assign cid to nft)       |
| `transactionStatus`        | `number`  | The current status of the transaction. Possible values: `1` (pending), `2` (confirmed), `3` (failed), `4` (error), `5` (worker success), `6` (worker failed)                                                      |

#### Response fields

| Field                      | Type      | Description                                                                                   |
|----------------------------|-----------|-----------------------------------------------------------------------------------------------|
| `status`                   | `number`  | The status code of the transaction.                                                           |
| `walletAddress`            | `string`  | The wallet address which initated the transaction.                                            |
| `transactionType`          | `number`  | The type of transaction. Possible values: `1` (deploy contract), `2` (transfer contract ownership), `3` (deposit to contract cluster), `4` (assign cid to nft)       |
| `transactionStatus`        | `number`  | The current status of the transaction. Possible values: `1` (pending), `2` (confirmed), `3` (failed), `4` (error), `5` (worker success), `6` (worker failed)                                                      |
| `transactionStatusMessage` | `string`  | A message providing more details about the transaction status.                                |
| `transactionHash`          | `string`  | The hash of the transaction on the blockchain.                                                |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/computing/contracts/defa1296-99f4-40de-8470-a2e8497e15ad/transactions" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "c761c325-ba82-4861-9a13-866623881b59",
  "status": 200,
  "data": {
    "items": [
      {
        "id": 11,
        "status": 5,
        "walletAddress": "44h63RRA....",
        "contractId": 4,
        "transactionType": 1,
        "transactionStatus": 5,
        "transactionStatusMessage": "instantiated",
        "transactionHash": "0x4ea088..."
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 20
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

## Transfer Ownership

> Transfer ownership of a computing contract to another address.

<CodeDiv>POST /computing/contracts/:uuid/transfer-ownership</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Field | Type     | Description                        | Required |
|-------|----------|------------------------------------|----------|
| uuid  | `string` | The UUID of the computing contract | Yes      |

#### Body fields

| Field          | Type     | Description                          | Required |
|----------------|----------|--------------------------------------|----------|
| accountAddress | `string` | Wallet address of the new owner      | Yes      |

#### Possible Errors

| Code     | Description                                  |
|----------|----------------------------------------------|
| 40012003 | Invalid address to transfer to               |
| 40012004 | Transaction for transfer already exists      |
| 50012004 | Transfer contract server error               |
| 50012009 | Contract not in status `3` (Deployed)        |
| 50012010 | Contract transferring or already transferred |

#### Response
Success status

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/computing/contracts/defa1296-99f4-40de-8470-a2e8497e15ad/transfer-ownership" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{\"accountAddress\": \"0x456...\"}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
    "status": 200,
    "message": "Ownership transferred successfully",
     "data": {
        "success": true
    }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

## Encrypt Content

> Encrypt content associated with a computing contract.

<CodeDiv>POST /computing/contracts/:uuid/encrypt</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Field | Type     | Description                        | Required |
|-------|----------|------------------------------------|----------|
| uuid  | `string` | The UUID of the computing contract | Yes      |

#### Body fields

| Field     | Type     | Description                        | Required |
|-----------|----------|------------------------------------|----------|
| content   | `string` | Content to be encrypted            | Yes      |

#### Possible errors

| Code     | Description                            |
|----------|----------------------------------------|
| 50012009 | Contract not in status `3` (Deployed)  |
| 50012011 | Encrypt content server error           |

#### Response

The encrypted content

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/computing/contracts/defa1296-99

f4-40de-8470-a2e8497e15ad/encrypt" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{\"content\": \"Hello World\"}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
    "id": "10924c6e-7ad9-449f-bcef-6cbcbdbfcf32",
    "status": 201,
    "data": {
        "encryptedContent": "ebc36a408a68d97150aa6e42e3496a109dc5773c7f5d"
    }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

## Assign CID to NFT

> Assign a content identifier (CID) to an NFT within a computing contract.

<CodeDiv>POST /computing/contracts/:uuid/assign-cid-to-nft</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Field | Type     | Description                        | Required |
|-------|----------|------------------------------------|----------|
| uuid  | `string` | The UUID of the computing contract | Yes      |

#### Body fields

| Field | Type     | Description                       | Required |
|-------|----------|------------------------------------------------------------|----------|
| cid   | `string` | CID of the file where the encrypted content is stored      | Yes      |
| nftId | `number` | Token ID of the NFT which will be used for decryption      | Yes      |

#### Possible errors

| Code     | Description                            |
|----------|----------------------------------------|
| 50012009 | Contract not in status `3` (Deployed)  |
| 50012012 | Assign CID to NFT server error         |

#### Response
Success status

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/computing/contracts/defa1296-99f4-40de-8470-a2e8497e15ad/assign-cid-to-nft" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{\"cid\": \"QmTzY...\", \"nftId\": 22}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
    "id": "da911d30-bfca-479c-9fb5-3ffa338ddf88",
    "status": 201,
    "data": {
        "success": true
    }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>
