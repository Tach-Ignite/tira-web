# MinIO Storage Documentation

## Introduction

MinIO is a high-performance, distributed object storage system. It is designed for large-scale, cloud-native data infrastructure, and is compatible with Amazon S3 APIs, making it easy to integrate into existing cloud ecosystems. MinIO is known for its scalability, performance, and ease of deployment.

For detailed configuration options, refer to the [official MinIO documentation](https://docs.min.io/docs/).

## Usage

Once MinIO is installed and configured, you can start using it to store and manage your data. Here are some common tasks you can perform with MinIO:

- **Create Buckets**: Create buckets to organize your data. Buckets are containers for storing objects.
- **Upload Objects**: Upload objects (files) to MinIO buckets using the web interface or CLI.
- **Download Objects**: Download objects from MinIO buckets to your local system.
- **Manage Objects**: Perform operations such as copying, moving, and deleting objects within MinIO buckets.
- **Set Access Policies**: Set access policies to control who can access buckets and objects and what actions they can perform.

# MinIO Storage API Endpoints

## List Buckets

- **Description**: Retrieves a list of all buckets in the MinIO storage.
- **HTTP Method**: GET
- **Endpoint**: `/assets/buckets`
- **Access Level**: Authenticated
- **Response**: An array of bucket names.

## Create Bucket

- **Description**: Creates a new bucket in the MinIO storage.
- **HTTP Method**: POST
- **Endpoint**: `/assets/make-bucket`
- **Access Level**: Authenticated
- **Request Body**:
  - `bucketName` (string): Name of the bucket to be created.
- **Response**: Information about the created bucket.

## Upload File

- **Description**: Uploads a single file to the MinIO storage.
- **HTTP Method**: POST
- **Endpoint**: `/assets/upload`
- **Access Level**: Authenticated
- **Request Body**: Form-data with a file field named `file`.
- **Response**: Information about the uploaded file.

## Upload Multiple Files

- **Description**: Uploads multiple files to the MinIO storage.
- **HTTP Method**: POST
- **Endpoint**: `/assets/multi-upload`
- **Access Level**: Authenticated
- **Request Body**: Form-data with an array of files field named `files`.
- **Response**: Information about the uploaded files.

## Remove Object

- **Description**: Removes an object (file) from the MinIO storage.
- **HTTP Method**: DELETE
- **Endpoint**: `/assets/:objectName`
- **Access Level**: Authenticated
- **Path Parameter**:
  - `objectName` (string): Name of the object (file) to be removed.
- **Response**: Information about the deletion status.

## Retrieving Files

To retrieve a file from the MinIO storage, you can construct the URL using the following format:

http://your-domain.com/{bucketName}/{fileName}

## For Local Environment Setup

### Uploading Files

When using the upload API endpoint (`/assets/upload`) in your local environment, it will respond with the following JSON format:

```json
{
  "data": "8ce8a2f5-60c7-4f3f-b227-2845ac7ff0ae.jpeg",
  "error": null,
  "message": "Resource created",
  "statusCode": 201
}

For example, if the bucket name is v2Dev, and the uploaded file name is 8ce8a2f5-60c7-4f3f-b227-2845ac7ff0ae.jpeg, the URL to access this file will be:

http://minio/v2dev/8ce8a2f5-60c7-4f3f-b227-2845ac7ff0ae.jpeg
```
