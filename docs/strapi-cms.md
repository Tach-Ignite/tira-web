# Strapi Overview

Strapi is an open-source headless CMS (Content Management System) that provides a flexible and customizable API to manage content. It allows developers to create and manage content types, configure APIs, and set up role-based access control, making it ideal for building content-driven applications.

## Table of Contents

1. [Collection Type](#collection-type)
2. [Single Type](#single-type)
3. [Add, Update, and Delete Entries in Single Type](#crud-operations)
4. [Give Access to the API](#Give-access-to-the-API)
5. [Get the Endpoint in Strapi](#Get-the-endpoint-in-strapi)
6. [Roles](#roles)
7. [Manage Roles in Strapi](#manage-roles-in-strapi)
8. [Publish Content](#publish-content)
9. [Environment Variables](#env)
10. [Build and Run](#build-and-run)
11. [Conclusion](#conclusion)

## `1. Collection Type`

A **Collection Type** in Strapi is used to manage multiple entries of the same kind. It is suitable for repetitive data such as blog posts, products, or user profiles. Each entry in a collection type is stored as a separate record in the database.

### How to Create a Collection Type

- **Go to Content-Types Builder**: In the Strapi admin panel, click on "Content-Types Builder".
- **Add a New Collection Type**: Click on "Add New Collection Type".
- **Define Fields**: Add and configure fields for your collection type, such as text, number, date, etc.
- **Save and Create**: Click "Save" to create the collection type.

## `2. Single Type`

A **Single Type** in Strapi is used to manage a single entry of a type. It is ideal for unique data that doesn’t have multiple instances, such as a homepage, about page, or site settings. A single type is represented by a single record in the database.

### How to Create a Single Type

- **Go to Content-Types Builder**: In the Strapi admin panel, click on "Content-Types Builder".
- **Add a New Single Type**: Click on "Add New Single Type".
- **Define Fields**: Add and configure fields for your single type, such as text, number, date, etc.
- **Save and Create**: Click "Save" to create the single type.

## `3. Add, Update, and Delete Entries in Single Type`

### `Add Entry in Single Type`

- **Go to Content Manager**: In the Strapi admin panel, click on "Content Manager".
- **Select Single Type**: Choose the single type you want to manage.
- **Create Content**: If it doesn't already exist, click "Create" to add content for the single type.
- **Save Content**: Click "Save" to store the content.

### `Update Entry in Single Type`

- **Go to Content Manager**: In the Strapi admin panel, click on "Content Manager".
- **Select Single Type**: Choose the single type you want to manage.
- **Edit Content**: Make the necessary changes to the existing content.
- **Save Content**: Click "Save" to update the content.

### `Delete Entry in Single Type`

- **Go to Content Manager**: In the Strapi admin panel, click on "Content Manager".
- **Select Single Type**: Choose the single type you want to manage.
- **Delete Content**: Click the "Delete" button to remove the content. Confirm the deletion if prompted.

## `4. Give Access to the API`

To control access to your API, Strapi provides Role-Based Access Control (RBAC):

- **Navigate to Roles & Permissions**: In the Strapi admin panel, go to "Settings" > "Roles & Permissions". -**Select a Role**: Choose either the "Authenticated" or "Public" role.
- **Grant Permissions**: Toggle the permissions for the specific actions (find, findOne, create, update, delete) you want to allow for your collection or single types.

## `5. Get the Endpoint in Strapi`

Each content type in Strapi automatically generates RESTful API endpoints. For a collection type called articles, the endpoints would be:

- **GET** /cms/api/announcement - Retrieve all announcement
- **GET** /cms/api/announcement/:id - Retrieve a specific announcement by ID
- **POST** /cms/api/announcement - Create a new announcement
- **PUT** /cms/api/announcement/:id - Update an announcement by ID
- **DELETE** /cms/api/announcement/:id - Delete an announcement by ID

## `6. Roles`

Roles in Strapi are used to manage user access and permissions. There are typically two default roles:

- **Authenticated**: Users who have registered and logged in.
- **Public**: Users who access the API without authentication.

You can create custom roles to tailor access permissions according to your application's needs.

## `7. Manage Roles in Strapi`

Roles in Strapi are used to define different levels of access to the content and API:

- **Navigate to Roles & Permissions**: Go to "Settings" > "Roles & Permissions".
- **View Roles**: View existing roles such as "Authenticated" and "Public".
- **Edit Roles**: Click on a role to edit its permissions, including content type permissions and API access.
- **Create Custom Roles**: Click on "Add New Role" to create a custom role with specific permissions.

## `8. Publish Content`

- **Go to Content Manager**: In the Strapi admin panel, click on "Content Manager".
- **Select Content Type**: Choose the collection type or single type you want to manage.
- **Create or Edit Content**: Create new entries or edit existing ones.
- **Publish Content**: Click on "Publish" to make the content live. You can also save content as a draft.

## `9. Environment Variables`

To run CMS, several environment variables can be configured to customize its behavior. These variables typically include database configuration, server settings, and other options relevant to your specific setup. Here are the key environment variables commonly used in Strapi projects:

### Database Configuration

- **CMS_DATABASE_URL**: The database client to use (e.g., postgres, mysql, sqlite, mongodb).W're using postgres db

```bash
Example: postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>

```

- **CMS_DATABASE_SCHEMA**: The database schema to use (e.g. cms, strapi ).W're using postgres db and default schema is cms, you need to create an empty schema based on the schema named used here in database before starting strapi

```bash
Example: cms

```

- **Server Configuration**

  1.  **STRAPI_CMS_HOST**: The host on which the server will run (e.g., localhost).
  2.  **STRAPI_CMS_PORT**: The port on which the server will listen (e.g., 1337).
  3.  **STRAPI_APP_KEYS**: A list of application keys used for cookie signing (e.g., your_app_key_here).
  4.  **STRAPI_API_TOKEN_SALT**: A salt used for generating API tokens.
  5.  **STRAPI_ADMIN_JWT_SECRET**: A secret key for the admin JWT authentication.
  6.  **STRAPI_JWT_SECRET**: A secret key for the user JWT authentication.
  7.  **STRAPI_CMS_API_URL**: A Strapi Endpoint url for fetching data in frontend.

## `10.Build and Run`

### Build the CMS

- **Install Dependencies**: Navigate to your project directory and install the dependencies.

```bash
cd your-project
pnpm install

```

- **Build the CMS**:Build the CMS to ensure everything is properly set up.

```bash
nx build cms

```

### Run the CMS

- **Development Mode**: To run CMS in development mode, use the following command. This mode watches for changes and reloads automatically.

```bash
nx run cms

```

- **Production Mode**: To run CMS in production mode, use the following command. Make sure to build the project first.

```bash
nx build cms
nx start cms
```

## `11. Conclusion`

Strapi is a powerful and flexible headless CMS that allows developers to easily manage and deliver content through a customizable API. Understanding its core features such as collection types, single types, role-based access control, and content management is essential for effectively using Strapi.

- **Collection Types**: Manage multiple entries of the same type, ideal for repetitive data like blog posts or products.
- **Single Types**: Manage a single entry of a type, perfect for unique content like a homepage or settings.
- **API Access**: Strapi provides robust role-based access control to manage who can access the API and what actions they can perform.
- **Endpoints**: Each content type automatically generates RESTful API endpoints for easy integration with other applications.
- **Roles Management**: Define and manage different levels of access to content and API functionality.
- **Content Types Creation**: Easily create and configure collection and single types through the admin panel.
- **Content Management**: Add, update, publish, and delete content efficiently within the Strapi interface.

By leveraging these features, you can build scalable and maintainable content-driven applications with Strapi. For more detailed and specific information, always refer to the official [Strapi Documentation](https://docs.strapi.io/dev-docs/intro).
