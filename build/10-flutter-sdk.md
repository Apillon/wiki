# Apillon Flutter SDK

This package provides Dart and Flutter developers with tools and libraries to interact with Apillon services, simplifying the use of Apillon's REST API by reducing boilerplate code and streamlining multi-step processes into single operations.

## Requirements

- Dart SDK: '>=3.2.2 <4.0.0'
- An Apillon API key and secret
- http package version 1.1.0

## Getting started

To use the Apillon Flutter SDK, you must first register an account at [Apillon.io](https://app.apillon.io), create a project, and generate an API key with the appropriate permissions.

The Flutter SDK package is available as a Dart package on [pub.dev](https://pub.dev/packages/apillon_flutter) and you can also check it out directly on [GitHub](https://github.com/Apillon/flutter-sdk).
To include it in your project, add the following to your `pubspec.yaml` file:

```yaml
dependencies:
  apillon_flutter: ^0.0.1
```

### Initialization

To start using the SDK, you need to import it and configure it with your Apillon API key and secret. Here's an example of how to initialize the Storage module:

```dart
import 'package:apillon_flutter/apillon_flutter.dart';

void main() {
  var storage = Storage(ApillonConfig(
    key: 'yourApiKey',
    secret: 'yourApiSecret',
  ));
}
```

All modules in the Apillon Flutter SDK require the same initial configuration of `key` and `secret`.

## Modules

The Apillon Flutter SDK consists of several modules, each corresponding to a specific Apillon service. Below are examples of how to use some of these modules.

### Storage

The Storage module provides functionalities for interacting with the Storage service.

#### Usage example

```dart
import 'dart:io';
import 'package:apillon_flutter/apillon_flutter.dart';
import 'package:path/path.dart' as path;

void main() async {
  var storage = Storage(ApillonConfig(
    key: 'yourApiKey',
    secret: 'yourApiSecret',
  ));

  // List all buckets
  var buckets = await storage.listBuckets(ICollectionFilters());
  print('Buckets:');
  for (var bucket in buckets) {
    print('${bucket.name} - ${bucket.uuid}');
  }

  var bucketUuid = 'eaff2672-3012-46fb-9278-5efacc6cb616';

  // Get specific bucket details
  var bucketDetails = await storage.bucket(bucketUuid).get();
  print('Bucket Details: ${bucketDetails.name}, Size: ${bucketDetails.size}');

  // List files in the bucket
  var files = await storage.bucket(bucketUuid).listFiles(ICollectionFilters());
  print('Files in bucket:');
  for (var file in files) {
    print('${file.name} - ${file.uuid}');
  }

  // Upload files from a folder
  var uploadDir = path.join(Directory.current.path, 'my-folder');
  print('Uploading files from $uploadDir');
  await storage.bucket(bucketUuid).uploadFromFolder(uploadDir, IFileUploadRequest());

  // Upload a single file from buffer
  var filePath = path.join(Directory.current.path, 'file.txt');
  var fileBytes = File(filePath).readAsBytesSync();
  await storage.bucket(bucketUuid).uploadFiles([
    FileMetadata(
      fileName: 'file.txt',
      contentType: 'text/plain',
      content: fileBytes,
    )
  ], IFileUploadRequest());

  // Get details of a specific file
  var fileUuid = 'eaff2672-3012-46fb-9278-5efacc6cb616';
  var fileDetails = await storage.bucket(bucketUuid).file(fileUuid).get();
  print('File Details: ${fileDetails.name}, Size: ${fileDetails.size}');
}
```

#### IPNS methods

The Storage module additionally contains methods for manipulating IPNS records for a specific storage bucket.

```dart
import 'package:apillon_flutter/apillon_flutter.dart';

void main() async {
  var storage = Storage(ApillonConfig(
    key: 'yourApiKey',
    secret: 'yourApiSecret',
  ));
  var bucketUuid = 'eaff2672-3012-46fb-9278-5efacc6cb616';

  // List all existing IPNS records in a bucket
  var ipnsRecords = await storage.bucket(bucketUuid).listIpnsNames(ICollectionFilters());
  print('IPNS Records:');
  for (var record in ipnsRecords) {
    print('${record.name} - ${record.uuid}');
  }

  // Create a new IPNS record
  const name = 'Test IPNS';
  const description = 'This is a test description';
  const cid = 'QmUxtfFfWFguxSWUUy2FiBsGuH6Px4KYFxJqNYJRiDpemj';
  var newIpnsRecord = await storage.bucket(bucketUuid).createIpns(ICreateIpns(
    name: name,
    description: description,
    cid: cid,
  ));
  print('New IPNS Record: ${newIpnsRecord.uuid}');

  // Publish an IPNS record to point to a new CID
  const newCid = 'Qmakf2aN7wzt5u9H3RadGjfotu62JsDfBq8hHzGsV2LZFx';
  await storage.bucket(bucketUuid).ipns(newIpnsRecord.uuid).publish(newCid);
  print('IPNS record published to new CID: $newCid');

  // Delete an IPNS record
  await storage.bucket(bucketUuid).ipns(newIpnsRecord.uuid).delete();
  print('IPNS record deleted: ${newIpnsRecord.uuid}');
}
```

### NFTs

The NFT module encapsulates functionalities for the NFT service.

#### Usage example

```dart
import 'package:apillon_flutter/apillon_flutter.dart';

void main() async {
  var nft = Nft(ApillonConfig(
    key: 'yourApiKey',
    secret: 'yourApiSecret',
  ));

  // Create a new NFT collection
  var collection = await nft.createCollection(ICreateCollection(
    chain1: EvmChain.moonbase,
    collectionType1: CollectionType.generic,
    name: 'SDK Test',
    description: 'Created from SDK tests',
    symbol: 'SDKT',
    royaltiesFees: 0,
    royaltiesAddress: '0x0000000000000000000000000000000000000000',
    baseUri: 'https://test.com/metadata/',
    baseExtension: '.json',
    maxSupply: 5,
    isRevokable: false,
    isSoulbound: false,
    drop: false,
  ));
  print('Collection created: ${collection.uuid}');

  // Mint a new NFT in the collection
  var mintResult = await nft.collection(collection.uuid).mint(IMintNftData(
    receivingAddress: '0x5BA8B0c24bA5307b67E619ad500a635204F73bF1',
    quantity: 1,
  ));
  print('Mint transaction hash: ${mintResult.transactionHash}');

  // List NFT collections
  var collections = await nft.listCollections(ICollectionFilters());

  // Transfer NFT ownership to another address
  await collection.transferOwnership('0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD');
}
```

### Identity

The Identity module provides functionalities for validating wallet signatures and fetching identity data.

#### Usage example

```dart
import 'package:apillon_flutter/apillon_flutter.dart';

void main() async {
  var identity = Identity(ApillonConfig(
    key: 'yourApiKey',
    secret: 'yourApiSecret',
  ));

  // Generate a signing message for EVM wallet signature validation
  const customMessage = 'Identity EVM SDK test';
  var signingMessage = identity.generateSigningMessage(customMessage)["message"];
  print('Signing message: $signingMessage');

  var walletAddress = '0xa79bg13g2...';
  var signature = '0xYourSignature'; // signature obtained from the user's wallet by the client app

  // Validate EVM wallet signature
  var validationResult = await identity.validateEvmWalletSignature(IValidateEvmWalletSignature(
    walletAddress: walletAddress,
    message: signingMessage,
    signature: signature,
  ));
  print('Is valid: ${validationResult.isValid}');
  print('Address: ${validationResult.address}');

  // Get wallet identity profile for a Polkadot address
  var polkadotAddress = '5HqHQDGcHqS...',
  var identityProfile = await identity.getWalletIdentity(polkadotAddress);
  print('Identity Profile: ${identityProfile.subsocial['content']['name']}');
}
```