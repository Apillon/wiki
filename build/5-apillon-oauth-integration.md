# Apillon OAuth Integration

If you wish to integrate Apillon's OAuth protocol into your own project or website, you are able to do so. If you don't have an Apillon account or project already, you can get started on [our dashboard](https://app.apillon.io).
After you have created a project, navigate to your project's [API keys](https://app.apillon.io/dashboard/api-keys) section under the project settings. You must generate an API key for the Authentication service with the **KEY_EXECUTE** permission included. This API key will be used to interact with Apillon's API, generate an OAuth session and verify a user login. Make sure you store your API key and your API key secret in a secure manner.

To integrate Apillon's OAuth protocol into your website, follow these steps:

1. **Create an Apillon Account:** If you don't have an Apillon account or project, start by creating one on [our dashboard](https://app.apillon.io).

2. **Generate an API Key:** After creating a project, go to your project's settings and navigate to the [API keys section](https://app.apillon.io/dashboard/api-keys). Generate an API key for the Authentication service with the KEY_EXECUTE permission.

3. **Securely Store API Key:** It's crucial to securely store your API key and its secret. These will be used to interact with Apillon's API, create OAuth sessions, and verify user logins. This should be done on the server-side, explained below.

## Client - OAuth popup & events

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
## Server - Auth API endpoints
The server-side part of the OAuth implementation contains the logic to query the Apillon API, obtain a session token to initiate the OAuth flow and verify the user login when the flow is finished.

### Obtain a session token

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
    "session": "eyJhbGciOiJIUzI1..."
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

### Verify user login

> After the user has completed the OAuth flow, verify they have successfully logged in with the generated OAuth token from the "message" event handler

<div class="request-url">GET /auth/verify-login?token=OAUTH_TOKEN</div>

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


