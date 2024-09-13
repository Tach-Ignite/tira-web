# Tach Ignite Reference Architecture for Web (TIRA-WEB) <!-- omit in toc -->

This is a Reference Architecture for Web (TIRA-WEB) based on [React](https://react.dev/) + [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Tailwind CSS](https://tailwindcss.com/) + [NestJS](https://nestjs.com/).

## Table of Contents <!-- omit in toc -->

- [Overview](#overview)
- [Quick Starts](#quick-starts)
- [NX Monorepo](#nx-monorepo)
- [Frontend](#frontend)
- [Backend](#backend)
- [Authentication](#authentication)
- [Storage](#storage)
- [Email Service](#email-service)
- [Logging](#logging)
- [Additional Contents](#additional-contents)

## Overview

The Tach Ignite Reference Architecture for Web (TIRA-WEB) is a comprehensive full-stack framework that leverages various technologies for efficient web development. On the frontend, it employs Next.js integrated with Tailwind CSS for streamlined, responsive design. The backend is powered by NestJS, utilizing Prisma as the ORM and PostgreSQL for database management. Additionally, TIRA-WEB incorporates multiple services including Passport and AWS Cognito for authentication, MinIO for storage solutions, AWS SES for email services, and Winston for logging, ensuring a robust and scalable web application infrastructure.

## Quick Starts

- [Quick Start - Local](/docs/quickstart-local.md)
- [Quick Start - AWS](/docs/qucikstart-aws.md)

## NX Monorepo

The project is structured as an NX Monorepo, which allows for managing multiple related projects within a single repository. NX provides tools for code sharing, build optimization, and workspace management, making it easier to develop and maintain large-scale applications.

## Frontend

- ### Next.js

  Next.js is a React framework that allows for easy setup and development of React applications. It provides features like server-side rendering, static site generation, and routing out of the box, making it ideal for building fast and SEO-friendly web applications.

- ### Tailwind CSS

  Tailwind CSS is a utility-first CSS framework that provides a set of utility classes to style your applications. It allows for rapid development by removing the need to write custom CSS and provides a consistent and maintainable styling approach.

- ### React Query

  React Query is a library for fetching, caching, and updating data in React applications. It simplifies the process of making API calls by providing hooks that handle data fetching and caching, reducing boilerplate code and improving performance.

## Backend

- ### NestJS

  NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript and follows a modular architecture, making it easy to develop and maintain complex backend systems.

- ### Prisma

  Prisma is an ORM (Object-Relational Mapping) tool for Node.js and TypeScript. It simplifies database operations by generating type-safe query builders and models based on your database schema, reducing the risk of runtime errors and improving developer productivity.

- ### PostgreSQL

  PostgreSQL is a powerful, open-source relational database management system. It is highly scalable and supports a wide range of features including ACID transactions, JSONB data type, and full-text search, making it suitable for a variety of applications.

## Authentication

- ### Passport

  Passport is an authentication middleware for Node.js. It provides a simple and modular approach to handle authentication in web applications, supporting various authentication strategies such as local authentication, OAuth, and OpenID.

- ### AWS Cognito

  AWS Cognito is a managed authentication service provided by Amazon Web Services. It allows you to add user sign-up, sign-in, and access control to your web and mobile applications, providing a secure and scalable authentication solution.

## Storage

- ### MinIO

  MinIO is an open-source object storage server compatible with Amazon S3. It provides a scalable and high-performance storage solution for storing unstructured data such as images, videos, and documents, with features like data encryption and access control.

## Email Service

- ### AWS SES

  AWS SES (Simple Email Service) is a cloud-based email sending service provided by Amazon Web Services. It allows you to send transactional and marketing emails to your customers, with features like email tracking, delivery notifications, and bounce management.

## Logging

- ### Winston Logger

  Winston is a versatile logging library for Node.js. It provides a simple and flexible API for logging messages to various transports such as the console, files, databases, and third-party logging services, allowing you to monitor and debug your applications effectively.

## Licenses <!-- omit in toc -->

This project uses [NestJS](https://nestjs.com/), [Flowbite](https://flowbite.com/), [Next.js](https://nextjs.org/), and [Strapi](https://strapi.io/), each governed by their respective licenses: [NestJS License](https://github.com/nestjs/nest/blob/master/LICENSE), [Flowbite License](https://github.com/flowbite/flowbite/blob/main/LICENSE), [Next.js License](https://github.com/vercel/next.js/blob/canary/LICENSE), and [Strapi License](https://github.com/strapi/strapi/blob/master/LICENSE).

## Additional Contents

- [Application Architecture Overview](/docs/application_architecture.md)
- [Local Development Setup](/docs/local-development-setup.md)
- [MinIO Development Setup](/docs/minio_storage.md)
- [Environment Variables](/docs/environment_variable.md)
