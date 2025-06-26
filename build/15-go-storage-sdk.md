# Go Storage SDK

A Go SDK for interacting with the [Apillon Storage API](/build/2-storage-api). This SDK allows you to manage storage buckets, upload and manage files, and retrieve IPFS links programmatically.

GitHub repository: [https://github.com/Apillon/go-sdk](https://github.com/Apillon/go-sdk)

## Features

### Storage API
- **Bucket Management:** Create, list, and retrieve storage buckets.
- **File Upload:** Upload single or multiple files to a bucket.
- **File Management:** List, retrieve details, and delete files.
- **Directory Management:** Delete directories from a bucket.
- **IPFS Integration:** Retrieve or generate IPFS links for files.
- **IPFS Cluster Info:** Retrieve IPFS cluster information.

### SDK features
- **Session Management:** Manage upload sessions for batch file uploads.
- **Context Support:** All operations support context for cancellation and timeouts.
- **Robust Error Handling:** Comprehensive error types and detailed error messages.
- **Automatic Retries:** Built-in retry mechanism for failed requests.
- **Input Validation:** Thorough validation of all input parameters.

## Requirements

- Go 1.20 or higher
- Apillon API key

## Getting Started

To use the Apillon Storage Go SDK, you must register an account at [Apillon.io](https://apillon.io/), create a project, and generate an API key.

## Installation

```sh
go get github.com/Apillon/go-sdk
```

## Initialization

Import the SDK in your Go code:

```go
import (
    "context"
    "github.com/Apillon/go-sdk/storage"
    "github.com/Apillon/go-sdk/requests"
)
```

All modules require the API key for authentication. You can provide it in two ways:

### 1. Environment Variables

Set the environment variable `APILLON_API_KEY` before running your application.

**Windows (Command Prompt):**
```sh
set APILLON_API_KEY=your_api_key_here
```

**Linux/macOS:**
```sh
export APILLON_API_KEY=your_api_key_here
```

### 2. Programatically

You can set the API key at runtime in your Go code:

```go
requests.SetAPIKey("your_api_key_here")
```

## Usage

### Import the SDK

```go
import (
    "github.com/Apillon/go-sdk/storage"
)
```

### Create a Bucket

```go
ctx := context.Background()
err := storage.CreateBucket(ctx, "my-bucket", "A description for my bucket")
if err != nil {
    // handle error
}
```

### List Buckets

```go
ctx := context.Background()
buckets, err := storage.GetBucket(ctx, "my-bucket") // or storage.GetBucket(ctx, "") for all buckets
if err != nil {
    // handle error
}
for _, bucket := range buckets.Data.Items {
    fmt.Println(bucket.Name, bucket.BucketUUID)
}
```

### Upload Files

```go
ctx := context.Background()
files := []storage.WholeFile{
    {
        Metadata: storage.FileMetadata{
            FileName:    "example.txt",
            ContentType: "text/plain",
        },
        Content: "Hello, Apillon!",
    },
}

bucketUUID := "your-bucket-uuid"
result, err := storage.UploadFileProcess(ctx, bucketUUID, files)
if err != nil {
    // handle error
}
fmt.Println("Upload result:", result)
```

### List Files in a Bucket

```go
ctx := context.Background()
fileList, err := storage.ListFilesInBucket(ctx, bucketUUID)
if err != nil {
    // handle error
}
for _, file := range fileList.Data.Items {
    fmt.Println(file.Name, file.FileUUID)
}
```

### Get File Details

```go
ctx := context.Background()
fileDetails, err := storage.GetFileDetails(ctx, bucketUUID, fileUUID)
if err != nil {
    // handle error
}
fmt.Printf("File details: %+v\n", fileDetails.Data)
```

### Delete a File

```go
ctx := context.Background()
_, err := storage.DeleteFile(ctx, bucketUUID, fileUUID)
if err != nil {
    // handle error
}
```

### Delete a Directory

```go
ctx := context.Background()
resp, err := storage.DeleteDirectory(ctx, bucketUUID, directoryUUID)
if err != nil {
    // handle error
}
fmt.Printf("Delete directory response: %+v\n", resp)
```

### Get or Generate IPFS Link

```go
ctx := context.Background()
ipfsLink, err := storage.GetOrGenerateIPFSLink(ctx, cid)
if err != nil {
    // handle error
}
fmt.Println("IPFS Link:", ipfsLink)
```

### Get IPFS Cluster Info

```go
ctx := context.Background()
info, err := storage.GetIPFSClusterInfo(ctx)
if err != nil {
    // handle error
}
fmt.Printf("IPFS Cluster Info: %+v\n", info.Data)
```

### Get Bucket Content

```go
ctx := context.Background()
content, err := storage.GetBucketContent(ctx, bucketUUID)
if err != nil {
    // handle error
}
fmt.Println("Bucket Content:", content)
```

### Advanced: Manual Upload Session Control

#### Start an Upload Session

```go
ctx := context.Background()
files := []storage.FileMetadata{
    {FileName: "file1.txt", ContentType: "text/plain"},
    {FileName: "file2.json", ContentType: "application/json"},
}
resp, err := storage.StartUploadFilesToBucket(ctx, bucketUUID, files)
if err != nil {
    // handle error
}
fmt.Println("Start upload session response:", resp)
```

#### Upload File Content to Signed URL

```go
ctx := context.Background()
err := storage.UploadFiles(ctx, signedURL, fileContent)
if err != nil {
    // handle error
}
```

#### End an Upload Session

```go
ctx := context.Background()
resp, err := storage.EndSession(ctx, bucketUUID, sessionID)
if err != nil {
    // handle error
}
fmt.Println("End session response:", resp)
```

## Error Handling

The SDK provides detailed error information through the `StorageError` type:

```go
if err != nil {
    if storageErr, ok := err.(*storage.StorageError); ok {
        fmt.Printf("Error Code: %d\n", storageErr.Code)
        fmt.Printf("Error Message: %s\n", storageErr.Message)
        if storageErr.Err != nil {
            fmt.Printf("Original Error: %v\n", storageErr.Err)
        }
    }
}
```

Common error codes:
- `ErrCodeInvalidInput` (40000001): Invalid input parameters
- `ErrCodeDirectoryNotFound` (40406003): Directory not found
- `ErrCodeDirectoryDeleting` (40006007): Directory already marked for deletion

## Running Tests

The SDK includes comprehensive unit tests.
To run all tests:

```sh
go test ./...
```

## Notes

- Ensure your API key is kept secure and **never** committed to version control.
- For more details on the Apillon and the API, see the [API documentation](/build/1-apillon-api.md).
- The SDK supports context for better control over request lifecycle and cancellation.
- All operations include automatic retries for failed requests.
- Input validation is performed on all operations to ensure data integrity.