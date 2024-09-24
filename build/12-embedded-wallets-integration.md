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

## Github repositories and packages

- [Embedded Wallet SDK](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk)
- [Embedded Wallet UI](https://github.com/Apillon/embedded-wallet/tree/main/packages/ui)
- [Embedded Wallet React UI](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk-react)
- [Embedded Wallet Vue UI](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk-vue)
