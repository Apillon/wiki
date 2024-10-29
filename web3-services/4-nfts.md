# NFTs

Apillon NFT service supports drag-and-drop compilation, deployment, and minting of non-fungible assets.

Service currently supports creating NFT collections on multiple EVM and substrate chains:
 - [Moonbeam Network](https://blog.apillon.io/guide-nft-service-pt-2-create-and-deploy-nft-collection-on-moonbeam-2d7eedf79756) (EVM and Substrate based NFTs)
 - [Astar Network](https://blog.apillon.io/guide-nft-service-create-and-deploy-nft-collection-on-astar-3d6674994b0f) (Substrate based NFTs)
 - [Unique Network](https://blog.apillon.io/guide-nft-service-create-and-deploy-nft-collection-on-astar-3d6674994b0f) (Substrate based NFTs)

## NFT media

NFT media are at the front and center of an NFT collection.

Apillon NFT Service currently runs on the Moonbeam, Astar and Unique parachains, and supports
[ERC-721](https://eips.ethereum.org/EIPS/eip-721) and [ERC-6059](https://eips.ethereum.org/EIPS/eip-6059) standards for NFTs on EVM and [PSP-34](https://github.com/w3f/PSPs/blob/master/PSPs/psp-34.md) standard and [Unique Native NFTs](https://docs.unique.network/about/nft-features/native.html) for substrate.

The ERC-721 standard packs any file format into permanently stored content on the blockchain. Thanks to Moonbeam’s and Astar’s EVM compatibility, it can be deployed quickly and efficiently with Apillon.

Native NFTs on Unique Network are streamlined, blockchain-integrated tokens that offer simplicity, speed, cost-efficiency, and enhanced security, eliminating the complexities of traditional smart contract-based NFTs.

[Learn more >](https://blog.apillon.io/guide-nft-service-pt-1-generate-nft-art-with-ai-and-get-files-ready-200168b6b303#eb24)

## NFT metadata

NFT metadata is the backbone of an NFT collection and communicates the essential information of NFT files — the file name and format, date of creation, owner, etc.

It can also include certain attributes that make an NFT one of a kind.

As an essential component of NFT collections, metadata should be managed and stored carefully. To ensure its permanent access free of third-party intervention, Apillon stores it either on-chain via [Unique metadata schema](https://docs.unique.network/reference/schemas/#unique-metadata-schema-v2) or on a decentralized network with [Apillon Web3 Storage bucket](/web3-services/1-good-to-know.html#web3-storage), [Crust Network](https://crust.network/), and [IPFS](https://ipfs.tech/).

Apillon supports metadata that is structured according to the [official OpenSea metadata standard](https://docs.opensea.io/docs/metadata-standards).

[Learn more >](https://blog.apillon.io/guide-nft-service-pt-1-generate-nft-art-with-ai-and-get-files-ready-200168b6b303#a060)

## NFT deployment

To deploy an NFT collection on either the Moonbeam or Astar Network, follow the process below:

1. Log in to your [Apillon account](https://app.apillon.io/register).
2. In the menu on the left, navigate to NFTs, and click "Start creating NFTs."
3. Upload NFT metadata in CSV format to a decentralized network to keep it permanently accessible and [prevent losing access to it](https://blog.apillon.io/why-decentralized-storage-matters-for-nft-metadata-and-your-next-nft-collection-b7b90fc3762). When uploaded using the drag-and-drop NFT wizard, the metadata file is automatically stored using the Apillon [Web3 Storage bucket](/web3-services/1-good-to-know.html#storage-bucket). It can also be uploaded manually in the Web3 Storage service and deployed by calling the metadata URI.
4. Upload NFT files from local storage, and double-check if the number of files matches the file numbers in the metadata file.
5. Preview NFTs, both in table and list view, to verify the parsing of the CSV metadata file. Check for potential mismatches between NFT files and their metadata.
6. Choose the name, symbol, and network (Chain) to deploy your collection, either Moonbeam Mainnet, Moonbeam Testnet, or Astar Mainnet.
7. Set unlimited or limited supply with the exact number of NFTs you wish to create. Determine your collection's behavior by making NFTs revokable (e.g., with limited-time NFTs) or soulbound to disable tradeability and tie them to the originator's address. Set the % of royalties to collect and the recipient's address. Optionally, you can set the date and details of the collection's public drop and make it publicly available for minting - reserve some for yourself to avoid having to pay for them. Without drop, only the creator can mint NFTs, not the general public. If you sourced metadata online, provide its base URI and extension.
8. Preview and go back if needed. This is the last step that allows editing, as moving forward with the deployment inscribes NFTs on the blockchain and makes them immutable.
9. Deploy on the blockchain. View the transaction on blockchain explorer or see its contents in the newly created Web3 Storage bucket.
10. Display NFTs on a website. Fork or integrate the Apillon website template code in [JavaScript](https://github.com/Apillon/nft-template), [Vue](https://github.com/Apillon/nft-template-vue) or [React](https://github.com/Apillon/nft-template-react) on GitHub and add the NFT collection to any webpage. Customize the code, configure the logic, and update the configurable file with the NFT collection's own addresses. Run locally and redeploy to Apillon [Web3 Hosting](/web3-services/1-good-to-know.html#web3-hosting).
11. Mint NFTs to trade them as assets on the blockchain. On the Apillon dashboard, click on the NFT collection name, and under Actions in the top right corner, click "Mint". Once minted, NFTs are linked to your wallet.
12. List NFTs on marketplaces such as [tofuNFT](https://tofunft.com/), display them locally on your website or dapp, or share them with intended recipients.

**Note**: Deploying NFTs on the blockchain makes them permanently immutable. To keep NFT metadata editable, upload it manually to Apillon [Web3 Storage with IPNS](/web3-services/1-good-to-know.html#web3-storage).

Learn more:

- [Guide: NFT Service prerequisites — Generate NFT art (with AI) and get files ready](https://blog.apillon.io/guide-nft-service-pt-1-generate-nft-art-with-ai-and-get-files-ready-200168b6b303)
- [Guide: NFT Service — Create and deploy NFT collection on Moonbeam](https://blog.apillon.io/guide-nft-service-pt-2-create-and-deploy-nft-collection-on-moonbeam-2d7eedf79756)
- [Guide: NFT Service — Create and deploy NFT collection on Astar](https://blog.apillon.io/guide-nft-service-create-and-deploy-nft-collection-on-astar-3d6674994b0f)
- [NFT Service on Moonbeam FAQ](https://blog.apillon.io/faq-apillon-nft-service-by-moonbeam-a64f0c3930b1)
