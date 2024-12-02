# Quick Start - Local

This guide will help you set up your local development environment for the TIRA-WEB project.

## TL;DR

- Clone or download the TIRA-WEB repository.
- Run local initializer in the root folder: `$ bash initLocal.sh`
- Open root folder in VS Code and open folder in Dev Container.
- Install dependencies: `$ pnpm i --frozen-lockfile`
- Set up local environment variables using the provided CLI tool: `$ pnpm config:env`
- Run database migration: `$ pnpm prisma-migrate`
- Generate Prisma Client: `$ pnpm prisma-generate`
- Use Seeder to Seed Sample data: `$ pnpm seed-sample`
- Build backend (Build logger and other dependencies): `$ nx build api`
- Start the backend development server: `$ nx dev api`
- Start the frontend development server: `$ nx dev web`
- Access the application in your browser at `https://localhost`
- Set up and start the CMS: `$ nx dev cms`

## Introduction

The TIRA-WEB project is ready to be run in a containerized development environment, which can be facilitated by tools like VS Code's Dev Containers feature among others.

## Pre-requisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Bash](https://www.gnu.org/software/bash/)
- [VS Code](https://code.visualstudio.com/)
- [VS Code Remote Development Extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- [Cloned RA](https://github.com/Tach-Ignite/tach-ra-web)

## Initialization Steps

- Clone or download TIRA-WEB repo.
- Run the `$ bash initLocal.sh` script to initialize the local environment. This will create self-signed certs and `.env` files.

## Start Dev Container

- Open root folder in VS Code.
- Open Command Pallette. `ctrl + shift + P` or `cmd + shift + P`
- Select `Dev Containers: Open folder in Container` from the menu.
  VS Code will rebuild the container based on the configuration in `devcontainer.json` and open the project inside the container.

## Install Dependencies

- Install dependencies: `$ pnpm install --frozen-lockfile`. This will install all the dependencies required for the project.

## Setup Local Environment Variables

- Use the provided CLI tool to set up local environment variables:
  ```bash
  $ pnpm config:env
  ```

### Environment Variables Descriptions

- `APP_URL`: The base URL of the NestJS application. Use `https://localhost:3000` for local development and `https://yourdomain.com` for production default is set to `http://localhost:3000`.
- `API_URL`: The base URL of the NestJS application. Use `https://localhost:3000` for local development and `https://yourdomain.com` for production default is set to `http://localhost:3001/api`.
- `DATABASE_URL`: The connection string for the Postgres database default values are set to postgres docker container database values `postgresql://root:randomPassword@postgres:5432/tachLocal?schema=public`.
- `JWT_SECRET`: The secret key for the JWT, value looks like `somethingRandomHere`.
- `CMS_DATABASE_URL`: The database connection string for the Strapi CMS default values are set to `postgresql://root:randomPassword@postgres:5432/tachLocal` which is setup as part of the dev container.
- `CMS_DATABASE_SCHEMA`: The database schema name for Strapi cms default values are set to 'cms', make sure this schema already exists in the database or create a new schema with a name of you choice for strapi cms and use that value for this env variable.
- `STRAPI_CMS_HOST`: Strapi cms host default is set to `localhost`.
- `STRAPI_CMS_PORT`: Strapi cms port default is set to `1337`.
- `STRAPI_CMS_API_URL`: Strapi cms api endpoint default is set to `http://localhost:1337/cms/api`.
- `AUTH_PROVIDER`: The authentication provider, default is set to local.
- `EMAIL_PROVIDER` : The email provider, default is to console.
- `STORAGE_PROVIDER` : The storage provide, default is set to minio, which is also setup as part of the dev container, this can be changed to s3 as well, for the case of minio, for local setup once dev container starts, you need to create a bucket with a name of you choice by visiting `http://localhost:9001/login` use default credentials from `.env.secrets.local.example`.
- `MINIO_ENDPOINT`: The minio endpoint default is set to `http://localhost:9000`
- `MINIO_PORT`: The minio endpoint default is set to `9000`
- `MINIO_ACCESS_KEY`: The minio access key default is set to `tachignite` which is setup as part of the dev container
- `MINIO_SECRET_KEY : The minio secret key default is set to `someRandomKey` which is setup as part of the dev container
- `MINIO_USE_SSL`: The minio ssl option default is set to `false`
- `BUCKET_NAME` : The bucket name for the storage bucket default is set to test, please create this bucket if not exists already or use a different bucket name and update this value accordingly
- `BUCKET_PREFIX` : The bucket prefix for the storage bucket default is set `http://localhost:9000/test/`, this can be updated accordingly based on the storage provider and bucket name of your choice.
- `RATE_LIMIT_TTL`: API Throttle Time to live(TTL) in milliseconds (eg: 60000, 80000) default is set to 60000.
- `RATE_LIMIT_REQUESTS`: Maximum number of requests within TTL default is set to 10.
- `STRIPE_PUBLIC_KEY`: Stripe Public key for Stripe Payment (Required to test stripe payment features otherwise it's default is set to xxxxxxx with the default values payment related features may not work properly, it's recommended to get STRIPE_PUBLIC_KEY and update during env cli setup or update the env variable at a later stage).
- `STRIPE_SECRET_KEY`: Stripe Secret key for Stripe Payment (Required to test stripe payment features otherwise it's default is set to xxxxxxx with the default values payment related features may not work properly, it's recommended to get STRIPE_PUBLIC_KEY and update during env cli setup or update the env variable at a later stage).
- `STRIPE_WEBHOOK_SECRET`: Stripe Webhook Secret key for Stripe Payment (Required to test stripe payment features otherwise it's default is set to xxxxxxx with the default values payment related features may not work properly, it's recommended to get STRIPE_WEBHOOK_SECRET and update during env cli setup or update the env variable at a later stage).

## Run Database Migration

- Run the database migration to set up the database schema:

- Use the provided CLI tool to set up local environment variables:
  ```bash
  $ pnpm prisma-migrate
  ```

## Generate Prisma Client

- Run the database migration to set up the database schema:

- Use the provided CLI tool to set up local environment variables:
  ```bash
  $ pnpm prisma-generate
  ```

## Seed Sample data

- To Seed Sample data to local:

```bash
$ pnpm seed:sample
```

## Start the Backend

- To start the backend development server:

```bash
$ nx dev api
```

## Start the Frontend

- To start the frontend development server:

```bash
$ nx dev web
```

## Start the CMS

- To start the Strapi CMS development server:

```bash
$ nx dev cms
```

## Access the application

    - Access the application in your browser at https://localhost
    - Access the backend swagger in your browser at http://localhost:3001/api
    - Access the Strapi CMS application in your browser at http://localhost:1337/admin

## Additional Documentation

- [Application Architecture](/docs/application-architecture.md)
- [Front End(Web) Development](/docs/frontend-local-development-setup.md)
- [Back End(API) Development](/docs/backend-local-development-setup.md)
- [CMS Development](/docs/strapi-cms.md)
- [Husky](/docs/husky-precommit-hooks.md)
- [Swagger Setup](/docs/swagger-api.md)
