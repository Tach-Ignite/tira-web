## NextJS

Next.js is a React framework that provides server-side rendering (SSR), static site generation (SSG), and client-side rendering (CSR) capabilities. It offers efficient client-side routing, automatic code splitting, and a rich ecosystem of plugins and libraries. Key features of Next.js include:

## Building the application

To build the application in the root, run the following command

```bash
nx build web
```

## Running the application in development mode

'To start the application in dev mode in the root, run the following command:

```bash
nx dev web
```

## Navigating the website

In your browser, navigate to `https://localhost:3000`. You may get some security alerts because local development uses a self-signed certificate. Proceed anyway. The application will start on the demo landing page. These landing pages include information about the seeded users for the demo.

## Debugging the application in VS Code

This repo comes with a VS Code configuration for debugging. You can start the debugger by pressing F5 or selecting Run > Start Debugging.

## Linting the application

To lint the application in the web root, run the following command:

```bash
pnpm lint
```

To lint the application in the root, run the following command:

```bash
nx lint web
```
