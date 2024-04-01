require('../rootEnv');

export default ({ env }) => ({
  host: env('STRAPI_CMS_HOST', 'localhost'),
  port: env.int('STRAPI_CMS_PORT', 1337),
  app: {
    keys: env.array('STRAPI_CMS_APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
