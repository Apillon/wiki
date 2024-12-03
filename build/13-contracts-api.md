# Contracts API

API for creation and management of smart contracts through Apillon wallets on supported EVM chains.

Enables developers (even without blockchain experience) to deploy, automate, scale, and efficiently manage smart contracts
on the blockchain through simple API calls.

### Get Contract

> Get contract (available for deploy) by UUID

<CodeDiv>GET /contracts/:uuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Name | Description                                | Required |
| ---- | ------------------------------------------ | -------- |
| uuid | Unique identifier of the contract.         | true     |

#### Possible Errors

| Code     | Description         |
| -------- |---------------------|
| 40421001 | Contract not found. |

#### Response Fields
Contract that can be used to create an instance of deployed contract.

| Name            | Type       | Description                                         |
| --------------- |------------|-----------------------------------------------------|
| contractUuid    | `string`   | Unique identifier for the contract.                 |
| contractType    | `number`   | Type identifier of the contract (described bellow). |
| chainType       | `number`   | Type of blockchain the contract is deployed on.     |
| name            | `string`   | Name of the contract.                               |
| description     | `string`   | Description of the contract.                        |
| contractVersion | `string`   | Version of the contract.                            |
| createTime      | `DateTime` | Creation time of the contract.                      |
| updateTime      | `DateTime` | Update time of the contract.                        |

##### Contract Types

| Name      | Value | Description                   |
|-----------|-------|-------------------------------|
| OTHER     | 1     | Other Contracts               |
| ERC_20    | 2     | ERC-20 Compatible Contracts   |
| ERC_721   | 3     | ERC-721 Compatible Contracts  |
| ERC_1155  | 4     | ERC-1155 Compatible Contracts |

##### Contract Version
Version of the contract used for deploying.

| Name                | Type        | Description                                            |
| ------------------- | ----------- |--------------------------------------------------------|
| abi                 | `Abi[]`     | ABI details of the contract  (described bellow).       |
| methods             | `Method[]`  | Methods available in the contract (described bellow).  |
| contract            | `Contract`  | Metadata about the contract itself (described bellow). |
| createTime          | `DateTime`  | Contract creation time.                                |
| updateTime          | `DateTime`  | Contract last update time.                             |

###### Contract ABI
ABI for deployable contract.

| Name            | Type           | Description                                  |
| --------------- | -------------- | -------------------------------------------- |
| stateMutability | `string`       | State mutability of the function.            |
| type            | `string`       | Type of the ABI (constructor/function).      |
| inputs          | `Input[]`      | List of input parameters for the function.   |
| outputs         | `Output[]`     | List of output parameters for the function.  |

###### Contract Method
Methods of deployable contract.

| Name          | Type       | Description                          |
| ------------- | ---------- | ------------------------------------ |
| onlyOwner     | `boolean`  | Whether the method is owner only.    |
| name          | `string`   | Name of the method.                  |
| description   | `string`   | Description of the method.           |
| createTime    | `DateTime` | Creation time of the method.         |
| updateTime    | `DateTime` | Update time of the method.           |


  </div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/contracts/:uuid' --header 'Authorization: Basic :credentials'
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "f419b53c-e71d-4489-8914-bb92bcca5ebc",
  "status": 200,
  "data": {
    "createTime": "2024-07-11T14:06:19.000Z",
    "updateTime": "2024-07-11T14:06:19.000Z",
    "contractUuid": "cc20586e-1468-4316-8366-99c5492c3ed1",
    "contractType": 2,
    "chainType": 2,
    "name": "Generic2 ERC-20",
    "description": "Generic ERC-20 Non Fungible Token",
    "contractVersion": {
      "createTime": "2024-07-11T14:08:09.000Z",
      "updateTime": "2024-07-11T14:08:09.000Z",
      "abi": [
        {
          "stateMutability": "nonpayable",
          "type": "constructor",
          "inputs": [
            {
              "name": "name",
              "internalType": "string",
              "type": "string"
            },
            {
              "name": "symbol",
              "internalType": "string",
              "type": "string"
            }
          ]
        },
        {
          "stateMutability": "view",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "internalType": "address",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "",
              "internalType": "uint256",
              "type": "uint256"
            }
          ]
        },
        {
          "stateMutability": "nonpayable",
          "type": "function",
          "inputs": [
            {
              "name": "value",
              "internalType": "uint256",
              "type": "uint256"
            }
          ],
          "name": "burn",
          "outputs": []
        },
        ...
      ],
      "methods": [
        {
          "createTime": "2024-07-11T14:09:47.000Z",
          "updateTime": "2024-07-11T14:09:47.000Z",
          "onlyOwner": true,
          "name": "burn",
          "description": "burn"
        },
        ...
      ],
      "contract": null
    }
  }
}
```

</CodeGroupItem>
</CodeGroup>

</div>
</div>

### List Contracts

> Get a list of all deployable contracts

<CodeDiv>GET /contracts</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Query Parameters

All query parameters from [listing request](1-apillon-api.md#listing-requests), plus:

| Name       | Description                        | Required |
|------------|------------------------------------| -------- |
| chainType  | The type of the blockchain chain.  | false    |

#### Possible Errors

| Code     | Description          |
| -------- |----------------------|
| 40421001 | Contract not found.  |

#### Response

Response is a list of contracts described [under Response Fields above](#response-fields).

  </div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/contracts' --header 'Authorization: Basic :credentials'
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b4d24772-be33-4cf4-ba18-a47258fa7152",
  "status": 200,
  "data": {
    "items": [
      {
        "id": 5,
        "createTime": "2024-07-08T09:22:30.000Z",
        "updateTime": "2024-07-08T09:22:30.000Z",
        "contract_uuid": "e0688a37-0b8b-4634-a1e4-bdb894866831",
        "contractType": 3,
        "chainType": 2,
        "name": "Generic ERC-1155",
        "description": "Generic ERC-1155 Non Fungible Token"
      },
      {
        "id": 6,
        "createTime": "2024-07-11T14:06:19.000Z",
        "updateTime": "2024-07-11T14:06:19.000Z",
        "contract_uuid": "cc20586e-1468-4316-8366-99c5492c3ed1",
        "contractType": 2,
        "chainType": 2,
        "name": "Generic ERC-20",
        "description": "Generic ERC-20 Non Fungible Token"
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 20
  }
}
```

</CodeGroupItem>
</CodeGroup>

</div>
</div>

### Get Contract ABI

> Get the ABI of a deployable contract

<CodeDiv>GET /contracts/:uuid/abi</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Name | Description                       | Required |
| ---- | --------------------------------- | -------- |
| uuid | Unique identifier of contract.    | true     |

#### Query Parameters
All query parameters from [listing request](1-apillon-api.md#listing-requests), plus:

| Name          | Description                                                               | Required |
|---------------|---------------------------------------------------------------------------| -------- |
| solidityJson  | Determines format in which to return ABI (default is solidityJson=false). | false    |

#### Possible Errors

| Code     | Description                               |
| -------- |-------------------------------------------|
| 40421001 | Contract not found.                       |

#### Response Fields
Endpoint returns ABI methods as an array.

Array item(s) format depends on value of `solidityJson` passed as query parameter:
- Human-readable ABI (solidityJson=false)
- ABI in Solidity JSON format (solidityJson=true)

</div>
</div>


### Deploy Contract

> Deploy an instance of contract

<CodeDiv>POST /contracts/:uuid/deploy</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Name | Description                              | Required |
| ---- |------------------------------------------| -------- |
| uuid | Unique identifier of contract to deploy. | true     |

#### Body Parameters

| Name                 | Type        | Description                         | Required |
|----------------------|-------------|-------------------------------------|----------|
| name                 | `string`    | Name of the contract.               | true     |
| description          | `string`    | Description of the contract.        | true     |
| chain                | `number`    | ID of the blockchain.               | true     |
| constructorArguments | `unknown[]` | Arguments for the constructor.      | true     |


#### Possible Errors

| Code     | Description                     |
| -------- |---------------------------------|
| 40421001 | Contract not found.             |
| 42221001 | Data not present.               |
| 50021003 | Contract deploy error.          |
| 50021016 | Failed to get contract version. |

##### Response Fields

| Name            | Type              | Description                                         |
| --------------- |-------------------|-----------------------------------------------------|
| contractUuid    | `string`          | Unique identifier for the contract.                 |
| contractType    | `number`          | Type identifier of the contract (described bellow). |
| chainType       | `number`          | Type of blockchain the contract is deployed on.     |
| name            | `string`          | Name of the contract.                               |
| description     | `string`          | Description of the contract.                        |
| contractVersion | `ContractVersion` | Version of the contract (if available).             |
| createTime      | `DateTime`        | Creation time of the contract.                      |
| updateTime      | `DateTime`        | Update time of the contract.                        |

  </div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/contracts/:uuid/deploy' \ 
--header 'Authorization: Basic :credentials'
--data-raw '{
    "name": "Test Contract 2",
    "description": "test description",
    "chain": 1287,
    "constructorArguments": ["Test Contract 2", "TC2"],
}'
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "71ebc623-48cb-4e8a-b24d-213284c9ef9c",
  "status": 201,
  "data": {
    "status": 5,
    "createTime": "2024-12-03T09:36:50.781Z",
    "updateTime": null,
    "contract_uuid": "7641d513-0990-4ffb-be21-2c5f5220bf5c",
    "project_uuid": "41232f3f-acc0-4d79-b9b5-64e030d30d0b",
    "name": "Test Contract 2",
    "description": "test description",
    "chainType": 2,
    "chain": 1287,
    "version_id": 8,
    "constructorArguments": ["Test Contract","TC","0x4C2A866EB59511a6aD78db5cd4970464666b745a"],
    "contractStatus": 2,
    "contractAddress": "0xe878564779CD04625eE4A02f663014A4C184ed86",
    "deployerAddress": "0x47df8450ee10ede00a9d5508f89d8d4570aa7b99",
    "transactionHash": "0xf6f35bcb35e446be9b29432ef7bdd0300ee459b19656b3972010463ca5537aea",
    "contractVersion": null
  }
}
```

</CodeGroupItem>
</CodeGroup>

</div>
</div>


### Get Deployed Contract

> Get details of a deployed contract by UUID

<CodeDiv>GET /contracts/deployed/:uuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Name  | Description                                 | Required |
|-------|---------------------------------------------|----------|
| uuid  | Unique identifier of the deployed contract. | true     |

#### Possible Errors

| Code      | Description                              |
|-----------|------------------------------------------|
| 40300000  | Not allowed to access deployed contract. |
| 40421002  | Contract not found.                      |

#### Response Fields

| Field                | Type                         | Description                                                            |
|----------------------|------------------------------|------------------------------------------------------------------------|
| contractUuid         | `string`                     | Unique identifier of the contract.                                     |
| projectUuid          | `string`                     | Unique identifier of the project.                                      |
| name                 | `string`                     | Name of the contract.                                                  |
| description          | `string`                     | Description of the contract.                                           |
| chainType            | `ChainType`                  | Type of the blockchain chain.                                          |
| chain                | `EvmChain`                   | Specific EVM-compatible blockchain.                                    |
| versionId            | `number`                     | Version ID of the contract.                                            |
| constructorArguments | `unknown[]`                  | Arguments used in the constructor of the contract.                     |
| contractStatus       | `ContractStatus`             | Status of the contract.                                                |
| contractAddress      | `string`                     | Address where the contract is deployed.                                |
| deployerAddress      | `string`                     | Address of the deployer of the contract.                               |
| transactionHash      | `string`                     | Transaction hash of the deployment.                                    |
| contractVersion      | `ContractVersion`            | Version details for deployed contract (details [above](#get-contract). |
| createTime           | `DateTime`                   | Collection create time.                                                |
| updateTime           | `DateTime`                   | Collection last update time.                                           |


</div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/contracts/deployed/:uuid' --header 'Authorization: Basic :credentials'
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "ec7872ae-0a3d-466e-9b19-7bca8df3dc81",
  "status": 200,
  "data": {
    "status": 5,
    "createTime": "2024-11-13T14:11:43.000Z",
    "updateTime": "2024-11-13T14:15:51.000Z",
    "contractUuid": "e8be60e2-a5d7-4366-92aa-0d3f55c022c4",
    "projectUuid": "c094c483-857f-4b12-bdd4-e3a316719882",
    "name": "Test Contract 2",
    "description": "test description",
    "chainType": 2,
    "chain": 1287,
    "versionId": 8,
    "constructorArguments": "null",
    "contractStatus": 3,
    "contractAddress": "0x32BaCe3FA12F22E90111adbf2A396a7946B1D046",
    "deployerAddress": "0x7ddefb047752a969a0fc2a76665f99e1656bc195",
    "transactionHash": null,
    "contractVersion": {
      "createTime": "2024-11-13T14:04:14.000Z",
      "updateTime": "2024-11-13T14:04:14.000Z",
      "abi": [
        {
          "stateMutability": "nonpayable",
          "type": "constructor",
          "inputs": [
            {
              "name": "uri",
              "internalType": "string",
              "type": "string"
            },
            {
              "name": "adminAddress",
              "internalType": "address",
              "type": "address"
            }
          ]
        },
        {
          "stateMutability": "view",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "internalType": "address",
              "type": "address"
            },
            {
              "name": "id",
              "internalType": "uint256",
              "type": "uint256"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "",
              "internalType": "uint256",
              "type": "uint256"
            }
          ]
        },
        {
          "stateMutability": "nonpayable",
          "type": "function",
          "inputs": [
            {
              "name": "account",
              "internalType": "address",
              "type": "address"
            },
            {
              "name": "id",
              "internalType": "uint256",
              "type": "uint256"
            },
            {
              "name": "value",
              "internalType": "uint256",
              "type": "uint256"
            }
          ],
          "name": "burn",
          "outputs": []
        },
        ...
      ],
      "methods": [
        {
          "createTime": "2024-11-13T14:05:06.000Z",
          "updateTime": "2024-11-13T14:05:06.000Z",
          "onlyOwner": true,
          "name": "burn",
          "description": "burn"
        },
        ...
      ],
      "contract": {
        "createTime": "2024-07-08T09:22:30.000Z",
        "updateTime": "2024-07-08T09:22:30.000Z",
        "contractUuid": "e0688a37-0b8b-4634-a1e4-bdb894866831",
        "contractType": 3,
        "chainType": 2,
        "name": "Generic ERC-1155",
        "description": "Generic ERC-1155 Non Fungible Token",
        "contractVersion": null
      }
    }
  }
}
```
</CodeGroupItem>
</CodeGroup>
  </div>
</div>

##### Chain Types

| Name      | Value | Description       |
|-----------|-------|-------------------|
| SUBSTRATE | 1     | Substrate Chain   |
| EVM       | 2     | Ethereum VM Chain |

##### EVM Chains

| Name       | Value  | Description      |
|------------|--------|------------------|
| Astar      | 592    | Astar Network    |
| Moonbase   | 1287   | Moonbase Network |
| Moonbeam   | 1284   | Moonbeam Network |

##### Contract Statuses

| Name             | Value | Description                     |
|------------------|-------|---------------------------------|
| CREATED          | 0     | Contract created                |
| DEPLOY_INITIATED | 1     | Deployment initiated            |
| DEPLOYING        | 2     | Contract deploying              |
| DEPLOYED         | 3     | Contract deployed               |
| TRANSFERRING     | 4     | Transferring contract ownership |
| TRANSFERRED      | 5     | Contract ownership transferred  |
| FAILED           | 6     | Deployment failed               |


#### Possible Errors

| Code     | Description                                 |
|----------|---------------------------------------------|
| 40300000 | Not allowed to access deployed contracts.   |


### List Deployed Contracts

> Get a list of deployed contracts

> Items are paginated and can be filtered and ordered through query parameters.

<CodeDiv>GET /contracts/deployed</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Query Parameters
All query parameters from [listing request](1-apillon-api.md#listing-requests) plus:

| Name           | Description                              | Required |
|----------------|------------------------------------------|----------|
| chainType      | The type of the blockchain chain.        | false    |
| contractStatus | Status of the contract.                  | false    |

#### Response

Response is a list of items (shorter version) described [under Response Fields above](#response-fields).

Item is a shorter version because it is a flat object and it doesn't include nested `contractVersion` (with `abi`, 
`methods` and `contract`), instead it exposes some details from this table:

##### Response Fields

| Name                | Type           | Description                                        |
|---------------------|----------------|----------------------------------------------------|
| contractVersion     | `number`       | Unique identifier of the contract.                 |
| contractType        | `ContractType` | Type identifier of the contract (described above). |
| contractName        | `string`       | Name of the contract.                              |
| contractDescription | `string`       | Description of the contract.                       |

  </div>
  <div class="split_side">

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/contracts/deployed' --header 'Authorization: Basic :credentials'
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "ed374fe6-f912-48f6-b4cb-e0304090d37d",
  "status": 200,
  "data": {
    "items": [
      {
        "id": 22,
        "status": 5,
        "createTime": "2024-10-01T08:27:13.000Z",
        "updateTime": "2024-10-01T08:27:13.000Z",
        "contractUuid": "e4f28996-9a00-46f0-925a-c814becf8a55",
        "projectUuid": "c094c483-857f-4b12-bdd4-e3a316719882",
        "name": "Test Contract 1",
        "description": "description",
        "chainType": 2,
        "chain": 1287,
        "versionId": 5,
        "contractStatus": 2,
        "contractAddress": "0xc74758a5EEeFCeAeF899f2A494854E74C682BFe5",
        "deployerAddress": "0x7ddefb047752a969a0fc2a76665f99e1656bc195",
        "contractVersion": 1,
        "contractType": 3,
        "contractName": "Generic ERC-1155",
        "contractDescription": "Generic ERC-1155 Non Fungible Token"
      },
      {
        "id": 23,
        "status": 5,
        "createTime": "2024-11-13T14:11:43.000Z",
        "updateTime": "2024-11-13T14:15:51.000Z",
        "contractUuid": "e8be60e2-a5d7-4366-92aa-0d3f55c022c4",
        "projectUuid": "c094c483-857f-4b12-bdd4-e3a316719882",
        "name": "Test Contract 2",
        "description": "description",
        "chainType": 2,
        "chain": 1287,
        "versionId": 8,
        "contractStatus": 3,
        "contractAddress": "0x32BaCe3FA12F22E90111adbf2A396a7946B1D046",
        "deployerAddress": "0x7ddefb047752a969a0fc2a76665f99e1656bc195",
        "contractVersion": 2,
        "contractType": 3,
        "contractName": "Generic ERC-1155",
        "contractDescription": "Generic ERC-1155 Non Fungible Token"
      }
    ],
    "total": 22,
    "page": 2,
    "limit": 20
  }
}
```

</CodeGroupItem>
</CodeGroup>
  </div>
</div>

### Call Deployed Contract

> Execute a write function on a deployed contract

<CodeDiv>POST /contracts/deployed/:uuid/call</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Name | Description                                | Required |
| ---- |--------------------------------------------| -------- |
| uuid | Unique identifier of the contract to call. | true     |

#### Body Parameters

| Name            | Type        | Description                                                                   | Required |
|-----------------|-------------|-------------------------------------------------------------------------------| -------- |
| methodName      | `string`    | Method that is being called on contract.                                      | true     |
| methodArguments | `unknown[]` | An array of arguments that are passed to the contract method when calling it. | true     |

NOTE: See contract ABI for available methods and arguments required for calling them.

#### Possible Errors

| Code     | Description                               |
| -------- |-------------------------------------------|
| 40300000  | Not allowed to access deployed contract. |
| 42221001 | Data not present.                         |
| 50021002 | Contract owner error.                     |
| 50021004 | Contract call error.                      |
| 50021005 | Contract not deployed.                    |
| 50021006 | Contract address missing.                 |

#### Response
Response contains transaction details.

##### Response Fields

| Name              | Type        | Description                                   |
|-------------------|-------------| --------------------------------------------- |
| transactionUuid   | `number`    | Unique identifier of the transaction.         |
| address           | `string`    | Address initiating the transaction.           |
| to                | `string`    | Recipient address of the transaction.         |
| chain             | `Chain`     | Chain ID where the transaction was executed.  |
| transactionStatus | `number`    | Status of the transaction.                    |
| chainType         | `ChainType` | Type of blockchain network.                   |
| transactionHash   | `string`    | Hash of the transaction.                      |
| referenceTable    | `string`    | Reference table for the transaction metadata. |
| referenceId       | `string`    | Reference identifier for related data.        |
| data              | `any`       | Additional transaction data (if any).         |
| projectUuid       | `string`    | Unique identifier of the project.             |

</div>
  <div class="split_side">
    <br>
    <CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location 'https://api.apillon.io/contracts/deployed/:uuid/call' \
--header 'Authorization: Basic :credentials' \
--data-raw '{
    "methodName": "transferOwnership",
    "methodArguments": ["0x4C2A866EB59511a6aD78db5cd4970464666b745a"]
}'
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "31809463-6f6b-4406-9409-f3311b1e8dac",
  "status": 201,
  "data": {
    "id": 729,
    "status": 5,
    "address": "0x7DdEfb047752a969a0fC2A76665f99E1656bc195",
    "to": "0x32BaCe3FA12F22E90111adbf2A396a7946B1D046",
    "chain": 1287,
    "transactionStatus": 1,
    "chainType": 2,
    "transactionHash": "0xbed631198f1c4236b985ed1e22cb966ad6265f05e3b24a4da23c18a4448c2a81",
    "referenceTable": "contract_deploy",
    "referenceId": "e8be60e2-a5d7-4366-92aa-0d3f55c022c4",
    "data": null,
    "projectUuid": "c094c483-857f-4b12-bdd4-e3a316719882"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

</div>
</div>

### Get Deployed Contract ABI

> Get the ABI of a deployed contract

<CodeDiv>GET /contracts/deployed/:uuid/abi</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Name | Description                                  | Required |
| ---- |----------------------------------------------| -------- |
| uuid | Unique identifier of the deployed contract.  | true     |

#### Query Parameters
All query parameters from [listing request](1-apillon-api.md#listing-requests), plus:

| Name          | Description                                                               | Required |
|---------------|---------------------------------------------------------------------------| -------- |
| solidityJson  | Determines format in which to return ABI (default is solidityJson=false). | false    |

#### Possible Errors

| Code      | Description                                |
|-----------|--------------------------------------------|
| 40300000  | Not allowed to access deployed contract.   |

#### Response
Endpoint returns ABI methods as an array. 

Array item(s) format depends on value of `solidityJson` passed as query parameter (human-readable ABI or ABI in Solidity JSON format).

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET 'https://api.apillon.io/contracts/deployed/:uuid/abi' --header 'Authorization: Basic :credentials'
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "6742591f-2b72-4887-890f-02f4f9f4cf5f",
  "status": 200,
  "data": [
    "constructor(string uri, address adminAddress)",
    "function balanceOf(address account, uint256 id) view returns (uint256)",
    "function burn(address account, uint256 id, uint256 value)",
    ...
  ]
}
```

  </CodeGroupItem>
  </CodeGroup>

</div>
</div>

### Archive Deployed Contract

> Archive a deployed contract

<CodeDiv>DELETE /contracts/deployed/:uuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Name | Description                                | Required |
| ---- | ------------------------------------------ | -------- |
| uuid | Unique identifier of the deployed contract. | true     |

#### Possible Errors

| Code     | Description                                |
| -------- |--------------------------------------------|
| 40300000  | Not allowed to access deployed contract.  |

#### Response
Response includes details about archived contract.

##### Response Fields

| Name                  | Type               | Description                                   |
| --------------------- |--------------------| --------------------------------------------- |
| createTime            | `DateTime`         | Creation time of the contract.                |
| updateTime            | `DateTime`         | Last update time of the contract.             |
| contractUuid          | `string`           | Unique identifier for the contract.           |
| projectUuid           | `string`           | Unique identifier of the project.             |
| name                  | `string`           | Name of the contract.                         |
| description           | `string`           | Description of the contract.                  |
| chainType             | `number`           | Type of blockchain network.                   |
| chain                 | `number`           | Chain ID where the contract is deployed.      |
| versionId             | `number`           | Version ID of the contract.                   |
| constructorArguments  | `unknown[]`        | Arguments used in the contract constructor.   |
| contractStatus        | `number`           | Status of the contract.                       |
| contractAddress       | `string`           | Address of the deployed contract.             |
| deployerAddress       | `string`           | Address of the deployer of the contract.      |
| transactionHash       | `string`           | Transaction hash of the deployment.           |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET 'https://api.apillon.io/contracts/deployed/:uuid/abi' --header 'Authorization: Basic :credentials'
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "bafa91eb-20ee-48a1-bfeb-b039113efeeb",
  "status": 200,
  "data": {
    "status": 8,
    "createTime": "2024-11-13T14:11:43.000Z",
    "updateTime": "2024-12-02T16:04:31.000Z",
    "contractUuid": "e8be60e2-a5d7-4366-92aa-0d3f55c022c4",
    "projectUuid": "c094c483-857f-4b12-bdd4-e3a316719882",
    "name": "Test Contract 2",
    "description": "description",
    "chainType": 2,
    "chain": 1287,
    "versionId": 8,
    "constructorArguments": ["test","0x4C2A866EB59511a6aD78db5cd4970464666b745a"],
    "contractStatus": 5,
    "contractAddress": "0x32BaCe3FA12F22E90111adbf2A396a7946B1D046",
    "deployerAddress": "0x7ddefb047752a969a0fc2a76665f99e1656bc195",
    "transactionHash": "0x7fb06e6f8aa4987942d8687f60ca48281097971fd23f674834ce0f348ff1cdde",
    "contractVersion": null
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

</div>
</div>

### List Contract Transactions

> Get a list of transactions for deployed contract

<CodeDiv>GET /contracts/deployed/:uuid/transactions</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Name | Description                                | Required |
| ---- | ------------------------------------------ | -------- |
| uuid | Unique identifier of the deployed contract. | true     |

#### Query Parameters
All query parameters from [listing request](1-apillon-api.md#listing-requests), plus:

| Name              | Description | Required                   |
|-------------------|-------------|----------------------------|
| transactionType   | `number`    | Type of the transaction.   |
| transactionStatus | `number`    | Status of the transaction. |

#### Possible Errors

| Code     | Description                               |
| -------- |-------------------------------------------|
| 40300000  | Not allowed to access deployed contract. |

#### Response
Endpoint returns transactions for deployed contract based on filters.

##### Response Fields

| Name                    | Type       | Description                         |
|-------------------------|------------|-------------------------------------|
| `contractUuid`          | `string`   | UUID of the contract.               | 
| `projectUuid`           | `string`   | UUID of the associated project.     | 
| `name`                  | `string`   | Name of the contract.               | 
| `description`           | `string`   | Description of the contract.        | 
| `chainType`             | `number`   | Type of blockchain chain.           | 
| `chain`                 | `number`   | ID of the blockchain.               | 
| `versionId`             | `number`   | Version ID of the contract.         | 
| `constructorArguments`  | `any[]`    | Arguments for the constructor.      | 
| `contractStatus`        | `number`   | Status of the contract deployment.  | 
| `contractAddress`       | `string`   | Deployed contract address.          | 
| `deployerAddress`       | `string`   | Address of the deployer.            | 
| `transactionHash`       | `string`   | Transaction hash of deployment.     | 
| `contractVersion`       | `string`   | Version of the contract (nullable). |
| `createTime`            | `Datetime` | Creation time of the contract.      | 
| `updateTime`            | `Datetime` | Last update time of the contract.   | 


  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET 'https://api.apillon.io/contracts/deployed/:uuid/transactions' --header 'Authorization: Basic :credentials'
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "bafa91eb-20ee-48a1-bfeb-b039113efeeb",
  "status": 200,
  "data": {
    "status": 8,
    "createTime": "2024-11-13T14:11:43.000Z",
    "updateTime": "2024-12-02T16:04:31.000Z",
    "contractUuid": "e8be60e2-a5d7-4366-92aa-0d3f55c022c4",
    "projectUuid": "c094c483-857f-4b12-bdd4-e3a316719882",
    "name": "Test Contract 2",
    "description": "description",
    "chainType": 2,
    "chain": 1287,
    "versionId": 8,
    "constructorArguments": ["test","0x4C2A866EB59511a6aD78db5cd4970464666b745a"],
    "contractStatus": 5,
    "contractAddress": "0x32BaCe3FA12F22E90111adbf2A396a7946B1D046",
    "deployerAddress": "0x7ddefb047752a969a0fc2a76665f99e1656bc195",
    "transactionHash": "0x7fb06e6f8aa4987942d8687f60ca48281097971fd23f674834ce0f348ff1cdde",
    "contractVersion": null
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

</div>
</div>
