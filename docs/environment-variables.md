# Environment Variables

Configuring your local development environment involves setting up environment variables and managing third-party secrets effectively. This ensures that your application runs smoothly with all the necessary configurations and secure handling of sensitive information.

**Note:** These environment variables should not contain secrets. Always store your secrets responsibly using services like AWS Secrets Manager or Azure Key Vault. Do not commit secrets to source control!

## Environment Variables Descriptions

- `NEST_PORT`: Specifies the port for the NestJS backend.
- `API_URL`: The base URL of the NestJS application. Use `https://localhost:3001/api` for local development and `https://yourdomain.com/api` for production.
- `AUTH_PROVIDER`: Specifies the authentication provider. Options include `local` and `AWS Cognito`.
- `DATABASE_URL`: The connection string for the Postgres database.
- `JWT_SECRET`: A secret string used by Passport JWT for encryption and hashing. This should be a randomized string and is required when using `local` as the `AUTH_PROVIDER`.
- `JWT_EXPIRATION`: Specifies the JWT token expiry time (e.g., `30m`, `1h`, `10h`, `1d`).
- `STORAGE_PROVIDER`: Specifies the storage provider. Options include `minio` and `Amazon S3`. Minio is used as a wrapper around local and Amazon S3.
- Minio-specific variables: `MINIO_ENDPOINT`, `MINIO_PORT`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`, `MINIO_USE_SSL`, `BUCKET_NAME`, `BUCKET_PREFIX`. See [MINIO Storage](/docs/minio_storage.md) for more details.
- AWS-specific variables: `AWS_REGION`, `AWS_COGNITO_USER_POOL_ID`, `AWS_COGNITO_CLIENT_ID`. These are required to use AWS Cognito as the authentication provider.

## Environment Variables Configuration

Configuring the application is straightforward with the ability to select service providers and utilize them via configuration. A CLI tool has been developed to help configure environment variables and secrets easily in local environments.

### Env CLI Configuration

A CLI tool has been developed to assist in managing your environment variables. Use the following command in the root folder to run the Config CLI:

```bash
pnpm config:env
```

Find the CLI configuration tool here:
`./configs/environment_config.ts`
