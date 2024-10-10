# Embedded Wallets API

To interact with the Oasis Sapphire account manager's smart contract, you need to first create an Embedded Wallet Integration through the [Apillon Developer Console](https://app.apillon.io/dashboard/service/embedded-wallet).

::: tip
To avoid having your integration UUID abused and to prevent unauthorized access, it is highly recommended to add a set of whitelisted domains to your integration. After this is configured, signature generation will only be possible for via the whitelisted domains.
:::

## API endpoints

The following API endpoints will be used during the embedded wallet generation flow.

<!-- ### Get a session token

> Obtain a session token from the Apillon API. The session token is used to obtain a contract signature and to verify the user's email by calling the API from the front end.
> This endpoint requires the EXECUTE permission for the wallet service.

<CodeDiv>GET /embedded-wallet/session-token</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Response fields

| Field | Type     | Description           |
| ----- | -------- | --------------------- |
| token | `string` | The JWT session token |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request GET "https://api.apillon.io/embedded-wallet/session-token" \
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
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

::: tip
If your workflow takes longer than a few minutes to complete, it is recommended to refresh the session token by calling this endpoint before calling the other endpoints, since the token is short-lived for security reasons
:::
 -->
### Generate contract signature

> This endpoint generates a signature that is used to authorize the account manager's smart contract to create a new wallet on behalf of the user who requested it on your dapp.

<CodeDiv>POST /embedded-wallet/signature</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body parameters

| Name              | Description                                                                   |
| ----------------- | ----------------------------------------------------------------------------- |
| data              | The data to be signed - usually passed by default by the SDK                  |
| integration_uuid  | The integration UUID, obtained from the Apillon Developer Console             |

#### Response fields

Each item is an instance of channel class, with the below properties:

| Field     | Type     | Description                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------- |
| signature | `string` | The oasis sapphire contract call authorization signature                     |
| gasPrice  | `string` | The gas price parameter that needs to be passed to the contract              |
| timestamp | `number` | Timestamp when the signature was created. Needs to be passed to the contract |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request POST "https://api.apillon.io/embedded-wallet/signature" \
--header "Content-Type: application/json" \
--data-raw "{\"data\": \"0x0000000...\", \"integration_uuid\": \"d9ee5982-4292-40ee-b94f-b5c234fecb98\"}"
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
    "signature": "b548e319...",
    "gasPrice": "21000000",
    "timestamp": 1721819352076
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Send an email validation code

> This endpoint sends a verification code to the email address the user has entered. This is the default method used to send verification codes, which you are can also overwrite.

<CodeDiv>POST /embedded-wallet/otp/generate</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body parameters

| Name  | Description                                             |
| ----- | ------------------------------------------------------- |
| email | The email address the user has entered into the dapp    |

#### Response fields

Each item is an instance of channel class, with the below properties:

| Field      | Type     | Description                                                       |
| ---------- | -------- | ----------------------------------------------------------------- |
| email      | `string` | The email address where the verification code was sent            |
| expireTime | `string` | An ISO format date which shows when the verification code expires |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request POST "https://api.apillon.io/embedded-wallet/otp/generate" \
--header "Content-Type: application/json" \
--data-raw "{
    \"email\": \"dapp-user@apillon.io\"
}"
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
    "email": "dapp-user@apillon.io",
    "expireTime": "2024-07-24T11:14:04.139Z"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>

### Validate email

> This endpoint can be used to check if the entered email verification code is correct if you had previously used the otp/generate endpoint

<CodeDiv>POST /embedded-wallet/otp/validate</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body parameters

| Name  | Description                                                   |
| ----- | ------------------------------------------------------------- |
| email | The email address the user has entered into the dapp          |
| code  | The email validation code the user has enetered into the dapp |

The response is a true/false value, indicating whether the validation is successful based on the entered email and verification code.

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request POST "https://api.apillon.io/embedded-wallet/otp/validate" \
--header "Content-Type: application/json" \
--data-raw "{
    \"email\": \"dapp-user@apillon.io\",
    \"code\": \"5QJ18Z\",
}"
```

  </CodeGroupItem>
  </CodeGroup>
  <CodeGroup>
  <CodeGroupItem title="Response">

```json
{
  "id": "d9ee5982-4292-40ee-b94f-b5c234fecb98",
  "status": 200,
  "data": true
}
```

  </CodeGroupItem>
  </CodeGroup>
	</div>
</div>
