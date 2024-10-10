# Embedded Wallets

## Introduction

Apillon's Embedded Wallet Service offers a revolutionary approach by combining Web2 onboarding simplicity, hardware wallet security, and hot wallet convenience. It provides an intuitive, secure, and decentralized solution for managing crypto assets directly within applications.

## What is an Embedded Wallet?

A wallet is a type of user interface that allows you to quickly generate and sign transactions using your private key. As such, a wallet also takes care of storing your private key. However, an embedded wallet removes the need for traditional wallet downloads and installations. Integrating it directly into apps or websites via an SDK simplifies and enhances the UX of the onboarding process significantly. Users can log in with their email addresses and a verification code, eliminating the need for mnemonic phrases. It is called an embedded wallet because it exists within the dapp itself and because the user is not required to have his own wallet, such as a browser extension or a mobile app.

## How it works

1. **Integration**: Developers use an SDK to embed the wallet into their apps or websites.
2. **Authentication**: Users register using their email and a verification code and log in using their email and passkey, bypassing mnemonic phrases.
3. **Decentralization**: Private keys are generated, encrypted, and stored securely using confidential smart contracts by Oasis.
4. **Transaction security**: Transactions are signed within the smart contract and sent to a blockchain node, ensuring the private key is never exposed.

## Security of Embedded Wallets

- **Passkey authentication**: This method enhances security by allowing users to log in using passkeys, which are unique cryptographic keys stored securely on the user's device. Passkeys enable users to gain access to their wallets using their biometric data (fingerprint, face scan, etc.), enhancing security even further.
- **Decentralized key management**: Private keys are managed through Oasis’s confidential smart contracts, ensuring they are never exposed to or stored by a third party.
- **Protection against phishing**: Passkey authentication helps prevent phishing attacks by eliminating the need for password-based logins. It is usable only within the website where it was generated.

## Workflow

1. **User onboarding**: A new user logs into the app using their email and generates a passkey.
2. **Wallet generation**: The SDK requests a new wallet from the Oasis Network, where a smart contract generates and stores the private key in an encrypted manner. If the email and passkey have already been used to generate a wallet, the same wallet is returned to the client.
3. **Transaction signing**: Transactions are securely signed by the smart contract and sent to the blockchain. This way, the private key only exists within the confidential smart contract.

## Comparison with Other Providers

| Provider      | Wallet Name          | Security Method                         | Auth. Methods                | Private Key Exposure     | Wallet Scope | Decentralization                      |
|---------------|----------------------|-----------------------------------------|------------------------------|--------------------------|--------------|---------------------------------------|
| thirdweb      | In-App Wallet        | Shamir's Secret Sharing with HSM        | Email, Social Media          | In the browser           | Per app      | 2/3 keys saved by thirdweb            |
| Dynamic.xyz   | Email, Social Wallet | Outsourced to Turnkey - secure enclaves | Passkey, Email, Social Media | Never, but allows export | Per app      | Private key stored by Turnkey         |
| Coinbase      | Embedded Wallet      | Multi-party Computation                 | Passkey                      | Never, but allows export | Per app      | Private key stored by Coinbase        |
| Apillon       | Embedded Wallet      | Oasis Confidential Smart Contract       | Passkey, Email, Password     | Never, but allows export | Global       | Fully decentralized via Oasis         |

## Passkeys

Passkeys are unique cryptographic keys stored securely on a user’s device, offering a user-friendly and secure method for accessing wallets without traditional passwords. These keys utilize biometric authentication methods, such as fingerprint or facial recognition, to verify the user's identity.

### How Passkeys work

When a user sets up a passkey, their device generates a cryptographic key pair: a public key, which is shared with the service, and a private key, which remains on the device. The private key is securely stored and protected by the device's hardware. When logging in, the user provides a biometric confirmation, such as a fingerprint scan or facial recognition, which unlocks the private key to sign a login request. This signed request is then sent to the service for verification using the public key.

### Benefits of Passkeys

1. **Enhanced security**: The private key never leaves the user's device, reducing the risk of theft or interception.
2. **User convenience**: Biometric authentication simplifies the login process, eliminating the need to remember and manage complex passwords.
3. **Phishing protection**: Since the private key is not shared or transmitted, it cannot be phished or stolen by malicious actors. The passkey works only on the website where it was created, meaning that the passkey cannot access anything on a different website.

By using passkeys, Apillon ensures that users’ wallets are protected with strong, biometric-based security, providing a seamless and secure user experience.

## Advantages of Apillon’s Embedded Wallet Service

- **Seamless user experience**: Easy onboarding without wallet downloads.
- **Enhanced security**: Decentralized private key management with end-to-end encryption.
- **Global scope**: Unlike some providers, Apillon’s embedded wallets are not restricted to specific apps or sites, allowing for broader usability.
- **Confidential smart contracts**: Ensure that private keys are never exposed, maintaining a high level of security.

## Conclusion

Apillon’s Embedded Wallet Service on the Oasis Network offers a unique blend of user-friendly onboarding, robust security, and decentralization. It eliminates the need for cumbersome wallet downloads and mnemonic phrases, providing a seamless and secure experience for managing crypto assets directly within applications. By leveraging Oasis’s confidential smart contracts, Apillon ensures that users’ private keys are never exposed, providing a level of security comparable to hardware wallets.
