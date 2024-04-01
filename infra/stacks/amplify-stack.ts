import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

export class AmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const amplifyApp = new amplify.App(this, 'Tach-RA-Web-amplify', {
      platform: amplify.Platform.WEB_COMPUTE,
      environmentVariables: {
        AMPLIFY_MONOREPO_APP_ROOT: 'apps/web',
        _LIVE_UPDATES: `[{"name":"Next.js version","pkg":"next-version","type":"internal","version":"latest"}]`,
        BUCKET_PREFIX: process.env.BUCKET_PREFIX || '',
        CAPTCHA_PROVIDER: process.env.CAPTCHA_PROVIDER || '',
        GOOGLE_RECAPTCHA_SECRET_KEY:
          process.env.GOOGLE_RECAPTCHA_SECRET_KEY || '',
        GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY || '',
        API_URL: process.env.API_URL || '',
        NODE_TLS_REJECT_UNAUTHORIZED: '0',
        CAPTCHA_SCRIPT_URL: process.env.CAPTCHA_SCRIPT_URL || '',
      },
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: process.env.GITHUB_REPO_OWNER || '',
        repository: process.env.GITHUB_REPO_NAME || '',
        oauthToken: cdk.SecretValue.unsafePlainText(
          process.env.GITHUB_TOKEN || '',
        ),
      }),

      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: 1,
        applications: [
          {
            frontend: {
              phases: {
                preBuild: {
                  commands: ['npx pnpm install'],
                },
                build: {
                  commands: [
                    'export NODE_TLS_REJECT_UNAUTHORIZED=0',
                    'env | grep -e API_URL -e BUCKET_PREFIX -e CAPTCHA_PROVIDER -e CAPTCHA_SCRIPT_URL -e GOOGLE_RECAPTCHA_SECRET_KEY -e GOOGLE_RECAPTCHA_SITE_KEY >> apps/web/.env',
                    'echo "NODE_TLS_REJECT_UNAUTHORIZED=0" >> apps/web/.env',
                    'npx pnpm --filter web build',
                  ],
                },
              },
              artifacts: {
                baseDirectory: 'apps/web/.next',
                files: ['**/*'],
              },
              cache: {
                paths: ['.next/cache/**/*', 'node_modules/**/*'],
              },
              buildPath: '/',
            },
            appRoot: 'apps/web',
          },
        ],
      }),
    });

    // Optionally, add custom domains, branches, etc.
    amplifyApp.addCustomRule({
      source: '/<*>',
      target: '/index.html',
      status: amplify.RedirectStatus.NOT_FOUND_REWRITE,
    });

    amplifyApp.addBranch(process.env.DEPLOY_BRANCH || 'master', {
      autoBuild: true,
      pullRequestPreview: false,
    });
  }
}
