# Infrastructure API

The Infrastructure API provides an interface for managing essential infrastructure services required to build modern Web3 applications.

<div class="divider"></div>

## RPC Service

### Create a RPC API Key

> Create a new RPC API key for a project.

<CodeDiv> POST /rpc/api-key </CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body Fields

| Field        | Type     | Description                             | Required |
|--------------|----------|-----------------------------------------|----------|
| name         | `string` | Name of the API key                     | Yes      |
| description  | `string` | Description of the API key              | No       |

#### Possible Errors

| Code     | Description                              |
|----------|------------------------------------------|
| 40300000 | Forbidden                                |
| 40020001 | Max RPC API keys limit reached           |
| 40405001 | Project owner not found                  |
| 50000001 | Internal server error                    |
| 422001101| RPC API key name is missing              |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/rpc/api-key" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"name\": \"RPC API Key\",
    \"description\": \"Description of the API key\"
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response" active>

```json
{
  "status": 201,
  "data": {
    "id": 4,
    "projectUuid": "d0c34b5e-1fd6-473e-81f8-e89ee479f7aa",
    "name": "RPC API Key",
    "description": "Description of the API key",
    "uuid": "60020364-7edc-495a-a0a2-df695bb1cc3f"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

### List RPC API Keys

> Retrieve a list of RPC API keys associated with a project.

<CodeDiv> GET /rpc/api-key </CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Query Parameters

All query parameters from [listing request](1-apillon-api.md#listing-requests)

#### Response Fields

| Field          | Type       | Description                                              |
|----------------|------------|----------------------------------------------------------|
| id             | `number`   | Unique identifier of the RPC API key                      |
| projectUuid    | `string`   | UUID of the project the RPC API key belongs to          |
| name           | `string`   | Name of the RPC API key                                  |
| uuid           | `string`   | Unique identifier of the RPC API key returned by Dwellir |
| description    | `string`   | Description of the RPC API key                           |
| createTime     | `DateTime` | Creation timestamp                                       |
| updateTime     | `DateTime` | Last updated timestamp                                   |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/rpc/api-key" \
--header "Authorization: Basic :credentials"
```

</CodeGroupItem>
</CodeGroup>
<CodeGroup>
<CodeGroupItem title="Response" active>

```json
{
  "status": 200,
  "data": {
    "items": [
      {
        "id": 4,
        "createTime": "2024-09-09T11:15:26.000Z",
        "updateTime": "2024-09-10T13:18:31.000Z",
        "projectUuid": "cfd85992-8f79-4486-97cf-2406bd722d90",
        "name": "RPC API Key",
        "description": "Description of the API key",
        "uuid": "60020364-7edc-495a-a0a2-df695bb1cc3f"
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

### Get a RPC API Key

> Retrieve the details of a specific RPC API key by its ID along with the list of RPC endpoints marked as favorite for this API key.

<CodeDiv> GET /rpc/api-key/:id </CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Field | Type     | Description                              | Required |
|-------|----------|------------------------------------------|----------|
| id    | `number` | Unique identifier of the RPC API key     | Yes      |

#### Response Fields

| Field          | Type       | Description                                                 |
|----------------|------------|-------------------------------------------------------------|
| id             | `number`   | Unique identifier of the RPC API key                        |
| name           | `string`   | Name of the RPC API key                                     |
| description    | `string`   | Description of the RPC API key                              |
| projectUuid   | `string`   | Unique identifier of the project                             |
| uuid           | `string`   | Unique identifier of the RPC API key                        |
| createTime     | `DateTime` | Creation timestamp                                          |
| updateTime     | `DateTime` | Last updated timestamp                                      |
| urls           | `array`    | Array of favorite URLs for the RPC API key                  |

###### URL Fields
| Field          | Type       | Description                                                  |
|----------------|------------|--------------------------------------------------------------|
| id             | `number`   | Unique identifier of the RPC Endpoint                        |
| apiKeyId       | `number`   | Unique identifier of the RPC API key                         |
| chainName      | `string`   | Name of the chain the RPC Endpoint belongs to                |
| network        | `string`   | Network of the RPC Endpoint (Usually mainnet, testnet, etc.) |
| httpsUrl       | `string`   | HTTPS URL of the RPC Endpoint                                |
| wssUrl         | `string`   | WSS URL of the RPC Endpoint                                  |
| createTime     | `DateTime` | Creation timestamp                                           |
| updateTime     | `DateTime` | Last updated timestamp                                       |

#### Possible Errors

| Code     | Description               |
|----------|---------------------------|
| 40300000 | Forbidden                 |
| 40420001 | RPC API key not found     |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/rpc/api-key/:id" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response" active>

```json
{
    "id": "60020364-7edc-495a-a0a2-df695bb1cc3f",
    "status": 200,
    "data": {
      "createTime": "2024-09-09T11:15:26.000Z",
      "updateTime": "2024-09-10T13:18:31.000Z",
      "name": "RPC API Key",
      "description": null,
      "project_uuid": "d0c34b5e-1fd6-473e-81f8-e89ee479f7aa",
      "uuid": "60020364-7edc-495a-a0a2-df695bb1cc3f",
      "urls": [
        {
          "id": 77,
          "chainName": "Ethereum",
          "network": "mainnet",
          "httpsUrl": "https://mainnet.apillon.io/60020364-7edc-495a-a0a2-df695bb1cc3f",
          "wssUrl": "wss://mainnet.apillon.io/60020364-7edc-495a-a0a2-df695bb1cc3f",
          "createTime": "2024-09-10T12:55:44.000Z",
          "updateTime": "2024-09-12T13:57:26.000Z",
        }
      ]
    }
}
```

  </CodeGroupItem>
  </CodeGroup>
</div>
</div>

### List RPC Endpoints

> Retrieve a list of available RPC endpoints by Dwellir.

<CodeDiv> GET /rpc/endpoints </CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Response Fields

| Field          | Type       | Description                                                  |
|----------------|------------|--------------------------------------------------------------|
| id             | `number`   | Unique identifier of the RPC Endpoint                        |
| image_url      | `string`   | URL of the RPC Endpoint chain image                          |
| name           | `string`   | Name of the RPC Endpoint chain                               |
| networkId      | `number`   | Network ID of the RPC Endpoint                               |
| networkName    | `string`   | Network of the RPC Endpoint (Usually Mainnet, Testnet, etc.) |
| nodes          | `array`    | Array of nodes for the RPC Endpoint                          |
| type           | `string`   | Type of the Entity (will be 'network')                       |
| version        | `string `  | Version of the RPC Endpoint                                  |

##### Node Fields

| Field          | Type       | Description                                                  |
|----------------|------------|--------------------------------------------------------------|
| id             | `number`   | Unique identifier of the RPC Endpoint Node                   |
| https          | `string`   | HTTPS URL of the RPC Endpoint Node                           |
| wss            | `string`   | WSS URL of the RPC Endpoint Node                             |
| type           | `string`   | Type of the Entity (will be 'node')                          |
| node_type      | `string`   | Type of the RPC Endpoint Node                                |
| version        | `string `  | Version of the RPC Endpoint Node                             |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/rpc/endpoints" \
--header "Authorization: Basic :credentials"
```

</CodeGroupItem>
</CodeGroup>
<CodeGroup>
<CodeGroupItem title="Response" active>

```json
{
    "status": 200,
    "data": [{
        "id": 1,
        "image_url": "https://apillon.io/images/chains/ethereum.svg",
        "name": "Ethereum",
        "networkId": 31,
        "networkName": "Mainnet",
        "nodes": [{
            "id": 1,
            "https": "https://mainnet.apillon.io/<key>",
            "wss": "wss://mainnet.apillon.io/<key>",
            "type": "node",
            "node_type": "Archive",
            "version": "1.0"
        }],
        "type": "network",
        "version": "1.0"
    }]
}
```

</CodeGroupItem>
</CodeGroup>
</div>
</div>