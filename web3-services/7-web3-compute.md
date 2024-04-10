# Web3 Compute power

In the world of web3 we have smart contracts that power some core backend logic that should be on chain, we have ipfs hosting to host our webpages in an unstoppable manner. But running actual backend code in an decentralized manner is a missing piece. At Apillon we are tackling this problem and researching different options of how to provide fully distributed and unstoppable backend. Currently this results in a specific service for fully decentralized NFT gated file access powered by [Phala](https://phala.network/).

## NFT gated file access

Phala PHAT contracts are utilized to provide file encryption capabilities where there is no one that can access the encryption key. But a user with a specific NFT can utilized it. This results in a NFT gated fully encrypted file storage that is unstoppable in every way.

Through Apillon you can deploy and configure the PHAT contract and use preexisting frontend templates to fully use the functionalities.

For using the NFT gated file access there are a few prerequisites:

1. You need to create a NFT collection. When deploying a PHAT contract you need to specify a NFT collection to which it is tied. And for each NFT you can either set the encrypted content that only the NFT owner will be able to access or make the NFT owner the one that can upload the file to storage.
2. You need a IPFS storage bucket. Any content uploaded via PHAT contract will need to be stored somewhere. For this you need to create an IPFS bucket (to make sure the content is distributed. Only encrypted content is ever stored).

Which this prerequisites done you can then set this information and deploy you PHAT contract. Deployment and execution costs are handled by Apillon.

You can create a PHAT contract either though the dashboard or via API / SDK.
