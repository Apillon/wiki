import{_ as c,r as d,o as p,c as u,d as s,w as n,e,b as t,a as r}from"./app-1ca23a58.js";const k={},h=r('<h1 id="infrastructure-api" tabindex="-1"><a class="header-anchor" href="#infrastructure-api" aria-hidden="true">#</a> Infrastructure API</h1><p>The Infrastructure API provides an interface for managing essential infrastructure services required to build modern Web3 applications.</p><div class="divider"></div><h2 id="rpc-service" tabindex="-1"><a class="header-anchor" href="#rpc-service" aria-hidden="true">#</a> RPC Service</h2><h3 id="create-a-rpc-api-key" tabindex="-1"><a class="header-anchor" href="#create-a-rpc-api-key" aria-hidden="true">#</a> Create a RPC API Key</h3><blockquote><p>Create a new RPC API key for a project.</p></blockquote>',6),b={class:"split_content"},m=r('<div class="split_side"><h4 id="body-fields" tabindex="-1"><a class="header-anchor" href="#body-fields" aria-hidden="true">#</a> Body Fields</h4><table><thead><tr><th>Field</th><th>Type</th><th>Description</th><th>Required</th></tr></thead><tbody><tr><td>name</td><td><code>string</code></td><td>Name of the API key</td><td>Yes</td></tr><tr><td>description</td><td><code>string</code></td><td>Description of the API key</td><td>No</td></tr></tbody></table><h4 id="possible-errors" tabindex="-1"><a class="header-anchor" href="#possible-errors" aria-hidden="true">#</a> Possible Errors</h4><table><thead><tr><th>Code</th><th>Description</th></tr></thead><tbody><tr><td>40300000</td><td>Forbidden</td></tr><tr><td>40020001</td><td>Max RPC API keys limit reached</td></tr><tr><td>40405001</td><td>Project owner not found</td></tr><tr><td>50000001</td><td>Internal server error</td></tr><tr><td>422001101</td><td>RPC API key name is missing</td></tr></tbody></table></div>',1),v={class:"split_side"},y=t("br",null,null,-1),f=t("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[t("pre",{class:"language-bash"},[t("code",null,[t("span",{class:"token function"},"curl"),e(),t("span",{class:"token parameter variable"},"--location"),e(),t("span",{class:"token parameter variable"},"--request"),e(" POST "),t("span",{class:"token string"},'"https://api.apillon.io/rpc/api-key"'),e(),t("span",{class:"token punctuation"},"\\"),e(`
`),t("span",{class:"token parameter variable"},"--header"),e(),t("span",{class:"token string"},'"Authorization: Basic :credentials"'),e(),t("span",{class:"token punctuation"},"\\"),e(`
`),t("span",{class:"token parameter variable"},"--header"),e(),t("span",{class:"token string"},'"Content-Type: application/json"'),e(),t("span",{class:"token punctuation"},"\\"),e(`
--data-raw `),t("span",{class:"token string"},[e(`"{
    `),t("span",{class:"token entity",title:'\\"'},'\\"'),e("name"),t("span",{class:"token entity",title:'\\"'},'\\"'),e(": "),t("span",{class:"token entity",title:'\\"'},'\\"'),e("RPC API Key"),t("span",{class:"token entity",title:'\\"'},'\\"'),e(`,
    `),t("span",{class:"token entity",title:'\\"'},'\\"'),e("description"),t("span",{class:"token entity",title:'\\"'},'\\"'),e(": "),t("span",{class:"token entity",title:'\\"'},'\\"'),e("Description of the API key"),t("span",{class:"token entity",title:'\\"'},'\\"'),e(`
}"`)]),e(`
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"})])],-1),_=t("div",{class:"language-json line-numbers-mode","data-ext":"json"},[t("pre",{class:"language-json"},[t("code",null,[t("span",{class:"token punctuation"},"{"),e(`
  `),t("span",{class:"token property"},'"status"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"201"),t("span",{class:"token punctuation"},","),e(`
  `),t("span",{class:"token property"},'"data"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token punctuation"},"{"),e(`
    `),t("span",{class:"token property"},'"id"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"4"),t("span",{class:"token punctuation"},","),e(`
    `),t("span",{class:"token property"},'"projectUuid"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"d0c34b5e-1fd6-473e-81f8-e89ee479f7aa"'),t("span",{class:"token punctuation"},","),e(`
    `),t("span",{class:"token property"},'"name"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"RPC API Key"'),t("span",{class:"token punctuation"},","),e(`
    `),t("span",{class:"token property"},'"description"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"Description of the API key"'),t("span",{class:"token punctuation"},","),e(`
    `),t("span",{class:"token property"},'"uuid"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"60020364-7edc-495a-a0a2-df695bb1cc3f"'),e(`
  `),t("span",{class:"token punctuation"},"}"),e(`
`),t("span",{class:"token punctuation"},"}"),e(`
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"})])],-1),g=t("h3",{id:"list-rpc-api-keys",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#list-rpc-api-keys","aria-hidden":"true"},"#"),e(" List RPC API Keys")],-1),P=t("blockquote",null,[t("p",null,"Retrieve a list of RPC API keys associated with a project.")],-1),R={class:"split_content"},C={class:"split_side"},T=t("h4",{id:"query-parameters",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#query-parameters","aria-hidden":"true"},"#"),e(" Query Parameters")],-1),I=r('<h4 id="response-fields" tabindex="-1"><a class="header-anchor" href="#response-fields" aria-hidden="true">#</a> Response Fields</h4><table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td><code>number</code></td><td>Unique identifier of the RPC API key</td></tr><tr><td>projectUuid</td><td><code>string</code></td><td>UUID of the project the RPC API key belongs to</td></tr><tr><td>name</td><td><code>string</code></td><td>Name of the RPC API key</td></tr><tr><td>uuid</td><td><code>string</code></td><td>Unique identifier of the RPC API key returned by Dwellir</td></tr><tr><td>description</td><td><code>string</code></td><td>Description of the RPC API key</td></tr><tr><td>createTime</td><td><code>DateTime</code></td><td>Creation timestamp</td></tr><tr><td>updateTime</td><td><code>DateTime</code></td><td>Last updated timestamp</td></tr></tbody></table>',2),A={class:"split_side"},U=t("br",null,null,-1),E=t("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[t("pre",{class:"language-bash"},[t("code",null,[t("span",{class:"token function"},"curl"),e(),t("span",{class:"token parameter variable"},"--location"),e(),t("span",{class:"token parameter variable"},"--request"),e(" GET "),t("span",{class:"token string"},'"https://api.apillon.io/rpc/api-key"'),e(),t("span",{class:"token punctuation"},"\\"),e(`
`),t("span",{class:"token parameter variable"},"--header"),e(),t("span",{class:"token string"},'"Authorization: Basic :credentials"'),e(`
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"}),t("div",{class:"line-number"})])],-1),x=t("div",{class:"language-json line-numbers-mode","data-ext":"json"},[t("pre",{class:"language-json"},[t("code",null,[t("span",{class:"token punctuation"},"{"),e(`
  `),t("span",{class:"token property"},'"status"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"200"),t("span",{class:"token punctuation"},","),e(`
  `),t("span",{class:"token property"},'"data"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token punctuation"},"{"),e(`
    `),t("span",{class:"token property"},'"items"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token punctuation"},"["),e(`
      `),t("span",{class:"token punctuation"},"{"),e(`
        `),t("span",{class:"token property"},'"id"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"4"),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"createTime"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"2024-09-09T11:15:26.000Z"'),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"updateTime"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"2024-09-10T13:18:31.000Z"'),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"projectUuid"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"cfd85992-8f79-4486-97cf-2406bd722d90"'),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"name"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"RPC API Key"'),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"description"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"Description of the API key"'),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"uuid"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"60020364-7edc-495a-a0a2-df695bb1cc3f"'),e(`
      `),t("span",{class:"token punctuation"},"}"),e(`
    `),t("span",{class:"token punctuation"},"]"),t("span",{class:"token punctuation"},","),e(`
    `),t("span",{class:"token property"},'"total"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"1"),t("span",{class:"token punctuation"},","),e(`
    `),t("span",{class:"token property"},'"page"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"1"),t("span",{class:"token punctuation"},","),e(`
    `),t("span",{class:"token property"},'"limit"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"20"),e(`
  `),t("span",{class:"token punctuation"},"}"),e(`
`),t("span",{class:"token punctuation"},"}"),e(`
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"})])],-1),w=t("h3",{id:"get-a-rpc-api-key",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#get-a-rpc-api-key","aria-hidden":"true"},"#"),e(" Get a RPC API Key")],-1),D=t("blockquote",null,[t("p",null,"Retrieve the details of a specific RPC API key by its ID along with the list of RPC endpoints marked as favorite for this API key.")],-1),q={class:"split_content"},j=r('<div class="split_side"><h4 id="url-parameters" tabindex="-1"><a class="header-anchor" href="#url-parameters" aria-hidden="true">#</a> URL Parameters</h4><table><thead><tr><th>Field</th><th>Type</th><th>Description</th><th>Required</th></tr></thead><tbody><tr><td>id</td><td><code>number</code></td><td>Unique identifier of the RPC API key</td><td>Yes</td></tr></tbody></table><h4 id="response-fields-1" tabindex="-1"><a class="header-anchor" href="#response-fields-1" aria-hidden="true">#</a> Response Fields</h4><table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td><code>number</code></td><td>Unique identifier of the RPC API key</td></tr><tr><td>name</td><td><code>string</code></td><td>Name of the RPC API key</td></tr><tr><td>description</td><td><code>string</code></td><td>Description of the RPC API key</td></tr><tr><td>projectUuid</td><td><code>string</code></td><td>Unique identifier of the project</td></tr><tr><td>uuid</td><td><code>string</code></td><td>Unique identifier of the RPC API key</td></tr><tr><td>createTime</td><td><code>DateTime</code></td><td>Creation timestamp</td></tr><tr><td>updateTime</td><td><code>DateTime</code></td><td>Last updated timestamp</td></tr><tr><td>urls</td><td><code>array</code></td><td>Array of favorite URLs for the RPC API key</td></tr></tbody></table><h6 id="url-fields" tabindex="-1"><a class="header-anchor" href="#url-fields" aria-hidden="true">#</a> URL Fields</h6><table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td><code>number</code></td><td>Unique identifier of the RPC Endpoint</td></tr><tr><td>apiKeyId</td><td><code>number</code></td><td>Unique identifier of the RPC API key</td></tr><tr><td>chainName</td><td><code>string</code></td><td>Name of the chain the RPC Endpoint belongs to</td></tr><tr><td>network</td><td><code>string</code></td><td>Network of the RPC Endpoint (Usually mainnet, testnet, etc.)</td></tr><tr><td>httpsUrl</td><td><code>string</code></td><td>HTTPS URL of the RPC Endpoint</td></tr><tr><td>wssUrl</td><td><code>string</code></td><td>WSS URL of the RPC Endpoint</td></tr><tr><td>createTime</td><td><code>DateTime</code></td><td>Creation timestamp</td></tr><tr><td>updateTime</td><td><code>DateTime</code></td><td>Last updated timestamp</td></tr></tbody></table><h4 id="possible-errors-1" tabindex="-1"><a class="header-anchor" href="#possible-errors-1" aria-hidden="true">#</a> Possible Errors</h4><table><thead><tr><th>Code</th><th>Description</th></tr></thead><tbody><tr><td>40300000</td><td>Forbidden</td></tr><tr><td>40420001</td><td>RPC API key not found</td></tr></tbody></table></div>',1),N={class:"split_side"},L=t("br",null,null,-1),F=t("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[t("pre",{class:"language-bash"},[t("code",null,[t("span",{class:"token function"},"curl"),e(),t("span",{class:"token parameter variable"},"--location"),e(),t("span",{class:"token parameter variable"},"--request"),e(" GET "),t("span",{class:"token string"},'"https://api.apillon.io/rpc/api-key/:id"'),e(),t("span",{class:"token punctuation"},"\\"),e(`
`),t("span",{class:"token parameter variable"},"--header"),e(),t("span",{class:"token string"},'"Authorization: Basic :credentials"'),e(`
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"}),t("div",{class:"line-number"})])],-1),G=t("div",{class:"language-json line-numbers-mode","data-ext":"json"},[t("pre",{class:"language-json"},[t("code",null,[t("span",{class:"token punctuation"},"{"),e(`
    `),t("span",{class:"token property"},'"id"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"60020364-7edc-495a-a0a2-df695bb1cc3f"'),t("span",{class:"token punctuation"},","),e(`
    `),t("span",{class:"token property"},'"status"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"200"),t("span",{class:"token punctuation"},","),e(`
    `),t("span",{class:"token property"},'"data"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token punctuation"},"{"),e(`
      `),t("span",{class:"token property"},'"createTime"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"2024-09-09T11:15:26.000Z"'),t("span",{class:"token punctuation"},","),e(`
      `),t("span",{class:"token property"},'"updateTime"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"2024-09-10T13:18:31.000Z"'),t("span",{class:"token punctuation"},","),e(`
      `),t("span",{class:"token property"},'"name"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"RPC API Key"'),t("span",{class:"token punctuation"},","),e(`
      `),t("span",{class:"token property"},'"description"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token null keyword"},"null"),t("span",{class:"token punctuation"},","),e(`
      `),t("span",{class:"token property"},'"project_uuid"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"d0c34b5e-1fd6-473e-81f8-e89ee479f7aa"'),t("span",{class:"token punctuation"},","),e(`
      `),t("span",{class:"token property"},'"uuid"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"60020364-7edc-495a-a0a2-df695bb1cc3f"'),t("span",{class:"token punctuation"},","),e(`
      `),t("span",{class:"token property"},'"urls"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token punctuation"},"["),e(`
        `),t("span",{class:"token punctuation"},"{"),e(`
          `),t("span",{class:"token property"},'"id"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"77"),t("span",{class:"token punctuation"},","),e(`
          `),t("span",{class:"token property"},'"chainName"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"Ethereum"'),t("span",{class:"token punctuation"},","),e(`
          `),t("span",{class:"token property"},'"network"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"mainnet"'),t("span",{class:"token punctuation"},","),e(`
          `),t("span",{class:"token property"},'"httpsUrl"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"https://mainnet.apillon.io/60020364-7edc-495a-a0a2-df695bb1cc3f"'),t("span",{class:"token punctuation"},","),e(`
          `),t("span",{class:"token property"},'"wssUrl"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"wss://mainnet.apillon.io/60020364-7edc-495a-a0a2-df695bb1cc3f"'),t("span",{class:"token punctuation"},","),e(`
          `),t("span",{class:"token property"},'"createTime"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"2024-09-10T12:55:44.000Z"'),t("span",{class:"token punctuation"},","),e(`
          `),t("span",{class:"token property"},'"updateTime"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"2024-09-12T13:57:26.000Z"'),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token punctuation"},"}"),e(`
      `),t("span",{class:"token punctuation"},"]"),e(`
    `),t("span",{class:"token punctuation"},"}"),e(`
`),t("span",{class:"token punctuation"},"}"),e(`
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"})])],-1),S=t("h3",{id:"list-rpc-endpoints",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#list-rpc-endpoints","aria-hidden":"true"},"#"),e(" List RPC Endpoints")],-1),B=t("blockquote",null,[t("p",null,"Retrieve a list of available RPC endpoints by Dwellir.")],-1),K={class:"split_content"},V=r('<div class="split_side"><h4 id="response-fields-2" tabindex="-1"><a class="header-anchor" href="#response-fields-2" aria-hidden="true">#</a> Response Fields</h4><table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td><code>number</code></td><td>Unique identifier of the RPC Endpoint</td></tr><tr><td>image_url</td><td><code>string</code></td><td>URL of the RPC Endpoint chain image</td></tr><tr><td>name</td><td><code>string</code></td><td>Name of the RPC Endpoint chain</td></tr><tr><td>networkId</td><td><code>number</code></td><td>Network ID of the RPC Endpoint</td></tr><tr><td>networkName</td><td><code>string</code></td><td>Network of the RPC Endpoint (Usually Mainnet, Testnet, etc.)</td></tr><tr><td>nodes</td><td><code>array</code></td><td>Array of nodes for the RPC Endpoint</td></tr><tr><td>type</td><td><code>string</code></td><td>Type of the Entity (will be &#39;network&#39;)</td></tr><tr><td>version</td><td><code>string </code></td><td>Version of the RPC Endpoint</td></tr></tbody></table><h5 id="node-fields" tabindex="-1"><a class="header-anchor" href="#node-fields" aria-hidden="true">#</a> Node Fields</h5><table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>id</td><td><code>number</code></td><td>Unique identifier of the RPC Endpoint Node</td></tr><tr><td>https</td><td><code>string</code></td><td>HTTPS URL of the RPC Endpoint Node</td></tr><tr><td>wss</td><td><code>string</code></td><td>WSS URL of the RPC Endpoint Node</td></tr><tr><td>type</td><td><code>string</code></td><td>Type of the Entity (will be &#39;node&#39;)</td></tr><tr><td>node_type</td><td><code>string</code></td><td>Type of the RPC Endpoint Node</td></tr><tr><td>version</td><td><code>string </code></td><td>Version of the RPC Endpoint Node</td></tr></tbody></table></div>',1),Z={class:"split_side"},z=t("br",null,null,-1),M=t("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[t("pre",{class:"language-bash"},[t("code",null,[t("span",{class:"token function"},"curl"),e(),t("span",{class:"token parameter variable"},"--location"),e(),t("span",{class:"token parameter variable"},"--request"),e(" GET "),t("span",{class:"token string"},'"https://api.apillon.io/rpc/endpoints"'),e(),t("span",{class:"token punctuation"},"\\"),e(`
`),t("span",{class:"token parameter variable"},"--header"),e(),t("span",{class:"token string"},'"Authorization: Basic :credentials"'),e(`
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"}),t("div",{class:"line-number"})])],-1),W=t("div",{class:"language-json line-numbers-mode","data-ext":"json"},[t("pre",{class:"language-json"},[t("code",null,[t("span",{class:"token punctuation"},"{"),e(`
    `),t("span",{class:"token property"},'"status"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"200"),t("span",{class:"token punctuation"},","),e(`
    `),t("span",{class:"token property"},'"data"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token punctuation"},"["),t("span",{class:"token punctuation"},"{"),e(`
        `),t("span",{class:"token property"},'"id"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"1"),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"image_url"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"https://apillon.io/images/chains/ethereum.svg"'),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"name"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"Ethereum"'),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"networkId"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"31"),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"networkName"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"Mainnet"'),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"nodes"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token punctuation"},"["),t("span",{class:"token punctuation"},"{"),e(`
            `),t("span",{class:"token property"},'"id"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token number"},"1"),t("span",{class:"token punctuation"},","),e(`
            `),t("span",{class:"token property"},'"https"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"https://mainnet.apillon.io/<key>"'),t("span",{class:"token punctuation"},","),e(`
            `),t("span",{class:"token property"},'"wss"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"wss://mainnet.apillon.io/<key>"'),t("span",{class:"token punctuation"},","),e(`
            `),t("span",{class:"token property"},'"type"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"node"'),t("span",{class:"token punctuation"},","),e(`
            `),t("span",{class:"token property"},'"node_type"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"Archive"'),t("span",{class:"token punctuation"},","),e(`
            `),t("span",{class:"token property"},'"version"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"1.0"'),e(`
        `),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},"]"),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"type"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"network"'),t("span",{class:"token punctuation"},","),e(`
        `),t("span",{class:"token property"},'"version"'),t("span",{class:"token operator"},":"),e(),t("span",{class:"token string"},'"1.0"'),e(`
    `),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},"]"),e(`
`),t("span",{class:"token punctuation"},"}"),e(`
`)])]),t("div",{class:"line-numbers","aria-hidden":"true"},[t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"}),t("div",{class:"line-number"})])],-1);function H(O,Y){const i=d("CodeDiv"),a=d("CodeGroupItem"),o=d("CodeGroup"),l=d("RouterLink");return p(),u("div",null,[h,s(i,null,{default:n(()=>[e(" POST /rpc/api-key ")]),_:1}),t("div",b,[m,t("div",v,[y,s(o,null,{default:n(()=>[s(a,{title:"cURL",active:""},{default:n(()=>[f]),_:1})]),_:1}),s(o,null,{default:n(()=>[s(a,{title:"Response",active:""},{default:n(()=>[_]),_:1})]),_:1})])]),g,P,s(i,null,{default:n(()=>[e(" GET /rpc/api-key ")]),_:1}),t("div",R,[t("div",C,[T,t("p",null,[e("All query parameters from "),s(l,{to:"/build/1-apillon-api.html#listing-requests"},{default:n(()=>[e("listing request")]),_:1})]),I]),t("div",A,[U,s(o,null,{default:n(()=>[s(a,{title:"cURL",active:""},{default:n(()=>[E]),_:1})]),_:1}),s(o,null,{default:n(()=>[s(a,{title:"Response",active:""},{default:n(()=>[x]),_:1})]),_:1})])]),w,D,s(i,null,{default:n(()=>[e(" GET /rpc/api-key/:id ")]),_:1}),t("div",q,[j,t("div",N,[L,s(o,null,{default:n(()=>[s(a,{title:"cURL",active:""},{default:n(()=>[F]),_:1})]),_:1}),s(o,null,{default:n(()=>[s(a,{title:"Response",active:""},{default:n(()=>[G]),_:1})]),_:1})])]),S,B,s(i,null,{default:n(()=>[e(" GET /rpc/endpoints ")]),_:1}),t("div",K,[V,t("div",Z,[z,s(o,null,{default:n(()=>[s(a,{title:"cURL",active:""},{default:n(()=>[M]),_:1})]),_:1}),s(o,null,{default:n(()=>[s(a,{title:"Response",active:""},{default:n(()=>[W]),_:1})]),_:1})])])])}const J=c(k,[["render",H],["__file","13-infrastructure-api.html.vue"]]);export{J as default};
