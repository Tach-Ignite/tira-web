module.exports = {
  apps: [
    {
      name: 'cms-service',
      script: 'pnpm',
      args: 'nx start cms',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
