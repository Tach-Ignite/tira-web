require('../rootEnv');

export default ({ env }) => ({
  auth: {
    secret: env('STRAPI_CMS_ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('STRAPI_CMS_API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('STRAPI_CMS_TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
