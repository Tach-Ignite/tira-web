# AWS Quick Start

AWS Quick Start is a one-step deployment solution to deploy the Tach RA web application.

## Table of Contents

1. Prerequisites
2. Cognito
3. RDS PostgreSQL database
4. AWS Access setup
5. S3 and Bucket Creation
6. CDK Deployment setup
7. CDK Cleanup (Destroy)

## 1. Prerequisites

Before starting the deployment, ensure you have the following:

- An AWS account
- AWS CLI installed and configured
- Node.js and npm installed
- AWS CDK installed globally (`npm install -g aws-cdk`)

## 2. Cognito

1. Sign in to the AWS Management Console and open the Amazon Cognito console.
2. Choose **Manage User Pools**.
3. Choose **Create a user pool**.
4. Follow the wizard to configure the user pool settings.
5. Once created, note the **User Pool ID**.
6. In the **App clients** section, create a new app client.
7. Note the **App client ID**.

## 3. RDS PostgreSQL database

1. Sign in to the AWS Management Console and open the Amazon RDS console.
2. Choose **Create database**.
3. Select **PostgreSQL** as the engine.
4. Configure the database settings as per your requirements.
5. Once created, note the **Endpoint** and **Port**.
6. Format the database URL as follows: `postgres://username:password@endpoint:port/dbname`.

## 4. AWS Access setup

1. Open the AWS Management Console.
2. Navigate to **IAM** (Identity and Access Management).
3. Create a new user with **Programmatic access**.
4. Attach the necessary policies for accessing Cognito, RDS, EC2, Amplify ,and S3.
5. Note the **Access key ID** and **Secret access key**.
6. Configure your local AWS CLI with these credentials using `aws configure`.

## 5. S3 and Bucket Creation

1. Open the AWS Management Console and go to the S3 service.
2. Choose **Create bucket**.
3. Enter a unique bucket name and select the desired region.
4. Configure any additional settings as required and create the bucket.
5. Note the **Bucket name**.

## 6. CDK Deployment setup

1. Define your stack in `infra/<project-name>-stack.ts` to include resources for Amplify, EC2, and ELB.
2. Ensure your `cdk.json` file includes necessary context and environment variables.
3. Bootstrap the CDK environment: `pnpm bootstrap-cdk`.
4. Deploy the stack: `pnpm deploy-aws`.

## 7. CDK Cleanup (Destroy)

1. To clean up and remove all resources created by the CDK, run: `pnpm cleanup-aws`.
2. Ensure that any data you wish to retain (e.g., database backups, S3 data) is saved before performing the destroy action, as this will delete all resources.

This completes the AWS Quick Start setup for deploying the Tach RA web application.
