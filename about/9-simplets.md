# Simplets

## What are simplets?

**Simplets** (short for "simple templates") are plug-and-play Web3 marketing solutions built on the Apillon platform. They are designed to help **anyone** - users, agencies, developers, and brands deploy powerful NFT-based experiences with minimal effort and no Web3 or software development expertise required. Each Simplet is a prebuilt, customizable template that simplifies the process of distributing NFTs to build community engagement, promote events, and reward loyalty.

By removing the complexity from the NFT deployment and user onboarding process, Simplets make Web3 campaigns as easy as sending automated emails or scanning a QR code, while the technical magic happens behind the scenes.

## Why Simplets?

Web3 adoption has been held back by complex tools and steep learning curves. Simplets solve this by giving marketers, project managers, and developers **a frictionless way to launch NFT campaigns** - no wallet setup, no coding, and no blockchain headaches. They allow users to interact with NFTs via familiar digital flows like email, QR codes, or public links, while ensuring secure, decentralized technology powers everything in the background.

## Available Simplet solutions

Apillon currently offers three distinct Simplet templates, each serving a unique marketing or engagement goal:

#### 1. **Brand Booster**

Reward loyal users or selected community members with NFTs sent directly to their email or wallet. Ideal for campaigns targeting your existing user base. You can use this solution if you already have a precompiled list of emails or wallets you want to target and send rewards to.

**Use Case Examples:**

* Customer loyalty rewards
* Email-based NFT campaigns
* Thank-you NFT drops

#### 2. **Event Experience**

Enable event participants to mint or claim NFTs in real time, either by scanning a QR code or visiting a dedicated link. This simplet should be used for in-person or online events, meant for rewarding the attendees.

**Use Case Examples:**

* On-site event engagement
* Ticket NFTs or proof-of-attendance tokens (POAPs)
* Event memorabilia NFTs

#### 3. **NFT Wild West**

No rules, no barriers. This is an open drop accessible by anyone, perfect for viral, growth-focused campaigns. You receive a dedicated claim link, where anybody can connect their wallet or create a new one using Apillon's embedded wallet solution, and instantly mint an NFT from the collection.

**Use Case Examples:**

* Open-access campaigns
* Viral giveaways
* Community growth via sharing and minting

✨ **More templates are on the way!** Stay tuned, and for feature ideas, support, or feedback, feel free to join our community.

## What you get with each Simplet

Each Simplet offers a complete, user-friendly and fully customizable UI experience. Here’s how it works:

#### Setup flow:

1. **Create NFT Collection**
   Use Apillon’s NFT Wizard and utilize the [NFT service](/web3-services/4-nfts.md) to generate and deploy your collection.

2. **Launch with a few clicks**
   Use Apillon's dedicated simplets dashboard to deploy and release a simplet of your choice

3. **Customize Everything**
   Match your brand's voice and style - from visuals to messaging to email content.

4. **Choose Distribution Style**
   Options include email-based drops, airdrops, QR-code claims at events, and open web links.

5. **Dedicated Admin Dashboard**
   As part of the simplet dashboard, you receive a page which only you can access with your wallet and can use to monitor and make edits to your simplet.  Monitor claims, interactions, and conversions via the Apillon dashboard.

#### End-user experience:

* **Frictionless Claiming:** Users can access a claim link via email, link or QR code, or get a direct airdrop to their wallet. No wallet? No problem. Apillon's [embedded wallet service](/web3-services/9-embedded-wallets.md) has got your users covered.
* **Secure by Default:** Embedded wallets, encrypted private keys, and privacy-friendly flows.
* **Familiar Interfaces:** Looks and feels like standard Web2 experiences (email confirmations, QR scans, etc.).

## Simplet auto-deployment

All Simplets are **auto-deployed using Web3-native infrastructure**, combining cutting-edge decentralized services. This eliminates the need for you to get your hands dirty with technical nitty-gritty. You can trigger a deployment of your own simplet through the simplets dashboard on the [Apillon Dashboard](https://app.apillon.io)

#### Under the hood:

* **Frontend:** Hosted on [Apillon’s decentralized web3 hosting](/web3-services/3-web3-hosting.md)
* **Backend:** Deployed as a **Docker image on Phala Network's TEE-based decentralized cloud platform**. Utilizes Apillon's [Web3 Computing Service](/web3-services/7-web3-compute.md)
* **Wallets:** [Embedded wallet](/web3-services/9-embedded-wallets.md) support for seamless user onboarding
* **Web3 Services:**
  * Web3 Storage
  * Web3 Hosting
  * Web3 Identity
  * Web3 Compute
  * Embedded Wallets
  * ERC standards support (ERC-721, ERC-1155)

These components work together to ensure scalability, security, and decentralization while preserving ease of use.

## NFT Studio: developer access

For developers and teams looking to customize or extend their Simplet experience, the [**NFT Studio** GitHub repository](https://github.com/Apillon/nft-studio-simplet) provides **the full source code** for all Simplets in a single, neat monorepo.

#### Key technologies used:

* **Frontend:** Vue.js
* **Backend:** Node.js + Express.js
* **Database:** MySQL
* **DevOps:** Docker-based deployment
* **Security:** Embedded wallets with wallet-based login, using **TEE (Trusted Execution Environment)** nodes to safely handle credentials

#### What developers can do:

* Clone or fork the repo
* Modify styles, logic, or templates
* Deploy customized versions manually via the [Apillon Developer Console](https://app.apillon.io/)

Perfect for those who want to build custom integrations, complex logic, or advanced branding into their campaigns.

## Join the community

Want to suggest new templates, need help, or just curious how others are using Simplets? Join our [community](/about/7-community.md) and let’s build the future of Web3 marketing - together.
