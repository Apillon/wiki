# Apillon Web3 services

<div class="divider"></div>

Apillon integrates multiple [Polkadot](https://polkadot.network/) parachains and offers access to them in a unified way via modules on the developer dashboard and through [Apillon APIs](/build/3-apillon-api.html).

## Web3 Storage

Apillon Web3 Storage is a Web3-based storage service that implements AWS S3 (as cache to optimize upload of large files), [IPFS](https://ipfs.tech/), and [Crust Network](https://crust.network/) (to pin files on multiple IPFS nodes).

To streamline the development experience, Apillon Web3 Storage service further introduces the concept of storage buckets.

### Storage bucket

A storage bucket is a virtual container that holds directories and files in a hierarchical structure. Each directory can contain multiple subdirectories and multiple files, and so on for each subdirectory.

Before using the Apillon Web3 Storage service, a storage bucket should be created on the Apillon Dashboard. Once ready, it enables file storage from both the Apillon dashboard and the API endpoints.

### File storage

The process below describes how files are stored with Apillon storage buckets.

1. Uploaded files land on a reputable centralized cloud provider to ensure fast file capture.
2. Once the files are received, they proceed to the decentralized Apillon IPFS gateway, where Crust Network initiates the pinning and replication process.
3. Once the files are accessible on the IPFS network, Crust spreads them through multiple IPFS nodes globally, ensuring file distribution and decentralized accessibility.

### File deletion

Each file hosting that passes through Crust’s pinning and replication service is paid upfront for a minimum period of 6 months. Apillon has no control over amending that period, so keep in mind that all files you deploy to Apillon storage buckets will remain accessible for that period of time.

If you decide to delete a file before the 6-month period expires, the file is marked for deletion. This means that Apillon does not extend the storage lease on Crust once the 6-month period expires, which leads to file deletion on all IPFS instances.

However, to make the storage service more dynamic, Apillon artificially lowers the file deletion period to 3 months. Once this period expires, the load of deleted files in your storage bucket is emptied, and the storage capacity is made available for uploading new files.

**Note:** These limitations are in the nature of the Apillon Closed Beta release, which is intended for testing purposes only. Once the Beta period is up, the limitations of Apillon Web3 services will be adjusted to more realistic production requirements.

Learn more: [Web3 Storage FAQ](https://medium.com/apillon/faq-apillon-web3-storage-c99a9b0e8b12)

## Web3 Hosting

Apillon Web3 Hosting is a Web3-based storage service that allows you to increase the accessibility of your website or app and make it unstoppable, as it gets hosted on a decentralized network of nodes worldwide.

Decentralized hosting of a website or an app on Apillon is very similar to the usage of storage buckets in [decentralized storage](/build/2-web3-services.html#web3-storage). It implements AWS S3 (as cache to optimize upload of large files), [IPFS](https://ipfs.tech/), and [Crust Network](https://crust.network/) (to pin files on multiple IPFS nodes).

### Website/app hosting

**Note**: At this point, only hosting of static websites is supported in Apillon Web3 Hosting service, while dynamic websites will be supported in future versions of Apillon.

The process below describes how a static website or app is hosted decentrally with Apillon Web3 Hosting.

1. Uploaded files land on a reputable centralized cloud provider to ensure fast file capture.
2. Once the files are received, they proceed to the Apillon node. They are accessible through the IPFS gateway until moved from staging to production.
3. Once the files move from staging to production, they proceed to the decentralized Apillon IPFS gateway, where the pinning and replication process is started with Crust.
4. At this point, a custom domain can be connected to the website/app, which starts the SSL certificate generation process in the Apillon gateway.
5. Finally, the domain’s DNS records can be migrated to Apillon, and website or app can be launched using decentralized hosting.

### Deployment

To deploy a Web3 website or application, follow the process below:

1. Register an [account on Apillon](https://app.apillon.io/register).
2. Log in to your Apillon dashboard.
3. In the menu on the left, under Services, navigate to Hosting, and click "Get started."
4. Drag and drop your static website to the Hosting view and wait for the upload to finish.
5. Once the upload is complete and the status turns to "successful," you can deploy the website to Staging.
6. Click on the Staging tab to monitor the progress.
7. Deployment of web files will go through several statuses, ending with "successful."
8. Click "Deploy to production" to get files replicated and unstoppable with decentralized hosting.
9. Once the deployment to production is finished, click "Add domain" and "Configure domain" to make the domain you own point to the Apillon hosting.
10. Once DNS is updated, your unstoppable website will become available on the connected domain.

If you want to redeploy the website or app with new changes, repeat the process above simply by uploading the whole website or app via Apillon Hosting view.

**Note:** Repeat deployment to Apillon Hosting will continue spending the Hosting storage capacity. However, every 3 months, the capacity will be renewed after older versions are deleted.

Learn more: [Web3 Hosting FAQ](https://medium.com/apillon/faq-apillon-web3-hosting-81d5477661e7)

### File deletion

Each file hosting that passes through Crust’s pinning and replication service is paid upfront for a minimum period of 6 months. Apillon has no control over amending that period, so keep in mind that all files you deploy to Apillon storage buckets will remain accessible for that period of time.

If you decide to delete a file before the 6-month period expires, the file is marked for deletion. This means that Apillon does not extend the storage lease on Crust once the 6-month period expires, which leads to file deletion on all IPFS instances.

However, to make the hosting service more dynamic, Apillon artificially lowers the file deletion period to 3 months. Once this period expires, the load of deleted files in your storage bucket is emptied, and the storage capacity is made available for uploading new files and redeployment of website or app.

**Note**: In the Apillon Closed Beta stage, single file changes are not supported. Instead, hosting is treated as batch upload, meaning that with every new version of a website or app, its contents are rewritten, which leads to new files getting pinned and replicated on Crust. This limitation will be improved in future dashboard updates to enhance the developer experience. In case you need a larger storage capacity, feel free to get in touch on [Apillon Discord](https://discord.gg/yX3gTw36C4), and we will grant you extra space or more storage buckets.

## NFTs

Apillon NFT service supports drag-and-drop compilation, deployment, and minting of non-fungible assets.

The service is currenly supported by the [Moonbeam Network](https://blog.apillon.io/guide-nft-service-pt-2-create-and-deploy-nft-collection-on-moonbeam-2d7eedf79756) and [Astar Network](https://blog.apillon.io/guide-nft-service-create-and-deploy-nft-collection-on-astar-3d6674994b0f) and will expand to provide connectivity to other networks in future upgrades.

### NFT files

NFT files are at the front and center of an NFT collection.

Apillon NFT Service currently runs on the Moonbeam and Astar parachains, and supports the [ERC-721](https://eips.ethereum.org/EIPS/eip-721) standard for NFTs.

The ERC-721 standard packs any file format into permanently stored content on the blockchain. Thanks to Moonbeam’s and Astar’s EVM compatibility, it can be deployed quickly and efficiently with Apillon.

[Learn more >](https://medium.com/apillon/guide-nft-service-pt-1-generate-nft-art-with-ai-and-get-files-ready-200168b6b303#eb24)

### NFT metadata

NFT metadata is the backbone of an NFT collection and communicates the essential information of NFT files — the file name and format, date of creation, owner, etc.

It can also include certain attributes that make an NFT one of a kind.

As an essential component of NFT collections, metadata should be managed and stored carefully. To ensure its permanent access free of third-party intervention, Apillon stores it on a decentralized network with [Apillon Web3 Storage bucket](/build/2-web3-services.html#web3-storage), [Crust Network](https://crust.network/), and [IPFS](https://ipfs.tech/).

[Learn more >](https://medium.com/apillon/guide-nft-service-pt-1-generate-nft-art-with-ai-and-get-files-ready-200168b6b303#a060)

### NFT deployment

To deploy an NFT collection on either the Moonbeam or Astar Network, follow the process below:

1. Log in to your [Apillon account](https://app.apillon.io/register).
2. In the menu on the left, navigate to NFTs, and click "Start creating NFTs."
3. Upload NFT metadata in CSV format to a decentralized network to keep it permanently accessible and [prevent losing access to it](https://blog.apillon.io/why-decentralized-storage-matters-for-nft-metadata-and-your-next-nft-collection-b7b90fc3762). When uploaded using the drag-and-drop NFT wizard, the metadata file is automatically stored using the Apillon [Web3 Storage bucket](/build/2-web3-services.html#storage-bucket). It can also be uploaded manually in the Web3 Storage service and deployed by calling the metadata URI.
4. Upload NFT files from local storage, and double-check if the number of files matches the file numbers in the metadata file.
5. Preview NFTs, both in table and list view, to verify the parsing of the CSV metadata file. Check for potential mismatches between NFT files and their metadata.
7. Choose the name, symbol, and network (Chain) to deploy your collection, either Moonbeam Mainnet, Moonbeam Testnet, or Astar Mainnet.
8. Set unlimited or limited supply with the exact number of NFTs you wish to create. Determine your collection's behavior by making NFTs revokable (e.g., with limited-time NFTs) or soulbound to disable tradeability and tie them to the originator's address. Set the % of royalties to collect and the recipient's address. Optionally, you can set the date and details of the collection's public drop and make it publicly available for minting - reserve some for yourself to avoid having to pay for them. Without drop, only the creator can mint NFTs, not the general public. If you sourced metadata online, provide its base URI and extension.
9. Preview and go back if needed. This is the last step that allows editing, as moving forward with the deployment inscribes NFTs on the blockchain and makes them immutable.
10. Deploy on the blockchain. View the transaction on blockchain explorer or see its contents in the newly created Web3 Storage bucket.
11. Display NFTs on a website. Fork or integrate the Apillon website template code in [JavaScript](https://github.com/Apillon-web3/nft-template), [Vue](https://github.com/Apillon-web3/nft-template-vue) or [React](https://github.com/Apillon-web3/nft-template-react) on GitHub and add the NFT collection to any webpage. Customize the code, configure the logic, and update the configurable file with the NFT collection's own addresses. Run locally and redeploy to Apillon [Web3 Hosting](/build/2-web3-services.html#web3-hosting).
12. Mint NFTs to trade them as assets on the blockchain. On the Apillon dashboard, click on the NFT collection name, and under Actions in the top right corner, click "Mint". Once minted, NFTs are linked to your wallet.
13. List NFTs on marketplaces such as [tofuNFT](https://tofunft.com/), display them locally on your website or dapp, or share them with intended recipients.

**Note**: Deploying NFTs on the blockchain makes them permanently immutable. To keep NFT metadata editable, upload it manually to Apillon [Web3 Storage with IPNS](/build/2-web3-services.html#web3-storage).

Learn more:

* [Guide: NFT Service prerequisites — Generate NFT art (with AI) and get files ready](https://blog.apillon.io/guide-nft-service-pt-1-generate-nft-art-with-ai-and-get-files-ready-200168b6b303)
* [Guide: NFT Service — Create and deploy NFT collection on Moonbeam](https://blog.apillon.io/guide-nft-service-pt-2-create-and-deploy-nft-collection-on-moonbeam-2d7eedf79756)
* [Guide: NFT Service — Create and deploy NFT collection on Astar](https://blog.apillon.io/guide-nft-service-create-and-deploy-nft-collection-on-astar-3d6674994b0f)
* [NFT Service on Moonbeam FAQ](https://medium.com/apillon/faq-apillon-nft-service-by-moonbeam-a64f0c3930b1)

## Web3 Computing

Coming soon, [stay tuned](https://discord.gg/yX3gTw36C4).

## Web3 Authentication

Coming soon, [stay tuned](https://discord.gg/yX3gTw36C4).
