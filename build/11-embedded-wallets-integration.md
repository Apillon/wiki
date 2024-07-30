# Embedded Wallet integration

If you want to learn more about Apillon's Embedded Wallet Service, visit the [embedded wallet service wiki page](/web3-services/8-embedded-wallets.md).

To get started with integrating embedded wallets into your dapp, follow these steps:

1. **Create an Apillon account:** If you don't have an Apillon account or project yet, create one on the [Apillon dashboard](https://app.apillon.io).

2. **Open the Embedded Wallet page and generate an API key:** Go to the [Embedded Eallet page](https://app-dev.apillon.io/dashboard/service/embedded-wallet) on the Apillon developer console and generate an API key for the Wallet service with the KEY_EXECUTE permission.

3. **Securely store API key:** It's crucial to securely store your API key and its secret. These will be used to interact with Apillon's API, create sessions, and verify user emails. This should be done on the server side.

## Integrating Embedded Wallet with Apillon's front-end SDK

**Overview**

Apillon’s front-end SDK allows developers to seamlessly integrate embedded wallets into their dapps. This guide provides detailed instructions on implementing and configuring the embedded wallet using various SDK packages.

#### Embedded Wallet UI

The UI package offers a default interface for managing connected accounts and handling transaction confirmations. It utilizes React and Headless UI (Tailwind).

**Initialization**

Use `initializeApp()` to set up the SDK and UI. Configuration options include network settings, email verification methods, and UI-specific adjustments.

**Example:**

```javascript
import { initializeApp } from '@embedded-wallet/ui';

initializeApp('#open-wallet-button-selector', {
  disableAutoBroadcastAfterSign: false,
  disableDefaultActivatorStyle: false,
  accountManagerAddress: '0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1',
  networks: [
    {
      name: 'Moonbeam Testnet',
      id: 1287,
      rpcUrl: 'https://rpc.testnet.moonbeam.network',
      explorerUrl: 'https://moonbase.moonscan.io',
    },
    {
      name: 'Amoy',
      id: 80002,
      rpcUrl: 'https://rpc-amoy.polygon.technology',
      explorerUrl: 'https://www.oklink.com/amoy',
    },
  ],
});
```

### Embedded Wallet SDK

The core SDK revolves around the `EmbeddedWallet` class, offering methods for Oasis Sapphire chain authentication and wallet management.

**Initialization**

Initialize `EmbeddedWallet` with `initializeOnWindow()`, providing configuration options such as production URLs, account manager address, network IDs, and custom signature callbacks.

**Example:**

```typescript
import { initializeOnWindow, getEmbeddedWallet } from '@embedded-wallet/sdk';

initializeOnWindow({
  production: true,
  accountManagerAddress: '0x5C3512312312312312312312312312312365D4bC',
  defaultNetworkId: 1287,
  networkConfig: {
    /* Custom network configurations */
  },
  onGetSignature: async (gaslessData) => {
    // Custom signature generation logic
  },
  onGetApillonSessionToken: async () => {
    // Fetch Apillon session token
  },
});
```

#### Auth Methods

- `register`: Create a new wallet.
- `authenticate`: Verify account credentials.

#### Transaction Methods

- `signMessage`
- `signPlainTransaction`
- `broadcastTransaction`
- `signContractWrite`
- `contractRead`

### Events and Transaction Confirmation

The SDK exposes several events:

- `signatureRequest`
- `txApprove`
- `txSubmitted`
- `txDone`
- `dataUpdated`

**Example of Event Handling:**

```typescript
wallet.events.on('txSubmitted', tx => {
  console.log(tx);
});
```

### Using with Ethers.js

The SDK can be integrated with Ethers.js for additional functionality.

**Example:**

```typescript
import { OasisEthersSigner } from '@embedded-wallet/sdk';
const signer = new OasisEthersSigner(ethProvider);

// Sign message
const signed = await signer.signMessage('Please sign here');

// Use contract
const testContract = new ethers.Contract(
  '0xb1051231231231231231231231231231234D0663',
  contractAbi,
  signer
);
```

### Calling the Apillon API
To interact with the Oasis Sapphire account manager's smart contract, you require a session token that can be obtained from the Apillon API through the endpoint `GET https://api.apillon.io/embedded-wallet/session-token`.

The session token can then be used to call the following endpoints:
- `POST /embedded-wallet/signature` - Obtain a signature which should be passed as the return result of the "onGetSignature" callback.
- `POST /embedded-wallet/otp/generate` - Optional - Send a verification code to verify the user's email
- `POST /embedded-wallet/otp/validate` - Optional - Validate the email address after the user has entered the verification code.

For more information, see the section below about the API endpoints.

::: tip
To avoid exposing your API key to the client, it is recommended that you use a back-end service to call the /session-token endpoint. The rest of the endpoints can be called from your front end by using the session token; however, for safety reasons, it is recommended to call the Apillon API from a back-end service.
:::

## Apillon API endpoints
The following API endpoints will be used during the embedded wallet generation flow.

### Get a session token

> Obtain a session token from the Apillon API. The session token is used to obtain a contract signature and to verify the user's email by calling the API from the front end.
> This endpoint requires the EXECUTE permission for the wallet service.

<CodeDiv>GET /embedded-wallet/session-token</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Response fields

| Field       | Type       | Description            |
| ----------- | ---------- | -----------------------|
| token       | `string`   | The JWT session token  |

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
    "token": "eyJhbGciOiJIUzI1NiIs...",
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

### Generate contract signature

> This endpoint generates a signature that is used to authorize the account manager's smart contract to create a new wallet on behalf of the user who requested it on your dapp.

<CodeDiv>POST /embedded-wallet/signature</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body parameters

| Name    | Description                                             |
| ------- | ------------------------------------------------------- |
| token   | The JWT token obtained from the /session-token endpoint |

#### Response fields

Each item is an instance of channel class, with the below properties:

| Field       | Type       | Description                                                                  |
| ----------- | ---------- | -----------------------------------------------------------------------------|
| signature   | `string`   | The oasis sapphire contract call authorization signature                     |
| gasPrice    | `string`   | The gas price parameter that needs to be passed to the contract              |
| timestamp   | `number`   | Timestamp when the signature was created. Needs to be passed to the contract |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request POST "https://api.apillon.io/embedded-wallet/signature" \
--header "Content-Type: application/json" \
--data-raw "{\"token\": \"eyJhbGciOiJIUzI1NiIs...\"}"
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
    "timestamp": 1721819352076,
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

| Name    | Description                                             |
| ------- | ------------------------------------------------------- |
| token   | The JWT token obtained from the /session-token endpoint |
| email   | The email address the user has entered into the dapp    |

#### Response fields

Each item is an instance of channel class, with the below properties:

| Field       | Type       | Description                                                                  |
| ----------- | ---------- | -----------------------------------------------------------------------------|
| email       | `string`   | The email address where the verification code was sent                       |
| expireTime  | `string`   | An ISO format date which shows when the verification code expires            |

  </div>
  <div class="split_side">
    <br>
      <CodeGroup>
      <CodeGroupItem title="cURL basic" active>

```sh
curl --location --request POST "https://api.apillon.io/embedded-wallet/otp/generate" \
--header "Content-Type: application/json" \
--data-raw "{
    \"token\": \"eyJhbGciOiJIUzI1NiIs...\",
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
    "expireTime": "2024-07-24T11:14:04.139Z",
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

| Name    | Description                                                     |
| ------- | ----------------------------------------------------------------|
| token   | The JWT token obtained from the /session-token endpoint         |
| email   | The email address the user has entered into the dapp            |
| code    | The email validation code the user has enetered into the dapp   |

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
    \"token\": \"eyJhbGciOiJIUzI1NiIs...\",
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


## Examples and demo apps
TODO: publish to GitHub
