import dotenv from 'dotenv';
import inquirer from 'inquirer';
import fs from 'fs';

const EnvSecrets: string[] = [];
const EnvVariables: string[] = [];

let previousEnvVariables: Record<string, string> = {};
let previousEnvSecrets: Record<string, string> = {};

const cognitoSecrets = [
  {
    name: 'AWS_REGION',
    promptConfig: {
      type: 'input',
      message: 'Enter AWS Region',
      name: 'AWS_REGION',
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'AWS_COGNITO_USER_POOL_ID',
    promptConfig: {
      type: 'input',
      message: 'Enter Cognito user pool id',
      name: 'AWS_COGNITO_USER_POOL_ID',
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'AWS_COGNITO_CLIENT_ID',
    promptConfig: {
      type: 'input',
      message: 'Enter Cognito client id',
      name: 'AWS_COGNITO_CLIENT_ID',
      validate: (input: any) => (input ? true : 'required field'),
    },
  },
];

function storageSecrets(provider: string) {
  return [
    {
      name: 'MINIO_ENDPOINT',
      promptConfig: {
        type: 'input',
        message: `Enter ${provider} Endpoint (eg: minio.io || s3.amazonaws.com))`,
        name: 'MINIO_ENDPOINT',
        validate: (input: string) => (input ? true : 'required field'),
      },
    },
    {
      name: 'MINIO_PORT',
      promptConfig: {
        type: 'input',
        message: `Enter ${provider} port`,
        name: 'MINIO_PORT',
        default: provider === 's3' ? 443 : 9000,
        validate: (input: string) => (input ? true : 'required field'),
      },
    },
    {
      name: 'MINIO_ACCESS_KEY',
      promptConfig: {
        type: 'input',
        message: `Enter ${provider} access key`,
        name: 'MINIO_ACCESS_KEY',
        validate: (input: string) => (input ? true : 'required field'),
      },
    },
    {
      name: 'MINIO_SECRET_KEY',
      promptConfig: {
        type: 'input',
        message: `Enter ${provider} secret key`,
        name: 'MINIO_SECRET_KEY',
        validate: (input: string) => (input ? true : 'required field'),
      },
    },
    {
      name: 'MINIO_USE_SSL',
      promptConfig: {
        type: 'list',
        message: `is ${provider} using SSL`,
        name: 'MINIO_USE_SSL',
        choices: ['true', 'false'],
        validate: (input: string) => (input ? true : 'required field'),
      },
    },
    {
      name: 'BUCKET_NAME',
      promptConfig: {
        type: 'input',
        message: `Enter ${provider} bucket name (ie on which bucket should use for storing data)`,
        name: 'BUCKET_NAME',

        validate: (input: string) => (input ? true : 'required field'),
      },
    },
    {
      name: 'BUCKET_PREFIX',
      promptConfig: {
        type: 'input',
        message: `Enter ${provider} bucket prefix URL (It is prefix URL that used before the file name)`,
        name: 'BUCKET_PREFIX',
        validate: (input: string) => (input ? true : 'required field'),
      },
    },
  ];
}

const promptQuestions = [
  {
    name: 'NEST_PORT',
    promptConfig: {
      type: 'number',
      message: 'Enter Nest PORT',
      name: 'NEST_PORT',
      default: 3001,
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'DATABASE_URL',
    promptConfig: {
      type: 'input',
      message: 'Enter DATABASE Endpoint connection string',
      name: 'DATABASE_URL',
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'API_URL',
    promptConfig: {
      type: 'input',
      message: 'Enter Backend Endpoint URL',
      name: 'API_URL',
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'APP_URL',
    promptConfig: {
      type: 'input',
      message: 'Enter FrontEnd URL(eg:https://example.com, https://localhost)',
      name: 'APP_URL',
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'EMAIL_PROVIDER',
    promptConfig: {
      type: 'list',
      message: 'Select Your Email Provider for Notifications',
      name: 'EMAIL_PROVIDER',
      choices: ['console', 'ses'],
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'AUTH_PROVIDER',
    promptConfig: {
      type: 'list',
      message: 'Select Your AUTH Provider',
      name: 'AUTH_PROVIDER',
      choices: ['local', 'cognito'],
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'STORAGE_PROVIDER',
    promptConfig: {
      type: 'list',
      message: 'Select Your Storage Provider',
      name: 'STORAGE_PROVIDER',
      choices: ['minio', 's3'],
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'CAPTCHA_PROVIDER',
    promptConfig: {
      type: 'list',
      message: 'Select Your Captcha Provider',
      name: 'CAPTCHA_PROVIDER',
      choices: ['google', 'fake'],
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'RATE_LIMIT_TTL',
    promptConfig: {
      type: 'number',
      message:
        'API Throttle Time to live(TTL) in milliseconds (eg: 60000, 80000)',
      name: 'RATE_LIMIT_TTL',
      default: 60000,
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'RATE_LIMIT_REQUESTS',
    promptConfig: {
      type: 'number',
      message: 'Maximum number of requests within TTL ',
      name: 'RATE_LIMIT_REQUESTS',
      default: 10,
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
];

const JWTSecrets = [
  {
    name: 'JWT_SECRET',
    promptConfig: {
      type: 'input',
      message: 'Enter JWT Secret key to jwt encoding',
      name: 'JWT_SECRET',
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'JWT_EXPIRATION',
    promptConfig: {
      type: 'input',
      message: 'Expiry time for JWT token, (eg: 30m, 1h, 5h, 10h, 1d)',
      name: 'JWT_EXPIRATION',
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
];

const AWSSecrets = [
  {
    name: 'AWS_ACCESS_KEY_ID',
    promptConfig: {
      type: 'input',
      message: 'Enter AWS Access key',
      name: 'AWS_ACCESS_KEY_ID',
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
  {
    name: 'AWS_SECRET_ACCESS_KEY',
    promptConfig: {
      type: 'input',
      message: 'Enter AWS Secret Key',
      name: 'AWS_SECRET_ACCESS_KEY',
      validate: (input: string) => (input ? true : 'required field'),
    },
  },
];

async function configAWSCognito() {
  for (let i = 0; i < cognitoSecrets.length; i++) {
    const answer = await inquirer.prompt([cognitoSecrets[i].promptConfig]);
    EnvSecrets.push(
      `${cognitoSecrets?.[i]?.name}=${answer[cognitoSecrets[i].name]}`,
    );
  }
}

const configureGoogleAnalyticsTool = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'configureAnalytics',
      message: 'Do you want to configure the Google Analytics?',
      choices: ['yes', 'no'],
      default: 'yes',
    },
  ]);
  if (answer.configureAnalytics === 'yes') {
    const analyticsAnswer = await inquirer.prompt([
      {
        type: 'input',
        message:
          'In order to configure Google Analytics, please provide the measurement ID.',
        name: 'analyticsId',
      },
    ]);
    EnvVariables.push(
      `ANALYTICS_MEASUREMENT_ID=${analyticsAnswer?.analyticsId}`,
    );
  }
};

const configureStrapiCms = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'STRAPI_CMS_DATABASE_URL',
      message: 'Enter Strapi cms Database URL:',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      name: 'STRAPI_CMS_DATABASE_SCHEMA',
      message:
        'Enter Strapi cms Database Schema. (default schema is cms, if this schema is not available make sure it exists)',
      default: 'cms',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      name: 'STRAPI_CMS_HOST',
      message: 'Enter Strapi cms Host:',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      name: 'STRAPI_CMS_PORT',
      message: 'Enter Strapi cms Port:',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      name: 'STRAPI_CMS_API_URL',
      message: 'Enter Strapi cms Endpoint url:',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      name: 'STRAPI_CMS_APP_KEYS',
      message: 'Enter Strapi cms Keys:',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      name: 'STRAPI_CMS_API_TOKEN_SALT',
      message: 'Enter Strapi cms API TOKEN SALT:',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      name: 'STRAPI_CMS_TRANSFER_TOKEN_SALT',
      message: 'Enter Strapi cms TRANSFER TOKEN SALT:',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      name: 'STRAPI_CMS_ADMIN_JWT_SECRET',
      message: 'Enter Strapi cms ADMIN JWT SECRET:',
      validate: (input: string) => (input ? true : 'required field'),
    },
  ]);

  EnvSecrets.push(`CMS_DATABASE_URL=${answer?.STRAPI_CMS_DATABASE_URL}`);
  EnvSecrets.push(`CMS_DATABASE_SCHEMA=${answer?.STRAPI_CMS_DATABASE_SCHEMA}`);
  EnvVariables.push(`STRAPI_CMS_HOST=${answer?.STRAPI_CMS_HOST}`);
  EnvVariables.push(`STRAPI_CMS_PORT=${answer?.STRAPI_CMS_PORT}`);
  EnvVariables.push(`STRAPI_CMS_API_URL=${answer?.STRAPI_CMS_API_URL}`);
  EnvVariables.push(`STRAPI_CMS_APP_KEYS=${answer?.STRAPI_CMS_APP_KEYS}`);
  EnvVariables.push(
    `STRAPI_CMS_API_TOKEN_SALT=${answer?.STRAPI_CMS_API_TOKEN_SALT}`,
  );
  EnvVariables.push(
    `STRAPI_CMS_ADMIN_JWT_SECRET=${answer?.STRAPI_CMS_ADMIN_JWT_SECRET}`,
  );
  EnvVariables.push(
    `STRAPI_CMS_TRANSFER_TOKEN_SALT=${answer?.STRAPI_CMS_TRANSFER_TOKEN_SALT}`,
  );
};

const configureStripePaymentProvider = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'STRIPE_PUBLIC_KEY',
      message: 'Enter Stripe Public key for Stripe Payment',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      name: 'STRIPE_SECRET_KEY',
      message: 'Enter Stripe Secret key for Stripe Payment',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      name: 'STRIPE_WEBHOOK_SECRET',
      message: 'Enter Stripe Webhook Secret key for Stripe Payment',
      validate: (input: string) => (input ? true : 'required field'),
    },
  ]);

  EnvSecrets.push(`STRIPE_PUBLIC_KEY=${answer?.STRIPE_PUBLIC_KEY}`);
  EnvSecrets.push(`STRIPE_SECRET_KEY=${answer?.STRIPE_SECRET_KEY}`);
  EnvSecrets.push(`STRIPE_WEBHOOK_SECRET=${answer?.STRIPE_WEBHOOK_SECRET}`);
};

const configureOAuthProviders = async () => {
  const providers = [
    { name: 'GitHub', value: 'github', envName: 'GIT_OAUTH' },
    { name: 'Google', value: 'google', envName: 'GOOGLE' },
    { name: 'LinkedIn', value: 'linkedin', envName: 'LINKEDIN' },
    { name: 'Microsoft', value: 'microsoft', envName: 'AZURE' },
  ];

  const configureAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'configureAuthProviders',
      message: 'Do you want to configure the OAuth Providers ?',
      choices: ['yes', 'no'],
      default: 'yes',
    },
  ]);

  if (configureAnswer?.configureAuthProviders) {
    const { selectedProviders } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedProviders',
        message: 'Select the OAuth Providers you want to configure:',
        choices: providers,
      },
    ]);

    const filteredSelectedProviders = providers?.filter((provider) =>
      selectedProviders?.includes(provider?.value),
    );

    const providerQuestions = filteredSelectedProviders?.flatMap(
      ({ name, envName }) => {
        const questions = [
          {
            type: 'input',
            name: `${envName}_CLIENT_ID`,
            message: `Enter the Client ID for ${name}:`,
          },
          {
            type: 'input',
            name: `${envName}_CLIENT_SECRET`,
            message: `Enter the Client Secret for ${name}:`,
          },
        ];
        if (name === 'Microsoft') {
          questions.push({
            type: 'input',
            name: `${envName}_TENANT_ID`,
            message: 'Enter the Tenant ID for Microsoft:',
          });
        }
        return questions;
      },
    );
    const providerConfigs = await inquirer.prompt(providerQuestions);

    const envContent = Object.entries(providerConfigs);

    envContent.forEach((variable) =>
      EnvVariables.push(`${variable[0]}=${variable[1]}`),
    );
  }
};

async function configGoogleRecaptcha() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      message:
        'Enter Recaptcha script JS url (ex: https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key)',
      name: 'CAPTCHA_SCRIPT_URL',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      message: 'Enter google RecaptchaV3 Site key',
      name: 'GOOGLE_RECAPTCHA_SITE_KEY',
      validate: (input: string) => (input ? true : 'required field'),
    },
    {
      type: 'input',
      message: 'Enter google RecaptchaV3 Secret key',
      name: 'GOOGLE_RECAPTCHA_SECRET_KEY',
      validate: (input: string) => (input ? true : 'required field'),
    },
  ]);
  EnvVariables.push(`CAPTCHA_SCRIPT_URL=${answer['CAPTCHA_SCRIPT_URL']}`);
  EnvVariables.push(
    `GOOGLE_RECAPTCHA_SITE_KEY=${answer['GOOGLE_RECAPTCHA_SITE_KEY']}`,
  );
  EnvVariables.push(
    `GOOGLE_RECAPTCHA_SECRET_KEY=${answer['GOOGLE_RECAPTCHA_SECRET_KEY']}`,
  );
}

async function configEmailProvider() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      message: 'Input SES Source Mail',
      name: 'EMAIL_SOURCE',
      validate: (input: string) => (input ? true : 'required field'),
    },
  ]);
  EnvVariables.push(`EMAIL_SOURCE=${answer['EMAIL_SOURCE']}`);
}

async function configJWTAuth() {
  for (let i = 0; i < JWTSecrets.length; i++) {
    const answer = await inquirer.prompt([JWTSecrets[i].promptConfig]);
    EnvSecrets.push(`${JWTSecrets?.[i]?.name}=${answer[JWTSecrets[i].name]}`);
  }
}

async function configAWSSecret() {
  for (let i = 0; i < AWSSecrets.length; i++) {
    const answer = await inquirer.prompt([AWSSecrets[i].promptConfig]);
    EnvSecrets.push(`${AWSSecrets?.[i]?.name}=${answer[AWSSecrets[i].name]}`);
  }
}
async function configStorageProvider(provider: string) {
  const secrets = storageSecrets(provider);
  for (let i = 0; i < secrets.length; i++) {
    const answer = await inquirer.prompt([secrets[i].promptConfig]);
    if (secrets?.[i]?.name === 'BUCKET_PREFIX') {
      EnvVariables.push(`${secrets?.[i]?.name}=${answer[secrets[i].name]}`);
    } else {
      EnvSecrets.push(`${secrets?.[i]?.name}=${answer[secrets[i].name]}`);
    }
  }
}

const saveEnvSecrets = () => {
  fs.writeFile('.env.local', EnvVariables.join('\n'), (err: any) => {
    if (err) throw err;
    console.log('\n.env.local file has been created!');
  });
  fs.writeFile('.env.secrets.local', EnvSecrets.join('\n'), (err: any) => {
    if (err) throw err;
    console.log('.env.secrets.local file has been created!');
  });
};

const createEnvBackups = async () => {
  const envData = Object.entries(previousEnvVariables)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  const secretsData = Object.entries(previousEnvSecrets)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  const timestamp = Date.now();
  fs.writeFile(`.env.local.${timestamp}.bkp`, envData, (err: any) => {
    if (err) throw err;
  });
  fs.writeFile(
    `.env.secrets.local.${timestamp}.bkp`,
    secretsData,
    (err: any) => {
      if (err) throw err;
    },
  );
};

const configureAWSQuickStart = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      message:
        'Do you want configure AWS deploy variables for AWS quickstart deployment?',
      name: 'AWS_QUICKSTART_DEPLOY',
      choices: ['yes', 'no'],
      default: 'yes',
    },
  ]);
  if (answer.AWS_QUICKSTART_DEPLOY === 'yes') {
    const quickstartAnswer = await inquirer.prompt([
      {
        type: 'input',
        message: 'Please provide AWS ACCOUNT ID to deploy?',
        name: 'AWS_ACCOUNT_ID',
      },
      {
        type: 'input',
        message: 'Please provide github repo owner to get codebase?',
        name: 'GITHUB_REPO_OWNER',
      },
      {
        type: 'input',
        message: 'Please provide github repo name to get codebase?',
        name: 'GITHUB_REPO_NAME',
      },
      {
        type: 'input',
        message: 'Please provide github token to get codebase?',
        name: 'GITHUB_TOKEN',
      },
      {
        type: 'input',
        message: 'Please provide github branch to setup deployment?',
        name: 'DEPLOY_BRANCH',
      },
    ]);
    EnvVariables.push(`GITHUB_REPO_NAME=${quickstartAnswer?.GITHUB_REPO_NAME}`);
    EnvVariables.push(
      `GITHUB_REPO_OWNER=${quickstartAnswer?.GITHUB_REPO_OWNER}`,
    );
    EnvVariables.push(`DEPLOY_BRANCH=${quickstartAnswer?.DEPLOY_BRANCH}`);
    EnvSecrets.push(`AWS_ACCOUNT_ID=${quickstartAnswer?.AWS_ACCOUNT_ID}`);
    EnvSecrets.push(`GITHUB_TOKEN=${quickstartAnswer?.GITHUB_TOKEN}`);
  }
};

const getPreviousEnvValue = (name: string) =>
  previousEnvVariables[name] || previousEnvSecrets[name];

async function setupEnv() {
  dotenv.config({ path: '.env.local', processEnv: previousEnvVariables });
  dotenv.config({ path: '.env.secrets.local', processEnv: previousEnvSecrets });
  await createEnvBackups();
  for (let i = 0; i < promptQuestions.length; i++) {
    const name = promptQuestions?.[i].name;
    const promptConfig = promptQuestions[i].promptConfig;
    const answer = await inquirer.prompt([
      {
        ...promptConfig,
        default: getPreviousEnvValue(name) || promptConfig?.default,
      },
    ]);
    if (name === 'AUTH_PROVIDER') {
      if (answer[name] === 'cognito') {
        await configAWSCognito();
        await configAWSSecret();
        await configJWTAuth();
      } else {
        await configJWTAuth();
      }
    }
    if (name === 'STORAGE_PROVIDER') {
      await configStorageProvider(answer[name]);
    }
    if (name === 'EMAIL_PROVIDER') {
      if (
        answer[name] === 'ses' &&
        !EnvSecrets.includes('AUTH_PROVIDER=cognito')
      ) {
        await configAWSSecret();
        await configEmailProvider();
      }
    }
    if (name === 'DATABASE_URL') {
      EnvSecrets.push(
        `${promptQuestions?.[i]?.name}=${answer[promptQuestions[i].name]}`,
      );
    } else {
      EnvVariables.push(
        `${promptQuestions?.[i]?.name}=${answer[promptQuestions[i].name]}`,
      );
    }
    if (name === 'CAPTCHA_PROVIDER' && answer[name] === 'google') {
      await configGoogleRecaptcha();
    }
  }
  await configureAWSQuickStart();
  await configureGoogleAnalyticsTool();
  await configureOAuthProviders();
  await configureStripePaymentProvider();
  await configureStrapiCms();
  saveEnvSecrets();
}

// execute the main function
setupEnv()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {});
