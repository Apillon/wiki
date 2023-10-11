# Hosting API

Hosting API provides endpoints, that can be used to implement [CI/CD](https://en.wikipedia.org/wiki/CI/CD).
To deploy page through Apillon API, follow below steps:

1. Upload website files to Apillon cloud server.

- Request URLs for files upload
- Upload files to cloud server
- Trigger transfer into website

2. Execute deployment to staging or production environment.

**Note:** You should first create a website on the [Apillon dashboard](https://app.apillon.io/dashboard/service/hosting) or through the Apillon API.

In all cURL examples, parameters with a colon as a prefix should be replaced with real values.

### List websites

> API to list all websites in project. Items are paginated and can be filtered and ordered through query parameters as described [here](3-apillon-api.md#listing-requests) .

#### GET /hosting/websites

<div class="split_content">
	<div class="split_side">

#### Response fields

Each item is an instance of website DTO, with below properties:

| Field       | Type       | Description                                                                                                              |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| websiteUuid | `string`   | Website unique identifier                                                                                                |
| name        | `string`   | Website name                                                                                                             |
| description | `string`   | Website description                                                                                                      |
| domain      | `string`   | Website domain. This property needs to be specified, so that Apillon is able to create SSL Certificates for IPFS gateway |
| createTime  | `DateTime` | Item create time                                                                                                         |
| updateTime  | `DateTime` | Item last update time                                                                                                    |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/hosting/websites" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL with params" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets?search=My website" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
    "id": "75095bf9-e976-45c8-8a9d-e013ca3b203a",
    "status": 200,
    "data": {
        "items": [
            ...
            {
                "websiteUuid": "851595b6-ac6d-11ed-96a4-02420a000705",
                "name": "My website",
                "description": null,
                "domain": "https://www.website.si",
                "createTime": "2023-01-27T12:31:34.000Z",
                "updateTime": "2023-02-14T13:43:10.000Z"
            }
            ...
        ],
        "total": 10
    }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Create new website

> API for creating new website.

<div class="request-url">POST /hosting/websites</div>

<div class="split_content">
	<div class="split_side">

#### Body fields

| Name        | Type     | Description          | Required |
| ----------- | -------- | -------------------- | -------- |
| name        | `string` | Website name.        | true     |
| description | `string` | Website description. | false    |

| Code     | Description                             |
| -------- | --------------------------------------- |
| 42200037 | Request body is missing a `name` field. |

#### Response

Response is an instance of website DTO, described above.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/hosting/websites" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data "{
    \"name\": \"My website\"
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "489f33ac-eef7-4599-b9c7-d6022f3dbf6b",
  "status": 201,
  "data": {
    "createTime": "2023-10-10T20:36:08.782Z",
    "updateTime": "2023-10-10T20:36:08.782Z",
    "websiteUuid": "5b8d1943-afd9-4eb7-ba88-bd73af1445fb",
    "name": "My website",
    "description": null,
    "domain": null,
    "bucketUuid": "9c9aec59-8ea1-4522-bfe0-37a69284c294",
    "ipnsStaging": null,
    "ipnsProduction": null
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

### Get website

> Endpoint to get website. Endpoint returns basic website data, along with IPNS links.

<div class="request-url">GET /hosting/websites/:websiteUuid</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name        | Description                                                 | Required |
| ----------- | ----------------------------------------------------------- | -------- |
| websiteUuid | Website UUID, visible in developer console website overview | true     |

#### Possible errors

| Code     | Description             |
| -------- | ----------------------- |
| 40406010 | Website does not exists |

#### Response fields

| Field          | Type     | Description                                                              |
| -------------- | -------- | ------------------------------------------------------------------------ |
| websiteUuid    | `string` | Website unique identifier                                                |
| name           | `string` | Website name                                                             |
| description    | `string` | Website description                                                      |
| domain         | `string` | Domain for production environment                                        |
| bucketUuid     | `string` | UUID of bucket, for file upload                                          |
| ipnsStaging    | `string` | IPNS name of staging version. Use this to access website on IPFS gateway |
| ipnsProduction | `string` | IPNS name of production version                                          |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/hosting/websites/:websiteUuid" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "0eb223ce-51c0-4a9b-96ce-331a1cd99603",
  "status": 200,
  "data": {
    "websiteUuid": "a1d90d2c-f167-4889-8620-204862833851",
    "name": "My test page",
    "description": null,
    "domain": "",
    "bucketUuid": "57aef0fc-84cb-4564-9af2-0f7bfc0ef729",
    "ipnsStaging": "k2k4r8p6fvcyq5qogaqdtvmqn5vyvyy3khut1llkrz13ls16ocp4gojx",
    "ipnsProduction": "k2k4r8ng8nqexubrmbwnhsuu1d6n4ebgnxsbdcu9gxk8uv3l67098hge"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

### Get URLs for files upload

> API that creates file upload requests and returns URLs for files upload.

<div class="request-url">POST /hosting/websites/:websiteUuid/upload</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name        | Description                                                            | Required |
| ----------- | ---------------------------------------------------------------------- | -------- |
| websiteUuid | Unique key of website bucket. Key is displayed on developer dashboard. | true     |

#### Body fields

| Name  | Type    | Description              | Required |
| ----- | ------- | ------------------------ | -------- |
| files | `array` | Array of files metadata. | true     |

Each file metadata object in `files` array, contain below properties.

| Name        | Type     | Description                                                                                                | Required |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- | -------- |
| fileName    | `string` | Full name (name and extension) of file to be uploaded                                                      | true     |
| contentType | `string` | File [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) | false    |
| path        | `string` | File path inside website. Empty for root. Must not contain `fileName`.                                     | false    |

#### Possible errors

| Code     | Description                                                 |
| -------- | ----------------------------------------------------------- |
| 40406010 | Website does not exists                                     |
| 42200040 | Request body is missing a `files` field.                    |
| 42200008 | Request body file object is missing a `fileName` field.     |
| 40006002 | Website has reached max size limit.                         |
| 50006003 | Internal error - Apillon was unable to generate upload URL. |

#### Response

| Name        | Type     | Description                                                                         |
| ----------- | -------- | ----------------------------------------------------------------------------------- |
| sessionUuid | `string` | Session unique key, which is later used to end upload and transfer files ti website |
| files       | `array`  | Array of files metadata.                                                            |

Files in request body are returned in response `data.files` property. Each file is equipped with `url` and `fileUuid`. All properties are displayed below.

| Field       | Type     | Description                                                                                                                                                                                                                                                                                                                                 |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url         | `string` | URL for file upload. Signed URL is unique for each file and is valid only for a limited time (1 min), so you should start with file upload as soon as possible.<br><br>Request should use `PUT` method and `binary` body.<br><br>Binary data should be sent in body as-is, but with the appropriate Content-Type header (e.g., text/plain). |
| fileUuid    | `string` | File unique identifier used to query file status, etc.                                                                                                                                                                                                                                                                                      |
| fileName    | `string` | Full name (name and extension) of file to be uploaded                                                                                                                                                                                                                                                                                       |
| contentType | `string` | File [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)                                                                                                                                                                                                                                  |
| path        | `string` | File path.                                                                                                                                                                                                                                                                                                                                  |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/hosting/websites/:websiteUuid/upload" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"files\": [
        {
            \"fileName\": \"index.html\",
            \"contentType\": \"text/html\"
        },
        {
            \"fileName\": \"styles.css\",
            \"contentType\": \"text/css\",
            \"path\": \"assets/\"
        }

    ]

}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "7dd011ec-20e2-4c28-b585-da6c6f7fce8d",
  "status": 201,
  "data": {
    "sessionUuid": "29ef6ca2-b171-440c-b934-db8aa88c3424",
    "files": [
      {
        "path": null,
        "fileName": "index.html",
        "contentType": "text/html",
        "url": "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/HOSTING_sessions/70/29ef6ca2-b171-440c-b934-db8aa88c3424/index.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230215%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230215T105030Z&X-Amz-Expires=900&X-Amz-Signature=187035d2307bc089101eff3abbdd7baa3e8691b4d5d3bafa5aebb87e589e8c0c&X-Amz-SignedHeaders=host&x-id=PutObject",
        "fileUuid": "e17436a1-5292-4380-ad91-eaac02a862b1"
      },
      {
        "path": "assets/",
        "fileName": "styles.css",
        "contentType": "text/css",
        "url": "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/HOSTING_sessions/70/29ef6ca2-b171-440c-b934-db8aa88c3424/assets/styles.css?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230215%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230215T105030Z&X-Amz-Expires=900&X-Amz-Signature=f91b03a951fe3f99291802306be3e79812ca64e39effbb7dea1c19bb7cd1e42b&X-Amz-SignedHeaders=host&x-id=PutObject",
        "fileUuid": "358c2942-4ced-421e-9a6f-edbf94c55dff"
      }
    ]
  }
}
```

**Example for uploading to signed URL:**

  </CodeGroupItem>
  </CodeGroup>

  <CodeGroup>
  <CodeGroupItem title="cURL binary" active>

```sh
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/HOSTING_sessions/70/29ef6ca2-b171-440c-b934-db8aa88c3424/index.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230215%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230215T105030Z&X-Amz-Expires=900&X-Amz-Signature=187035d2307bc089101eff3abbdd7baa3e8691b4d5d3bafa5aebb87e589e8c0c&X-Amz-SignedHeaders=host&x-id=PutObject" \
--header "Content-Type: text/plain" \
--data-raw "<h1>
Welcome to my awesome website
</h1>"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL file from disk" active>

```sh
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/HOSTING_sessions/70/29ef6ca2-b171-440c-b934-db8aa88c3424/index.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230215%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230215T105030Z&X-Amz-Expires=900&X-Amz-Signature=187035d2307bc089101eff3abbdd7baa3e8691b4d5d3bafa5aebb87e589e8c0c&X-Amz-SignedHeaders=host&x-id=PutObject" \
--header "Content-Type: text/plain" \
--data-binary ":full path to file"
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

### End upload session

> Transfer files to website bucket, which is used as source for deploy to staging(preview) environment.

<div class="request-url">POST /hosting/websites/:websiteUuid/upload/:sessionUuid/end</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name        | Description                                                                           | Required |
| ----------- | ------------------------------------------------------------------------------------- | -------- |
| websiteUuid | Unique key of website. Key is displayed in developer dashboard.                       | true     |
| sessionUuid | Session uuid, recieved in [get URL for upload request](#post-storagebucketuuidupload) | true     |

#### Possible errors

| Code     | Description                                    |
| -------- | ---------------------------------------------- |
| 40406004 | Session does not exists                        |
| 40006001 | Files in this session were already transferred |

#### Response

Api respond with status `200 OK` , if operation is successfully executed.

  </div>
  <div class="split_side">
    <br>
    <CodeGroup>
        <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/hosting/websites/:websiteUuid/upload/:sessionUuid/end" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"directSync\": true
}"
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "b64b1c07-1a8a-4b05-9e3b-3c6a519d6ff7",
  "status": 200,
  "data": true
}
```

</CodeGroupItem>
</CodeGroup>
  </div>
</div>

### Deploy website

> Endpoint to trigger website deployment into specific environment.

<div class="request-url">POST /hosting/websites/:websiteUuid/deploy</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name        | Description                                                 | Required |
| ----------- | ----------------------------------------------------------- | -------- |
| websiteUuid | Website UUID, visible in developer console website overview | true     |

#### Body fields

| Name        | Type     | Description                                       | Required |
| ----------- | -------- | ------------------------------------------------- | -------- |
| environment | `number` | Possible `environment` values are explained below | true     |

##### Environments

| Status | Description                                                                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | Uploaded files are deployed to staging environment. Website will be available through staging IPNS link                                                          |
| 2      | Files from current staging environment are deployed to production environment. Website is pinned to CRUST, replicated and available through production IPNS link |
| 3      | Same as `2`, only that the source are uploaded files, not files in staging environment.                                                                          |

#### Possible errors

| Code     | Description                                     |
| -------- | ----------------------------------------------- |
| 42200039 | Request body is missing an `environment` field. |
| 40406010 | Website does not exists                         |
| 40006016 | There are no files to deploy.                   |
| 40006017 | There are no changes to deploy.                 |

#### Response

Endpoint triggers deployment of website to specific environment. As result, deployment record with below field is returned.
This deployment is now waiting to be processed.

**Note:** Deployment is processed in background, which may take several minutes.
When deploying to `staging` environment, files are added to IPFS and wrapped to directory, which is then accessible in IPFS via IPNS or CID.
In `production`, this CID is pinned to CRUST and replicated to other nodes.

##### Deployment fields

| Field            | Type     | Description                                                                                   |
| ---------------- | -------- | --------------------------------------------------------------------------------------------- |
| id               | `number` | Deployment internal number                                                                    |
| environment      | `number` | Environment to where website will be deployed                                                 |
| deploymentStatus | `number` | Current status of deployment. Possible values are listed below.                               |
| cid              | `string` | When deployment is successful, CID points to directory on IPFS, where this page is accessible |
| size             | `number` | Size of website                                                                               |
| number           | `number` | Deployment serial number - for this environment                                               |

##### Website deployment statuses

Deployment goes through different stages and each stage updates `deploymentStatus`. Possible deployment statuses:

| Status | Description           |
| ------ | --------------------- |
| 0      | Deployment initiated  |
| 1      | In processing         |
| 10     | Deployment successful |
| 100    | Deployment failed     |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/hosting/websites/:websiteUuid/deploy" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"environment\": 1
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "32eff81a-6b0b-4a92-a5cb-e5cebf6d6c28",
  "status": 200,
  "data": {
    "id": 91,
    "createTime": "2023-10-11T19:06:55.347Z",
    "updateTime": "2023-10-11T19:06:55.347Z",
    "environment": 1,
    "deploymentStatus": 0,
    "cid": null,
    "size": null,
    "number": 5
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

### List website deployments

> API to list website deployments. More about listing requests can be found [here](3-apillon-api.md#listing-requests)

#### GET /hosting/websites/:websiteUuid/deployments

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name             | Description                                               | Required |
| ---------------- | --------------------------------------------------------- | -------- |
| deploymentStatus | Current deployment [status](#website-deployment-statuses) | false    |
| environment      | Deployment [environment](#environments)                   | false    |

#### Response fields

Each item in list is a [deployment DTO](#deployment-fields) instance.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/hosting/websites/:websiteUuid/deployments" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL with params" active>

```sh
curl --location --request GET "https://api.apillon.io/hosting/websites/:websiteUuid/deployments?orderBy=number" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
    "id": "75095bf9-e976-45c8-8a9d-e013ca3b203a",
    "status": 200,
    "data": {
        "items": [
            ...
            {
                "id": 90,
                "createTime": "2023-10-11T19:04:40.000Z",
                "updateTime": "2023-10-11T19:05:06.000Z",
                "environment": 1,
                "deploymentStatus": 100,
                "cid": null,
                "size": 11,
                "number": 4
            },
            {
                "id": 91,
                "createTime": "2023-10-11T19:06:55.000Z",
                "updateTime": "2023-10-11T19:07:20.000Z",
                "environment": 1,
                "deploymentStatus": 10,
                "cid": "QmeY1amT7yUcSzjehwH7LcEwKNdTZnZnSYLXPnABTzUq8d",
                "size": 11,
                "number": 5
            }
            ...
        ],
        "total": 10
    }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Get deployment

> Endpoint to get deployment.

<div class="request-url">GET /hosting/websites/:websiteUuid/deployments/:deploymentId</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name         | Description                                                         | Required |
| ------------ | ------------------------------------------------------------------- | -------- |
| websiteUuid  | Website UUID, visible in developer console website overview         | true     |
| deploymentId | Deployment internal number, returned from `deploy` website endpoint | true     |

#### Possible errors

| Code     | Description                |
| -------- | -------------------------- |
| 40406011 | Deployment does not exists |

#### Response fields

`Data` property is a [deployment DTO](#deployment-fields) instance.

Deployment goes through different stages and each stage updates `deploymentStatus`. Possible deployment statuses:

| Status | Description           |
| ------ | --------------------- |
| 0      | Deployment initiated  |
| 1      | Deploying             |
| 10     | Deployment successful |
| 100    | Deployment failed     |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/hosting/websites/:websiteUuid/deployments/:deploymentId" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "2d7d1b0c-15b1-4816-9aec-857182c7b617",
  "status": 200,
  "data": {
    "id": 91,
    "createTime": "2023-10-11T19:06:55.000Z",
    "updateTime": "2023-10-11T19:07:20.000Z",
    "environment": 1,
    "deploymentStatus": 10,
    "cid": "QmeY1amT7yUcSzjehwH7LcEwKNdTZnZnSYLXPnABTzUq8d",
    "size": 11,
    "number": 5
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>
