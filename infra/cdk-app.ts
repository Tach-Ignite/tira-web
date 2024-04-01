import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';

import { AmplifyStack } from './stacks/amplify-stack';
import { EC2Stack } from './stacks/ec2-stack';

const app = new cdk.App();

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env.secrets.local' });

const env = {
  region: process.env.AWS_REGION,
  account: process.env.AWS_ACCOUNT_ID,
};

// new AmplifyStack(app, 'Tach-RA-WEB-amplify', {
//   env: env,
// });

new EC2Stack(app, 'Tach-RA-BE-Nest', { env: env });
