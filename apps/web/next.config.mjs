import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('../../.env.local') });
dotenv.config({ path: path.resolve('../../.env.secrets.local') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.poc2production.com',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
    CMS_URL: process.env.STRAPI_CMS_API_URL,
    BUCKET_PREFIX: process.env.BUCKET_PREFIX,
    AUTH_PROVIDERS: process.env.AUTH_PROVIDERS,
    CAPTCHA_PROVIDER: process.env.CAPTCHA_PROVIDER,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GIT_OAUTH_CLIENT_ID: process.env.GIT_OAUTH_CLIENT_ID,
    AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID,
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
  },
};

export default nextConfig;
