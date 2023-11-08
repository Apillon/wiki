# Web3 Storage

Apillon Web3 Storage is a Web3-based storage service that implements AWS S3 (as cache to optimize upload of large files), [IPFS](https://ipfs.tech/), and [Crust Network](https://crust.network/) (to pin files on multiple IPFS nodes).

To streamline the development experience, Apillon Web3 Storage service further introduces the concept of storage buckets.

## Storage bucket

A storage bucket is a virtual container that holds directories and files in a hierarchical structure. Each directory can contain multiple subdirectories and multiple files, and so on for each subdirectory.

Before using the Apillon Web3 Storage service, a storage bucket should be created on the Apillon Dashboard. Once ready, it enables file storage from both the Apillon dashboard and the API endpoints.

## File storage

The process below describes how files are stored with Apillon storage buckets.

1. Uploaded files land on a reputable centralized cloud provider to ensure fast file capture.
2. Once the files are received, they proceed to the decentralized Apillon IPFS gateway, where Crust Network initiates the pinning and replication process.
3. Once the files are accessible on the IPFS network, Crust spreads them through multiple IPFS nodes globally, ensuring file distribution and decentralized accessibility.

## File deletion

Each file hosting that passes through Crust’s pinning and replication service is paid upfront for a minimum period of 6 months. Apillon has no control over amending that period, so keep in mind that all files you deploy to Apillon storage buckets will remain accessible for that period of time.

If you decide to delete a file before the 6-month period expires, the file is marked for deletion. This means that Apillon does not extend the storage lease on Crust once the 6-month period expires, which leads to file deletion on all IPFS instances.

However, to make the storage service more dynamic, Apillon artificially lowers the file deletion period to 3 months. Once this period expires, the load of deleted files in your storage bucket is emptied, and the storage capacity is made available for uploading new files.

**Note:** These limitations are in the nature of the Apillon Closed Beta release, which is intended for testing purposes only. Once the Beta period is up, the limitations of Apillon Web3 services will be adjusted to more realistic production requirements.

Learn more: [Web3 Storage FAQ](https://medium.com/apillon/faq-apillon-web3-storage-c99a9b0e8b12)