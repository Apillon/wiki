# Apillon Web3 Authentication

## Introduction
Apillon offers a method for users to integrate an alternative authentication approach using a decentralized identity (DID) stored on the Kilt parachain. This decentralized identity includes a credential that comprises the user's email address, which can be attested by Apillon or SocialKYC. Any user can create their own decentralized identity, verify their email address through Apillon's OAuth protocol, and then use this identity and credential to verify their identity on third-party platforms.

## Authentication workflow

* **Email Verification:** This is the initial step in the identity generation flow, which also serves as part of the attestation process, as it attests ownership of the provided email address.

* **Account Generation:** A KILT wallet address derived from a BIP39 mnemonic is created. This mnemonic serves as the master key for accessing the account. Users are prompted to securely store this mnemonic.

* **Identity Generation:** This step typically takes between one and five minutes. On the frontend, the user signs the operation for DID creation with their Sporran wallet, which is then submitted to the blockchain. The result is the DID document. Once the process is complete, the DID document is queried from the blockchain and returned to the user. All querying occurs on the frontend, ensuring that Apillon never gains access to the DID document or the generated mnemonic from the previous step. The user has the option to link their newly generated DID with their account, making it possible to retreive a DID for an account and vice-verca.

* **Attestation:** Attestation consists of two separate steps. The first is the verification of a user's claim, which is the result of the initial email verification step. The second step involves creating a verifiable credential, signed by both Apillon and the claimer (using the authentication key derived from the generated mnemonic in step 2). This credential's root hash is then submitted to the blockchain. The combination of these steps is referred to as the attestation process, and the credential should be stored securely.

* **DID and Verifiable Credential Storage:** Users are prompted to save the generated files. The generated credential can also be imported into the Sporran wallet for convenience and safekeeping.

* **Identity Revocation:** Users have the option to request the revocation of their DID through Apillon's OAuth website.

  The first step mirrors the registration process, where an email with a unique token is sent to the user.

  A revocation operation for the DID document is issued to the blockchain, rendering the identity invalid. All associated verifiable credentials also become unusable as a result of this process. The wallet account generated in the second step of the registration process remains valid, and all tokens associated with this account address remain accessible and valid.

* **Credential Restore:** Users can restore their previously generated credentials through Apillon's OAuth website if they have lost access to them.
  The first step is the same as the registration process, involving the sending of an email with a unique token.
  Upon following the verification email link, the user is redirected to a secure page, where the saved credential is returned to them.

* **Credential Verification:** The verification process requires two parameters: a verifiable credential (which can be in JSON file format or pasted as plain text in the text area) and the mnemonic passphrase used to sign the credential.

  From the provided credential and mnemonic, a presentation is created. The presentation should only contain the user's email address, which is the single property requested by Apillon to complete the verification process. The verification process also checks if the owner of the credential matches the address that signed the request.
  The presentation is considered valid if the integrity check mentioned above succeeds.

  Alternatively, if a user has imported their previously generated credentials into the Sporran wallet, they can log in directly with Sporran, without the need to provide the credentials in text or file format, or the mnemonic passphrase. This allows users to select the existing credential from their wallet and sign the request directly.

## Apillon Open Authentication (OAuth)
The OAuth flow begins when the user interacts with the page, triggering an action that opens the Apillon OAuth popup window, initiating the OAuth process. Users can then prove their identity either by providing the credential generated through Apillon and stored by the user or by verifying their credentials directly through the Sporran wallet if they have already imported their credential.

If a user does not yet have a generated decentralized identity (DID) stored on the Kilt blockchain, they can also generate one using the OAuth popup window.

Once a user completes the verification process, the OAuth popup sends an event to the main web application, signaling the completion of the OAuth flow and providing an authentication token. This token can be used by the app to verify the user's identity through Apillon's API.

After this, the web app obtains the user's Apillon account's email address and can use this information to provide access to any services the site offers, ensuring that the user has successfully verified their identity using their verifiable credentials attested by Apillon.

Projects, websites, or users interested in offering login via Apillon using a verifiable credential can follow the integration guide provided in the [integration section](./5-apillon-oauth-integration.md).