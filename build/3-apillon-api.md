# Apillon API

## Endpoints

List of endpoints the API is available at:

| Environment | URL                    |
| ----------- | ---------------------- |
| Production  | https://api.apillon.io |
| Testing     | Coming soon...         |

## API to Web3

Apillon API is a set of RESTful API endpoints allowing developers to integrate Apillon modules into their Web3 applications.

Unless clearly marked as public, all routes are private and require an API key.

### Requests

The server speaks [JSON](https://en.wikipedia.org/wiki/JSON). It is recommended that every call to the server includes a `Content-Type` header set to `application/json;`.

### Authentication and authorization

API routes restrict public access and require authentication.

Requests must include a [basic auth](https://en.wikipedia.org/wiki/Basic_access_authentication) HTTP header field in the form of `Authorization: Basic <credentials>`, where credentials represent the Base64 encoding of API key and API key secret joined by a single colon `:`.

API keys could be generated on the [developer dashboard](https://app.apillon.io/dashboard/api-keys) under Project settings.

#### Authentication errors

Every request goes through authentication middleware, where following errors can occur:
| Status | Message | Description
|-|-|-
|400|Missing Authorization header|Request is missing authorization header.
|400|Malformed Authorization header|Authorization header field has invalid form.
|401|Invalid API key or API key secret|Authorization header is valid but credentials in it are not.

#### Authorization errors

Each endpoint requires a certain role or permission from the API key.

There are three types of permissions that could be assigned to an API key:

| Code | Name        | Description                                    |
| ---- | ----------- | ---------------------------------------------- |
| 50   | KEY_EXECUTE | Permission to execute certain actions          |
| 51   | KEY_WRITE   | Permission to create, modify or delete records |
| 52   | KEY_READ    | Permission to read record                      |

These permissions could be assigned to an API key for every attached service (e. g., Web3 Storage (Crust), Web3 Authentication (KILT), etc.).

If a request is made with an API key that lacks permission for called endpoint, the following errors can occur:

| Status | Message                                                         | Description                                                                                                                                                |
| ------ | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 403    | Insufficient permissions - missing `permission name` permission | API key lacks required permission for called service.                                                                                                      |
| 403    | Insufficient permissions to access this record                  | API key has required permissions for endpoint, but it does not have the right to access addressed record (e. g., a record belongs to a different project). |

### Responses

<div class="split_content">
	<div class="split_side">
  
Every response has a unique ID which helps identify potential issues. It also includes a status code that can help identify the cause of a potential problem.

Query requests through `GET` method can return status codes `200`, `400`, `401`, `403`, or `500`. Mutations through `POST`, `PUT` and `DELETE` can also return codes `201` and `422`. Invalid routes return status code `404`.

A successful request includes a `data` key, which holds a valid response object.

  </div>
  <div class="split_side">

  <CodeGroup>
  <CodeGroupItem title="Response" active>

```json
{
  "id": ...,
  "status": ...,
  "data": { ... },
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

List of responses:

- **200**: Success
- **201**: Creation successful
- **400**: Bad request
- **401**: Unauthenticated access
- **403**: Unauthorized access
- **404**: Path not found
- **422**: Data validation failed
- **500**: System error

### Error handling

Request fails if response code is not 200 or 201. The Apillon API returns two types of errors.

#### Code exception

Errors include a unique code number, a property which caused the error, and an error message. The code number helps identify potential issues and points to their exact position in the system.

Fields in code exception:

<div class="split_content">
	<div class="split_side">

| Field     | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| id        | Unique ID of request                                                         |
| code      | Apillon API internal error code pointing to the exact position in the system |
| message   | Message describing the error                                                 |
| path      | Endpoint that threw the error                                                |
| timestamp | Date when the error occurred                                                 |

  </div>
	<div class="split_side">
  <CodeGroup>
  <CodeGroupItem title="Response" active>

```json
{
  "id": "c46821e7-a6c3-4377-bc32-0001e348ceb4",
  "code": 40406005,
  "message": "FILE_DOES_NOT_EXIST",
  "path": "/storage/cee9f151-a371-495b-acd2-4362fbb87780/file/xxx/detail",
  "timestamp": "2022-12-29T11:54:47.555Z"
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

#### Validation exception

<div class="split_content">
	<div class="split_side">

Unprocessable entity `422 Error status` includes an `errors` key, which holds a list of error objects.

This error typically occurs when the request body is not valid (i. e., it is invalid or missing keys).

Errors include a unique code number, a property which caused the error, and an error message. The code number helps identify potential issues and points to their exact position in the system

  </div>
	<div class="split_side">
  <CodeGroup>
  <CodeGroupItem title="Response" active>

```json
{
  ...
  "errors": [
    {
        "code": 42200008,
        "property": "fileName",
        "message": "FILE_NAME_NOT_PRESENT"
    },
  ]
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

Fields in validation exception:
| Field | Description
|-|-
| id | Unique ID of request
| model | Apillon API model used to validate request payload
| errors | Array of errors
| path | Endpoint that threw the error
| timestamp | Date when the error occurred

## Web3 Storage API

**Note:** To use Apillon Web3 Storage APIs, you should first create a bucket on the [Apillon dashboard](app.apillon.io/service/storage).

In all cURL examples, parameters with a colon as a prefix should be replaced with real values.

**File upload process through Apillon Web3 Storage API**

1. URL request is signed for upload.
2. File is uploaded to Apillon central server.
3. File is transferred to IPFS and available through the Apillon gateway.
4. File is replicated to different IPFS nodes globally via Crust Network.

### Upload to bucket

> API that creates file upload request and returns a URL for file upload.

#### POST /storage/:bucketUuid/upload

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                            | Required |
| ---------- | ---------------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of storage bucket. Key is displayed on developer dashboard. | true     |

#### Body fields

| Name        | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                               | Required |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| fileName    | `string` | Full name (name and extension) of file to be uploaded                                                                                                                                                                                                                                                                                                                                                     | true     |
| contentType | `string` | File [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)                                                                                                                                                                                                                                                                                                | false    |
| path        | `string` | Virtual file path. Empty for root. Must not contain `fileName`. <br><br> The `path` field can be used to place file in virtual directories inside a bucket. If directories do not yet exist, they will be automatically generated.<br><br>For example, an `images/icons` path creates `images` directory in a bucket and `icons` directory inside it. File will then be created in the `icons` directory. | false    |

#### Possible errors

| Code     | Description                                                                    |
| -------- | ------------------------------------------------------------------------------ |
| 40406002 | Bucket does not exist.                                                         |
| 42200008 | Request body is missing a `fileName` field.                                    |
| 40006002 | Bucket has reached max size limit.                                             |
| 40406009 | Bucket is marked for deletion. It is no longer possible to upload files to it. |
| 50006003 | Internal error - Apillon was unable to generate upload URL.                    |

#### Response fields

| Field               | Type      | Description                                                                                                                                                                                                                                                                                                                                 |
| ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url                 | `string`  | URL for file upload. Signed URL is unique for each file and is valid only for a limited time (1 min), so you should start with file upload as soon as possible.<br><br>Request should use `PUT` method and `binary` body.<br><br>Binary data should be sent in body as-is, but with the appropriate Content-Type header (e.g., text/plain). |
| fileUuid            | `string`  | File unique identifier used to query file status, etc.                                                                                                                                                                                                                                                                                      |
| fileUploadRequestId | `integer` | Apillon internal ID of file upload request                                                                                                                                                                                                                                                                                                  |

  </div>
  <div class="split_side">

  <CodeGroup>
  <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/storage/:bucketUuid/upload" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"fileName\": \"My file.txt\",
    \"contentType\": \"text/plain\"
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "aea7f4e9-6dbb-4075-a76c-f6cc6c47c331",
  "status": 201,
  "data": {
    "url": "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE/11/my%20test%20file.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230104%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230104T101419Z&X-Amz-Expires=900&X-Amz-Signature=e1be26c5863d845d5ec5477ac4e7aabafd6901060b3515d23d36c71360255259&X-Amz-SignedHeaders=host",
    "fileUuid": "18bdb4ef-4b9d-4bd4-9e5f-0bc7744b4376",
    "fileUploadRequestId": 70
  }
}
```

**Example for uploading to signed URL:**

  </CodeGroupItem>
  </CodeGroup>

  <CodeGroup>
  <CodeGroupItem title="cURL binary" active>

```sh
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE/11/my%20test%20file.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230104%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230104T101419Z&X-Amz-Expires=900&X-Amz-Signature=e1be26c5863d845d5ec5477ac4e7aabafd6901060b3515d23d36c71360255259&X-Amz-SignedHeaders=host" \
--data-binary "my test content"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL file from disk" active>

```sh
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE/11/my%20test%20file.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230104%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230104T101419Z&X-Amz-Expires=900&X-Amz-Signature=e1be26c5863d845d5ec5477ac4e7aabafd6901060b3515d23d36c71360255259&X-Amz-SignedHeaders=host" \
--header "Content-Type: text/plain" \
--data-binary ":full path to file"
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

### Get bucket content

> Gets directories and files in bucket. Items are paginated and can be filtered and ordered through query parameters.

**Note: This endpoint returns files, that are successfully transferred to IPFS node. I.e. files with [fileStatus](#file-statuses) 3 or 4.**

#### GET /storage/:bucketUuid/content

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                    | Required |
| ---------- | -------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of bucket. Key is displayed on developer dashboard. | true     |

#### Query parameters

| Name        | Description                                                                               | Required |
| ----------- | ----------------------------------------------------------------------------------------- | -------- |
| search      | Filters file by file name.                                                                | false    |
| directoryId | Gets files inside a specific directory.                                                   | false    |
| page        | Files are paginated by default. This parameter is used to get files from a specific page. | false    |
| limit       | Number of files on a page (default: 20).                                                  | false    |
| orderBy     | One or multiple properties, separated by a comma, used to order data.                     | false    |
| desc        | `Boolean` values, mapped to the index of the `orderBy` parameter. Defaults to false.      | false    |

#### Possible errors

| Code     | Description            |
| -------- | ---------------------- |
| 40406002 | Bucket does not exist. |

#### Response fields

The `Data` property of API response contains two properties: `items` (records that match the current query) and `total` (number of all records. This information should be used for pagination: Round up (`total` / `limit`) = number of pages.

Properties of each item:

| Field             | Type       | Description                                                        |
| ----------------- | ---------- | ------------------------------------------------------------------ |
| id                | `integer`  | Item internal ID                                                   |
| type              | `integer`  | Item type with possible values `1`(directory) and `2`(file)        |
| name              | `string`   | Item (directory or file) name                                      |
| createTime        | `DateTime` | Item create time                                                   |
| updateTime        | `DateTime` | Item last update time                                              |
| contentType       | `string`   | Item content type (MIME type)                                      |
| size              | `integer`  | Item size in bytes                                                 |
| parentDirectoryId | `integer`  | ID of directory where a file is located                            |
| fileUuid          | `string`   | File unique identifier                                             |
| CID               | `string`   | File content identifier - label used to point to material in IPFS. |
| link              | `string`   | File link on Apillon IPFS gateway.                                 |

  </div>
  <div class="split_side">

  <CodeGroup>
  <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/:bucketUuid/content" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL with params" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/:bucketUuid/content?orderBy=name&desc=false&limit=5&page=1" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
    "id": "c8c50b3b-91ff-42c7-b0af-f866ce23f18a",
    "status": 200,
    "data": {
        "items": [
            ...
            {
                "type": 1,
                "id": 11,
                "status": 5,
                "name": "My directory",
                "CID": null,
                "createTime": "2022-12-08T13:27:00.000Z",
                "updateTime": "2023-01-10T12:18:55.000Z",
                "contentType": null,
                "size": null,
                "parentDirectoryId": null,
                "fileUuid": null,
                "link": null
            },
            {
                "type": 2,
                "id": 397,
                "status": 5,
                "name": "My file.txt",
                "CID": "QmcG9r6Rdw9ZdJ4imGBWc6mi5VzWHQfkcLDMe2aP74eb42",
                "createTime": "2023-01-19T10:10:01.000Z",
                "updateTime": "2023-01-19T10:10:31.000Z",
                "contentType": "text/plain",
                "size": 68,
                "parentDirectoryId": null,
                "fileUuid": "0a775bfa-a0d0-4e0b-9a1e-e909e426bd11",
                "link": "https://ipfs.apillon.io/ipfs/QmcG9r6Rdw9ZdJ4imGBWc6mi5VzWHQfkcLDMe2aP74eb42"
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

### Get file details

> Gets details of a specific file inside a bucket.

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                      | required |
| ---------- | ---------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of a bucket. Key is displayed on developer dashboard. | true     |
| id         | File internal ID, UUID or CID.                                   | true     |

#### Possible errors

| Code     | Description          |
| -------- | -------------------- |
| 40406005 | File does not exist. |

#### Response fields

Response `data` property contains two properties: `fileStatus` and `file`. File status tells the current status of the file relative to the entire flow the file goes through to be fully loaded and pinned on Crust Network, while `file` property contains file metadata fields.

##### File statuses

| Number | Description                                                       |
| ------ | ----------------------------------------------------------------- |
| 1      | Request for upload to Apillon storage was generated.              |
| 2      | File is uploaded to Apillon central server.                       |
| 3      | File is transferred to IPFS node.                                 |
| 4      | File is replicated to different IPFS nodes through Crust Network. |

##### File metadata

`CID`, `size`, and `downloadLink` are present if file is already loaded to IPFS.

| Field                                                                    | Type      | Description                                          |
| ------------------------------------------------------------------------ | --------- | ---------------------------------------------------- |
| id                                                                       | `integer` | Apillon internal file ID                             |
| status                                                                   | `integer` | Apillon internal file status                         |
| fileUuid                                                                 | `string`  | File unique identifier                               |
| name                                                                     | `string`  | File name                                            |
| contentType                                                              | `string`  | File content type (MIME type)                        |
| [CID](https://docs.ipfs.tech/concepts/content-addressing/#what-is-a-cid) | `string`  | File content identifier pointing to material in IPFS |
| size                                                                     | `integer` | File size in bytes                                   |
| downloadLink                                                             | `string`  | File link on Apillon IPFS gateway                    |

  </div>
  <div class="split_side">

#### GET /storage/:bucketUuid/file/:id/detail

  <CodeGroup>
  <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/:bucketUuid/file/:id/detail" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "5be33c54-2cc9-46f4-8f50-debc98866810",
  "status": 200,
  "data": {
    "fileStatus": 4,
    "file": {
      "id": 397,
      "status": 5,
      "fileUuid": "0a775bfa-a0d0-4e0b-9a1e-e909e426bd11",
      "CID": "QmcG9r6Rdw9ZdJ4imGBWc6mi5VzWHQfkcLDMe2aP74eb42",
      "name": "My file.txt",
      "contentType": "text/plain",
      "size": 68,
      "fileStatus": 4,
      "downloadLink": "https://ipfs.apillon.io/ipfs/QmcG9r6Rdw9ZdJ4imGBWc6mi5VzWHQfkcLDMe2aP74eb42"
    }
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Delete file

> Marks a file inside bucket for deletion by `id`, `fileUuid`, or `CID`. File will be completely deleted from the Apillon system and Apillon IPFS node after 3 months.
> If file is marked for deletion, it will not be renewed on Crust Network.

#### DELETE /storage/:bucketUuid/file/:id

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                    | required |
| ---------- | -------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of bucket. Key is displayed on developer dashboard. | true     |
| id         | File internal ID, UUID, or CID.                                | true     |

#### Possible errors

| Code     | Description                  |
| -------- | ---------------------------- |
| 40406005 | File does not exist.         |
| 40006009 | File is marked for deletion. |

#### Response fields

The response of delete function is a record that has been marked for deletion.

Returned fields are the same as fields that are returned in [GET file details API](#file-metadata).

**Note:** The `status` property of file is 8. This means the file is marked for deletion and will be deleted after a certain period.

  </div>
  <div class="split_side">

  <CodeGroup>
  <CodeGroupItem title="cURL" active>

```sh
curl --location --request DELETE "https://api.apillon.io/storage/:bucketUuid/file/:id" \
--header "Authorization: Basic :credentials" \
--data-raw ""
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "bc92ff8d-05f2-4380-bb13-75a1b6b7f388",
  "status": 200,
  "data": {
    "id": 397,
    "status": 8,
    "fileUuid": "0a775bfa-a0d0-4e0b-9a1e-e909e426bd11",
    "CID": "QmcG9r6Rdw9ZdJ4imGBWc6mi5VzWHQfkcLDMe2aP74eb42",
    "name": "My file.txt",
    "contentType": "text/plain",
    "size": 68,
    "fileStatus": 4
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

## Web3 Hosting API

Hosting API provides endpoints, that can be used to implement [CI/CD](https://en.wikipedia.org/wiki/CI/CD).
To deploy page through Apillon API, follow below steps:

1. Upload files to web page preview bucket - bucket uuid is diplayed in apillon dashboard.

- Request URLs for file upload
- Upload files to cloud server
- Trigger transfer into web page

2. Execute deployment to staging(preview) environment
3. Execute deployment to production

**Note:** To use Apillon Web3 Hosting APIs, you should first create a web page on the [Apillon dashboard](https://app.apillon.io/dashboard/service/hosting).

In all cURL examples, parameters with a colon as a prefix should be replaced with real values.

### Get URLs for files upload

> API that creates file upload requests and returns URLs for files upload.

#### POST /storage/:bucketUuid/upload-many

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                             | Required |
| ---------- | ----------------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of web page bucket. Key is displayed on developer dashboard. | true     |

#### Body fields

| Name        | Type     | Description                                                                                          | Required |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------- | -------- |
| sessionUuid | `string` | UUID which wraps files into session. Session is later used, to complete transfer to web page bucket. | true     |
| files       | `array`  | Array of files metadatas.                                                                            | true     |

Each file metadata object in `files` array, contain below properties.

| Name        | Type     | Description                                                                                                | Required |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- | -------- |
| fileName    | `string` | Full name (name and extension) of file to be uploaded                                                      | true     |
| contentType | `string` | File [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) | false    |
| path        | `string` | File path inside web page. Empty for root. Must not contain `fileName`.                                    | false    |

#### Possible errors

| Code     | Description                                                 |
| -------- | ----------------------------------------------------------- |
| 40406002 | Bucket does not exist.                                      |
| 42200042 | Request body is missing a `sessionUuid` field.              |
| 42200040 | Request body is missing a `files` field.                    |
| 42200008 | Request body file object is missing a `fileName` field.     |
| 40006002 | Bucket has reached max size limit.                          |
| 50006003 | Internal error - Apillon was unable to generate upload URL. |

#### Response

Files in request body are returned in response `data` property. Each file is equipped with `url` and `fileUuid`.

| Field       | Type     | Description                                                                                                                                                                                                                                                                                                                                 |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url         | `string` | URL for file upload. Signed URL is unique for each file and is valid only for a limited time (1 min), so you should start with file upload as soon as possible.<br><br>Request should use `PUT` method and `binary` body.<br><br>Binary data should be sent in body as-is, but with the appropriate Content-Type header (e.g., text/plain). |
| fileUuid    | `string` | File unique identifier used to query file status, etc.                                                                                                                                                                                                                                                                                      |
| fileName    | `string` | Full name (name and extension) of file to be uploaded                                                                                                                                                                                                                                                                                       |
| contentType | `string` | File [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)                                                                                                                                                                                                                                  |
| path        | `string` | File path.                                                                                                                                                                                                                                                                                                                                  |

  </div>
  <div class="split_side">

#### POST /storage/:bucketUuid/upload-many

  <CodeGroup>
  <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "http://localhost:6002/storage/57aef0fc-84cb-4564-9af2-0f7bfc0ef729/upload-many" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"sessionUuid\": \"2e8e4027-0dbc-4506-b82a-0daa78e428a7\",
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
  "id": "57e332b0-4559-40d9-a5e8-bb92220d7f03",
  "status": 201,
  "data": [
    {
      "path": null,
      "fileName": "index.html",
      "contentType": "text/html",
      "url": "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/HOSTING_sessions/61/2e8e4027-0dbc-4506-b82a-0daa78e428a7/index.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GOFAMSLEA%2F20230207%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230207T092842Z&X-Amz-Expires=900&X-Amz-Signature=30f5df5545819310bc698e8ed699ea67294d562193cc8a844e629d44c37d1a19&X-Amz-SignedHeaders=host&x-id=PutObject",
      "fileUuid": "618d4f3d-36f0-4d9d-b809-d71a8e34dcb2"
    },
    {
      "path": "assets/",
      "fileName": "styles.css",
      "contentType": "text/css",
      "url": "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/HOSTING_sessions/61/2e8e4027-0dbc-4506-b82a-0daa78e428a7/assets/styles.css?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GOFAMSLEA%2F20230207%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230207T092842Z&X-Amz-Expires=900&X-Amz-Signature=6c70e458f1b0ed66d15b0acdab61351bb7aa83d5ae68f0baa3a2832b389c14a0&X-Amz-SignedHeaders=host&x-id=PutObject",
      "fileUuid": "67b0680d-0a5d-4524-bc29-8fa4dab905f4"
    }
  ]
}
```

**Example for uploading to signed URL:**

  </CodeGroupItem>
  </CodeGroup>

  <CodeGroup>
  <CodeGroupItem title="cURL binary" active>

```sh
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/HOSTING_sessions/61/2e8e4027-0dbc-4506-b82a-0daa78e428a7/index.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GOFAMSLEA%2F20230207%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230207T092842Z&X-Amz-Expires=900&X-Amz-Signature=30f5df5545819310bc698e8ed699ea67294d562193cc8a844e629d44c37d1a19&X-Amz-SignedHeaders=host&x-id=PutObject" \
--header "Content-Type: text/plain" \
--data-raw "<h1>
Welcome to my awesome web page
</h1>"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL file from disk" active>

```sh
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/HOSTING_sessions/61/2e8e4027-0dbc-4506-b82a-0daa78e428a7/assets/styles.css?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GOFAMSLEA%2F20230207%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230207T092842Z&X-Amz-Expires=900&X-Amz-Signature=6c70e458f1b0ed66d15b0acdab61351bb7aa83d5ae68f0baa3a2832b389c14a0&X-Amz-SignedHeaders=host&x-id=PutObject" \
--header "Content-Type: text/plain" \
--data-binary ":full path to file"
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

### End upload session

> Transfer files to web page bucket, which is used as source for deploy to staging(preview) environment.

#### POST /storage/:bucketUuid/upload/:sessionUuid/end

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name        | Description                                                             | Required |
| ----------- | ----------------------------------------------------------------------- | -------- |
| bucketUuid  | Unique key of web page bucket. Key is displayed in developer dashboard. | true     |
| sessionUuid | Session uuid, used to create URLs for upload.                           | true     |

#### Possible errors

| Code     | Description                                              |
| -------- | -------------------------------------------------------- |
| 40406002 | Bucket does not exist.                                   |
| 40406004 | Session does not exists                                  |
| 40006001 | Files in this session were already transfered to Apillon |

#### Response

Api respond with status `200 OK` , if operation is successfully executed.

  </div>
  <div class="split_side">

#### POST /storage/:bucketUuid/upload/:sessionUuid/end

<CodeGroup>
    <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "http://localhost:6002/storage/57aef0fc-84cb-4564-9af2-0f7bfc0ef729/upload/2e8e4027-0dbc-4506-b82a-0daa78e428a7/end" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
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

### Deploy web page

> Endpoint to trigger web page deployment into specific environment.

#### POST /hosting/web-pages/:webPageUuid/deploy

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name        | Description                                                   | Required |
| ----------- | ------------------------------------------------------------- | -------- |
| webPageUuid | Web page UUID, visible in developer console web page overview | true     |

#### Body fields

| Name        | Type     | Description                                                      | Required |
| ----------- | -------- | ---------------------------------------------------------------- | -------- |
| environment | `number` | `1` = staging(preview) environment, `2` = production environment | true     |

#### Possible errors

| Code     | Description                                     |
| -------- | ----------------------------------------------- |
| 42200039 | Request body is missing an `environment` field. |
| 40406010 | Web page does not exists                        |
| 40006016 | There are no files to deploy.                   |
| 40006017 | There are no changes to deploy.                 |

#### Response

Endpoint triggers deployment of web page to specific environment. As result, deployment record with below field is returned.
This deployment is now waiting to be processed.

**Note:** Deployment is processed in background, which may take several minutes.
When deploying to `staging` environment, files are added to IPFS and wrapped to directory, which is then accessible in IPFS via IPNS or CID.
In `production`, this CID is pinned to CRUST and replicated to other nodes.

| Field            | Type     | Description                                                                                    |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------- |
| id               | `number` | Deployment internal number                                                                     |
| status           | `number` | Deployment record status                                                                       |
| bucketId         | `number` | Internal ID of bucket, which contain files for this environment                                |
| environment      | `number` | Environment to where web page will be deployed                                                 |
| deploymentStatus | `number` | Current status of deployment. Possible values are listed below.                                |
| cid              | `string` | When deployment is successfull, CID points to directory on IPFS, where this page is accessible |
| size             | `number` | Size of web page                                                                               |
| number           | `number` | Deployment serial number - for this environment                                                |

Deployment goes throuh different stages and each stage updates `deploymentStatus`. Possible deployment statuses:

| Status | Description            |
| ------ | ---------------------- |
| 0      | Deployment initiated   |
| 1      | In processing          |
| 10     | Deployment successfull |
| 100    | Deployment failed      |

  </div>
  <div class="split_side">

#### POST /hosting/web-pages/:webPageUuid/deploy

  <CodeGroup>
  <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "http://localhost:6002/hosting/web-pages/:webPageUuid/deploy" \
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
    "id": 51,
    "status": 5,
    "webPageId": 4,
    "bucketId": 62,
    "environment": 1,
    "deploymentStatus": 0,
    "cid": null,
    "size": null,
    "number": 11
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

### Get deployment

> Endpoint to get deployment.

#### GET /hosting/web-pages/:webPageUuid/deployments/:deploymentId

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name         | Description                                                          | Required |
| ------------ | -------------------------------------------------------------------- | -------- |
| webPageUuid  | Web page UUID, visible in developer console web page overview        | true     |
| deploymentId | Deployment internal number, returned from `deploy` web page endpoint | true     |

#### Possible errors

| Code     | Description                |
| -------- | -------------------------- |
| 40406011 | Deployment does not exists |

#### Response fields

| Field            | Type     | Description                                                                                    |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------- |
| id               | `number` | Deployment internal number                                                                     |
| status           | `number` | Deployment DB status                                                                           |
| bucketId         | `number` | Internal ID of bucket, which contain files for this environment                                |
| environment      | `number` | Environment to where web page will be deployed                                                 |
| deploymentStatus | `number` | Current status of deployment                                                                   |
| cid              | `string` | When deployment is successfull, CID points to directory on IPFS, where this page is accessible |
| size             | `number` | Size of web page                                                                               |
| number           | `number` | Deployment serial number - for this environment                                                |

  </div>
  <div class="split_side">

#### GET /hosting/web-pages/:webPageUuid/deployments/:deploymentId

  <CodeGroup>
  <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "http://localhost:6002/hosting/web-pages/:webPageUuid/deployments/:deploymentId" \
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
    "id": 51,
    "status": 5,
    "bucketId": 62,
    "environment": 1,
    "deploymentStatus": 10,
    "cid": "QmY3KF4F6Ap5HbrwWpq8dTVaR65Cd674jYXKBayNynDASJ",
    "size": 289,
    "number": 11
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>

### Get web page

> Endpoint to get web page. Endpoint returns basic web page data, along with IPNS links.

#### GET /hosting/web-pages/:webPageUuid

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name        | Description                                                   | Required |
| ----------- | ------------------------------------------------------------- | -------- |
| webPageUuid | Web page UUID, visible in developer console web page overview | true     |

#### Possible errors

| Code     | Description              |
| -------- | ------------------------ |
| 40406010 | Web page does not exists |

#### Response fields

| Field              | Type     | Description                                                 |
| ------------------ | -------- | ----------------------------------------------------------- |
| id                 | `number` | Web page id                                                 |
| status             | `number` | Web page DB status                                          |
| name               | `string` | Web page name                                               |
| description        | `string` | Web page description                                        |
| domain             | `string` | Domain for production environment                           |
| bucketUuid         | `string` | UUID of bucket, for file upload                             |
| ipnsStagingLink    | `string` | IPNS address of stagign version, on Apillon IPFS gateway    |
| ipnsProductionLink | `string` | IPNS address of production version, on Apillon IPFS gateway |

  </div>
  <div class="split_side">

#### GET /hosting/web-pages/:webPageUuid

  <CodeGroup>
  <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "http://localhost:6002/hosting/web-pages/:webPageUuid" \
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
    "id": 4,
    "status": 5,
    "name": "My test page",
    "description": null,
    "domain": "",
    "bucketUuid": "57aef0fc-84cb-4564-9af2-0f7bfc0ef729",
    "ipnsStagingLink": "https://ipfs.apillon.io/ipns/k2k4r8p6fvcyq5qogaqdtvmqn5vyvyy3khut1llkrz13ls16ocp4gojx",
    "ipnsProductionLink": "https://ipfs.apillon.io/ipns/k2k4r8ng8nqexubrmbwnhsuu1d6n4ebgnxsbdcu9gxk8uv3l67098hge"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
  </div>
</div>
