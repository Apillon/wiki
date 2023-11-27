# Apillon API

<div class="divider"></div>

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

### Listing requests

Endpoints starting with "List" are intended to list different data, where the response contains 2 properties: `items`(records that match the current query) and `total` (number of all records. This information should be used for pagination: Round up (`total` / `limit`) = number of pages.

Listing endpoints by default supports below query parameters:

| Name    | Description                                                                               | Required |
| ------- | ----------------------------------------------------------------------------------------- | -------- |
| search  | Search the items usually by name or by some other property, which specifies this item.    | false    |
| page    | Items are paginated by default. This parameter is used to get items from a specific page. | false    |
| limit   | Number of items on a page (default: 20).                                                  | false    |
| orderBy | One or multiple properties, separated by a comma, used to order data.                     | false    |
| desc    | `Boolean` values, mapped to the index of the `orderBy` parameter. Defaults to false.      | false    |

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
- **402**: Payment required
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

### Common errors

Through whole Apillon API, same errors can occur. Reason behind it can be current subscription package limits or current credit balance.

#### Not enough storage space

One of the limits, which is based on project subscription package, is available storage space (on IPFS node).
If project reach storage space limit, below error will occur.

```json
{
    ...
    "code": 40006003,
    "message": "NOT_ENOUGH_STORAGE_SPACE",
    ...
}
```

#### Credit balance too low

Some non recurrent actions requires payment with credit.
If project credit balance is lower than price for executed action, API will return status 402 and below response.

```json
{
    ...
    "code": 40210000,
    "message": "CREDIT_BALANCE_TOO_LOW",
    ...
}
```
