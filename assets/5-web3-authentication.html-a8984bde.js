import{_ as r,r as i,o as s,c as h,b as e,e as t,d as n,w as l,a as c}from"./app-1ca23a58.js";const d={},p=c('<h1 id="web3-authentication" tabindex="-1"><a class="header-anchor" href="#web3-authentication" aria-hidden="true">#</a> Web3 Authentication</h1><p>Apillon offers a method for users to integrate an alternative authentication approach using a decentralized identifier (DID) stored on the KILT parachain. KILT-powered decentralized identity includes a credential that comprises a user&#39;s email address, which can be attested by Apillon or SocialKYC. Any user can create their own decentralized identity, verify their email address through Apillon&#39;s OAuth protocol, and then use this decentralized account and credential to verify their identity on third-party platforms.</p><h2 id="authentication-workflow" tabindex="-1"><a class="header-anchor" href="#authentication-workflow" aria-hidden="true">#</a> Authentication workflow</h2><ul><li><p><strong>Email Verification:</strong> This is the initial step in the process of generating a decentralized identity, which also serves as part of the attestation process, as it attests ownership of the provided email address.</p></li><li><p><strong>Account Generation:</strong> A KILT wallet address derived from a BIP39 mnemonic is created. This mnemonic serves as the master key for accessing the account. Users are prompted to store this mnemonic securely.</p></li><li><p><strong>Identity Generation:</strong> This step typically takes one to five minutes. On the front end, the user signs the operation for DID creation with their Sporran wallet, which is then submitted to the blockchain. The result is a DID document. Once the process is complete, the DID document is queried from the blockchain and returned to the user. All querying occurs on the front end, ensuring that Apillon never gains access to the DID document or the generated mnemonic from the previous step. The user has the option to link their newly generated DID with their account, making it possible to retrieve a DID for an account and vice-versa.</p></li><li><p><strong>Attestation:</strong> Attestation consists of two steps. The first is verifying a user&#39;s claim, which is the result of the initial email verification step. The second step involves creating a verifiable credential, signed by both Apillon and the claimer (using the authentication key derived from the generated mnemonic in the second step). This credential&#39;s root hash is then submitted to the blockchain. The combination of these steps is referred to as the attestation process, and the credential should be stored securely.</p></li><li><p><strong>DID and Verifiable Credential Storage:</strong> The user is prompted to save the generated files. The generated credential can also be imported into the Sporran wallet for convenience and safekeeping.</p></li><li><p><strong>Identity Revocation:</strong> The user has the option to request the revocation of their DID through Apillon&#39;s OAuth website.</p><p>The first step mirrors the registration process, where an email with a unique token is sent to the user.</p><p>A revocation operation for the DID document is issued to the blockchain, rendering the identity invalid. All associated verifiable credentials also become unusable as a result of this process. The wallet account generated in the second step of the registration process remains valid, and all tokens associated with this account address remain accessible and valid.</p></li><li><p><strong>Credential Restore:</strong> The user can restore their previously generated credentials through Apillon&#39;s OAuth website in case they lose access to them. The first step is the same as the registration process and involves sending an email with a unique token. Upon following the verification email link, the user is redirected to a secure page, where the saved credential is returned to them.</p></li><li><p><strong>Credential Verification:</strong> The verification process requires two parameters: a verifiable credential (which can be in JSON format or pasted as plain text in the text area) and the mnemonic passphrase used to sign the credential.</p><p>From the provided credential and mnemonic, a presentation is created. The presentation should only contain the user&#39;s email address, which is the single property requested by Apillon to complete the verification process. The verification process also checks whether the owner of the credential matches the address that signed the request. The presentation is considered valid if the integrity check mentioned above succeeds.</p><p>Alternatively, if a user has imported their previously generated credentials into the Sporran wallet, they can log in directly with Sporran without the need to provide the credentials in text or file format, or the mnemonic passphrase. This allows users to select an existing credential from their wallet and sign the request directly.</p></li></ul>',4),u={href:"https://blog.apillon.io/guide-log-in-to-apillon-dashboard-using-kilt-decentralized-identity-af2c5b2b054e",target:"_blank",rel:"noopener noreferrer"},g=e("h2",{id:"apillon-open-authentication-oauth",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#apillon-open-authentication-oauth","aria-hidden":"true"},"#"),t(" Apillon Open Authentication (OAuth)")],-1),f=e("p",null,"The OAuth flow begins when a user interacts with the page, triggering an action that opens the Apillon OAuth pop-up window and initiating the OAuth process. The user can then prove their identity either by providing a credential generated through Apillon and stored by the user or by verifying their credential directly through the Sporran wallet in case they have already imported their credential.",-1),m=e("p",null,"If a user does not yet have a generated decentralized identity (DID) stored on the KILT blockchain, they can also generate one using the OAuth pop-up window.",-1),v=e("p",null,"Once a user completes the verification process, the OAuth pop-up sends an event to the main web application, signaling the completion of the OAuth flow and providing an authentication token. This token can be used by the app to verify the user's identity through Apillon's API.",-1),b=e("p",null,"After this, the web app obtains the user's Apillon account's email address and can use this information to provide access to any services the site offers, ensuring that the user has successfully verified their identity using verifiable credentials attested by Apillon.",-1);function w(y,A){const o=i("ExternalLinkIcon"),a=i("RouterLink");return s(),h("div",null,[p,e("blockquote",null,[e("p",null,[e("a",u,[t("Read more: Guide - Log in to Apillon dashboard using KILT decentralized identity"),n(o)])])]),g,f,m,v,b,e("p",null,[t("Projects, websites, or users interested in offering a decentralized log-in option via Apillon using a verifiable credential can follow the integration guide provided in the "),n(a,{to:"/build/7-apillon-oauth-integration.html"},{default:l(()=>[t("integration section")]),_:1}),t(".")])])}const k=r(d,[["render",w],["__file","5-web3-authentication.html.vue"]]);export{k as default};
