# Embedded Wallets

## Introduction

Apillon's embedded wallet service offers a revolutionary approach by combining Web2 onboarding simplicity, hardware wallet security, and hot wallet convenience. It provides an intuitive, secure, and decentralized solution for managing crypto assets directly within applications.

## What is an Embedded Wallet?

An embedded wallet removes the need for traditional wallet downloads and installations. By integrating directly into apps or websites via an SDK, it simplifies the user experience significantly. Users can log in with their email and a verification code, eliminating the need for mnemonic phrases. It is called an embedded wallet because it exists within the dapp itself and the user does require to have their own wallet, such as a browser extension or a mobile app.

## How It Works

1. **Integration**: Developers use an SDK to embed the wallet into their apps or websites.
2. **Authentication**: Users log in using email and a verification code, avoiding mnemonic phrases.
3. **Decentralization**: Using Oasis’s confidential smart contracts, private keys are generated, encrypted, and stored securely.
4. **Transaction Security**: Transactions are signed within the smart contract and sent to a blockchain node, ensuring the private key is never exposed.

## Security of Embedded Wallets

- **Passkey Authentication**: This method enhances security by allowing users to log in using passkeys, which are unique cryptographic keys stored securely on the user's device. Passkeys enable users to gain access to their wallets using their biometric data (fingerprint, face scan etc.), enhancing security even further.
- **Decentralized Key Management**: Private keys are managed through Oasis’s confidential smart contracts, ensuring they are never exposed or stored by a third party.
- **Protection Against Phishing**: Passkey authentication helps prevent phishing attacks by eliminating the need for password-based logins and are usable only within the website they were generated at.

## Workflow

1. **User Onboarding**: A new user logs into the app using their email and generates a passkey.
2. **Wallet Generation**: The SDK requests a new wallet from the Oasis network, where a smart contract generates and stores the private key in an encrypted manner. If the email and passkey have already been used to generate a wallet, the same wallet is returned to the client
3. **Transaction Signing**: Transactions are securely signed by the smart contract and sent to the blockchain. This way the private key always exists only within the confidential smart contract

## Comparison with Other Providers

| Provider      | Wallet Name          | Security Method                         | Auth. Methods                | Private Key Exposure     | Wallet Scope | Decentralization                      |
|---------------|----------------------|-----------------------------------------|------------------------------|--------------------------|--------------|---------------------------------------|
| Thirdweb      | In-App Wallet        | Shamir's Secret Sharing with HSM        | Email, Social Media          | In the browser           | Per app      | 2/3 keys saved by thirdweb            |
| Dynamic.xyz   | Email, Social Wallet | Outsourced to Turnkey - secure enclaves | Passkey, Email, Social Media | Never, but allows export | Per app      | Private key stored by Turnkey         |
| Coinbase      | Embedded Wallet      | Multi-party Computation                 | Passkey                      | Never, but allows export | Per app      | Private key stored by Coinbase        |
| Apillon       | Embedded Wallet      | Oasis Confidential Smart Contract       | Passkey, Email, Password     | Never, but allows export | Global       | Fully decentralized via Oasis         |

## Passkeys

Passkeys are unique cryptographic keys stored securely on a user’s device, offering a user-friendly and secure method for accessing wallets without traditional passwords. These keys utilize biometric authentication methods, such as fingerprint or facial recognition, to verify the user's identity.

### How Passkeys Work

When a user sets up a passkey, their device generates a cryptographic key pair: a public key, which is shared with the service, and a private key, which remains on the device. The private key is securely stored and protected by the device's hardware. When logging in, the user provides a biometric confirmation, such as a fingerprint scan or facial recognition, which unlocks the private key to sign a login request. This signed request is then sent to the service for verification using the public key.

### Benefits of Passkeys

1. **Enhanced Security**: The private key never leaves the user's device, reducing the risk of theft or interception.
2. **User Convenience**: Biometric authentication simplifies the login process, eliminating the need to remember and manage complex passwords.
3. **Phishing Protection**: Since the private key is not shared or transmitted, it cannot be phished or stolen by malicious actors. The passkey works only on the website where it was created, meaning that the passkey can not get accessed on a different website

By using passkeys, Apillon ensures that users’ wallets are protected with strong, biometric-based security, providing a seamless and secure user experience.

## Advantages of Apillon’s Embedded Wallet

- **Seamless User Experience**: Easy onboarding without downloads.
- **Enhanced Security**: Decentralized private key management with end-to-end encryption.
- **Global Scope**: Unlike some providers, Apillon’s embedded wallets are not restricted to specific apps or sites, allowing for broader usability.
- **Confidential Smart Contracts**: Ensure that private keys are never exposed, maintaining a high level of security.

## Conclusion

Apillon’s embedded wallet service on the Oasis Network offers a unique blend of user-friendly onboarding, robust security, and decentralization. It eliminates the need for cumbersome wallet downloads and mnemonic phrases, providing a seamless and secure experience for managing crypto assets directly within applications. By leveraging Oasis’s confidential smart contracts, Apillon ensures that users’ private keys are never exposed, providing a level of security comparable to hardware wallets.
