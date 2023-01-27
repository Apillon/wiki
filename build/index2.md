# Build

Guides and tutorials coming soon, stay tuned...

<div class="split_content">
	<div class="split_side">
		<h3>Errors</h3>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only <a href="/about/2-what-is-apillon.html">five centuries</a>, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
		<p>Authtrail uses convetinal response</p>
	</div>
	<div class="split_side">
<CodeGroup>
  <CodeGroupItem title="cURL" active>

```bash
curl --location --request DELETE "https://api-dev.apillon.io/storage/:bucketUuid/file/:id" \
--header "Authorization: Basic :credentials" \
--data-raw ""
```

  </CodeGroupItem>
</CodeGroup>
<CodeGroup>
  <CodeGroupItem title="Response">

```JSON
{
    "id": "bc92ff8d-05f2-4380-bb13-75a1b6b7f388",
    "status": 200,
    "data": {
        "id": 397,
        "status": 8,
        "file_uuid": "0a775bfa-a0d0-4e0b-9a1e-e909e426bd11",
        "CID": "QmcG9r6Rdw9ZdJ4imGBWc6mi5VzWHQfkcLDMe2aP74eb42",
        "name": "My file.txt",
        "contentType": "text/plain",
        "size": 68,
        "fileStatus": 4,
    }
}
```

  </CodeGroupItem>
</CodeGroup>
	</div>
</div>
