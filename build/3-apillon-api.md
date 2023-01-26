# Apillon API

## API to Web3

Apillon API is a set of RESTful API endpoints allowing developers to integrate Apillon modules into their Web3 applications.

Unless clearly marked as public, all routes are private and require an API key.

### Requests

The server speaks [JSON](https://en.wikipedia.org/wiki/JSON). It is recommended that every call to the server includes a `Content-Type` header set to `application/json;`.

### Authentication and authorization

API routes restrict public access and require authentication.

Requests must include a [basic auth](**https://en.wikipedia.org/wiki/Basic_access_authentication) HTTP header field in the form of `Authorization: Basic <credentials>`, where credentials represent the Base64 encoding of API key and API key secret joined by a single colon `:`.

API keys could be generated on the developer dashboard (https://app.apillon.io/dashboard/api-keys) under Project settings.

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

| Status | Message | Description
|-|-|-
|403|Insufficient permissions - missing `permission name` permission|API key lacks required permission for called service.
|403|Insufficient permissions to access this record|API key has required permissions for endpoint, but it does not have the right to access addressed record (e. g., a record belongs to a different project).

### Responses

Every response has a unique ID which helps identify potential issues. It also includes a status code that can help identify the cause of a potential problem.

Query requests through `GET` method can return status codes `200`, `400`, `401`, `403`, or `500`. Mutations through `POST`, `PUT` and `DELETE` can also return codes `201` and `422`. Invalid routes return status code `404`.

- **200**: Success
- **201**: Creation successful
- **400**: Bad request
- **401**: Unauthenticated access
- **403**: Unauthorized access
- **404**: Path not found
- **422**: Data validation failed
- **500**: System error

<div class="split_content">
	<div class="split_side">
		<p>A successful request includes a `data` key, which holds a valid response object.</p>
	</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```js
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

### Error handling

Request fails if response code is not 200 or 201. The Apillon API returns two types of errors.

#### Code exception

Fields in code exception:

| Field | Description
|-|-
| id | Unique ID of request
| code | Apillon API internal error code pointing to the exact position in the system
| message | Message describing the error
| path | Endpoint that threw the error
| timestamp | Date when the error occurred

  <div class="split_content">
	<div class="split_side">
        <p>Errors include a unique code number, a property which caused the error, and an error message. The code number helps identify potential issues and points to their exact position in the system.</p>
	</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```js
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

Unprocessable entity `422 Error status` includes an `errors` key, which holds a list of error objects.

This error typically occurs when the request body is not valid (i. e., it is invalid or missing keys).

Fields in validation exception:
| Field | Description
|-|-
| id | Unique ID of request
| model | Apillon API model used to validate request payload
| errors | Array of errors
| path | Endpoint that threw the error
| timestamp | Date when the error occurred

Errors include a unique code number, a property that caused the error, and an error message. The code number helps identify potential issues and points to their exact position in the system.

<div class="split_content">
	<div class="split_side">
		<p>Errors include a unique code number, a property which caused the error, and an error message. The code number helps identify potential issues and points to their exact position in the system.</p>
	</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```js
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

## Web3 Storage API

**Note:** To use Apillon Web3 Storage APIs, you should first create a bucket on the [Apillon dashboard](app.apillon.io/service/storage).

In all cURL examples, parameters with a colon as a prefix should be replaced with real values.

### File upload process through Apillon Web3 Storage API

1. URL request is signed for upload.
2. File is uploaded to Apillon central server.
3. File is transferred to IPFS and available through the Apillon gateway.
4. File is replicated to different IPFS nodes globally via Crust Network.

### Routes

#### POST /storage/:bucketUuid/upload

> API that creates file upload request and returns a URL for file upload.
##### URL parameters

| Name       | Description | Required|
| ---------- | ------------------------------------------------------------ |--|
| bucketUuid | Unique key of storage bucket. Key is displayed on developer dashboard. | `true`|

##### Body fields

| Name        | Type | Description | Required |
| ----------- | -----| -- | -------- |
| fileName    | `string` | Full name (name and extension) of file to be uploaded | `true`   |
| contentType | `string` | File [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) | `true` |
| path        | `string` | Virtual file path. Empty for root. Must not contain `fileName`. <br><br> The `path` field can be used to place file in virtual directories inside a bucket. If directories do not yet exist, they will be automatically generated.<br><br>For example, an `images/icons` path creates `images` directory in a bucket and `icons` directory inside it. File will then be created in the `icons` directory. | `false`|

##### Possible errors

| Code     | Description                                                                   |
| -------- | ----------------------------------------------------------------------------- |
| 40406002 | Bucket does not exist.                                                       |
| 42200008 | Request body is missing a `fileName` field.                                      |
| 42200009 | Request body is missing a `contentType` field.                                   |
| 40006002 | Bucket has reached max size limit.                                             |
| 40406009 | Bucket is marked for deletion. It is no longer possible to upload files to it. |
| 50006003 | Internal error - Apillon was unable to generate upload URL.                 |

##### Response fields

| Field               | Type | Description                                                                      |
| ------------------- | ----- | --------------------------------------------------------------------------- |
| signedUrlForUpload  | `string` | URL for file upload. Signed URL is unique for each file and is valid only for a limited time (1 min), so you should start with file upload as soon as possible.<br><br>Request should use `PUT` method and `binary` body.<br><br>Binary data should be sent in body as-is, but with the appropriate Content-Type header (e.g., text/plain). |
| fileUuid            | `string` | File unique identifier used to query file status, etc. |
| fileUploadRequestId | `integer` | Apillon internal ID of file upload request |


<div class="split_content">
	<div class="split_side">
		<h4>Request cURL and response example</h4>
	</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```
curl --location --request POST "https://api-dev.apillon.io/storage/:bucketUuid/upload" \
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

```JSON
{
    "id": "aea7f4e9-6dbb-4075-a76c-f6cc6c47c331",
    "status": 201,
    "data": {
        "signedUrlForUpload": "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE/11/my%20test%20file.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230104%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230104T101419Z&X-Amz-Expires=900&X-Amz-Signature=e1be26c5863d845d5ec5477ac4e7aabafd6901060b3515d23d36c71360255259&X-Amz-SignedHeaders=host",
        "fileUuid": "18bdb4ef-4b9d-4bd4-9e5f-0bc7744b4376",
        "fileUploadRequestId": 70
    }
}
```

  </CodeGroupItem>
</CodeGroup>
	</div>
</div>

<div class="split_content">
	<div class="split_side">
        <h4>Request cURL example</h4>
        <p>Example with `string` as binary data and `content-type` header and file from disk.</p>
	</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE/11/my%20test%20file.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230104%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230104T101419Z&X-Amz-Expires=900&X-Amz-Signature=e1be26c5863d845d5ec5477ac4e7aabafd6901060b3515d23d36c71360255259&X-Amz-SignedHeaders=host" \
--data-binary "my test content"
```

  </CodeGroupItem>
</CodeGroup>
  	</div>
</div>

<div class="split_content">
	<div class="split_side">
        <p>Example with `content-type` header and file from disk.</p>
	</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```
curl --location --request PUT "https://sync-to-ipfs-queue.s3.eu-west-1.amazonaws.com/STORAGE/11/my%20test%20file.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQIMRRA6GJRL57L7G%2F20230104%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230104T101419Z&X-Amz-Expires=900&X-Amz-Signature=e1be26c5863d845d5ec5477ac4e7aabafd6901060b3515d23d36c71360255259&X-Amz-SignedHeaders=host" \
--header "Content-Type: text/plain" \
--data-binary ":full path to file"
```

  </CodeGroupItem>
</CodeGroup>
	</div>
</div>

#### GET /storage/:bucketUuid/content

> Gets directories and files in bucket. Items are paginated and can be filtered and ordered through query parameters.
##### URL parameters

| Name        | Description                                                  | Required|
| ----------- | ------------------------------------------------------------ |--|
| bucketUuid | Unique key of bucket. Key is displayed on developer dashboard. | `true`|

##### Query parameters

| Name         | Description                                                                           | Required |
| ------------ | ------------------------------------------------------------------------------------- | ----|
| search      | Filters file by file name.                                                | false |
| directoryId | Gets files inside a specific directory.                                                  | `false`| 
| page        | Files are paginated by default. This parameter is used to get files from a specific page.  | `false`|
| limit       | Number of files on a page (default: 20).                                                 |`false`|
| orderBy     | One or multiple properties, separated by a comma, used to order data.                    |`false`|
| desc        | `Boolean` values, mapped to the index of the `orderBy` parameter. Defaults to `false`. | `false`|

##### Possible errors

| Code     | Description             |
| -------- | ----------------------- |
| 40406002 | Bucket does not exist. |

##### Response fields

The `Data` property of API response contains two properties: `items` (records that match the current query) and `total` (number of all records. This information should be used for pagination: Round up (`total` / `limit`) = number of pages.

Properties of each item:

| Field             | Type | Description                                                                 |
| ----------------- | ---- | ----------------------------------------------------------------------- |
| id                | `integer` | Item internal ID |
| type              | `string` | Item type, possible values are `file` and `directory` |
| name              | `string` | Item (file or directory) name |
| createTime        | `DateTime` | Item create time |
| updateTime        | `DateTime` | Item last update time |
| contentType       | `string` | Item content type (MIME type)|
| contentType       | `string` | Item content type (MIME type)|
| size              | `integer` | Item size in bytes |
| parentDirectoryId | `integer` | ID of directory where a file is located |
| fileUuid          | `string` | File unique identifier |
| CID               | `string` | File content identifier - label used to point to material in IPFS. |
| link              | `string` | File link on Apillon IPFS gateway. |

<div class="split_content">
	<div class="split_side">
		<h4>Request cURL example</h4>
		<p>Basic request to get items in bucket root directory:</p>
		</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```
curl --location --request GET "https://api-dev.apillon.io/storage/:bucketUuid/content" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
</CodeGroup>
	</div>
</div>

<div class="split_content">
	<div class="split_side">
        <p>Request with additional query parameters:</p>
		</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```
curl --location --request GET "https://api-dev.apillon.io/storage/:bucketUuid/content?orderBy=name&desc=false&limit=5&page=1" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Request response example">

```JSON
{
    "id": "c8c50b3b-91ff-42c7-b0af-f866ce23f18a",
    "status": 200,
    "data": {
        "items": [
            ...
            {
                "type": "file",
                "id": 397,
                "status": 5,
                "name": "My file.txt",
                "CID": "QmcG9r6Rdw9ZdJ4imGBWc6mi5VzWHQfkcLDMe2aP74eb42",
                "createTime": "2023-01-19T10:10:01.000Z",
                "updateTime": "2023-01-19T10:10:31.000Z",
                "contentType": "text/plain",
                "size": 68,
                "parentDirectoryId": null,
                "file_uuid": "0a775bfa-a0d0-4e0b-9a1e-e909e426bd11",
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

#### GET /storage/:bucketUuid/file/:id/detail

> Gets details of a specific file inside a bucket.
##### URL parameters

| Name        | Description   | required|
| ----------- | ------------------------------------------------------------ | -- |
| bucketUuid | Unique key of a bucket. Key is displayed on developer dashboard. | `true`|
| id         | File internal ID, UUID or CID.                                | `true` |

##### Possible errors

| Code     | Description           |
| -------- | --------------------- |
| 40406005 | File does not exist. |

##### Response fields

Response `data` property contains two properties: `fileStatus` and `file`. File status tells the current status of the file relative to the entire flow the file goes through to be fully loaded and pinned on Crust Network, while `file` property contains file metadata fields.

###### File statuses

| Number | Description                                               |
| ------ | --------------------------------------------------------- |
| 1      | Request for upload to Apillon storage was generated.      |
| 2      | File is uploaded to Apillon central server.                  |
| 3      | File is transferred to IPFS node.                             |
| 4      | File is replicated to different IPFS nodes through Crust Network. |

###### File metadata

`CID`, `size`, and `downloadLink` are present if file is already loaded to IPFS.

| Field | Type  | Description |
| -------| ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| id                                                                       | `integer` | Apillon internal file ID |
| status                                                                   | `integer` | Apillon internal file status |
| fileUuid                                                                 | `string` | File unique identifier |
| name                                                                     | `string` | File name |
| contentType                                                              | `string` | File content type (MIME type)                                     |
| [CID](https://docs.ipfs.tech/concepts/content-addressing/#what-is-a-cid) | `string` | File content identifier pointing to material in IPFS |
| size                                                                     | `integer` | File size in bytes                                               |
| downloadLink                                                             | `string` | File link on Apillon IPFS gateway                                 |

<div class="split_content">
	<div class="split_side">
		<h4>Request cURL and response example</h4>
		</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```
curl --location --request GET "https://api-dev.apillon.io/storage/:bucketUuid/file/:id/detail" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```JSON
{
    "id": "5be33c54-2cc9-46f4-8f50-debc98866810",
    "status": 200,
    "data": {
        "fileStatus": 4,
        "file": {
            "id": 397,
            "status": 5,
            "file_uuid": "0a775bfa-a0d0-4e0b-9a1e-e909e426bd11",
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

#### DELETE /storage/:bucketUuid/file/:id

> Marks a file inside bucket for deletion by `id`, `fileUuid`, or `CID`. File will be completely deleted from the Apillon system and Apillon IPFS node after 3 months.
> If file is marked for deletion, it will not be renewed on Crust Network.
##### URL parameters

| Name        | Description                                                  | required|
| ----------- | ------------------------------------------------------------ |--|
| bucketUuid | Unique key of bucket. Key is displayed on developer dashboard. | `true` |
| id         | File internal ID, UUID, or CID.                                | `true` |

##### Possible errors

| Code     | Description                         |
| -------- | ----------------------------------- |
| 40406005 | File does not exist.         |
| 40006009 | File is marked for deletion. |

##### Response fields

The response of delete function is a record that has been marked for deletion.

Returned fields are the same as fields that are returned in [GET file details API](#file-metadata).

<div class="split_content">
	<div class="split_side">
		<h4>Request cURL and response example</h3>
		</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```
curl --location --request DELETE "https://api-dev.apillon.io/storage/:bucketUuid/file/:id" \
--header "Authorization: Basic :credentials" \
--data-raw ""
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```JSON
{
    "id": "bc92ff8d-05f2-4380-bb13-75a1b6b7f388",
    "status": 200,
    "data": {
        "id": 397,
        "status": 8,
        "file_uuid": "0a775bfa-a0d0-4e0b-9a1e-e909e426bd11",
        "CID": "QmcG9r6Rdw9ZdJ4imGBWc6mi5VzWHQfkcLDMe2aP74eb42",
        "name": "My file.txt",
        "contentType": "text/plain",
        "size": 68,
        "fileStatus": 4,
    }
}
```

  </CodeGroupItem>
</CodeGroup>
	</div>
</div>

**Note:** The `status` property of file is 8. This means the file is marked for deletion and will be deleted after a certain period.
