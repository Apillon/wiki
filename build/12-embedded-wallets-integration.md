# Embedded Wallet Integration

If you want to learn more about Apillon's Embedded Wallet Service, visit the [embedded wallet service wiki page](/web3-services/8-embedded-wallets.md).

To get started with integrating embedded wallets into your dapp, follow these steps:

1. **Create an Apillon account:** If you don't have an Apillon account or project yet, create one on the [Apillon dashboard](https://app.apillon.io).

2. **Open the Embedded Wallet page and generate an API key:** Go to the [Embedded Wallet page](https://app-dev.apillon.io/dashboard/service/embedded-wallet) on the Apillon developer console and generate an API key for the Wallet service with the KEY_EXECUTE permission.

3. **Securely store API key:** It's crucial to securely store your API key and its secret. These will be used to interact with Apillon's API, create sessions, and verify user emails. This should be done on the server side.

## Embedded Wallet JS SDK

**Overview**

Apillon’s front-end SDK allows developers to seamlessly integrate embedded wallets into their dapps. This guide provides detailed instructions on implementing and configuring the embedded wallet using various SDK packages.

The packages include core Typescript implementation, React wrapper, Vue wrapper, and a default wallet user interface package.

The core SDK revolves around the `EmbeddedWallet` class, offering methods for Oasis Sapphire chain authentication and wallet management.

::: tip
For detailed technical documentation about the embedded wallet SDK, visit [the github repository](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk)
:::

**Initialization**

Initialize `EmbeddedWallet` with `initializeOnWindow()`, providing configuration options such as production URLs, account manager address, network IDs, and custom signature callbacks.

::: warning
By default, Oasis Sapphire mainnet is used. For developing, **test** option must be added so that testnet is used instead.
:::

**Example:**

```typescript
import { initializeOnWindow } from "@apillon/wallet-sdk";

initializeOnWindow({
  test: true,
  accountManagerAddress: "0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1",
  defaultNetworkId: 1287,
  networkConfig: {
    /* Custom network configuration */
    1287: {
      rpcUrl: "https://rpc.testnet.moonbeam.network",
      explorerUrl: "https://moonbase.moonscan.io",
    },
  },
  onGetSignature: async (gaslessData) => {
    // Custom signature generation logic
  },
  onGetApillonSessionToken: async () => {
    // Fetch Apillon session token
  },
});
```

### Embedded Wallet UI

The UI package offers a default interface for managing connected accounts and handling transaction confirmations. If your project requires advanced customizations though, embedded wallet should be used directly with the core SDK. You can roll your own entire UI implementation.

The default UI is included with our React and Vue packages.

::: tip
For detailed technical documentation about the embedded wallet UI, visit [the github repository](https://github.com/Apillon/embedded-wallet/tree/main/packages/ui)
:::

**Initialization**

Use `initializeApp('.selector', options)` to set up both the SDK and UI. Configuration options include core options and some additional UI-specific adjustments.

The UI includes a wallet modal activator by default, inserted on DOM element specified by the first parameter.

**Example:**

```javascript
import { initializeApp } from "@apillon/wallet-ui";

initializeApp("#open-wallet-button-selector", { ... });
```

### React

```tsx
import { WalletWidget } from "@apillon/wallet-react";

<WalletWidget
  test
  accountManagerAddress="0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1"
  isAuthEmail={false}
  defaultNetworkId={1287}
  networks={[
    {
      name: "Moonbeam Testnet",
      id: 1287,
      rpcUrl: "https://rpc.testnet.moonbeam.network",
      explorerUrl: "https://moonbase.moonscan.io",
    },
  ]}
/>;
```

### Vue

```vue
<script setup>
import { WalletWidget } from "@apillon/wallet-vue";
</script>

<template>
  <WalletWidget
    test
    accountManagerAddress="0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1"
  />
</template>
```

## Blockchain interaction

The SDK exposes core methods for interacting with blockchain.
Additionally, there are adapters that offer support for standard and most popular web3 libraries.

::: tip
For detailed technical documentation about the embedded wallet SDK, visit [the github repository](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk)
:::

```ts
import { getEmbeddedWallet, ERC20Abi } from "@apillon/wallet-sdk";

const wallet = getEmbeddedWallet();

// Sign message
const msg = await wallet?.signMessage({
  mustConfirm: true,
  strategy: "passkey",
  message: "Sign this message",
});

// Contract write
await wallet?.signPlainTransaction({
  mustConfirm: true,
  strategy: "passkey",
  tx: {
    to: "0xCbc06F10A16cB36e6719BCdC231F8935Dd035efw",
    data: "0x",
    gasLimit: 1_000_000,
    value: "5000000000000000",
    chainId: 23295,
    gasPrice: 100_000_000_000,
  },
});
```

### EIP-1193

Probably the easeiest way to get started with embedded wallet on an existing project.
Get the provider with `getProvider()` that adheres to EIP-1193 and use it as an injected wallet provider.

```ts
import { getProvider as getEmbeddedProvider } from '@apillon/wallet-sdk';

const p = getEmbeddedProvider();

// Plain provider requests
const accounts = await p.request({ method: 'eth_requestAccounts' });
await p.request({
  method: 'eth_sign',
  params: [accounts[0], `0xTest message`],
});

// With ethers.js
new ethers.providers.Web3Provider(getEmbeddedProvider(), 'any');

// With wagmi
const wagmiConfig = {
  ...,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        getProvider() {
          return getEmbeddedProvider() as any;
        },
      },
    }),
  ],
}
```

### Ethers.js

The SDK can be integrated with Ethers.js using `OasisEthersSigner`. This allows you to use its API for blockchain interaction.

**Example:**

```typescript
import { OasisEthersSigner } from "@apillon/wallet-sdk";
const signer = new OasisEthersSigner(ethProvider);

// Sign message
const signed = await signer.signMessage("Please sign here");

// Use contract
const testContract = new ethers.Contract(
  "0xb1051231231231231231231231231231234D0663",
  contractAbi,
  signer
);
```

### Viem

Similarly, the SDK can be integrated with Viem, using `EmbeddedViemAdapter`.

```ts
import { EmbeddedViemAdapter } from "@apillon/wallet-sdk";
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from "viem";
import { moonbaseAlpha } from "viem/chains";

const adapter = new EmbeddedViemAdapter();
const acc = adapter.getAccount();

// Sign
const signed = await acc.signMessage({ message: "Please sign here via viem" });

// Use contract
const testContract = getContract({
  address: "0xb1058eD01451B947A836dA3609f88C91804D0663",
  abi: contractAbi,
  client: {
    public: createPublicClient({
      chain: moonbaseAlpha,
      transport: http(),
    }),
    wallet: createWalletClient({
      chain: moonbaseAlpha,
      transport: http("https://rpc.testnet.moonbeam.network"),
      account: acc,
    }),
  },
});
```

### Examples and demo apps

- [Backend app demo](https://github.com/Apillon/embedded-wallet/tree/main/apps/embedded-wallet-demo-api)
- [Frontend app demo](https://github.com/Apillon/embedded-wallet/tree/main/apps/embedded-wallet-demo)
- [React demo](https://github.com/Apillon/embedded-wallet/tree/main/apps/react-test)
- [Vue demo](https://github.com/Apillon/embedded-wallet/tree/main/apps/vue-test)

## Embedded Wallet API

To interact with the Oasis Sapphire account manager's smart contract, you require a session token that can be obtained from the Apillon API through the endpoint `GET https://api.apillon.io/embedded-wallet/session-token`.

The session token can then be used to call the following endpoints:

- `POST /embedded-wallet/signature` - Obtain a signature which should be passed as the return result of the "onGetSignature" callback.
- `POST /embedded-wallet/otp/generate` - Optional - Send a verification code to verify the user's email
- `POST /embedded-wallet/otp/validate` - Optional - Validate the email address after the user has entered the verification code.

For more information, see the section below about the API endpoints.

::: tip
To avoid exposing your API key to the client, it is recommended that you use a back-end service to call the /session-token endpoint. The rest of the endpoints can be called from your front end by using the session token; however, for safety reasons, it is recommended to call the Apillon API from a back-end service.
:::

## API endpoints

The following API endpoints will be used during the embedded wallet generation flow.

### Get a session token

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

### Generate contract signature

> This endpoint generates a signature that is used to authorize the account manager's smart contract to create a new wallet on behalf of the user who requested it on your dapp.

<CodeDiv>POST /embedded-wallet/signature</CodeDiv>

<div class="split_content">
	<div class="split_side">

#### Body parameters

| Name  | Description                                             |
| ----- | ------------------------------------------------------- |
| token | The JWT token obtained from the /session-token endpoint |

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
| token | The JWT token obtained from the /session-token endpoint |
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
| token | The JWT token obtained from the /session-token endpoint       |
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

## Github repositories and packages

- [Embedded Wallet SDK](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk)
- [Embedded Wallet UI](https://github.com/Apillon/embedded-wallet/tree/main/packages/ui)
- [Embedded Wallet React UI](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk-react)
- [Embedded Wallet Vue UI](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk-vue)
