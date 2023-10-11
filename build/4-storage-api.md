# Storage API

In all cURL examples, parameters with a colon as a prefix should be replaced with real values.

**File upload process through Apillon Web3 Storage API**

1. Request signed URL(s) for upload.
2. File is uploaded to Apillon central server.
3. File is transferred to IPFS and available through the Apillon gateway.
4. File is replicated to different IPFS nodes globally via Crust Network.

### List buckets

> API to list all buckets in project. Items are paginated and can be filtered and ordered through query parameters.

#### GET /storage/buckets

<div class="split_content">
	<div class="split_side">

#### Query parameters

| Name    | Description                                                                                       | Required |
| ------- | ------------------------------------------------------------------------------------------------- | -------- |
| search  | Search by bucket name.                                                                            | false    |
| page    | Buckets are paginated by default. This parameter is used to get collections from a specific page. | false    |
| limit   | Number of items on a page (default: 20).                                                          | false    |
| orderBy | One or multiple properties, separated by a comma, used to order data.                             | false    |
| desc    | `Boolean` values, mapped to the index of the `orderBy` parameter. Defaults to false.              | false    |

#### Response fields

The `Data` property of API response contains two properties: `items` (records that match the current query) and `total` (number of all records. This information should be used for pagination: Round up (`total` / `limit`) = number of pages.

Each item is an instance of bucket DTO, with below properties:

| Field       | Type       | Description                                                                                 |
| ----------- | ---------- | ------------------------------------------------------------------------------------------- |
| createTime  | `DateTime` | Item create time                                                                            |
| updateTime  | `DateTime` | Item last update time                                                                       |
| bucketUuid  | `string`   | Bucket unique identifier                                                                    |
| bucketType  | `integer`  | Item type with possible values `1`(storage bucket), `2`(website bucket) and `3`(nft bucket) |
| name        | `string`   | Bucket name                                                                                 |
| description | `string`   | Bucket description                                                                          |
| size        | `integer`  | Size of bucket                                                                              |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL with params" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets?search=My bucket" \
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
                "createTime": "2022-12-06T12:03:32.000Z",
                "updateTime": "2023-10-09T11:42:23.000Z",
                "bucketUuid": "cee9f151-a371-495b-acd2-4362fbb87780",
                "bucketType": 1,
                "name": "Storage bucket",
                "description": "",
                "size": 3215839730
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

### Create new bucket

> API for creating new storage bucket. NFT and website bucket are automatically generated, when new website or NFT collection is initialized.

<div class="request-url">POST /storage/buckets</div>

<div class="split_content">
	<div class="split_side">

#### Body fields

| Name        | Type     | Description         | Required |
| ----------- | -------- | ------------------- | -------- |
| name        | `string` | Bucket name.        | true     |
| description | `string` | Bucket description. | false    |

| Code     | Description                             |
| -------- | --------------------------------------- |
| 42200003 | Request body is missing a `name` field. |

#### Response

Response is an instance of bucket DTO, described above.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/storage/:bucketUuid/upload" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"files\": [
        {
            \"fileName\": \"My test file\",
            \"contentType\": \"text/html\"
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
  "id": "cbdc4930-2bbd-4b20-84fa-15daa4429952",
  "status": 201,
  "data": {
    "sessionUuid": "3b6113bc-f265-4662-8cc5-ea86f06cc74b",
    "files": [
      {
        "path": null,
        "fileName": "My test file",
        "contentType": "text/html",
        "url": "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE_sessions/73/3b6113bc-f265-4662-8cc5-ea86f06cc74b/My%20test%20file?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230215%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230215T114524Z&X-Amz-Expires=900&X-Amz-Signature=499367f6c6bff5be50686724475ac2fa6307b77b94fd1a25584c092fe74b0a58&X-Amz-SignedHeaders=host&x-id=PutObject",
        "fileUuid": "4ef1177b-f7c9-4434-be56-a559cec0cc18"
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
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE_sessions/73/3b6113bc-f265-4662-8cc5-ea86f06cc74b/My%20test%20file?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230215%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230215T114524Z&X-Amz-Expires=900&X-Amz-Signature=499367f6c6bff5be50686724475ac2fa6307b77b94fd1a25584c092fe74b0a58&X-Amz-SignedHeaders=host&x-id=PutObject" \
--data-binary "My test content"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL file from disk" active>

```sh
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE_sessions/73/3b6113bc-f265-4662-8cc5-ea86f06cc74b/My%20test%20file?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230215%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230215T114524Z&X-Amz-Expires=900&X-Amz-Signature=499367f6c6bff5be50686724475ac2fa6307b77b94fd1a25584c092fe74b0a58&X-Amz-SignedHeaders=host&x-id=PutObject" \
--header "Content-Type: text/plain" \
--data-binary ":full path to file"
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

### Upload to bucket

> API that creates file upload requests and returns URLs for file upload along with `sessionUuid`.

<div class="request-url">POST /storage/:bucketUuid/upload</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                            | Required |
| ---------- | ---------------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of storage bucket. Key is displayed on developer dashboard. | true     |

#### Body fields

| Name  | Type    | Description              | Required |
| ----- | ------- | ------------------------ | -------- |
| files | `array` | Array of files metadata. | true     |

Each file metadata object in `files` array, contain below properties.

| Name        | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                               | Required |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| fileName    | `string` | Full name (name and extension) of file to be uploaded                                                                                                                                                                                                                                                                                                                                                     | true     |
| contentType | `string` | File [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)                                                                                                                                                                                                                                                                                                | false    |
| path        | `string` | Virtual file path. Empty for root. Must not contain `fileName`. <br><br> The `path` field can be used to place file in virtual directories inside a bucket. If directories do not yet exist, they will be automatically generated.<br><br>For example, an `images/icons` path creates `images` directory in a bucket and `icons` directory inside it. File will then be created in the `icons` directory. | false    |

#### Possible errors

| Code     | Description                                                                    |
| -------- | ------------------------------------------------------------------------------ |
| 40406002 | Bucket does not exist.                                                         |
| 42200040 | Request body is missing a `files` field.                                       |
| 42200008 | Request body file object is missing a `fileName` field.                        |
| 40006002 | Bucket has reached max size limit.                                             |
| 40406009 | Bucket is marked for deletion. It is no longer possible to upload files to it. |
| 50006003 | Internal error - Apillon was unable to generate upload URL.                    |

#### Response

| Name        | Type     | Description                                                                        |
| ----------- | -------- | ---------------------------------------------------------------------------------- |
| sessionUuid | `string` | Session unique key, which is later used to end upload and transfer files to bucket |
| files       | `array`  | Array of files metadata.                                                           |

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
curl --location --request POST "https://api.apillon.io/storage/:bucketUuid/upload" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"files\": [
        {
            \"fileName\": \"My test file\",
            \"contentType\": \"text/html\"
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
  "id": "cbdc4930-2bbd-4b20-84fa-15daa4429952",
  "status": 201,
  "data": {
    "sessionUuid": "3b6113bc-f265-4662-8cc5-ea86f06cc74b",
    "files": [
      {
        "path": null,
        "fileName": "My test file",
        "contentType": "text/html",
        "url": "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE_sessions/73/3b6113bc-f265-4662-8cc5-ea86f06cc74b/My%20test%20file?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230215%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230215T114524Z&X-Amz-Expires=900&X-Amz-Signature=499367f6c6bff5be50686724475ac2fa6307b77b94fd1a25584c092fe74b0a58&X-Amz-SignedHeaders=host&x-id=PutObject",
        "fileUuid": "4ef1177b-f7c9-4434-be56-a559cec0cc18"
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
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE_sessions/73/3b6113bc-f265-4662-8cc5-ea86f06cc74b/My%20test%20file?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230215%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230215T114524Z&X-Amz-Expires=900&X-Amz-Signature=499367f6c6bff5be50686724475ac2fa6307b77b94fd1a25584c092fe74b0a58&X-Amz-SignedHeaders=host&x-id=PutObject" \
--data-binary "My test content"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL file from disk" active>

```sh
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE_sessions/73/3b6113bc-f265-4662-8cc5-ea86f06cc74b/My%20test%20file?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230215%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230215T114524Z&X-Amz-Expires=900&X-Amz-Signature=499367f6c6bff5be50686724475ac2fa6307b77b94fd1a25584c092fe74b0a58&X-Amz-SignedHeaders=host&x-id=PutObject" \
--header "Content-Type: text/plain" \
--data-binary ":full path to file"
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

### End upload session

> Once files are uploaded to cloud server via received URL, trigger sync of files to IPFS and CRUST.

<div class="request-url">POST /storage/:bucketUuid/upload/:sessionUuid/end</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name        | Description                                                     | Required |
| ----------- | --------------------------------------------------------------- | -------- |
| bucketUuid  | Unique key of bucket. Key is displayed in developer dashboard.  | true     |
| sessionUuid | Session uuid, recieved in [upload to bucket](#upload-to-bucket) | true     |

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
curl --location --request POST "https://api.apillon.io/storage/:bucketUuid/upload/:sessionUuid/end" \
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

### Get bucket content

> Gets directories and files in bucket. Items are paginated and can be filtered and ordered through query parameters.

**Note: This endpoint returns files, that are successfully transferred to IPFS node. I.e. files with [fileStatus](#file-statuses) 3 or 4.**

<div class="request-url">GET /storage/:bucketUuid/content</div>

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
    <br>
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

<div class="request-url">GET /storage/:bucketUuid/file/:id/detail</div>

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
    <br>
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

<div class="request-url">DELETE /storage/:bucketUuid/file/:id</div>

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
    <br>
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

### Get storage info

> Gets overall storage info for project.

<div class="request-url">GET /storage/info</div>

<div class="split_content">
	<div class="split_side">

#### Response fields

| Field            | Type      | Description                      |
| ---------------- | --------- | -------------------------------- |
| availableStorage | `integer` | Available storage space in bytes |
| usedStorage      | `integer` | Used storage in bytes            |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/info" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "48e58f84-403a-43e4-bd81-fedeca195610",
  "status": 200,
  "data": {
    "availableStorage": 3221225472,
    "usedStorage": 1221225466
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>
