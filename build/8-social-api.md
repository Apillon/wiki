# Social API

Social API provides endpoints to list, get and create subsocial entities used in [Grill widget](https://github.com/dappforce/grillchat/tree/main/integration).
Space and post are main entities used by it, which is a bit confusing for developer who is trying to include Grill widget into the website.
Apillon changes naming of these entities into hub and channel, and takes care of whole blockchain and ipfs part and the result is a simple configuration that can be used to configure Grill widget on website.

**Note:** You can create hubs and channels in [Apillon dashboard](https://app.apillon.io/dashboard/service/social).

Use Social API to create hubs and channels from your application. For example: you can create channel (chatroom) for each nft in your marketplace.

In all cURL examples, parameters with a colon as a prefix should be replaced with real values.

## Hubs

### List hubs

> API to list all hubs in project. Items are paginated and can be filtered and ordered through query parameters as described [here](1-apillon-api.md#listing-requests) .

<CodeDiv>GET /social/hubs</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Response fields (hub)

Each item is an instance of hub class, with below properties:

| Field         | Type       | Description                                                                                                     |
| ------------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| hubUuid       | `string`   | Hub unique identifier                                                                                           |
| hubId         | `number`   | Hub id on Subsocial chain. This id is used in widget or in grillapp.net. Example: `https://grillapp.net/12927`. |
| status        | `number`   | Hub status (`1: draft - deploying to chain, 5: active, 100: error`)                                             |
| name          | `string`   | Hub name                                                                                                        |
| about         | `string`   | Hub about - short description                                                                                   |
| tags          | `string`   | Comma separated tags                                                                                            |
| numOfChannels | `number`   | Number of channels in hub                                                                                       |
| createTime    | `DateTime` | Item create time                                                                                                |
| updateTime    | `DateTime` | Item last update time                                                                                           |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/social/hubs" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL with params" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets?search=My hub" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
    "id": "88b3140f-035e-446d-bda7-1f95e7343619",
    "status": 200,
    "data": {
        "items": [
            {
                "hubUuid": "7b59dc14-5ea1-48df-b4c9-a8395690d225",
                "hubId": "55545",
                "status": 5,
                "createTime": "2024-03-05T12:18:20.000Z",
                "updateTime": "2024-03-05T13:21:25.000Z",
                "name": "Apillon API hub",
                "about": "Apillon API hub",
                "tags": null,
                "numOfChannels": 4
            }
            ...
        ],
        "total": 3,
        "page": 1,
        "limit": 20
    }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Get hub

> Endpoint to get hub. Endpoint returns basic hub data.

<CodeDiv>GET /social/hubs/:hubUuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name    | Description                            | Required |
| ------- | -------------------------------------- | -------- |
| hubUuid | Hub UUID, visible in developer console | true     |

#### Possible errors

| Code     | Description         |
| -------- | ------------------- |
| 40419001 | Hub does not exists |

#### Response fields

Response is an instance of [hub class](#response-fields-hub), described above. Only difference is field `numOfChannels`, which is not returned by this endpoint.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/social/hubs/:hubUuid" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "e4ec496a-121a-4033-9451-5b53ae3d0307",
  "status": 200,
  "data": {
    "status": 5,
    "createTime": "2024-03-05T12:18:20.000Z",
    "updateTime": "2024-03-05T13:21:25.000Z",
    "name": "Apillon API hub",
    "about": "Apillon API hub",
    "tags": null,
    "hubUuid": "7b59dc14-5ea1-48df-b4c9-a8395690d225",
    "hubId": "55545"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

### Create hub

> API that creates hub and transmits it to blockchain. Transaction can take a while and until confirmed, hub has `status` 1.

<CodeDiv>POST /social/hubs</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body fields

| Name  | Type     | Description          | Required |
| ----- | -------- | -------------------- | -------- |
| name  | `string` | Hub name.            | true     |
| about | `string` | Hub description      | false    |
| tags  | `string` | Comma separated tags | false    |

#### Possible errors

| Code     | Description                                        |
| -------- | -------------------------------------------------- |
| 42219001 | Body is missing required properties                |
| 50019002 | Internal error - Apillon was unable to create hub. |

#### Response

Response is an instance of [hub class](#response-fields-hub), described above.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/social/hubs" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"name\": \"Apillon API hub\",
    \"about\": \"Apillon API hub\",
    \"tags\": \"Apillon,API,WEB3\"
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "6570cd41-4401-4ba4-92e8-060617f18f65",
  "status": 201,
  "data": {
    "status": 1,
    "createTime": "2024-03-06T20:28:12.309Z",
    "updateTime": null,
    "name": "Apillon API hub",
    "about": "Apillon API hub",
    "tags": "Apillon,API,WEB3",
    "hubUuid": "65527f5b-054d-453a-a9a9-b29cd00b39bb",
    "hubId": null
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

## Channels

### List channels in hub

> API to list all channels in hub. Items are paginated and can be filtered and ordered through query parameters as described [here](1-apillon-api.md#listing-requests) .

<CodeDiv>GET /social/hubs/:hubUuid/channels</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Response fields (channel)

Each item is an instance of channel class, with below properties:

| Field       | Type       | Description                                                             |
| ----------- | ---------- | ----------------------------------------------------------------------- |
| channelUuid | `string`   | Channel unique identifier                                               |
| channelId   | `number`   | Channel id on Subsocial chain. This id is used in widget.               |
| status      | `number`   | Channel status (`1: draft - deploying to chain, 5: active, 100: error`) |
| title       | `string`   | Channel name                                                            |
| body        | `string`   | Channel body - short description                                        |
| tags        | `string`   | Comma separated tags                                                    |
| createTime  | `DateTime` | Item create time                                                        |
| updateTime  | `DateTime` | Item last update time                                                   |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/social/hubs/:hubUuid/channels" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL with params" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets?search=My channel" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
    "id": "d9ee5982-4292-40ee-b94f-b5c234fecb98",
    "status": 200,
    "data": {
        "items": [
            {
                "channelUuid": "6f08bafe-bfd2-4151-bae1-99e515bd6c55",
                "channelId": null,
                "status": 1,
                "title": "My ApillonAPI channel",
                "body": "ApillonAPI channel",
                "tags": null,
                "createTime": "2024-03-05T13:23:20.000Z",
                "updateTime": "2024-03-05T13:23:20.000Z",
            },
            ...
        ],
        "total": 4,
        "page": 1,
        "limit": 20
    }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Get channel

> Endpoint to get channel. Endpoint returns basic channel data.

<CodeDiv>GET /social/hubs/:hubUuid/channels/:channelUuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name        | Description               | Required |
| ----------- | ------------------------- | -------- |
| hubUuid     | Hub unique identifier     | true     |
| channelUuid | Channel unique identifier | true     |

#### Possible errors

| Code     | Description             |
| -------- | ----------------------- |
| 40419001 | Channel does not exists |

#### Response fields

Response is an instance of [channel class](#response-fields-channel), described above.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/social/hubs/:hubUuid/channels/:channelUuid" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "4a14a0de-6dd5-4863-b031-664aa9b4b13e",
  "status": 200,
  "data": {
    "status": 1,
    "createTime": "2024-03-05T13:23:20.000Z",
    "updateTime": "2024-03-05T13:23:20.000Z",
    "title": "My ApillonAPI channel",
    "body": "ApillonAPI channel",
    "tags": null,
    "channelUuid": "6f08bafe-bfd2-4151-bae1-99e515bd6c55",
    "channelId": null
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

### Create channel

> API that creates channel and transmits it to blockchain. Transaction can take a while and until confirmed, channel has `status` 1.

<CodeDiv>POST /social/hubs/:hubUuid/channels</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body fields

| Name  | Type     | Description                 | Required |
| ----- | -------- | --------------------------- | -------- |
| title | `string` | Channel name.               | true     |
| body  | `string` | Channel content/description | false    |
| tags  | `string` | Comma separated tags        | false    |

#### Possible errors

| Code     | Description                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| 42219002 | Body is missing required properties                                                                        |
| 50019004 | Parent hub is in invalid state. It is probably not yet transmitted and confirmed on the chain (status = 1) |
| 50019003 | Internal error - Apillon was unable to create channel.                                                     |

#### Response

Response is an instance of [channel class](#response-fields-channel), described above.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/social/hubs/:hubUuid/channels" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"title\": \"Apillon API channel\",
    \"body\": \"Lets talk about apillon API\",
    \"tags\": \"Apillon,API,WEB3\"
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "68c32a2c-f2b0-4580-916b-2c1b12926228",
  "status": 201,
  "data": {
    "status": 1,
    "createTime": "2024-03-06T20:28:12.309Z",
    "updateTime": null,
    "title": "Apillon API channel",
    "body": "Lets talk about apillon API",
    "tags": "Apillon,API,WEB3",
    "channelUuid": "c1d709b8-16fb-493e-a317-16d8b8ce623d",
    "channelId": null
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>
