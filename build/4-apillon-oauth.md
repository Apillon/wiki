
# Apillon Open Authentication (OAuth)

## Introduction
Apillon offers a way for users to integrate an alternative login method by using a decentralized identity (DID) which is stored on the [Kilt](https://www.kilt.io/) parachain. The decentralized identity contains a credential which consists of the user's email address, attested by Apillon or by SocialKYC. Any user can generate their own decentralized identity and verify their email address through Apillon's OAuth protocol and can then use the generated identity and credential to verify the identity on 3rd-party platforms.

## Modules

### Registration

The registration step consists of account generation, DID creation and the attestation process of supported claim types.

Email verification - this is the first step of the identity generation flow and is actually already part of the attestation process, since it verifies (attests) ownership of the provided email address.

Account generation - Creates a KILT wallet address, derived from a BIP39 mnemonic. This is also the master key used when accessing the account. The user is prompted to store the mnemonic in a secure way.

**Identity generation** - This process generally takes between one and five minutes. On the frontend, the user signs the operation for the DID creation with their Sporran wallet, which is submitted to the blockchain. The result of this is the DID document. Once the process is complete, the DID document is queried from the blockchain and returned to the user. The querying happens all on the frontend side, so Apillon never gets access to either the DID document, or the generated mnemonic from the previous step.

**Attestation** - Attestation is actually composed of two separate steps - verification of one's claim, which is the result of the first step when email verification is performed in form of email verification. The second step is the creation of a verifiable credential, signed by both Apillon and the claimer (using the authentication key, derived from the generated mnemonic in step 2) and lastly submission of this credential's root hash to the blockchain. The aggregate of these steps is what is called the attestation process. The credential is unique and should be stored in a secure way.

**DID and Verifiable Credential storage** - The user is prompted to save the generated files. The generated credential can also be imported in the Sporran wallet for the sake of convenience and safekeeping.

### Identity Revocation

Users have their option to request their DID to be revoked through Apillon's OAuth website.

The first step is identical to the registration process - an email with a unique token is sent to the email.

A revoke operation for the DID document is issued to the blockchain, rendering the identity invalid. All the associated verifiable credentials are rendered unusable as a result of this process as well. The wallet - account, generated in the second step of the registration process remains valid. All tokens associated with this account address remain accessible and valid.

### Credential Restore

Users can restore their previously generated credentials through Apillon's OAuth website. This is done in case the user has lost access to their credentials.

The first step is identical to the registration process - an email with a unique token is sent to the email.

Following the link in the verification email, the user is redirected to a secure page and the saved credential is returned to them.

### Credential Verification

Two parameters are required for the verification process: A verifiable credential (can be used as a json file, or pasted as plain text in the text area) an the mnemonic pass phrase, used to sign the credential.

From the provided credential and mnemonic, a presentation is created. The presentation should contain only the user's email address, which is the single property requested by Apillon in order for the verification process to be completed. The verification process also checks if the owner of the credential is the address that actually singed the request.

The presentation is deemed valid if the above integrity check is successful.

Alternatively, given that a user has imported their previously generated credentials into the Sporran wallet, they have the ability to login directly with Sporran, without having to provide the neither the credentials in text/file format nor the mnemonic phrase. This way the user can directly select the existing credential from their wallet and sign the request.

## Apillon OAuth integration

If you wish to integrate Apillon's OAuth protocol into your own project or website, you are able to do so. If you don't have an Apillon account or project already, you can get started on [our dashboard](https://app.apillon.io).
After you have created a project, navigate to your project's [API keys](https://app.apillon.io/dashboard/api-keys) section under the project settings. You must generate an API key for the Authentication service with the **KEY_EXECUTE** permission included. This API key will be used to interact with Apillon's API, generate an OAuth session and verify a user login. Make sure you store your API key and your API key secret in a secure manner.

### Client - Auth API popup & events

To initiate the OAuth flow for the user, use the following code to open Apillon's OAuth website as a popup and prompt the user to complete the OAuth flow. The session token passed as a query parameter is obtained from the Apillon API (see Server section below).

Additionally, an event listener is added such that the main app/website can handle the successful completion of the OAuth flow by the user, which grants a user authentication token. The token is then used to verify the login through Apillon's API, which finally returns the user's email address from the Apillon app.

```js
async function openOAuthPopup() {
  const sessionToken = await getAuthToken();
  oAuthWindow = window.open(
    `https://oauth.apillon.io/?embedded=1&token=${sessionToken}`,
    'Apillon OAuth Form',
    `height=${900} width=${450} resizable=no`
  );
}

window.addEventListener('message', async event => {
  if (!event.origin?.includes('apillon.io')) return;

  if (!event.data.verified) {
    return console.error('Invalid verification');
  }
  const oauthAuthToken = event.data.data.userData;
  // Close OAuth window
  oAuthWindow?.close();

  verifyUserLogin(oauthAuthToken);
}, false);
```


### Server - Auth API endpoints

#### Obtain a session token

> Obtain a session token from the Apillon API, used to interact with Apillon's OAuth protocol

<div class="request-url">GET /auth/session-token</div>

<div class="split_content">
  <div class="split_side">
    <br>
    <CodeGroup>
        <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/auth/session-token" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
```

  </CodeGroupItem>
</CodeGroup>
  </div>
  <div class="split_side">
  <br>
  <CodeGroup>
    <CodeGroupItem title="Response">

```json
{
  "id": "0da29b5a-8a8b-473b-9f97-3183819263f4",
  "status": 200,
  "data": {
    "session": "eyJhbGc..."
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

#### Verify user login

> After the user has completed the OAuth flow, verify they have successfully logged in with the generated OAuth token from the "message" event handler

<div class="request-url">GET /auth/verify-login</div>

<div class="split_content">
  <div class="split_side">
    <br>
    <CodeGroup>
        <CodeGroupItem title="cURL" active>

```sh
curl --location --request GET "https://api.apillon.io/auth/verify-login?token=OAUTH_TOKEN" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
```

  </CodeGroupItem>
</CodeGroup>
  </div>
  <div class="split_side">
  <br>
  <CodeGroup>
    <CodeGroupItem title="Response">

```json
{
  "id": "de2cf1e7-0dfe-4378-ab77-98cbc9a00496",
  "status": 200,
  "data": {
    "verified": true
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>


