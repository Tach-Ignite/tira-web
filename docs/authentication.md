# Authentication Providers

## Table of Contents

1. [Introduction to OAuth Providers](#introduction-to-providers)
2. [How to Get Client ID and Secret](#get-client_id-and-secrets)
3. [Saving Credentials to Environment Variables](#save-credentials-to-env)
4. [Callback URLs](#callback-urls)
5. [Conclusion](#conclusion)

## `1. Introduction to OAuth Providers`

OAuth (Open Authorization) is an open standard for token-based authentication and authorization on the internet. It allows third-party services to exchange your information without exposing your password. OAuth providers are services that implement OAuth to provide secure access to user data.

The following sections will walk you through how to configure each provider.

### `OAuth Providers in TIRA APP WEB`

- **GitHub**
- **Google**
- **LinkedIn**
- **Microsoft**

## `2. How to Get Client ID and Secret`

### `Github`

- **Go to GitHub Developer Settings**:
  - Navigate to [GitHub Developer Settings](#https://github.com/settings/developers).

* **Register a New OAuth Application**:
  - Click on "New OAuth App."
  - Fill in the required fields:
    - **Application Name**: Your app's name.
    - **Homepage URL**: Your app's URL.
    - **Authorization Callback URL**: http://localhost:3001/api//auth/github/callback (for local) or your Cognito URL (for dev).
* **Save and Get Credentials**:
  - Once registered, you will get the **Client ID**.
  - Click on "Generate a new client secret" to get the **Client Secret**.

For information on how to configure GitHub OAuth, see [this guide](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).

### `Google`

- **Go to Google API Console**:

  - Navigate to [Google API Console](#https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fconsole.cloud.google.com%2F&followup=https%3A%2F%2Fconsole.cloud.google.com%2F&ifkv=AS5LTAQstwQ-aZgZOS3X1F2WIHgsvTybC0fKLKTaG-r9_jqK_4QhxcXzmk-9ZOZJrjE4iQeOLVR67g&osid=1&passive=1209600&service=cloudconsole&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-855162094%3A1718017439679658&ddm=0).

- **Create a New Project**:

  - Click on "Select a project" and then "New Project."

- **Enable OAuth Consent Screen**:

  - Go to "OAuth consent screen" and configure your application.

- **Create OAuth Credentials**:
  - Go to "Credentials" and click "Create Credentials" > "OAuth 2.0 Client IDs."
  - Fill in the required fields:
    - **Application Type**: Web application.
    - **Authorized Redirect URIs**: http://localhost:3001/api/auth/google/callback (for local) or your Cognito URL (for dev).
- **Save and Get Credentials**:
  - You will get the **Client ID** and **Client Secret**.

For information on how to configure Google OAuth, see [this guide](https://support.google.com/cloud/answer/6158849?hl=en).

### `LinkedIn`

- **Go to LinkedIn Developer Portal**:

  - Navigate to [LinkedIn Developer Portal](#https://developer.linkedin.com/).

- **Create a New App**:

  - Click on "Create App."
  - Fill in the required fields and submit the application.

- **Configure OAuth Settings**:

  - In your app settings, go to the "Auth" tab.
  - Add the **Redirect URLs**: http://localhost:3001/api/auth/linkedin/callback (for local) or your Cognito URL (for dev).

- **Save and Get Credentials**:
  - You will get the **Client ID** and **Client Secret**.

For information on how to configure LinkedIn OAuth, see [this guide](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&tabs=HTTPS1).

### `Microsoft`

- **Go to Azure Portal**:

  - Navigate to [Azure Portal](#https://portal.azure.com).

- **Register a New Application**:

  - Go to "Azure Active Directory" > "App registrations" > "New registration."
  - Fill in the required fields:
    - **Name**: Your app's name.
    - **Redirect URI**: http://localhost:3001/api/auth/microsoft/callback (for local) or your Cognito URL (for dev).

- **Save and Get Credentials**:
  - You will get the **Application (client) ID**.
  - Go to "Certificates & secrets" to create a new client secret.

For information on how to configure Azure AD OAuth, see [this guide](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).

## `3. Saving Credentials to Environment Variables`

- **Open your .env file**:
  - Create or open the **.env.secretes.local** file in your project's root directory.
- **Add the following environment variables**:

```bash
# GitHub OAuth
GIT_OAUTH_CLIENT_ID=your_github_client_id
GIT_OAUTH_CLIENT_SECRET=your_github_client_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Microsoft OAuth
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret

```

- **Replace placeholders**:

  - Replace **your_github_client_id**, **your_github_client_secret**, **your_google_client_id**, **your_google_client_secret**, **your_linkedin_client_id**, **your_linkedin_client_secret**, **your_microsoft_client_id**, and **your_microsoft_client_secret** with the actual values obtained from the respective provider.

- **Note**:
  - Based on Provided Env Variables, App will allow user to use that provider, example if your env file contains `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, frontend and backend will show option to login via Google.

## `4. Callback URLs`

The callback URL is where the OAuth provider will send the user after they have authenticated. It must match the URL specified when you registered your application.

- `GitHub`: **http://localhost:3001/api/auth/github/callback**
- `Google`: **http://localhost:3001/api/auth/google/callback**
- `LinkedIn`: **http://localhost:3001/api/auth/linkedin/callback**
- `Microsoft`: **http://localhost:3001/api/auth/microsoft/callback**

`NOTE`: The Providers will add only when you have configured the **client_id** and **client_secret** for the respective providers.

## `5. Conclusion`

By following these steps, you can configure OAuth providers for your application, ensuring secure and seamless authentication for your users. Always ensure that your client ID and secret are kept secure and never exposed in client-side code. For production environments, consider using environment variables to store these credentials securely.
