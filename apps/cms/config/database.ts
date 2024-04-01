require('../rootEnv');

export default ({ env }) => {
  const connections = {
    postgres: {
      connection: {
        connectionString: env('CMS_DATABASE_URL'),
        schema: env('CMS_DATABASE_SCHEMA'),
      },
    },
  };

  return {
    connection: {
      client: 'postgres',
      ...connections['postgres'],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
      searchPath: [`${env('CMS_DATABASE_SCHEMA')}`, 'public'],
    },
  };
};
