# AWS Custom Domain Setup with Subdomain Mapping

This guide provides step-by-step instructions to set up a custom domain, create subdomains, and map them into AWS Amplify and Elastic Load Balancer (ELB). This includes domains purchased from AWS Route 53 and GoDaddy.

## Prerequisites

- AWS Account
- Registered Domain (e.g., via Route 53, GoDaddy or Other Domain Providers)
- AWS CLI installed and configured
- AWS Amplify app created
- ELB setup

## Steps

### 1. Register a Domain in Route 53 or GoDaddy

#### Route 53

1. Go to the Route 53 console.
2. Click on **Registered Domains**.
3. Click **Register Domain** and follow the instructions.

#### Other Providers

1. Go to the offical website.
2. Search for and purchase your desired domain.
3. Manage your domain from the Site dashboard.

### 2. Create a Hosted Zone in Route 53

1. Go to the Route 53 console.
2. Click on **Hosted Zones**.
3. Click **Create Hosted Zone**.
   - **Domain Name**: Enter your domain name.
   - **Type**: Public Hosted Zone.
   - Click **Create**.

### 3. Update Providers DNS Settings (If Domain Purchased from Other Providers)

1. Log in to your Providers account(ex: www.godaddy.com).
2. Go to your domain's DNS management page.
3. Update the nameservers to the ones provided by Route 53. These can be found in your Route 53 hosted zone details.

### 4. Create DNS Records for Subdomains in Route 53

1. Go to your Hosted Zone in Route 53.
2. Click **Create Record**.
3. Add records for your subdomains.

#### Example:

- **Name**: `www`
- **Type**: A
- **Alias**: Yes
- **Alias Target**: Choose the Amplify app or ELB.

### 5. Setup Custom Domain in AWS Amplify

1. Go to the Amplify console.
2. Select your app.
3. Click on **Domain Management**.
4. Click **Add Domain**.
5. Enter your domain name and click **Configure Domain**.
6. Add subdomain settings.
7. Verify the domain.

### 6. Configure ELB for Subdomains

1. Go to the EC2 console.
2. Select **Load Balancers** under **Load Balancing**.
3. Select your load balancer.
4. Go to the **Listeners** tab and click **View/edit rules**.
5. Add rules to route traffic for subdomains.

#### Example:

- **Condition**: Host header is `api.example.com`
- **Action**: Forward to the target group

### 7. Verify DNS Propagation

DNS changes might take a few minutes to propagate.

## Example DNS Records

```txt
example.com.         A       Alias  ->  Amplify app or ELB
www.example.com.     A       Alias  ->  Amplify app
api.example.com.     A       Alias  ->  ELB
```
