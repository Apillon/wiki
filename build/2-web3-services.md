# Web3 services

Apillon integrates multiple [Polkadot](https://polkadot.network/) parachains and offers access to them in a unified way via modules on the developer dashboard and through Apillon APIs.

## Web3 Authentication

Coming soon, [stay tuned](https://discord.gg/yX3gTw36C4).

## Web3 Storage

Apillon Web3 Storage is a Web3-based storage service that implements AWS S3 (as cache to optimize upload of large files), [IPFS](https://ipfs.tech/), and [Crust Network](https://crust.network/) (to pin files on multiple IPFS nodes).

To streamline the development experience, Apillon Web3 Storage service introduces the concept of storage buckets.

Before using the Apillon Web3 Storage service, a storage bucket should be created on the Apillon Dashboard. Once ready, it enables file storage from both the Apillon dashboard and the API endpoints.

### Storage bucket

A storage bucket is a virtual container that holds directories and files in a hierarchical structure. Each directory can contain multiple subdirectories and multiple files, and so on for each subdirectory.

#### File storage

The process below describes how files are stored with Apillon storage buckets.

1. Uploaded files land on a reputable centralized cloud provider to ensure fast file capture.
2. Once the files are received, they proceed to the decentralized Apillon IPFS gateway, where the pinning and replication process is started by Crust.
3. Once the files are accessible on the IPFS network, Crust spreads them through multiple IPFS nodes globally, ensuring file distribution and decentralized accessibility.

#### File deletion

Each file hosting that passes through Crust’s pinning and replication service is paid upfront for a minimum period of 6 months. Apillon has no control over amending that period, so keep in mind that all files you deploy to Apillon storage buckets will remain accessible for that period of time.

If you decide to delete a file before the 6-month period expires, the file is marked for deletion. This means that Apillon does not extend the storage lease on Crust once the 6-month period expires, which leads to file deletion on all IPFS instances.

To make the storage more dynamic, Apillon artificially lowers the deletion period to 3 months. Once this period expires, the load of deleted files in your storage bucket is emptied, and the storage capacity is made available for uploading new files.

**Note:** These limitations are in the nature of the Apillon Closed Beta release, which is intended for testing purposes only. Once the Beta period is up, the limitations of Apillon Web3 services will be adjusted to more realistic production requirements.

## Web3 Hosting

The process below describes how a static website or app is hosted decentrally with Apillon Web3 Hosting.

1. Uploaded files land on a reputable centralized cloud provider to ensure fast file capture.
2. Once the files are received, they proceed to the Apillon node. They are accessible through the IPFS gateway until moved from staging to production.
3. Once the files move from staging to production, they proceed to the decentralized Apillon IPFS gateway, where the pinning and replication process is started with Crust.
4. At this point, you can connect your custom domain, which starts the SSL certificate generation process in the Apillon gateway.
5. Finally, you can migrate your domain’s DNS records to Apillon and launch your website or app using decentralized hosting.

### Deployment

To deploy a Web3 website or application, follow the process below:

1. Register an [account on Apillon](https://app.apillon.io/register).
2. Log in to your Apillon dashboard.
3. In the left-hand menu, under Services, navigate to Hosting, and click “Get started.”
4. Drag and drop your static website to the Hosting view and wait for the upload to finish.
5. Once the upload is complete, file pinning and replication on Crust Network will start automatically.
6. Once finished, your website or app will be hosted on your custom domain to the world wide web.

If you want to redeploy the website or app with new changes, repeat the process above simply by uploading the whole website or app via Apillon Hosting view.

**Note:** Repeat deployment to Apillon Hosting will continue spending the Hosting storage capacity. However, every 3 months, the capacity will be renewed after older versions are deleted.

Each file hosting that passes through Crust’s pinning and replication service is paid upfront for a minimum period of 6 months. Apillon has no control over amending that period, so keep in mind that all files you deploy to Apillon storage buckets will remain accessible for that period of time.

If you decide to delete a file before the 6-month period expires, the file is marked for deletion. This means that Apillon does not extend the storage lease on Crust once the 6-month period expires, which leads to file deletion on all IPFS instances.

To make the storage more dynamic, Apillon artificially lowers the deletion period to 3 months. Once this period expires, the load of deleted files in your storage bucket is emptied, and the storage capacity is made available for uploading new files.

**Note**: In the Apillon Closed Beta stage, single file changes are not supported. Instead, hosting is treated as batch upload, meaning that with every new version of a website or app, its contents are rewritten, which leads to new files getting pinned and replicated on Crust. This limitation will be improved in future dashboard updates to enhance the developer experience. Should you need a larger storage capacity, feel free to get in touch on [Apillon Discord](https://discord.gg/yX3gTw36C4), and we will grant you extra space or more storage buckets.

## Web3 Computing

Coming soon, [stay tuned](https://discord.gg/yX3gTw36C4).
