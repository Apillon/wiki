# Web3 Hosting

Apillon Web3 Hosting is a Web3-based storage service that allows you to increase the accessibility of your website or app and make it unstoppable, as it gets hosted on a decentralized network of nodes worldwide.

Decentralized hosting of a website or an app on Apillon is very similar to the usage of storage buckets in [decentralized storage](/build/2-web3-services.html#web3-storage). It implements AWS S3 (as cache to optimize upload of large files), [IPFS](https://ipfs.tech/), and [Crust Network](https://crust.network/) (to pin files on multiple IPFS nodes).

## Website/app hosting

**Note**: At this point, only hosting of static websites is supported in Apillon Web3 Hosting service, while dynamic websites will be supported in future versions of Apillon.

The process below describes how a static website or app is hosted decentrally with Apillon Web3 Hosting.

1. Uploaded files land on a reputable centralized cloud provider to ensure fast file capture.
2. Once the files are received, they proceed to the Apillon node. They are accessible through the IPFS gateway until moved from staging to production.
3. Once the files move from staging to production, they proceed to the decentralized Apillon IPFS gateway, where the pinning and replication process is started with Crust.
4. At this point, a custom domain can be connected to the website/app, which starts the SSL certificate generation process in the Apillon gateway.
5. Finally, the domain’s DNS records can be migrated to Apillon, and website or app can be launched using decentralized hosting.

## Deployment

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

Learn more: [Web3 Hosting FAQ](https://blog.apillon.io/faq-apillon-web3-hosting-81d5477661e7)

## File deletion

Each file hosting that passes through Crust’s pinning and replication service is paid upfront for a minimum period of 6 months. Apillon has no control over amending that period, so keep in mind that all files you deploy to Apillon storage buckets will remain accessible for that period of time.

If you decide to delete a file before the 6-month period expires, the file is marked for deletion. This means that Apillon does not extend the storage lease on Crust once the 6-month period expires, which leads to file deletion on all IPFS instances.

However, to make the hosting service more dynamic, Apillon artificially lowers the file deletion period to 3 months. Once this period expires, the load of deleted files in your storage bucket is emptied, and the storage capacity is made available for uploading new files and redeployment of website or app.

**Note**: In the Apillon Closed Beta stage, single file changes are not supported. Instead, hosting is treated as batch upload, meaning that with every new version of a website or app, its contents are rewritten, which leads to new files getting pinned and replicated on Crust. This limitation will be improved in future dashboard updates to enhance the developer experience. In case you need a larger storage capacity, feel free to get in touch on [Apillon Discord](https://discord.gg/yX3gTw36C4), and we will grant you extra space or more storage buckets.