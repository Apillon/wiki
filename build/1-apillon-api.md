# Apillon API

<div class="divider"></div>

## Endpoints

The list of endpoints where API is available:

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

Every request goes through authentication middleware, where the following errors can occur:
| Status | Message | Description
|-|-|-
|400|Missing Authorization header|Request is missing authorization header.
|400|Malformed Authorization header|Authorization header field has an invalid form.
|401|Invalid API key or API key secret|Authorization header is valid, but credentials in it are not.

#### Authorization errors

Each endpoint requires a certain role or permission from the API key.

There are three types of permissions that could be assigned to an API key:

| Code | Name        | Description                                    |
| ---- | ----------- | ---------------------------------------------- |
| 50   | KEY_EXECUTE | Permission to execute certain actions          |
| 51   | KEY_WRITE   | Permission to create, modify or delete records |
| 52   | KEY_READ    | Permission to read record                      |

These permissions could be assigned to an API key for every attached service (e.g., Web3 Storage (Crust), Web3 Authentication (KILT), etc.).

If a request is made with an API key that lacks permission for a called endpoint, the following errors can occur:

| Status | Message                                                         | Description                                                                                                                                                   |
| ------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 403    | Insufficient permissions - missing `permission name` permission | API key lacks required permission for called service.                                                                                                         |
| 403    | Insufficient permissions to access this record                  | API key has required permissions for endpoint, but it does not have the right to access the addressed record (i.e., a record belongs to a different project). |

### Listing requests

Endpoints starting with "List" are intended to list different data, where the response contains the below properties.

| Name  | Description                                              |
| ----- | -------------------------------------------------------- |
| items | Records on a specified page that match the current query |
| total | Number of all records that match the query               |
| limit | Number of items on a page (default: 20).                 |
| page  | Current page                                             |

Listing endpoints by default supports the query parameters below:

| Name    | Description                                                                                   | Required |
| ------- | ----------------------------------------------------------------------------------------------| -------- |
| search  | Search the items usually by name or some other property specifying this item.                 | false    |
| page    | Items are paginated by default. This parameter is used to get items from a specific page.     | false    |
| limit   | Number of items on a page (default: 20).                                                      | false    |
| orderBy | One or multiple properties, separated by a comma, used to order data.                         | false    |
| desc    | `Boolean` values, mapped to the index of the `orderBy` parameter. Defaults to false.          | false    |
| status  | Integer values, to filter by the entity's status (each entity has corresponding status codes) | false    |

### Responses

<div class="split_content">
	<div class="split_side">

Every response has a unique ID, which helps identify potential issues. It also includes a status code that can help identify the cause of a potential problem.

Query requests through the `GET` method can return status codes `200`, `400`, `401`, `403`, or `500`. Mutations through `POST`, `PUT`, and `DELETE` can also return codes `201` and `422`. Invalid routes return status code `404`.

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

A request fails if response code is not 200 or 201. The Apillon API returns two types of errors.

#### Code exception

Errors include a unique code number, a property that caused the error, and an error message. The code number helps identify potential issues and points to their exact position in the system.

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

Unprocessable entity `422 Error status` includes an `errors` key containing a list of error objects.

This error typically occurs when the request body is not valid (i.e., it is invalid or missing keys).

Errors include a unique code number, a property that caused the error, and an error message. The code number helps identify potential issues and points to their exact position in the system.

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

Through the whole Apillon API, the same errors can occur. The reason behind it can be current subscription package limits or current credit balance.

#### Not enough storage space

One of the limits based on the project subscription package is available storage space (on the IPFS node).
If a project reaches the storage space limit, the following error will occur.

```json
{
    ...
    "code": 40006003,
    "message": "NOT_ENOUGH_STORAGE_SPACE",
    ...
}
```

#### Credit balance too low

Some nonrecurrent actions require payment with credits.
If a project's credit balance is lower than price of executed action, API will return status 402 and the following response.

```json
{
    ...
    "code": 40210000,
    "message": "CREDIT_BALANCE_TOO_LOW",
    ...
}
```

## Project

Api key is created inside a project and can be used to get project details through Apillon API.

### Credit balance

> API to get project credit balance

<CodeDiv>GET /project/credit</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Response fields

| Name    | Type     | Description                                                                                          |
| ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| balance | `number` | Current credit balance - amount of credits in project, that can be used to perform different actions |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/project/credit" \
--header "Authorization: Basic :credentials"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "ec700ddd-4a0d-4d6d-b3ba-64b7ab031c4b",
  "status": 200,
  "data": {
    "balance": 120
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

## API Code Examples

Examples for using the Apillon API in PHP, .NET (C#) and Python can be found on [our code examples github repo](https://github.com/Apillon/code-examples)
