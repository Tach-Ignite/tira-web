import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import * as dotenv from 'dotenv';

export class EC2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // using default VPC group
    const vpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', { isDefault: true });

    // Create a security group
    const securityGroup = new ec2.SecurityGroup(this, 'MySecurityGroup', {
      vpc,
      description: 'Allow HTTP and NestJS Port access',
      allowAllOutbound: true,
    });
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'allow SSH access from the world',
    );
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'allow HTTP access from the world',
    );
    // NestJS Backend Port
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(Number(process.env.NEST_PORT) || 3001),
      'allow Nest JS port access from the word',
    );
    const role = new Role(this, 'EC2Role', {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('CloudWatchAgentServerPolicy'),
      ],
    });

    const instance: ec2.Instance = new ec2.Instance(this, 'TIRA-BE-NestJS', {
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup,
      role: role,
    });
    let secrets = {};
    let variables = {};
    dotenv.config({ path: '.env.local', processEnv: variables });
    dotenv.config({
      path: '.env.secrets.local',
      processEnv: secrets,
    });
    const envData = Object.entries(variables).map(
      ([key, value]) => `echo ${key}=${value} >> .env`,
    );
    const secretsData = Object.entries(secrets).map(
      ([key, value]) => `echo ${key}=${value}  >> .env`,
    );

    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      'sudo yum update -y',
      'sudo yum -y install git',
      'curl -sL https://rpm.nodesource.com/setup_20.x | sudo bash -',
      'sudo yum install -y nodejs',
      'sudo npm i -g pnpm',
      'sudo npm install -g pm2',
      'cd /home/ec2-user',
      `git clone https://${process.env.GITHUB_REPO_OWNER}:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}.git`,
      `cd ${process.env.GITHUB_REPO_NAME}`,
      `git checkout ${process.env.DEPLOY_BRANCH}`,
      'pnpm i',
      ...envData,
      ...secretsData,
      'pnpm prisma-migrate',
      'pnpm prisma-generate',
      'pnpm nx build api',
      'pm2 status',
      `pm2 start 'pnpm nx start api'`,
    );
    instance.addUserData(userData.render());

    const lb = new elbv2.ApplicationLoadBalancer(this, 'TIRA-BE-LB', {
      vpc,
      internetFacing: true,
      securityGroup: securityGroup,
    });

    const listener = lb.addListener('TIRA-BE-Listener', {
      port: 80,
      open: true,
    });

    listener.addTargets('Targets', {
      port: 3001,
      targets: [
        new targets.InstanceTarget(
          instance,
          Number(process.env.NEST_PORT) || 3001,
        ),
      ],
      protocol: elbv2.ApplicationProtocol.HTTP,
      healthCheck: {
        protocol: elbv2.Protocol.HTTP,
        path: '/swagger',
      },
    });
    // Output the load balancer DNS name
    const appURL = new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: lb.loadBalancerDnsName,
    });
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
        API_URL: lb.loadBalancerDnsName
          ? `http://${lb.loadBalancerDnsName}/api`
          : process.env.API_URL || '',
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
