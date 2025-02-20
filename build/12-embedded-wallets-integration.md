# Embedded Wallet Integration

To get started with integrating embedded wallets into your dapp, follow these steps:

1. **Create an Apillon account:** If you don't have an Apillon account or project yet, create one on the [Apillon dashboard](https://app.apillon.io).

2. **Open the Embedded Wallet page and create a new embedded wallet integration:** Go to the [Embedded Wallet page](https://app.apillon.io/dashboard/service/embedded-wallet) on the Apillon developer console and create a new embedded wallet integration. `Integration UUID` is needed for using the SDK.

3. **Setup whitelist:** Input the domains on which you allow the integration to work on. Leave empty if you allow all website (this is not recommended).

::: tip
If you want to learn more about Apillon's Embedded Wallet Service, visit the [embedded wallet service wiki page](/web3-services/9-embedded-wallets.md).
:::

## Prerequisites

### React, Vue

A Vite plugin is required for running and building Vite apps with Embedded Wallet. This plugin enables Node API in the browser (eg. buffer, crypto).

```sh
npm install -D vite-plugin-node-polyfills
```

HTTPS needs to be configured even for localhost, so that authentication can work accross multiple domains.
This can be achieved with vite-plugin-mkcert Vite plugin.

```sh
npm i vite-plugin-mkcert -D
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [nodePolyfills(), mkcert() /* ... */],
});
```

### Next.js

To use the Embedded wallet UI, your Next app has to be in `app router` mode. When in `pages routing` mode, global CSS file imports throw an error. [Github Discussion](https://github.com/vercel/next.js/discussions/27953)

Embedded wallet relies on browser APIs and it doesn't make sense to run it server-side.
To avoid errors, the component including `<EmbeddedWallet />` should be marked with `'use client';`

HTTPS needs to be configured even for localhost, so that authentication can work accross multiple domains.
In Next.js you can do this by adding `--experimental-https` to dev command.

```sh
next dev --experimental-https
```

### Nuxt

When using Vite as the build tool, a Vite plugin is required for running and building Nuxt apps with Embedded Wallet. This plugin enables Node API in the browser (eg. buffer, crypto).

```sh
npm i -D vite-plugin-node-polyfills
```

The Embedded wallet integration includes a style (CSS) file imported through JavaScript.
Nuxt fails to resolve this import by default.
To avoid errors, the Embedded wallet dependency needs to be added to the [build.transpile](https://nuxt.com/docs/api/nuxt-config#transpile) setting.

```ts
// nuxt.config.ts
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineNuxtConfig({
  vite: {
    plugins: [nodePolyfills() /* ... */],
  },
  build: {
    transpile: [/@apillon[\\/]wallet-vue/],
  },
  /* ... */
});
```

Embedded wallet relies on browser APIs and it doesn't make sense to run it server-side.
To avoid errors, wrap the wallet with `<ClientOnly />`.

```vue
<template>
  <ClientOnly>
    <EmbeddedWallet clientId="..." />
  </ClientOnly>
</template>
```

HTTPS needs to be configured even for localhost, so that authentication can work accross multiple domains.
In Nuxt.js you can do this by:

- add `--https` to dev command

- install [mkcert](https://github.com/FiloSottile/mkcert)

- make a localhost certificate in project folder: `mkcert localhost`

- edit `nuxt.config.ts` to use the certificate for the dev server

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // ...
  devServer: {
    https: {
      key: "localhost-key.pem",
      cert: "localhost.pem",
    },
  },
});
```

## Installation

  <CodeGroup>
  <CodeGroupItem title="React / Next.js" active>

```sh
npm install @apillon/wallet-react
```

  </CodeGroupItem>
    <CodeGroupItem title="Vue / Nuxt">

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

Installing the wallet UI also installs the core wallet package `@apillon/wallet-sdk` as a dependency.

In the usage examples below you will see some imports from this package.

## Add wallet widget

Replace the parameters with however you wish to setup your wallet.

  <CodeGroup>
  <CodeGroupItem title="React / Next.js" active>

```tsx
import { EmbeddedWallet } from "@apillon/wallet-react";

<EmbeddedWallet
  clientId={"YOUR INTEGRATION UUID HERE"}
  defaultNetworkId={1287}
  networks={[
    {
      name: "Moonbase Testnet",
      id: 1287,
      rpcUrl: "https://rpc.testnet.moonbeam.network",
      explorerUrl: "https://moonbase.moonscan.io",
    },
    /* ... */
  ]}
/>;
```

  </CodeGroupItem>
    <CodeGroupItem title="Vue / Nuxt">

```tsx
import { EmbeddedWallet } from "@apillon/wallet-vue";

<EmbeddedWallet
  clientId="YOUR INTEGRATION UUID HERE"
  :defaultNetworkId="1287"
  :networks="[
    {
      name: 'Moonbase Testnet',
      id: 1287,
      rpcUrl: 'https://rpc.testnet.moonbeam.network',
      explorerUrl: 'https://moonbase.moonscan.io',
    },
    /* ... */
  ]"
/>
```

  </CodeGroupItem>
  <CodeGroupItem title="TypeScript">

```ts
import { EmbeddedWalletUI } from "@apillon/wallet-ui";

EmbeddedWalletUI("#wallet", {
  clientId: "YOUR INTEGRATION UUID HERE",
  defaultNetworkId: 1287,
  networks: [
    {
      name: "Moonbase Testnet",
      id: 1287,
      rpcUrl: "https://rpc.testnet.moonbeam.network",
      explorerUrl: "https://moonbase.moonscan.io",
    },
    /* ... */
  ],
});
```

  </CodeGroupItem>
  </CodeGroup>

### Parameters

| Field                        | Type              | Required | Description                                                                                                                                                    |
| ---------------------------- | ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientId                     | `string`          | Yes      | UUID of the integration that you obtain when creating it on the [Apillon embedded wallet dashboard](https://app.apillon.io/dashboard/service/embedded-wallet). |
| passkeyAuthMode              | `AuthPasskeyMode` | No       | Method for authenticating with passkey to make it global. Default is `redirect`                                                                                |
| defaultNetworkId             | `number`          | No       | Chain ID set as default when opening wallet.                                                                                                                   |
| networks                     | `Network[]`       | No       | Array of network specifications                                                                                                                                |
| broadcastAfterSign           | `boolean`         | No       | Automatically broadcast with SDK after confirming a transaction.                                                                                               |
| disableDefaultActivatorStyle | `boolean`         | No       | Remove styles from "open wallet" button                                                                                                                        |
| authFormPlaceholder          | `string`          | No       | Placeholder displayed in input for username/email                                                                                                              |

#### AuthPasskeyMode

| Option        | Description                                    |
| ------------- | ---------------------------------------------- |
| `popup`       | Process registration in a browser popup window |
| `redirect`    | Open registration form in the same tab         |
| `tab_form`    | Open registration form in a new tab            |

#### Network Object

The Network Object defines the properties required to connect to a blockchain network.

::: tip
To find the information for your desired network, visit [chainlist.org](https://chainlist.org).
:::

| Field            | Type     | Description                                                         |
| ---------------- | -------- | ------------------------------------------------------------------- |
| name             | `string` | The name of the network                                             |
| id               | `number` | The unique Chain ID of the network                                  |
| rpcUrl           | `string` | The URL to the network's RPC server                                 |
| explorerUrl      | `string` | The URL to the network's block explorer                             |
| imageUrl         | `string` | Optional. Icon of the chain for display in UI                       |
| currencySymbol   | `string` | Optional. Symbol of the native currency (default is 'ETH')          |
| currencyDecimals | `number` | Optional. Number of decimals of the native currency (default is 18) |

### Button style

You can style the activator button by targeting `#oaw-wallet-widget-btn` css ID.
Use `disableDefaultActivatorStyle` option to make the button unstyled.

You can also hide the activator button (`display: none;`) and open the wallet programmatically, eg. from a menu item or your own button.

```ts
// const wallet = getEmbeddedWallet();
wallet.events.emit("open", true);
```

## Use wallet

To access wallet signer and wallet information we provide core imports (hooks/composables):

  <CodeGroup>
  <CodeGroupItem title="React / Next.js" active>

```tsx
import { useAccount, useContract, useWallet } from "@apillon/wallet-react";

export default function Component() {
  const { info, getBalance } = useAccount();
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

  // using wallet core SDK
  const getWalletUserExists = (username: string) => {
    return wallet.userExists(username);
  };

  // get account info
  const getAccountInfo() = async () => {
    console.log(info.address);
    console.log(await getBalance());
  }

  // sign a message
  const onSignMessage = async (msg: string) => {
    await signMessage(msg);
  };

  // contract read
  const logContractBalance = async (address: string) => {
    console.log(await read("balanceOf", [address]));
  };

  // contract write
  const onContractTransfer = async (address: string, amount: string) => {
    await write("transfer", [address, amount], "Token transfer");
  };

  return <></>;
}
```

  </CodeGroupItem>
    <CodeGroupItem title="Vue / Nuxt">

```vue
<script lang="ts" setup>
import { useAccount, useContract, useWallet } from "@apillon/wallet-vue";

const { info, getBalance } = useAccount();
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

// using wallet core SDK
function getWalletUserExists(username: string) {
  return wallet.value.userExists(username);
}

// get account info
async function getAccountInfo() {
  console.log(info.address);
  console.log(await getBalance());
}

// sign a message
async function onSignMessage(msg: string) {
  await signMessage(msg);
}

// contract read
async function logContractBalance(address: string) {
  console.log(await read("balanceOf", [address]));
}

// contract write
async function onContractTransfer(address: string, amount: string) {
  await write("transfer", [address, amount], "Token transfer");
}
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

::: warning
Beware when changing wallet chain after initializing any ethers object (e.g. `const myContract = new ethers.Contract(..., signer);`).
These objects are not reactive by default, so the previous chain will be used.

Events `'chainChanged'` and `'dataUpdated'` on `embeddedWallet.events` are emitted when wallet chain is updated, you can use these events to reinitialize any stale objects.
:::

::: details Chain change event handler example

```js
getEmbeddedWallet()?.events.on("dataUpdated", ({ name, newValue }) => {
  if (name === "defaultNetworkId") {
    // ...
  }
});
```

:::

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

::: warning
Beware when changing wallet chain after initializing any viem object with a specific chain (e.g. `const walletClient = createWalletClient(...);`).
If not changed, this chain will be used even after changing chain in the wallet.

Events `'chainChanged'` and `'dataUpdated'` on `embeddedWallet.events` are emitted when wallet chain is updated, you can use these events to reinitialize any stale objects (or update reactive state e.g.).
:::

::: details Chain change event handler example

```js
getEmbeddedWallet()?.events.on("dataUpdated", ({ name, newValue }) => {
  if (name === "defaultNetworkId") {
    // ...
  }
});
```

:::

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

<CodeGroup>
<CodeGroupItem title="Sign message" active>

```ts
import { getEmbeddedWallet } from "@apillon/wallet-sdk";

document.getElementById("sdk-sign")?.addEventListener("click", async () => {
  const w = getEmbeddedWallet();

  if (w) {
    await w.signMessage({
      message: "test message",
      mustConfirm: true,
    });
  }
});
```

</CodeGroupItem>
<CodeGroupItem title="Plain transaction">

```ts
import { getEmbeddedWallet } from "@apillon/wallet-sdk";

document
  .getElementById("sdk-native-transfer")
  ?.addEventListener("click", async () => {
    const w = getEmbeddedWallet();

    if (w) {
      const result = await w.signPlainTransaction({
        tx: {
          to: "...",
          value: "10000000",
        },
        mustConfirm: true,
      });

      console.log(result);

      if (result) {
        console.log(
          await w.broadcastTransaction(result.signedTxData, result.chainId)
        );
      }
    }
  });
```

</CodeGroupItem>
<CodeGroupItem title="Contract transfer" active>

```ts
import { getEmbeddedWallet } from "@apillon/wallet-sdk";

document
  .getElementById("sdk-contract-transfer")
  ?.addEventListener("click", async () => {
    const w = getEmbeddedWallet();

    if (w) {
      const result = await w.signContractWrite({
        contractAbi: [
          "function claim() public",
          "function balanceOf(address) view returns (uint256)",
          "function transfer(address to, uint256 amount) public returns (bool)",
        ],
        contractAddress: "0x67b9DA16d0Adf2dF05F0564c081379479d0448f8",
        contractFunctionName: "transfer",
        contractFunctionValues: ["...", "10000000"],
        chainId: 1287,
        mustConfirm: true,
      });

      console.log(result);

      if (result) {
        console.log(
          await w.broadcastTransaction(
            result.signedTxData,
            result.chainId,
            "JS transfer"
          )
        );
      }
    }
  });
```

</CodeGroupItem>
</CodeGroup>

## Create custom UI

All the functionalities of embedded wallets are contained in base package `@apillon/wallet-sdk`. The SDK exposes all the core methods of the wallet and you can create a completely custom UI of the wallet on top of it.

::: tip
For detailed technical documentation about the embedded wallet SDK, visit [the github repository](https://github.com/Apillon/embedded-wallet/tree/main/packages/sdk)
:::

## NPM Packages
- [Embedded Wallet SDK (@apillon/wallet-sdk)](https://www.npmjs.com/package/@apillon/wallet-sdk)
- [Embedded Wallet UI (@apillon/wallet-ui)](https://www.npmjs.com/package/@apillon/wallet-ui)
- [Embedded Wallet React UI (@apillon/wallet-react)](https://www.npmjs.com/package/@apillon/wallet-react)
- [Embedded Wallet Vue UI (@apillon/wallet-vue)](https://www.npmjs.com/package/@apillon/wallet-vue)

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
