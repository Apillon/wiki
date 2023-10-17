# Storage API

In all cURL examples, parameters with a colon as a prefix should be replaced with real values.

**File upload process through Apillon Web3 Storage API**

1. Request signed URL(s) for upload.
2. File is uploaded to Apillon central server.
3. File is transferred to IPFS and available through the Apillon gateway.
4. File is replicated to different IPFS nodes globally via Crust Network.

### List buckets

> API to list all buckets in project. Items are paginated and can be filtered and ordered through query parameters. This is a [listing request](3-apillon-api.md#listing-requests).

#### GET /storage/buckets

<div class="split_content">
	<div class="split_side">

#### Response fields (bucket)

Each item is an instance of bucket model, with below properties:

| Field       | Type       | Description                                                                                 |
| ----------- | ---------- | ------------------------------------------------------------------------------------------- |
| createTime  | `DateTime` | Item create time                                                                            |
| updateTime  | `DateTime` | Item last update time                                                                       |
| bucketUuid  | `string`   | Bucket unique identifier                                                                    |
| bucketType  | `integer`  | Item type with possible values `1`(storage bucket), `2`(website bucket) and `3`(nft bucket) |
| name        | `string`   | Bucket name                                                                                 |
| description | `string`   | Bucket description                                                                          |
| size        | `integer`  | Size of bucket in bytes                                                                     |

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

#### Possible errors

| Code     | Description                             |
| -------- | --------------------------------------- |
| 42200003 | Request body is missing a `name` field. |

#### Response

Response is an instance of [bucket](#response-fields-bucket), described above.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/storage/buckets" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{ \"name\": \"My bucket\" }"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "e50c8276-fd8d-47c4-b42a-bf19645a204b",
  "status": 201,
  "data": {
    "createTime": "2023-10-12T11:49:49.551Z",
    "updateTime": "2023-10-12T11:49:49.551Z",
    "bucketUuid": "8218080f-1321-4687-9a89-200b06afb930",
    "bucketType": 1,
    "name": "My bucket",
    "description": null,
    "size": 0
  }
}
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

| Name        | Type     | Description                                                                            | Required |
| ----------- | -------- | -------------------------------------------------------------------------------------- | -------- |
| files       | `array`  | Array of files metadata. Maximum 200 items.                                            | true     |
| sessionUuid | `string` | Session unique key, which has to be specified to add more uploads to existing session. | false    |

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
| 42200150 | `files` has invalid length. It should be between 1 and 200                     |
| 42200008 | Request body file object is missing a `fileName` field.                        |
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

### List bucket content

> List bucket directories and files in folder structure. Endpoint lists files and directories in single directory, if `directoryUuid` is not present, endpoint lists items in bucket root directory. More about listing requests can be found [here](3-apillon-api.md#listing-requests)

**Note: This endpoint returns files from ended sessions. I.e. files with [fileStatus](#file-statuses) 2, 3 or 4.**

<div class="request-url">GET /storage/buckets/:bucketUuid/content</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                    | Required |
| ---------- | -------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of bucket. Key is displayed on developer dashboard. | true     |

#### Query parameters

All query parameters from [listing request](3-apillon-api.md#listing-requests) plus:

| Name          | Description                             | Required |
| ------------- | --------------------------------------- | -------- |
| directoryUuid | Gets items inside a specific directory. | false    |
| search        | Search items by name                    | false    |

#### Possible errors

| Code     | Description            |
| -------- | ---------------------- |
| 40406002 | Bucket does not exist. |

#### Response fields

Properties of each item:

| Field         | Type       | Description                                                       |
| ------------- | ---------- | ----------------------------------------------------------------- |
| uuid          | `string`   | Item UUID property                                                |
| type          | `integer`  | Item type with possible values `1`(directory) and `2`(file)       |
| name          | `string`   | Item (directory or file) name                                     |
| CID           | `string`   | File content identifier - label used to point to content in IPFS. |
| createTime    | `DateTime` | Item create time                                                  |
| updateTime    | `DateTime` | Item last update time                                             |
| contentType   | `string`   | Item content type (MIME type).                                    |
| size          | `integer`  | Item size in bytes                                                |
| directoryUuid | `string`   | Uuid of directory in which directory of file is located           |
| link          | `string`   | Link on IPFS gateway.                                             |
| fileStatus    | `number`   | Current [status](#file-statuses) of file                          |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets/:bucketUuid/content" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL with params" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets/:bucketUuid/content?orderBy=name&desc=false&limit=5&page=1" \
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
                "uuid": "d61753fd-26ba-45cb-9277-89e96d6cfd11",
                "type": 1,
                "name": "Folder 1",
                "CID": null,
                "createTime": "2023-10-12T12:20:54.000Z",
                "updateTime": "2023-10-12T12:20:54.000Z",
                "contentType": null,
                "size": null,
                "directoryUuid": null,
                "link": null,
                "fileStatus": null
            },
            {
                "uuid": "63ace39b-ec7c-4889-8d94-83a2ad7fb154",
                "type": 2,
                "name": "My file.txt",
                "CID": "QmaufbAR2dX62TSiYYJUS5sV9KNFZLnxgP4ZMkKFoJhSAM",
                "createTime": "2023-10-12T12:17:19.000Z",
                "updateTime": "2023-10-12T12:17:42.000Z",
                "contentType": "",
                "size": 6,
                "directoryUuid": null,
                "link": "https://ipfs-dev.apillon.io/ipfs/QmaufbAR2dX62TSiYYJUS5sV9KNFZLnxgP4ZMkKFoJhSAM",
                "fileStatus": 3
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

### List files

> List files inside bucket. This endpoint returns all files in flat structure and each file has a `path` property. More about listing requests can be found [here](3-apillon-api.md#listing-requests)

**Note: This endpoint returns files from ended sessions. I.e. files with [fileStatus](#file-statuses) 2, 3 or 4.**

<div class="request-url">GET /storage/buckets/:bucketUuid/files</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                    | Required |
| ---------- | -------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of bucket. Key is displayed on developer dashboard. | true     |

#### Query parameters

All query parameters from [listing request](3-apillon-api.md#listing-requests) plus:

| Name   | Description                             | Required |
| ------ | --------------------------------------- | -------- |
| search | Search files by full path (path + name) | false    |

#### Possible errors

| Code     | Description            |
| -------- | ---------------------- |
| 40406002 | Bucket does not exist. |

#### Response fields

Properties of each item:

| Field       | Type       | Description                                                       |
| ----------- | ---------- | ----------------------------------------------------------------- |
| createTime  | `DateTime` | File create time                                                  |
| updateTime  | `DateTime` | File last update time                                             |
| fileUuid    | `string`   | File UUID property                                                |
| CID         | `string`   | File content identifier - label used to point to content in IPFS. |
| CIDv1       | `string`   | CID version 1                                                     |
| name        | `string`   | File name                                                         |
| contentType | `string`   | File content type. Value is taken from file upload request        |
| path        | `integer`  | Full path to file                                                 |
| size        | `integer`  | File size in bytes                                                |
| fileStatus  | `number`   | File statuses are described in below table                        |
| link        | `string`   | Link on IPFS gateway.                                             |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets/:bucketUuid/files" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL with params" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets/:bucketUuid/files?search=Hello.txt" \
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
                "createTime": "2023-10-12T12:20:54.000Z",
                "updateTime": "2023-10-13T06:08:00.000Z",
                "fileUuid": "120afe0e-b146-45a5-82e0-52d2125df294",
                "CID": "QmXKvPVY6jJ7e4oL3QcYjKFw6Bg7EKzzJAXCgXYjuCSyq5",
                "CIDv1": "bafybeiefrfkhkevhdvacfjds7gw7mh2wlnuo66aeyffrik7wao5tlvfy3q",
                "name": "Hello.txt",
                "contentType": "",
                "path": "Folder 1/",
                "size": 11,
                "fileStatus": 3,
                "link": "https://ipfs-dev.apillon.io/ipfs/QmXKvPVY6jJ7e4oL3QcYjKFw6Bg7EKzzJAXCgXYjuCSyq5"
            },
            {
                "createTime": "2023-10-12T12:17:19.000Z",
                "updateTime": "2023-10-12T12:17:42.000Z",
                "fileUuid": "63ace39b-ec7c-4889-8d94-83a2ad7fb154",
                "CID": "QmaufbAR2dX62TSiYYJUS5sV9KNFZLnxgP4ZMkKFoJhSAM",
                "CIDv1": "bafybeif2yft3qu7wfadsdaorhcfewz74skcsosqb7lrk3ac3doeb7kbbgi",
                "name": "My file.txt",
                "contentType": "",
                "path": null,
                "size": 6,
                "fileStatus": 3,
                "link": "https://ipfs-dev.apillon.io/ipfs/QmaufbAR2dX62TSiYYJUS5sV9KNFZLnxgP4ZMkKFoJhSAM"
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

<div class="request-url">GET /storage/:bucketUuid/files/:id</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                      | required |
| ---------- | ---------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of a bucket. Key is displayed on developer dashboard. | true     |
| id         | File UUID or CID.                                                | true     |

#### Possible errors

| Code     | Description          |
| -------- | -------------------- |
| 40406005 | File does not exist. |

#### Response fields

| Field         | Type       | Description                                                       |
| ------------- | ---------- | ----------------------------------------------------------------- |
| createTime    | `DateTime` | File create time                                                  |
| updateTime    | `DateTime` | File last update time                                             |
| fileUuid      | `string`   | File UUID property                                                |
| CID           | `string`   | File content identifier - label used to point to content in IPFS. |
| CIDv1         | `string`   | CID version 1                                                     |
| name          | `string`   | File name                                                         |
| contentType   | `string`   | File content type. Value is taken from file upload request        |
| path          | `integer`  | Full path to file                                                 |
| size          | `integer`  | File size in bytes                                                |
| fileStatus    | `number`   | File statuses are described in below table                        |
| directoryUuid | `string`   | Uuid of directory in which file is located                        |
| link          | `string`   | Link on IPFS gateway.                                             |

##### File statuses

| Number | Description                                                       |
| ------ | ----------------------------------------------------------------- |
| 1      | Request for upload to Apillon storage was generated.              |
| 2      | File is uploaded to Apillon central server.                       |
| 3      | File is transferred to IPFS node.                                 |
| 4      | File is replicated to different IPFS nodes through Crust Network. |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets/:bucketUuid/files/:id" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "1beec975-9836-48b2-a284-591ae01f7a58",
  "status": 200,
  "data": {
    "createTime": "2023-10-12T12:20:54.000Z",
    "updateTime": "2023-10-12T12:21:17.000Z",
    "fileUuid": "120afe0e-b146-45a5-82e0-52d2125df294",
    "CID": "QmXKvPVY6jJ7e4oL3QcYjKFw6Bg7EKzzJAXCgXYjuCSyq5",
    "CIDv1": "bafybeiefrfkhkevhdvacfjds7gw7mh2wlnuo66aeyffrik7wao5tlvfy3q",
    "name": "Hello.txt",
    "contentType": "",
    "path": "Folder 1/",
    "size": 11,
    "fileStatus": 3,
    "link": "https://ipfs-dev.apillon.io/ipfs/QmXKvPVY6jJ7e4oL3QcYjKFw6Bg7EKzzJAXCgXYjuCSyq5",
    "directoryUuid": "d61753fd-26ba-45cb-9277-89e96d6cfd11"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Delete file

> Marks a file inside bucket for deletion. File will be completely deleted from the Apillon system and Apillon IPFS node after 3 months.
> If file is marked for deletion, it will not be renewed on Crust Network.

<div class="request-url">DELETE /storage/buckets/:bucketUuid/files/:fileUuid</div>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                    | required |
| ---------- | -------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of bucket. Key is displayed on developer dashboard. | true     |
| fileUuid   | File unique identifier.                                        | true     |

#### Possible errors

| Code     | Description                          |
| -------- | ------------------------------------ |
| 40406005 | File does not exist.                 |
| 40006009 | File is already marked for deletion. |

#### Response fields

The response of delete function is a boolean value, depends if deletion was successful.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request DELETE "https://api.apillon.io/storage/buckets/:bucketUuid/files/:fileUuid" \
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
  "data": true
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
