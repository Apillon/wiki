# Good to know

The provision of Apillon Web3 services comes with certain specifics that are important to understand before using the Apillon dashboard.

Before jumping to the API section, please make sure you fully understand what to expect from each service so you can plan your Web3 application architecture and development accordingly.

## Concepts

### Centralized vs. decentralized

In the current state, Apillon is a Web3 hybrid platform, meaning that some services are still run by centralized solutions. This sort of compromise is quite common in other Web3 solutions, especially where a choice had to be made between fast development and simple UX vs. full decentralization.

That said, Apillon’s back end is designed to evolve towards fully decentralized service and an unstoppable way of operation with each new update, slowly removing the hybrid compromise and becoming a fully Web3 platform.

If you are interested in the details of Apillon’s architecture and back-end, want to open a debate around it or contribute on [GitHub](https://github.com/Apillon-web3), feel free to get in touch in the development channel on [Apillon Discord](https://discord.gg/yX3gTw36C4).

### Production vs. Beta

Apillon is currently in the Closed Beta stage. Anyone can register an account on Apillon but only assigned users may get access to test the platform’s Beta features.

To join the Apillon Closed Beta program, please follow the following steps.

1. If you do not yet have an Apillon account, create one on [https://app.apillon.io/register](https://app.apillon.io/register).
2. Log in to your account.
3. At the bottom of the welcome page, find an ID number assigned to your account.
4. Copy the ID number and paste it to the closed-beta channel on [Apillon Discord](https://discord.gg/yX3gTw36C4).
5. Wait for an email with an invitation to join the Apillon Closed Beta program and access the platform’s features.

**Note**: Apillon Closed Beta delivers no guarantees related to functionalities or access and is intended for testing purposes only. Beta features also come with several limitations, which will be removed with each platform update as more and more users deliver feedback on Closed Beta and help improve the platform’s services.

## Terminology and underlying technology

### IPFS

[IPFS](https://ipfs.tech) is a distributed system for storing and accessing files, websites, applications, and data.

When you add a file to IPFS, your file gets split into smaller chunks, is cryptographically hashed, and is given a unique fingerprint called a content identifier (CID). This CID acts as a permanent record of your file as it is at that point in time.

When other nodes search your file, they ask peer nodes which one is storing the content referenced by the file's CID. When viewing or downloading your file, they cache a copy. This way, they become a new provider of your content until their cache is cleared.

### Crust Network

[Crust Network](https://crust.network) is a decentralized cloud storage provider that pursues three core Web3 values: decentralization, privacy, and assurance. Crust supports multiple storage-layer protocols, such as IPFS, and delivers instantly accessible on-chain storage functions. Crustʼs technical stack can also support data manipulation and computing.

Crust Network has three main functions: NFT and metaverse metadata storage, personal file storage, and website/dapp hosting.

### Storage buckets

Storage buckets are Apillon’s Web3 Storage abstraction that allows developers to utilize IPFS and Crust to store files in an unstoppable, decentralized way.
