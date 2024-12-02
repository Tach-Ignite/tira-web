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
