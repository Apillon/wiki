# Apillon OAuth Integration

You can easily integrate Apillon's OAuth protocol into your own project or website. If you don't have an Apillon account or project already, get started on the [Apillon dashboard](https://app.apillon.io).

Once you have created a project, navigate to the project's [API keys](https://app.apillon.io/dashboard/api-keys) section in your project settings. Generate an API key for the Authentication service with the **KEY_EXECUTE** permission. This API key will be used to interact with Apillon's API, generate an OAuth session, and verify a user log-in. Make sure you store your API key and your API key secret in a secure manner.

To integrate Apillon's OAuth protocol into your website, follow these steps:

1. **Create an Apillon Account:** If you don't have an Apillon account or project yet, create one on the [Apillon dashboard](https://app.apillon.io).

2. **Generate an API Key:** Go to your project's settings and navigate to the [API keys section](https://app.apillon.io/dashboard/api-keys). Generate an API key for the Authentication service with the KEY_EXECUTE permission.

3. **Securely Store API Key:** It's crucial to securely store your API key and its secret. These will be used to interact with Apillon's API, create OAuth sessions, and verify user log-ins. This should be done on the server side, as explained below.

> For a complete NodeJS demo of the whole OAuth flow, refer to [this Github repo](https://github.com/Apillon/oauth-demo)
## Client - OAuth popup & events

To initiate the OAuth flow for the user, use the following code to open Apillon's OAuth website as a pop-up and prompt your users to complete the OAuth flow. The session token passed as a query parameter is obtained from the Apillon API (see Server section below).

Additionally, an event listener is added for the main app/website to handle the successful completion of the OAuth flow by the user, which grants an authentication token to the user. The token is then used to verify the login through Apillon's API, which finally returns the user's email address on Apillon.

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
    throw new Error('Invalid OAuth verification');
  }
  // Close OAuth popup window
  oAuthWindow?.close();

  verifyUserLogin(event.data.authToken);
}, false);
```
## Server - Auth API endpoints
The server-side part of the OAuth implementation contains the logic to query the Apillon API, obtain a session token to initiate the OAuth flow, and verify the user log-in when the flow is finished.

### Obtain a session token

Obtain a session token from the Apillon API to interact with Apillon's OAuth protocol.

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
    "sessionToken": "eyJhbGciOiJIUzI1..."
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>

### Verify user login

After the user has completed the OAuth flow, verify they have successfully logged in with the generated OAuth token from the "message" event handler. As a response, receive the user's Apillon email address.

<div class="request-url">POST /auth/verify-login</div>

<div class="split_content">
  <div class="split_side">
    <br>
    <CodeGroup>
        <CodeGroupItem title="cURL" active>

```sh
curl --location --request POST "https://api.apillon.io/auth/verify-login" \
--header "Authorization: Basic :credentials" \
--header "Content-Type: application/json" \
--data-raw "{
    \"token\":  \"eyJhbGciOiJIUzI1...\"
}"
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
    "email": "apillon-user@mail.com"
  }
}
```

  </CodeGroupItem>
  </CodeGroup>

  </div>
</div>


