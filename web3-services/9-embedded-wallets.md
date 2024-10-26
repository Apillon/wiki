# Embedded Wallets

## Introduction

**Apillon's Embedded Wallet Service** redefines crypto asset management by blending the simplicity of Web2 onboarding with the security of hardware wallets and the convenience of hot wallets. It offers a secure, non-custodial, and fully decentralized solution for managing crypto assets seamlessly within applications.

## What is an Embedded Wallet?

An embedded wallet is an in-app wallet that provides a streamlined experience for generating and signing transactions with your private key, without requiring separate downloads or installations. By integrating directly into applications via an SDK, embedded wallets simplify onboarding, allowing users to log in with just their email and a verification code. This setup eliminates mnemonic phrases, making the experience accessible and secure.

## How it Works

1. **Integration**: Developers integrate the wallet using a lightweight SDK.
2. **Authentication**: Users register with an email and verification code, bypassing mnemonic phrases. They log in using an email and passkey.
3. **Decentralization**: Private keys are securely generated, encrypted, and managed within confidential smart contracts powered by [Oasis Protocol](https://oasisprotocol.org/).
4. **Transaction Security**: Transactions are signed within the smart contract, with user authentication ensuring that private keys are never exposed.

## Security of Embedded Wallets

- **Passkey Authentication**: Users log in using passkeys—unique cryptographic keys stored securely on their devices, which allow biometric data (fingerprint, face scan) for verification, ensuring top-level security.
- **Decentralized Key Management**: Managed by Oasis’s confidential smart contracts, private keys are never exposed or accessible to third parties.
- **Phishing Protection**: Passkey authentication prevents phishing attacks by eliminating password-based logins, usable only on the original website.

## Workflow

1. **User Onboarding**: New users log in with their email and create a passkey.
2. **Wallet Generation**: The SDK requests a wallet from the Oasis Network, where a smart contract securely generates and encrypts the private key.
3. **Transaction Signing**: Transactions are securely signed by the smart contract, ensuring the private key remains within the encrypted environment.

## Comparison with Other Providers

| Provider        | Wallet Name          | Security Method                         | Authentication Methods       | Private Key Exposure | Wallet Scope | Decentralization              |
| --------------- | -------------------- | --------------------------------------- | ---------------------------- | -------------------- | ------------ | ----------------------------- |
| **thirdweb**    | In-App Wallet        | Shamir's Secret Sharing with HSM        | Email, Social Media          | Exposed in browser   | Per app      | 2/3 keys managed by thirdweb  |
| **Dynamic.xyz** | Email, Social Wallet | Outsourced to Turnkey - secure enclaves | Passkey, Email, Social Media | None; allows export  | Per app      | Stored by Turnkey             |
| **Coinbase**    | Embedded Wallet      | Multi-party Computation                 | Passkey                      | None; allows export  | Per app      | Stored by Coinbase            |
| **Apillon**     | Embedded Wallet      | Oasis Confidential Smart Contract       | Passkey, Email, Password     | None; allows export  | Global       | Fully decentralized via Oasis |

## Passkeys

Passkeys are secure cryptographic keys stored on a user’s device, enabling wallet access through biometric methods without traditional passwords. This allows for a secure and user-friendly experience that prioritizes privacy.

### How Passkeys Work

Upon setting up a passkey, the user’s device generates a cryptographic key pair: a public key (shared with the service) and a private key (stored on the device). When logging in, the user authenticates biometrically, which unlocks the private key to sign the login request. The service verifies this signed request using the public key.

### Benefits of Passkeys

1. **Enhanced Security**: The private key remains on the device, reducing risk of theft.
2. **User Convenience**: Biometric login removes the need to remember passwords.
3. **Phishing Protection**: The private key is non-transferrable, making it immune to phishing attacks.

Apillon’s passkeys ensure wallets are protected with advanced biometric-based security, creating a seamless user experience.

## Advantages of Apillon’s Embedded Wallet Service

- **Seamless User Experience**: Simplifies onboarding, requiring no wallet downloads.
- **Secure Wallet Setup**: No mnemonic keys are required. Passkeys offer protection, and private keys are exportable as needed.
- **Multiple Authentication Options**: Users can set up passkeys, email verification, and additional methods to ensure flexible access.
- **High-Level Security**: End-to-end encryption and decentralized key management.
- **Global Scope**: Apillon’s wallets work across applications, unlike some limited alternatives.
- **Confidential Smart Contracts**: Private keys remain secure and confidential within Oasis-managed smart contracts.

## Conclusion

Apillon’s Embedded Wallet Service on the Oasis Network combines user-friendly onboarding, top-tier security, and decentralization. It removes the need for wallet downloads and mnemonic phrases, offering a smooth and secure way to manage crypto assets within applications. With Oasis’s confidential smart contracts, Apillon protects users’ private keys, delivering security on par with hardware wallets.
