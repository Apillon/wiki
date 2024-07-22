# Storage API

In all cURL examples, parameters with a colon as a prefix should be replaced with real values.

**File upload process through Apillon Web3 Storage API**

1. Request signed URL(s) for upload.
2. File is uploaded to Apillon central server.
3. File is transferred to IPFS and available through the Apillon gateway.
4. File is replicated to different IPFS nodes globally via Crust Network.

### List buckets

> API to list all buckets in project. Items are paginated and can be filtered and ordered through query parameters. This is a [listing request](1-apillon-api.md#listing-requests).

<CodeDiv>GET /storage/buckets</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Query parameters

All query parameters from [listing request](1-apillon-api.md#listing-requests) plus:

| Name       | Description                                                                   | Required |
| ---------- | ----------------------------------------------------------------------------- | -------- |
| bucketType | Type of bucket: `1`(storage bucket), `2`(website bucket) and `3`(nft bucket). | false    |

#### Response fields (bucket)

Each item is an instance of the bucket model with the below properties:

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

> API for creating a new storage bucket. NFT and website buckets are automatically generated when a new website or NFT collection is initialized.

<CodeDiv>POST /storage/buckets</CodeDiv>

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

A response is an instance of [bucket](#response-fields-bucket), described above.

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

<CodeDiv>POST /storage/buckets/:bucketUuid/upload</CodeDiv>

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
| sessionUuid | `string` | Session unique key, which must be specified to add more uploads to existing session.   | false    |

Each metadata object in the `files` array contains the properties below.

| Name        | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                               | Required |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| fileName    | `string` | Full name (name and extension) of file to be uploaded                                                                                                                                                                                                                                                                                                                                                     | true     |
| contentType | `string` | File [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)                                                                                                                                                                                                                                                                                                | false    |
| path        | `string` | Virtual file path. Empty for root. It must not contain `fileName`. <br><br> The `path` field can be used to place file in virtual directories inside a bucket. If directories do not yet exist, they will be automatically generated.<br><br>For example, an `images/icons` path creates an `images` directory in a bucket and an `icons` directory inside it. A file will then be created in the `icons` directory. | false    |

#### Possible errors

| Code     | Description                                                                           |
| -------- | ------------------------------------------------------------------------------------- |
| 40406002 | Bucket does not exist.                                                                |
| 40406009 | Bucket is marked for deletion. It is no longer possible to upload files to it.        |
| 40006020 | HTML files cannot be uploaded to storage bucket in freemium subscription plan.        |
| 42200040 | Request body is missing a `files` field.                                              |
| 42200150 | `files` has invalid length. It should be between 1 and 200                            |
| 42200008 | Request body file object is missing a `fileName` field.                               |
| 50006003 | Internal error - Apillon was unable to generate upload URL.                           |

#### Response

| Name        | Type     | Description                                                                        |
| ----------- | -------- | ---------------------------------------------------------------------------------- |
| sessionUuid | `string` | Session unique key, which is later used to end upload and transfer files to bucket |
| files       | `array`  | Array of files metadata.                                                           |

Files in the request body are returned in response `data.files` property. Each file is equipped with `url` and `fileUuid`. All properties are displayed below.

| Field       | Type     | Description                                                                                                                                                                                                                                                                                                                                 |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url         | `string` | URL for file upload. Signed URL is unique for each file and is valid only for a limited time (1 min), so you should start with file upload as soon as possible.<br><br>Request should use `PUT` method and `binary` body.<br><br>Binary data should be sent in body as-is, but with the appropriate Content-Type header (e.g., text/plain). |
| fileUuid    | `string` | File unique identifier used to query file status, etc.                                                                                                                                                                                                                                                                                      |
| fileName    | `string` | Full name (name and extension) of file to be uploaded                                                                                                                                                                                                                                                                                       |
| contentType | `string` | File [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)                                                                                                                                                                                                                                  |
| path        | `string` | File path on the storage bucket.                                                                                                                                                                                                                                                                                                            |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/storage/buckets/:bucketUuid/upload" \
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

> Once files are uploaded to the cloud server via the received URL, trigger file sync to IPFS and CRUST.

**Note: Files in session can be wrapped to CID on IPFS via the `wrapWithDirectory` body field. This means that the directory gets its own CID and its content cannot be modified afterwards. The directory path is mandatory when the `wrapWithDirectory` option is set to `true`. Read more about this option in the [IPFS docs](https://dweb-primer.ipfs.io/files-on-ipfs/wrap-directories-around-content#explanation)**

<CodeDiv>POST /storage/buckets/:bucketUuid/upload/:sessionUuid/end</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name        | Description                                                     | Required |
| ----------- | --------------------------------------------------------------- | -------- |
| bucketUuid  | Unique key of bucket. Key is displayed in developer dashboard.  | true     |
| sessionUuid | Session uuid, recieved in [upload to bucket](#upload-to-bucket) | true     |

#### Body fields

| Name              | Type      | Description                             | Required |
| ----------------- | --------- | --------------------------------------- | -------- |
| wrapWithDirectory | `boolean` | Wrap uploaded files to IPFS directory   | false    |
| directoryPath     | `string`  | Path to wrapped directory inside bucket | false    |

#### Possible errors

| Code     | Description                                    |
| -------- | ---------------------------------------------- |
| 40406004 | Session does not exist                         |
| 40006001 | Files in this session were already transferred |

#### Response

API responds with the status `200 OK` if operation is successfully executed.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
          <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/storage/buckets/:bucketUuid/upload/:sessionUuid/end" \
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

> Lists bucket directories and files in a folder structure. Endpoint lists files and directories in a single directory; if `directoryUuid` is not present, endpoint lists items in the bucket root directory. More about listing requests can be found [here](1-apillon-api.md#listing-requests)

**Note: This endpoint returns files from ended sessions. I.e. files with [fileStatus](#file-statuses) 2, 3 or 4.**

<CodeDiv>GET /storage/buckets/:bucketUuid/content</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                    | Required |
| ---------- | -------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of bucket. Key is displayed on developer dashboard. | true     |

#### Query parameters

All query parameters from [listing request](1-apillon-api.md#listing-requests) plus:

| Name              | Description                             | Required |
| ----------------- | --------------------------------------- | -------- |
| directoryUuid     | Gets items inside a specific directory. | false    |
| markedForDeletion | Include deleted buckets                 | false    |

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
| directoryUuid | `string`   | Uuid of directory where the file directory is located             |
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

> Lists files inside a bucket. This endpoint returns all files in a flat structure and each file has a `path` property. More about listing requests can be found [here](1-apillon-api.md#listing-requests)

**Note: This endpoint returns files from ended sessions. I.e. files with [fileStatus](#file-statuses) 2, 3 or 4.**

<CodeDiv>GET /storage/buckets/:bucketUuid/files</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                    | Required |
| ---------- | -------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of bucket. Key is displayed on developer dashboard. | true     |

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

<CodeDiv>GET /storage/buckets/:bucketUuid/files/:fileUuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                      | required |
| ---------- | ---------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of a bucket. Key is displayed on developer dashboard. | true     |
| fileUuid   | File UUID or CID.                                                | true     |

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
| name          | `string`   | File name                                                         |
| contentType   | `string`   | File content type. Value is taken from file upload request        |
| path          | `integer`  | Full path to file                                                 |
| size          | `integer`  | File size in bytes                                                |
| fileStatus    | `number`   | File statuses are described in below table                        |
| directoryUuid | `string`   | Uuid of directory where the file is located                       |
| link          | `string`   | Link on IPFS gateway.                                             |

##### File statuses

| Number | Description                                                       |
| ------ | ----------------------------------------------------------------- |
| 1      | Request for upload to Apillon storage was generated.              |
| 2      | File is uploaded to Apillon central server.                       |
| 3      | File is transferred to the IPFS node.                             |
| 4      | File is replicated to different IPFS nodes through Crust Network. |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets/:bucketUuid/files/:fileUuid" \
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
    "CID": "bafybeiefrfkhkevhdvacfjds7gw7mh2wlnuo66aeyffrik7wao5tlvfy3q",
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

> Marks a file inside a bucket for deletion. The file will be completely deleted from the Apillon system and Apillon IPFS node after three (3) months.
> If a file is marked for deletion, it will not be renewed on Crust Network.

<CodeDiv>DELETE /storage/buckets/:bucketUuid/files/:fileUuid</CodeDiv>

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

The response of the delete function is a boolean value, depends on whether the deletion was successful.

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

### Delete directory

> Deletes a directory from the storage bucket.

<CodeDiv>DELETE storage/buckets/:bucketUuid/directories/:directoryUuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name          | Description                                                    | required |
| ------------- | -------------------------------------------------------------- | -------- |
| bucketUuid    | Unique key of bucket. Key is displayed on developer dashboard. | true     |
| directoryUuid | Directory unique identifier.                                   | true     |

#### Possible errors

| Code     | Description                               |
| -------- | ----------------------------------------- |
| 40406003 | Directory does not exist.                 |
| 40006007 | Directory is already marked for deletion. |

#### Response fields

The response of the delete function is a boolean value, depends on whether the deletion was successful.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request DELETE "https://api.apillon.io/storage/buckets/:bucketUuid/directories/:directoryUuid" \
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

> Gets overall storage info for a project.

**Note: Available resources can be increased with a subscription to paid plans.**

<CodeDiv>GET /storage/info</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Response fields

| Field              | Type      | Description                                                                                                                                                          |
| ------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| availableStorage   | `integer` | Available storage space in bytes                                                                                                                                     |
| usedStorage        | `integer` | Used storage in bytes. When `usedStorage` reaches available storage, upload to buckets will be blocked (error [40006003](1-apillon-api.md#not-enough-storage-space)) |
| availableBandwidth | `integer` | Monthly available bandwidth (upload and download)                                                                                                                    |
| usedBandwidth      | `integer` | Bandwidth used in current month. If `usedBandwidth` reaches available, requests to the IPFS gateway will be blocked                                                         |

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
    "usedStorage": 1221225466,
    "availableBandwidth": 3221225472,
    "usedBandwidth": 56500
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Get IPFS cluster info

> Gets basic data of an IPFS cluster used by the project. IPFS clusters contain multiple IPFS nodes but expose a single gateway for accessing content via CID or IPNS.
> Apillon clusters (gateways) are not publicly accessible

**Note: Each project has its own secret for the generation of the tokens to access content on the IPFS gateway.**

<CodeDiv>GET /storage/ipfs-cluster-info</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Response fields

| Field       | Type     | Description                                                                                      |
| ----------- | -------- | ------------------------------------------------------------------------------------------------ |
| secret      | `string` | Secret for this project, which can be used to generate tokens to access content of IPFS gateway  |
| projectUuid | `string` | Project unique identifier                                                                        |
| ipfsGateway | `string` | Gateway that can used to access content via CIDs.                                                |
| ipnsGateway | `string` | Gateway that can be used to access content via IPNS name.                                        |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/ipfs-cluster-info" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "0d7979c0-a00b-4502-9cb9-22228b24f71d",
  "status": 200,
  "data": {
    "secret": "*********",
    "project_uuid": "73f46f28-0d7c-43c4-9420-d4225b942ed1",
    "ipfsGateway": "https://<CIDv1>.staging.web3approved.com",
    "ipnsGateway": "https://<IPNS>.staging.web3approved.com"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Get or generate link for IPFS

> Apillon IPFS gateways are private and can only be accessible with a token. A token for specific address (CID) can be acquired via Apillon API request or can be generated with by using the `secret` and `project_uuid` properties from above [request](#get-ipfs-cluster-info)

<CodeDiv>GET /storage/link-on-ipfs/:cid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name | Description                                                                            | required |
| ---- | -------------------------------------------------------------------------------------- | -------- |
| cid  | Ipfs content identifier. API will automatically detect the type (CIDv0, CIDv1 or IPNS) | true     |

#### Response fields

| Field | Type     | Description                                    |
| ----- | -------- | ---------------------------------------------- |
| link  | `string` | Link where requested content can be accessed.  |

#### How to generate token programmatically

Apillon IPFS gateways accept [JWT token](https://jwt.io/), which can be created using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package.

The JWT sign method expects three (3) parameters:

1. JWT payload:

```json
{
  "cid": "CID or IPNS address",
  "project_uuid": "Change with projectUuid value"
}
```

2. Secret: Use `secret` property from IPFS cluster info
3. Subject: `IPFS-token`

For each CID, a new token should be generated.
Append the generated JWT to URL request as `token` query parameter.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/link-on-ipfs/:cid" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "3a3ea750-3f3a-41e3-b5cb-a5543c2b2283",
  "status": 200,
  "data": {
    "link": "https://bafybeigjhyc2tpvqfqsuvf3byo4e4a4v6spi6jk4qqvvtlpca6rsaf2cqi.ipfs.web3approved.com/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJiYWZ5YmVpZ2poeWMydHB2cWZxc3V2ZjNieW80ZTRhNHY2c3BpNmprNHFxdnZ0bHBjYTZyc2FmMmNxaSIsInByb2plY3RfdXVpZCI6IjE0NmM5ZWU5LTEwMDgtNDdiNS05ZTJjLTQxZmIyN2ExZjY1NSIsImlhdCI6MTcwMjU1NTA2Mywic3ViIjoiSVBGUy10b2tlbiJ9.07tHk5jAuAbcRaDxiiA9zHNWD71pxAcQX9v7LbhZ0-E"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

## IPNS

### List IPNS names

> API to list all IPNS names in a bucket. Items are paginated and can be filtered and ordered through query parameters. This is a [listing request](1-apillon-api.md#listing-requests).

<CodeDiv>GET /storage/buckets/:bucketUuid/ipns</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                    | Required |
| ---------- | -------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of storage bucket, from which IPNS will be listed   | true     |

#### Query parameters

All query parameters from [listing request](1-apillon-api.md#listing-requests) plus:

| Name      | Description                                     | Required |
| --------- | ----------------------------------------------- | -------- |
| ipnsName  | List IPNS names with specific name              | false    |
| ipnsValue | List IPNS names that point to this value (CID)  | false    |

#### Response fields (ipns)

Each item is an instance of the IPNF model, with the following properties:

| Field       | Type       | Description                                                                                      |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------ |
| createTime  | `DateTime` | Item create time                                                                                 |
| updateTime  | `DateTime` | Item last update time                                                                            |
| ipnsUuid    | `string`   | IPNS unique identifier                                                                           |
| name        | `string`   | Informational IPNS name, which is set by a user to easily organize the IPNS records              |
| description | `string`   | IPNS description                                                                                 |
| ipnsName    | `string`   | IPNS name used to access IPNS content on IPFs gateway                                            |
| ipnsValue   | `string`   | IPFS value (CID), to which this ipns points                                                      |
| link        | `string`   | IPNS link to Apillon IPFS gateway, allowing to access content to which this IPNS points          |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets/:bucketUuid/ipns" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  <CodeGroupItem title="cURL with params" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets/:bucketUuid/ipns?ipnsName=k2k4r8lqt07ls9uyz141ofqcl99k4b8e63ns1fh52ib1bwh09z0k6vjk" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "f0764846-41f4-4352-87b4-85f9c94a8af4",
  "status": 200,
  "data": {
    "items": [
      {
        "createTime": "2023-11-24T06:22:16.000Z",
        "updateTime": "2023-11-24T06:22:16.000Z",
        "ipnsUuid": "9c0a0020-5d87-4112-a0ce-4033c037e31a",
        "name": "IPNS from Apillon API",
        "description": null,
        "ipnsName": null,
        "ipnsValue": null,
        "link": null
      },
      {
        "createTime": "2023-11-24T13:43:43.000Z",
        "updateTime": "2023-11-24T13:43:45.000Z",
        "ipnsUuid": "0b3c4ca8-3054-42a2-b5d4-1665646bbaa0",
        "name": "Example ipns",
        "description": null,
        "ipnsName": "k2k4r8lqt07ls9uyz141ofqcl99k4b8e63ns1fh52ib1bwh09z0k6vjk",
        "ipnsValue": "/ipfs/Qma6zTc8ctd65U2SARH7Qkssm6KrwsqJnX1PtrSqhXcM9L",
        "link": "https://ipfs-eu1.apillon.io/ipns/k2k4r8lqt07ls9uyz141ofqcl99k4b8e63ns1fh52ib1bwh09z0k6vjk/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJrMms0cjhscXQwN2xzOXV5ejE0MW9mcWNsOTlrNGI4ZTYzbnMxZmg1MmliMWJ3aDA5ejBrNnZqayIsInByb2plY3RfdXVpZCI6ImQ3ZTlkZjQwLTcxNDgtNGYwZC1hMTEyLTM5YmYzMjY5NWFlNCIsImlhdCI6MTcwMDk4MTg3Niwic3ViIjoiSVBGUy10b2tlbiJ9.LMRhNNtsYF-0NlIcXFL1O85I58bsC_zHlbAepPz0hVM"
      }
    ],
    "total": 2
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Create new IPNS

> API for creating a new IPNS record.

**Note: IPNS becomes accessible on the IPFS gateway when content with CID is published to it. To access IPNS content on the IPFS gateway, use `ipnsName`.**

<CodeDiv>POST /storage/buckets/:bucketUuid/ipns</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                                                                          | Required |
| ---------- | ---------------------------------------------------------------------------------------------------- | -------- |
| bucketUuid | Unique key of storage bucket where IPNS will be created. Key is displayed on developer dashboard.    | true     |

#### Body fields

| Name        | Type     | Description                                                                                                                                       | Required |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name        | `string` | IPNS name.                                                                                                                                        | true     |
| description | `string` | IPNS description.                                                                                                                                 | false    |
| cid         | `string` | CID to which the IPNS name will point. If this property is specified, API executes IPNS publish, which sets the `ipnsName` and `ipnsValue` properties. | false    |

#### Possible errors

| Code     | Description                             |
| -------- | --------------------------------------- |
| 42200026 | Request body is missing a `name` field. |
| 40406002 | Bucket not found                        |

#### Response

Response is an instance of [IPNS](#response-fields-ipns) described above.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/storage/buckets/:bucketUuid/ipns" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"name\": \"Example IPNS\",
    \"cid\": \"Qma6zTc8ctd65U2SARH7Qkssm6KrwsqJnX1PtrSqhXcM9L\"
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "0f436448-7c05-4f29-ae49-c57f55e36705",
  "status": 201,
  "data": {
    "createTime": "2023-11-24T12:14:31.127Z",
    "updateTime": null,
    "ipnsUuid": "0b3c4ca8-3054-42a2-b5d4-1665646bbaa0",
    "projectUuid": "d7e9df40-7148-4f0d-a112-39bf32695ae4",
    "bucketId": 11,
    "name": "Example ipns",
    "description": null,
    "ipnsName": "k2k4r8lqt07ls9uyz141ofqcl99k4b8e63ns1fh52ib1bwh09z0k6vjk",
    "ipnsValue": "/ipfs/Qma6zTc8ctd65U2SARH7Qkssm6KrwsqJnX1PtrSqhXcM9L",
    "link": "https://ipfs-eu1.apillon.io/ipns/k2k4r8lqt07ls9uyz141ofqcl99k4b8e63ns1fh52ib1bwh09z0k6vjk/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJrMms0cjhscXQwN2xzOXV5ejE0MW9mcWNsOTlrNGI4ZTYzbnMxZmg1MmliMWJ3aDA5ejBrNnZqayIsInByb2plY3RfdXVpZCI6ImQ3ZTlkZjQwLTcxNDgtNGYwZC1hMTEyLTM5YmYzMjY5NWFlNCIsImlhdCI6MTcwMDk4MTg3Niwic3ViIjoiSVBGUy10b2tlbiJ9.LMRhNNtsYF-0NlIcXFL1O85I58bsC_zHlbAepPz0hVM"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

### Get IPNS

> API to get specific IPNS name by its UUID.

<CodeDiv>GET /storage/buckets/:bucketUuid/ipns/:ipnsUuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                   | Required |
| ---------- | ----------------------------- | -------- |
| bucketUuid | Unique key of storage bucket  | true     |
| ipnsUuid   | Unique key of IPNS name       | true     |

#### Possible errors

| Code     | Description    |
| -------- | -------------- |
| 40406012 | IPNS not found |

#### Response fields (IPNS)

Response is an instance of [IPNS](#response-fields-ipns) described above.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/storage/buckets/:bucketUuid/ipns/:ipnsUuid" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "0f436448-7c05-4f29-ae49-c57f55e36705",
  "status": 201,
  "data": {
    "createTime": "2023-11-24T12:14:31.127Z",
    "updateTime": null,
    "ipnsUuid": "0b3c4ca8-3054-42a2-b5d4-1665646bbaa0",
    "projectUuid": "d7e9df40-7148-4f0d-a112-39bf32695ae4",
    "bucketId": 11,
    "name": "Example IPNS",
    "description": null,
    "ipnsName": "k2k4r8lqt07ls9uyz141ofqcl99k4b8e63ns1fh52ib1bwh09z0k6vjk",
    "ipnsValue": "/ipfs/Qma6zTc8ctd65U2SARH7Qkssm6KrwsqJnX1PtrSqhXcM9L",
    "link": "https://ipfs-eu1.apillon.io/ipns/k2k4r8lqt07ls9uyz141ofqcl99k4b8e63ns1fh52ib1bwh09z0k6vjk/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJrMms0cjhscXQwN2xzOXV5ejE0MW9mcWNsOTlrNGI4ZTYzbnMxZmg1MmliMWJ3aDA5ejBrNnZqayIsInByb2plY3RfdXVpZCI6ImQ3ZTlkZjQwLTcxNDgtNGYwZC1hMTEyLTM5YmYzMjY5NWFlNCIsImlhdCI6MTcwMDk4MTg3Niwic3ViIjoiSVBGUy10b2tlbiJ9.LMRhNNtsYF-0NlIcXFL1O85I58bsC_zHlbAepPz0hVM"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Publish IPNS

> API for publishing IPNS on IPFS and linking it to CID.

**Note: Multiple IPNS records can point to the same CID.**

<CodeDiv>POST /storage/buckets/:bucketUuid/ipns/:ipnsUuid/publish</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                                       | Required |
| ---------- | ------------------------------------------------- | -------- |
| bucketUuid | Unique key of storage bucket.                     | true     |
| ipnsUuid   | Unique key of IPNS record that will be published  | true     |

#### Body fields

| Name | Type     | Description                             | Required |
| ---- | -------- | --------------------------------------- | -------- |
| cid  | `string` | CID to which the IPNS name will point.  | true     |

#### Possible errors

| Code     | Description                    |
| -------- | ------------------------------ |
| 42200030 | Body is missing `CID` property |
| 40406012 | IPNS not found                 |

#### Response

The response is an instance of [IPNS](#response-fields-ipns) that was published. Properties are described above.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/storage/buckets/:bucketUuid/ipns/:ipnsUuid/publish" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"cid\": \"Qma6zTc8ctd65U2SARH7Qkssm6KrwsqJnX1PtrSqhXcM9L\"
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "14bfe999-ffc4-477b-bf10-4fe9ba9ab90a",
  "status": 200,
  "data": {
    "createTime": "2023-11-26T07:13:32.000Z",
    "updateTime": "2023-11-26T07:13:32.000Z",
    "ipnsUuid": "df5c47b4-e00b-4163-877e-7c78042e7666",
    "name": "My 3 IPNS",
    "description": null,
    "ipnsName": "k2k4r8jofss9us61kwlmq8flgdhj3a1tn5ikcc6m494kf2edifi2oh4z",
    "ipnsValue": "/ipfs/Qma6zTc8ctd65U2SARH7Qkssm6KrwsqJnX1PtrSqhXcM9L",
    "link": "https://ipfs-eu1.apillon.io/ipns/k2k4r8jofss9us61kwlmq8flgdhj3a1tn5ikcc6m494kf2edifi2oh4z/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJrMms0cjhqb2Zzczl1czYxa3dsbXE4ZmxnZGhqM2ExdG41aWtjYzZtNDk0a2YyZWRpZmkyb2g0eiIsInByb2plY3RfdXVpZCI6ImQ3ZTlkZjQwLTcxNDgtNGYwZC1hMTEyLTM5YmYzMjY5NWFlNCIsImlhdCI6MTcwMTA3NTk3OCwic3ViIjoiSVBGUy10b2tlbiJ9.xJ0ZdUb0XqH9oe7AvG0yUnCnydKNoGlNnNsIYZEwAc0"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

### Delete IPNS

> API to delete IPNS record.

<CodeDiv>DELETE /storage/buckets/:bucketUuid/ipns/:ipnsUuid</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### URL parameters

| Name       | Description                   | Required |
| ---------- | ----------------------------- | -------- |
| bucketUuid | Unique key of storage bucket  | true     |
| ipnsUuid   | Unique key of IPNS record     | true     |

#### Possible errors

| Code     | Description    |
| -------- | -------------- |
| 40406012 | IPNS not found |

#### Response fields (IPNS)

The response is deleted IPNS record, an instance of [IPNS](#response-fields-ipns) described above.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request DELETE "https://api.apillon.io/storage/buckets/:bucketUuid/ipns/:ipnsUuid" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "302f036b-5ca5-488c-bbd5-a7cdd7674898",
  "status": 200,
  "data": {
    "createTime": "2023-11-24T06:22:16.000Z",
    "updateTime": "2023-11-24T06:22:16.000Z",
    "ipnsUuid": "9c0a0020-5d87-4112-a0ce-4033c037e31a",
    "name": "IPNS from Apillon API",
    "description": null,
    "ipnsName": null,
    "ipnsValue": null
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>
