# Developing Web3 with Apillon

<div class="divider"></div>

## Challenges of blockchain complexity

When building on Web3, be it within the Polkadot ecosystem or in general, developers face challenges that still lack proper addressing.

* Difficult choice and understanding of new protocols and solutions launched every month
* Each protocol and parachain dedicated to an isolated use case
* Low protocol-level thinking
* Custom token for every protocol
* Potentially high token volatility
* UX and documentation issues

With these obstacles in mind, the process of building a Web3 product from scratch soon becomes a complex, time-consuming, and potentially even risky business.

To overcome them, developers would need to:
* Have a solid understanding and experience employing blockchain technology
* Select a network and/or parachain on which to build a decentralized app
* Research protocols of the chosen network and/or parachain
* Buy and use network/parachains native tokens to use its services
* Learn how to integrate and combine those services
* Build, implement, shift, test, see how users respond, edit and adapt, rinse and repeat
* Maintain their Web3 product in the following years, and update according to all protocol changes

Using Apillon, on the other hand, the process of developing a Web3 product is radically different.

## Web3 Development with and without Apillon

**Example #1: Building on KILT Protocol***

To build a simple Web3 app utilizing KILT Protocol for user authentication from scratch, a developer needs to do (at least) the following:
* Research the KILT Documentation
* Configure and integrate the KILT Protocol
* Generate and manage KILT’s Decentralized Identifiers (DIDs)
* Attest the validity and functionality of the outcome
* Handle the custody, purchase, and payments of the KILT token
* Upgrade and maintain the end product with protocol upgrades

Using the Apillon platform, on the other hand, a developer simply calls a function (e. g., `createUserWithEmailAndPassword`) from the Apillon SDK and sends the required parameters. The function creates a fully working user DID in the back end.

**Example #2: Building on Crust***

To build a simple Web3 app utilizing Crust for file storage from scratch, a developer needs to do (at least) the following:
* Research the Crust documentation
* Configure and integrate the Crust Protocol
* Handle the custody, purchase, and payments of the CRU token
* Manage the FILE expiry
* Upgrade and maintain the end product with protocol upgrades

Using the Apillon platform, on the other hand, a developer simply calls the `getStorage()` SDK function and moves the files to a decentralized, pinned service provided by Crust and IPFS.

In both cases, the resources spent on building a functional Web3 application with Apillon are significantly reduced, and the product’s go-to-market trajectory much shorter and streamlined.

**Disclaimer: These examples are technically highly simplified to illustrate the problematic context of building a Web3 product to the general public, whereas in technical reality, the process is much more complex. Examples used do not intend to imply in any way that either KILT or Crust are challenging to use but merely to show that these processes require serious work and introduce friction in cases where developers utilize several parachains to build a single solution.*
