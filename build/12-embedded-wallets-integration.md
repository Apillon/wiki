# Embedded Wallet Integration

To get started with integrating embedded wallets into your dapp, follow these steps:

1. **Create an Apillon account:** If you don't have an Apillon account or project yet, create one on the [Apillon dashboard](https://app.apillon.io).

2. **Open the Embedded Wallet page and create a new embedded wallet integration:** Go to the [Embedded Wallet page](https://app.apillon.io/dashboard/service/embedded-wallet) on the Apillon developer console and create a new embedded wallet integration. `Integration UUID` is needed for the integration.

3. **Setup whitelist:** Input the domains on which you allow the integration to work on. Leave empty if you allow all website (this is not recommended).

::: tip
If you want to learn more about Apillon's Embedded Wallet Service, visit the [embedded wallet service wiki page](/web3-services/8-embedded-wallets.md).
:::

## Prerequisites

### React.js

A Vite plugin is required for running and building Vite apps with Embedded Wallet. This plugin enables Node API in the browser (eg. Buffer, Crypto).

```sh
npm install -D vite-plugin-node-polyfills
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [nodePolyfills() /* ... */],
});
```

### Next.js

To use the Embedded wallet UI, your Next app has to be in `app router` mode. When in `pages routing` mode, global css file imports throw an error. [Github Discussion](https://github.com/vercel/next.js/discussions/27953).

### Vue.js

A Vite plugin is required for running and building Vite apps with Embedded Wallet. This plugin enables Node API in the browser (eg. Buffer, Crypto).

```sh
npm install -D vite-plugin-node-polyfills
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [nodePolyfills() /* ... */],
});
```

### Nuxt

When using Vite as the build tool, a Vite plugin is required for running and building Nuxt apps with Embedded Wallet. This plugin enables Node API in the browser (eg. Buffer, Crypto).

```sh
npm i -D vite-plugin-node-polyfills
```

```ts
// nuxt.config.ts
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineNuxtConfig({
  vite: {
    plugins: [nodePolyfills()],
  },

  /* ... */
});
```

## Installation

  <CodeGroup>
  <CodeGroupItem title="react.js" active>

```sh
npm install @apillon/wallet-react
```

  </CodeGroupItem>
    <CodeGroupItem title="vue.js">

```sh
npm install @apillon/wallet-vue
```

  </CodeGroupItem>
  <CodeGroupItem title="next.js">

```sh
npm install @apillon/wallet-react
```

  </CodeGroupItem>
    <CodeGroupItem title="nuxt">
  
```sh
npm install @apillon/wallet-vue
```

  </CodeGroupItem>
  <CodeGroupItem title="TypeScript">
  
```sh
npm install @apillon/wallet-ui
```

  </CodeGroupItem>
  </CodeGroup>

Installing wallet package also installs the core wallet package `@apillon/wallet-sdk`. In usage bellow you will see some imports from this package.

## Add wallet widget

Replace parameters with however you want to setup your wallet.

Import wallet widget:

  <CodeGroup>
  <CodeGroupItem title="react.js" active>

```ts
import { WalletWidget } from "@apillon/wallet-react";
```

  </CodeGroupItem>
    <CodeGroupItem title="vue.js">

```ts
import { WalletWidget } from "@apillon/wallet-vue";
```

  </CodeGroupItem>
  <CodeGroupItem title="next.js">

```ts
import { WalletWidget } from "@apillon/wallet-react";
```

  </CodeGroupItem>
    <CodeGroupItem title="nuxt">
  
```ts
import { WalletWidget } from "@apillon/wallet-vue";
```

  </CodeGroupItem>
    <CodeGroupItem title="TypeScript">
  
```ts
import { EmbeddedWalletUI } from "@apillon/wallet-ui";
```

  </CodeGroupItem>
  </CodeGroup>

Add widget to your html:

  <CodeGroup>
  <CodeGroupItem title="react.js" active>

```tsx
<WalletWidget
  clientId={"YOUR INTEGRATION ID HERE"}
  defaultNetworkId={1287}
  networks={[
    {
      name: "Moonbeam Testnet",
      id: 1287,
      rpcUrl: "https://rpc.testnet.moonbeam.network",
      explorerUrl: "https://moonbase.moonscan.io",
    },
    {
      name: "Amoy",
      id: 80002,
      rpcUrl: "https://rpc-amoy.polygon.technology",
      explorerUrl: "https://www.oklink.com/amoy",
    },
  ]}
/>
```

  </CodeGroupItem>
    <CodeGroupItem title="vue.js">

```tsx
<WalletWidget
  clientId="clientId"
  :defaultNetworkId="1287"
  :networks="[
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
  ]"
/>
```

  </CodeGroupItem>
  <CodeGroupItem title="next.js">

```tsx
<WalletWidget
  clientId={"YOUR INTEGRATION ID HERE"}
  defaultNetworkId={1287}
  networks={[
    {
      name: "Moonbeam Testnet",
      id: 1287,
      rpcUrl: "https://rpc.testnet.moonbeam.network",
      explorerUrl: "https://moonbase.moonscan.io",
    },
    {
      name: "Amoy",
      id: 80002,
      rpcUrl: "https://rpc-amoy.polygon.technology",
      explorerUrl: "https://www.oklink.com/amoy",
    },
  ]}
/>
```

  </CodeGroupItem>
    <CodeGroupItem title="nuxt">
  
```tsx
<WalletWidget
  clientId="clientId"
  :defaultNetworkId="1287"
  :networks="[
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
  ]"
/>
```

  </CodeGroupItem>
  <CodeGroupItem title="TypeScript">

```ts
EmbeddedWalletUI("#wallet", {
  clientId: "clientId",
  defaultNetworkId: 1287,
  networks: [
    {
      name: "Moonbeam Testnet",
      id: 1287,
      rpcUrl: "https://rpc.testnet.moonbeam.network",
      explorerUrl: "https://moonbase.moonscan.io",
    },
    {
      name: "Amoy",
      id: 80002,
      rpcUrl: "https://rpc-amoy.polygon.technology",
      explorerUrl: "https://www.oklink.com/amoy",
    },
  ],
});
```

  </CodeGroupItem>
  </CodeGroup>

### Parameters

| Field                        | Type        | Description                                                                                                                                        |
| ---------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientId                     | `string`    | Client ID that you get from creating new embedded wallet on the [Apillon dashboard](<(https://app.apillon.io/dashboard/service/embedded-wallet)>). |
| defaultNetworkId (optional)  | `number`    | Chain ID set as default when opening wallet.                                                                                                       |
| networks                     | `Network[]` | Array of network specifications                                                                                                                    |
| broadcastAfterSign           | `boolean`   | Automatically broadcast with SDK after confirming a transaction.                                                                                   |
| disableDefaultActivatorStyle | `boolean`   | Remove styles from "open wallet" button                                                                                                            |
| authFormPlaceholder          | `string`    | Placeholder displayed in input for username/email                                                                                                  |

#### Network Object

| Field       | Type     | Description            |
| ----------- | -------- | ---------------------- |
| name        | `string` | Network name.          |
| id          | `number` | Chain ID.              |
| rpcUrl      | `string` | URL to RPC.            |
| explorerUrl | `string` | URL to block explorer. |

## Use wallet

To access wallet signer and wallet information we provide core imports (hooks/composables):

  <CodeGroup>
  <CodeGroupItem title="react.js" active>

```tsx
import { useAccount, useContract, useWallet } from "@apillon/wallet-react";

export default function Component() {
  const { username, address, getBalance } = useAccount();
  const { wallet, signMessage, sendTransaction } = useWallet();

  const { read, write } = useContract({
    abi: [
      "function claim() public",
      "function balanceOf(address) view returns (uint256)",
      "function transfer(address to, uint256 amount) public returns (bool)",
    ],
    address: "0x67b9DA16d0Adf2dF05F0564c081379479d0448f8",
    chainId: 1287,
  });

  return <></>;
}
```

  </CodeGroupItem>
    <CodeGroupItem title="vue.js">

```vue
<script lang="ts" setup>
import { useAccount, useContract, useWallet } from "@apillon/wallet-vue";

const { username, address, getBalance } = useAccount();
const { wallet, signMessage, sendTransaction } = useWallet();

const { read, write } = useContract({
  abi: [
    "function claim() public",
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint256 amount) public returns (bool)",
  ],
  address: "0x67b9DA16d0Adf2dF05F0564c081379479d0448f8",
  chainId: 1287,
});
</script>

<template>
  <div></div>
</template>
```

  </CodeGroupItem>
  <CodeGroupItem title="next.js">

```tsx
import { useAccount, useContract, useWallet } from "@apillon/wallet-react";

export default function Component() {
  const { username, address, getBalance } = useAccount();
  const { wallet, signMessage, sendTransaction } = useWallet();

  const { read, write } = useContract({
    abi: [
      "function claim() public",
      "function balanceOf(address) view returns (uint256)",
      "function transfer(address to, uint256 amount) public returns (bool)",
    ],
    address: "0x67b9DA16d0Adf2dF05F0564c081379479d0448f8",
    chainId: 1287,
  });

  return <></>;
}
```

  </CodeGroupItem>
    <CodeGroupItem title="nuxt">
  
```vue
<script lang="ts" setup>
import { useAccount, useContract, useWallet } from "@apillon/wallet-vue";

const { username, address, getBalance } = useAccount();
const { wallet, signMessage, sendTransaction } = useWallet();

const { read, write } = useContract({
abi: [
"function claim() public",
"function balanceOf(address) view returns (uint256)",
"function transfer(address to, uint256 amount) public returns (bool)",
],
address: "0x67b9DA16d0Adf2dF05F0564c081379479d0448f8",
chainId: 1287,
});
</script>

<template>
  <div></div>
</template>
```

  </CodeGroupItem>
  </CodeGroup>

### Ethers 5 and 6

To use with [ethers](https://ethers.org/) library we provide a specialized ethers signer.

```ts
import { EmbeddedEthersSigner } from "@apillon/wallet-sdk";
```

You can create a signer like with any other ethers signer as such:

```ts
const signer = new EmbeddedEthersSigner();

// eg. sign a message
await signer.signMessage("test message");
```

### Viem

To use [viem](https://viem.sh/) we provide a specialized Viem adapter.

```ts
import { EmbeddedViemAdapter } from "@apillon/wallet-sdk";
import { moonbaseAlpha } from "viem/chains";
```

Use can use the adapter to get the user's account and use it with Viem:

```ts
const adapter = new EmbeddedViemAdapter();
const account = adapter.getAccount();

const walletClient = createWalletClient({
  chain: moonbaseAlpha,
  transport: http(),
  account,
});

// eg. sign a message
await account.signMessage({ message: "test message" });

// eg. send a plain transaction
await walletClient.sendRawTransaction({
  serializedTransaction: await walletClient.signTransaction(
    await walletClient.prepareTransactionRequest({
      to: "...",
      value: parseUnits("0.01", 18),
    })
  ),
});
```

### Wagmi

We provide an **EIP-1193** provider that can be used with [Wagmi](https://wagmi.sh/) or any other integration that supports it.

```ts
import { getProvider as getEmbeddedProvider } from "@apillon/wallet-sdk";

const wagmiConfig = {
  /* ... */
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
};
```

### TypeScript

Embedded wallet can be used with plain TypeScript by interacting with the wallet SDK directly.

::: tip
Find out more about the SDK in [the github repository](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk)
:::

```html
<button id="sdk-sign">(SDK) Sign message</button>
<button id="sdk-native-transfer">(SDK) Transfer native balance</button>
<button id="sdk-contract-transfer">(SDK) Contract write (transfer)</button>
```

```ts
import { getEmbeddedWallet } from "@apillon/wallet-sdk";

// eg. sign a message
document.getElementById("sdk-sign")?.addEventListener("click", async () => {
  const w = getEmbeddedWallet();

  if (w) {
    await w.signMessage({
      message: "test message",
      mustConfirm: true,
    });
  }
});

// eg. send a plain transaction
document.getElementById('sdk-native-transfer')?.addEventListener('click', async () => {
  const w = getEmbeddedWallet();

  if (w) {
    const result = await w.signPlainTransaction({
      tx: {
        to: '...',
        value: '10000000',
      },
      mustConfirm: true,
    });

    console.log(result);

    if (result) {
      console.log(await w.broadcastTransaction(result.signedTxData, result.chainId));
    }
  }
});

// eg. contract write
document.getElementById('sdk-contract-transfer')?.addEventListener('click', async () => {
  const w = getEmbeddedWallet();

  if (w) {
    const result = await w.signContractWrite({
      contractAbi: [
        'function claim() public',
        'function balanceOf(address) view returns (uint256)',
        'function transfer(address to, uint256 amount) public returns (bool)',
      ],
      contractAddress: '0x67b9DA16d0Adf2dF05F0564c081379479d0448f8',
      contractFunctionName: 'transfer',
      contractFunctionValues: ['...', '10000000'],
      chainId: 1287,
      mustConfirm: true,
    });

    console.log(result);

    if (result) {
      console.log(await w.broadcastTransaction(result.signedTxData, result.chainId, 'JS transfer'));
    }
  }
});

```

## Create custom UI

All the functionalities of embedded wallets are contained in base package `@apillon/wallet-sdk`. Sdk exposes all the core methods of the wallet and you can create completely custom UI of the wallet on top of it.

::: tip
For detailed technical documentation about the embedded wallet SDK, visit [the github repository](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk)
:::

## Examples

### React

- [SDK example](https://github.com/Apillon/embedded-wallet/blob/main/apps/react-test/src/TestSdk.tsx)
- [Ethers 5 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/react-test/src/TestEthers5.tsx)
- [Ethers 6 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/react-test/src/TestEthers6.tsx)
- [Viem example](https://github.com/Apillon/embedded-wallet/blob/main/apps/react-test/src/TestViem.tsx)

### Next.js

- [SDK example](https://github.com/Apillon/embedded-wallet/blob/main/apps/next-test/src/components/TestSdk.tsx)
- [Ethers 5 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/next-test/src/components/TestEthers5.tsx)
- [Ethers 6 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/next-test/src/components/TestEthers6.tsx)
- [Viem example](https://github.com/Apillon/embedded-wallet/blob/main/apps/next-test/src/components/TestViem.tsx)

### Vue.js

- [SDK example](https://github.com/Apillon/embedded-wallet/blob/main/apps/vue-test/src/TestSdk.vue)
- [Ethers 5 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/vue-test/src/TestEthers5.vue)
- [Ethers 6 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/vue-test/src/TestEthers6.vue)
- [Viem example](https://github.com/Apillon/embedded-wallet/blob/main/apps/vue-test/src/TestViem.vue)

### Nuxt

- [SDK example](https://github.com/Apillon/embedded-wallet/blob/main/apps/nuxt-test/components/TestSdk.vue)
- [Ethers 5 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/nuxt-test/components/TestEthers5.vue)
- [Ethers 6 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/nuxt-test/components/TestEthers6.vue)
- [Viem example](https://github.com/Apillon/embedded-wallet/blob/main/apps/nuxt-test/components/TestViem.vue)

### TypeScript

- [SDK example](https://github.com/Apillon/embedded-wallet/blob/main/apps/js-test/src/sdk.ts)
- [Ethers 5 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/js-test/src/ethers5.ts)
- [Ethers 6 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/js-test/src/ethers6.ts)
- [Viem example](https://github.com/Apillon/embedded-wallet/blob/main/apps/js-test/src/viem.ts)
