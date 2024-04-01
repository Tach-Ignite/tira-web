## what is NestJs

NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It uses modern JavaScript, is built with TypeScript, and combines elements of Object-Oriented Programming (OOP), Functional Programming (FP), and Functional Reactive Programming (FRP).

## Backend Structure

- `api/`: Contains all the source code for your Nest.js application.
  - `main.ts`: Entry point of your application.
  - `app.module.ts`: Root module of the application.
  - `prisma/`: Contains Prisma related files.
    - `schema.prisma`: Prisma schema file defining your data model.
    - `migrations/`: Generated Migration files for database.
    - `seed.ts`: The database will initially be seeded with curated datasets using `seed.ts`.

## Migrations and Prisma Client Generation

##### \*\*Before starting server, we need to run migration and generate client to be in sync with prisma.schema.

To run migartions to database, In the root, run the following command:

```bash
pnpm prisma migrate deploy --schema=./apps/api/prisma/schema.prisma
```

To create prisma client, In the root, run the following command:

```bash
pnpm prisma generate --schema=./apps/api/prisma/schema.prisma
```

## Building the server

To build the server in the api root, run the following command:

```bash
pnpm build
```

To build the server in the root, run the following command

```bash
nx build api
```

## Running the server

To start the server in the api root, run the following command:

```bash
pnpm start
```

'To start the server in the root, run the following command:

```bash
nx start api

```

## Seed Sample data

To Seed Sample data to the database, run the following command in root:

```bash
pnpm seed-sample

```

## Core concepts of NestJs

NestJs have the core concepts that `Modules`, `Controllers`, `Providers` and `Services`.

## What is Modules

Organize code into modules for better maintainability.

## What is Controllers

Handle incoming requests and return responses.

## What is Providers

Encapsulate service logic and can be injected into controllers.

## What is services

Defined as providers that encapsulate business logic.
