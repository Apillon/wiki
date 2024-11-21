# Cloud Functions API

The Cloud Function API provides an interface for developers to deploy, manage, and execute decentralized cloud functions on the Apillon platform. These endpoints allow you to create cloud functions, manage jobs, and configure runtime environments.

## Create Cloud Function

> Create a new cloud function to be executed on decentralized processors.

<CodeDiv>POST /cloud-functions</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body Fields

| Field        | Type     | Description                             | Required |
|--------------|----------|-----------------------------------------|----------|
| name         | `string` | Name of the cloud function              | Yes      |
| description  | `string` | Description of the cloud function       | No       |

#### Possible Errors

| Code     | Description                              |
|----------|------------------------------------------|
| 42200212 | Missing required fields                  |
| 42200205 | Name not valid                           |
| 42200206 | Description not valid                    |
| 50000001 | Internal server error                    |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/cloud-functions" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"name\": \"My Cloud Function\",
    \"description\": \"Handles automated tasks\"
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
    "createTime": "2024-09-12T13:32:26.706Z",
    "updateTime": null,
    "functionUuid": "90c37572-571e-4d8c-a906-7275e8e3cd8e",
    "projectUuid": "d0c34b5e-1fd6-473e-81f8-e89ee479f7aa",
    "bucketUuid": "1a100c47-56cc-4550-a969-6631bfb1c37b",
    "name": "My Cloud Function",
    "description": "Handles automated tasks",
    "activeJobId": null
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

## List Cloud Functions

> Retrieve a list of cloud functions associated with a project.

<CodeDiv>GET /cloud-functions</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Query Parameters

All query parameters from [listing request](1-apillon-api.md#listing-requests)

#### Response Fields

| Field          | Type       | Description                                              |
|----------------|------------|----------------------------------------------------------|
| functionUuuid  | `string`   | Unique identifier of the cloud function                  |
| projectUuid    | `string`   | UUID of the project the cloud function belongs to        |
| bucketUuid     | `string`   | UUID of the bucket which script files are uploaded into  |
| name           | `string`   | Name of the cloud function                               |
| description    | `string`   | Description of the cloud function                        |
| activeJobId    | `number`   | The ID of the currently active job on the cloud function |
| project_uuid   | `string`   | Unique identifier of the project                         |
| createTime     | `DateTime` | Creation timestamp                                       |
| updateTime     | `DateTime` | Last updated timestamp                                   |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/cloud-functions?project_uuid=abc123-project" \
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
        "createTime": "2024-09-09T11:15:26.000Z",
        "updateTime": "2024-09-10T13:18:31.000Z",
        "functionUuid": "cfd85992-8f79-4486-97cf-2406bd722d90",
        "projectUuid": "d0c34b5e-1fd6-473e-81f8-e89ee479f7aa",
        "bucketUuid": "e85fa5ce-8c37-42fc-bf54-a578b0fd2d1f",
        "name": "My Cloud Function",
        "description": "Handles automated tasks",
        "activeJobId": 77
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

## Get Cloud Function

> Get the details of a specific cloud function by its UUID.

<CodeDiv>GET /cloud-functions/:function_uuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Field          | Type     | Description                              | Required |
|----------------|----------|------------------------------------------|----------|
| function_uuid  | `string` | Unique identifier of the cloud function  | Yes      |

#### Response Fields

| Field          | Type       | Description                                                  |
|----------------|------------|--------------------------------------------------------------|
| functionUuuid  | `string`   | Unique identifier of the cloud function                      |
| projectUuid    | `string`   | UUID of the project the cloud function belongs to            |
| bucketUuid     | `string`   | UUID of the bucket which script files are uploaded into      |
| name           | `string`   | Name of the cloud function                                   |
| description    | `string`   | Description of the cloud function                            |
| activeJobId    | `number`   | The ID of the currently active job on the cloud function     |
| project_uuid   | `string`   | Unique identifier of the project                             |
| gatewayUrl     | `string`   | API gateway endpoint URL of the cloud function               |
| createTime     | `DateTime` | Creation timestamp                                           |
| updateTime     | `DateTime` | Last updated timestamp                                       |
| job.scriptCId  | `string`   | IPFS CID of the script file the job is running               |
| job.slots      | `string`   | Number of processors running the job                         |
| job.jobStatus  | `string`   | The current status of the job. Possible values: `1` (deploying), `2` (deployed), `3` (matched), `4` (inactive), `9` (deleted)|

#### Possible Errors

| Code     | Description               |
|----------|---------------------------|
| 40300000 | Forbidden                 |
| 40418005 | Cloud function not found  |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/cloud-functions/d1e8b9f2-4d18-4ef7-9f59-87348590d5a6" \
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
      "functionUuid": "cfd85992-8f79-4486-97cf-2406bd722d90",
      "projectUuid": "d0c34b5e-1fd6-473e-81f8-e89ee479f7aa",
      "bucketUuid": "e85fa5ce-8c37-42fc-bf54-a578b0fd2d1f",
      "name": "Env CF",
      "description": null,
      "activeJobId": 77,
      "gatewayUrl": "https://cfd85992-8f79-4486-97cf-2406bd722d90.gw.web3approved.com",
      "jobs": [
        {
          "id": 77,
          "createTime": "2024-09-10T12:55:44.000Z",
          "updateTime": "2024-09-12T13:57:26.000Z",
          "jobUuid": "2ead7ed9-125f-436d-9a09-5e8e95206791",
          "projectUuid": "d0c34b5e-1fd6-473e-81f8-e89ee479f7aa",
          "functionUuid": "cfd85992-8f79-4486-97cf-2406bd722d90",
          "scriptCid": "QmUq4iFLKZUpEsHCAqfsBermXHRnPuE5CNcyPv1xaNkyGp",
          "slots": 1,
          "jobStatus": 3
        }
      ]
    }
}
```

  </CodeGroupItem>
  </CodeGroup>
</div>
</div>

## Create Cloud Function Job (Deployment)

> Create a job/deployment for a specific cloud function.


<CodeDiv>POST /cloud-functions/:function_uuid/jobs</CodeDiv>

::: warning
The deployed code should be made on top of this Node.js template: [https://github.com/Apillon/cloud-function-template](https://github.com/Apillon/cloud-function-template)
If it does not contain the boilerplate code, the deployment will not be accessible via the provided API gateway URL.
:::

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Field         | Type     | Description                              | Required |
|---------------|----------|------------------------------------------|----------|
| function_uuid | `string` | Unique identifier of the cloud function  | Yes      |

#### Body Fields

| Field      | Type     | Description                                    | Required |
|------------|----------|------------------------------------------------|----------|
| name       | `string` | Name of the job                                | Yes      |
| scriptCid  | `string` | IPFS CID of the script to deploy               | Yes      |
| slots      | `number` | Number of processors to deploy to (default 1)  | No       |

#### Possible Errors

| Code     | Description                              |
|----------|------------------------------------------|
| 40300000 | Forbidden                                |
| 42200212 | Missing required field                   |
| 42200213 | Invalid field data                       |
| 40418005 | Cloud function not found                 |
| 50018013 | Error creating job                       |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/cloud-functions/d1e8b9f2-4d18-4ef7-9f59-87348590d5a6/jobs" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"name\": \"Price fetcher\",
    \"scriptCid\": \"QmYwAPJzv5CZsnAzt8JCRdjD7...",
    \"slots\": 3
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response" active>

```json
{
    "id": "c7059955-688a-406d-8a61-9be3e931250c",
    "status": 201,
    "data": {
      "id": 79,
      "createTime": "2024-09-13T08:58:24.740Z",
      "updateTime": null,
      "jobUuid": "21a54e84-4daf-4c0e-98ed-fdcc859d1a1a",
      "projectUuid": "d0c34b5e-1fd6-473e-81f8-e89ee479f7aa",
      "functionUuid": "cfd85992-8f79-4486-97cf-2406bd722d90",
      "scriptCid": "QmYwAPJzv5CZsnAzt8JCRdjD7...",
      "slots": 3,
      "jobStatus": 1
    }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>


## Set Cloud Function Environment Variables

> Set the environment variables for a specific cloud function.

<CodeDiv>POST /cloud-functions/:function_uuid/environment</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Field         | Type     | Description                              | Required |
|---------------|----------|------------------------------------------|----------|
| function_uuid | `string` | Unique identifier of the cloud function  | Yes      |

#### Body Fields

| Field       | Type     | Description                                       | Required |
|-------------|----------|---------------------------------------------------|----------|
| variables   | `array`  | Array of key-value pairs for environment variables| Yes      |

#### Possible Errors

| Code     | Description                        |
|----------|----------------------------------  |
| 42218016 | Missing or invalid variables field |
| 40418005 | Cloud function not found           |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/cloud-functions/d1e8b9f2-4d18-4ef7-9f59-87348590d5a6/environment" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"variables\": [{ \"key\": \"API_KEY\", \"value\": \"12345\" }]
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
    <CodeGroupItem title="Response" active>

```json
{
  "status": 200,
  "data": {
    "function_uuid": "d1e8b9f2-4d18-4ef7-9f59-87348590d5a6",
    "variables": [
      { "key": "API_KEY", "value": "12345" }
    ]
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

## Delete Job

> Delete a specific job using its unique identifier.

<CodeDiv>DELETE /cloud-functions/jobs/:job_uuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL Parameters

| Field      | Type     | Description                 | Required |
|------------|----------|-----------------------------|----------|
| job_uuid   | `string` | Unique identifier of the job | Yes      |

#### Possible Errors

| Code     | Description                    |
|----------|--------------------------------|
| 40418004 | Job not found                  |
| 50018014 | Job not yet deployed           |
| 50018016 | Error deleting job             |

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request DELETE "https://api.apillon.io/cloud-functions/jobs/e3c86bb2-4190-4bda-9c8a-3852b6d04971" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
    <CodeGroupItem title="Response" active>

```json
{
  "status": 200,
  "message": "Job successfully deleted"
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>