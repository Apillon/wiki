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
  </CodeGroup>

Add widget to your html:

  <CodeGroup>
  <CodeGroupItem title="react.js" active>

```js
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
      name: "Celo Alfajores Testnet",
      id: 44787,
      rpcUrl: "https://alfajores-forno.celo-testnet.org",
      explorerUrl: "https://explorer.celo.org/alfajores",
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

```js
<WalletWidget
  :clientId="clientId"
  :defaultNetworkId="1287"
  :networks="[
    {
      name: 'Moonbeam Testnet',
      id: 1287,
      rpcUrl: 'https://rpc.testnet.moonbeam.network',
      explorerUrl: 'https://moonbase.moonscan.io',
    },
    {
      name: 'Celo Alfajores Testnet',
      id: 44787,
      rpcUrl: 'https://alfajores-forno.celo-testnet.org',
      explorerUrl: 'https://explorer.celo.org/alfajores',
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

```js
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
      name: "Celo Alfajores Testnet",
      id: 44787,
      rpcUrl: "https://alfajores-forno.celo-testnet.org",
      explorerUrl: "https://explorer.celo.org/alfajores",
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
  
```js
<WalletWidget
  :clientId="clientId"
  :defaultNetworkId="1287"
  :networks="[
    {
      name: 'Moonbeam Testnet',
      id: 1287,
      rpcUrl: 'https://rpc.testnet.moonbeam.network',
      explorerUrl: 'https://moonbase.moonscan.io',
    },
    {
      name: 'Celo Alfajores Testnet',
      id: 44787,
      rpcUrl: 'https://alfajores-forno.celo-testnet.org',
      explorerUrl: 'https://explorer.celo.org/alfajores',
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
  </CodeGroup>

### Setup parameters

| Field                       | Type        | Description                                                                                                                                        |
| --------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientId                    | `string`    | Client ID that you get from creating new embedded wallet on the [Apillon dashboard](<(https://app.apillon.io/dashboard/service/embedded-wallet)>). |
| defaultNetworkId (optional) | `number`    | Chain ID set as default when opening wallet.                                                                                                       |
| networks                    | `Network[]` | Array of network specifications                                                                                                                    |

#### Network Object

| Field       | Type     | Description            |
| ----------- | -------- | ---------------------- |
| name        | `string` | Network name.          |
| id          | `number` | Chain ID.              |
| rpcUrl      | `string` | URL to RPC.            |
| explorerUrl | `string` | URL to block explorer. |

## Use wallet

To access wallet signer and wallet information we provide basic imports:

  <CodeGroup>
  <CodeGroupItem title="react.js" active>

```ts
import { useWallet, useAccount } from "@apillon/wallet-react";
```

  </CodeGroupItem>
    <CodeGroupItem title="vue.js">

```ts
import { useWallet, useAccount } from "@apillon/wallet-vue";
```

  </CodeGroupItem>
  <CodeGroupItem title="next.js">

```ts
import { useWallet, useAccount } from "@apillon/wallet-react";
```

  </CodeGroupItem>
    <CodeGroupItem title="nuxt">
  
```ts
import { useWallet, useAccount } from "@apillon/wallet-vue";
```

  </CodeGroupItem>
  </CodeGroup>

and exposing information via:

```ts
const { username, address } = useAccount();
const { wallet } = useWallet();
```

### Ethers 5 and 6

To use with [ethers](https://ethers.org/) library we provide you with a specialized ethers signer.

```ts
import { EmbeddedEthersSigner } from "@apillon/wallet-sdk";
```

You can create a signer like with any other ethers signer as such:

```ts
const signer = new EmbeddedEthersSigner(wallet.getRpcProviderForChainId(1287));
```

### Viem

To use [viem](https://viem.sh/) we provide you with a specialized viem adapter.

```ts
import { EmbeddedViemAdapter } from "@apillon/wallet-sdk";
```

Use can use the adapter like any other:

```ts
const adapter = new EmbeddedViemAdapter();
const account = adapter.getAccount();

const walletClient = createWalletClient({
  chain: moonbaseAlpha,
  transport: http(),
  account,
});
```

## Create custom UI

All the functionalities of embedded wallets are contained in base package `@apillon/wallet-sdk`. Sdk exposes all the core methods of the wallet and you can create completely custom UI of the wallet on top of it.

::: tip
For detailed technical documentation about the embedded wallet SDK, visit [the github repository](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk)
:::

## Examples

### React

- [Ethers 5 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/react-test/src/TestEthers5.tsx)
- [Ethers 6 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/react-test/src/TestEthers6.tsx)
- [Viem example](https://github.com/Apillon/embedded-wallet/blob/main/apps/react-test/src/TestViem.tsx)

### Next.js

- [Ethers 5 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/next-test/src/components/TestEthers5.tsx)
- [Ethers 6 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/next-test/src/components/TestEthers6.tsx)
- [Viem example](https://github.com/Apillon/embedded-wallet/blob/main/apps/next-test/src/components/TestViem.tsx)

### Vue.js

- [Vue.js Ethers 5 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/vue-test/src/TestEthers5.vue)
- [Vue.js Ethers 6 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/vue-test/src/TestEthers6.vue)
- [Vue.js Viem example](https://github.com/Apillon/embedded-wallet/blob/main/apps/vue-test/src/TestViem.vue)

### Nuxt

- [Nuxt Ethers 5 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/nuxt-test/components/TestEthers5.vue)
- [Nuxt Ethers 6 example](https://github.com/Apillon/embedded-wallet/blob/main/apps/nuxt-test/components/TestEthers6.vue)
- [Nuxt Viem example](https://github.com/Apillon/embedded-wallet/blob/main/apps/nuxt-test/components/TestViem.vue)
