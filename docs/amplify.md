# Amplify

Amplify is a quickstart platform great for building serverless applications quickly. It also provides first class support for NextJS. However, there are a number of challenges that can arise when building. We've designed the included `amplify.yml` to work out of the box with our recommended tech stack.

## amplify.yaml

This file will be picked up automatically by amplify if it finds it in your repo and is used to build and release the application. This file should work in all environments;

```yaml
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - npx pnpm install
        build:
          commands:
            - export NODE_TLS_REJECT_UNAUTHORIZED=0
            - env | grep -e API_URL -e BUCKET_PREFIX -e CAPTCHA_PROVIDER -e CAPTCHA_SCRIPT_URL -e GOOGLE_RECAPTCHA_SECRET_KEY -e GOOGLE_RECAPTCHA_SITE_KEY >> apps/web/.env
            - echo "NODE_TLS_REJECT_UNAUTHORIZED=0" >> apps/web/.env
            - npx pnpm --filter web build
      artifacts:
        baseDirectory: apps/web/.next
        files:
          - '**/*'
      cache:
        paths:
          - .next/cache/**/*
          - node_modules/**/*
      buildPath: /
    appRoot: apps/web
```

## Explanation

### PreBuild

First we store the `NODE_ENV` value in a variable so we can restore it later. We then set the `NODE_ENV` to development; we must do this because of a limitation with NextJS typescript projects that will cause the build to fail unless `devDependencies` are installed. We then install the dependencies using `pnpm` with specific settings to avoid errors with package caching in Amplify, as well as husky errors.

### Build

In the Build step, we restore the `NODE_ENV` variable, copy the environment variables configured in Amplify into an .env.production file, then build the application. We avoid having to specify specific environment variables by using common prefixes. Some of these prefixes are conventions from NextJS and NextAuth and should not change. For others included in the RA, we use the `TACH_` prefix.

### Known Issues

Amplify will only work if your build bundle is less than 200MB. Because Next standalone builds include `node_modules`, the bundles can be quite large. In the long term, its best the use SST to deploy and manage your infrastructure.
