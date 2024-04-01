# Dev Container Ready

This TIRA-WEB project is ready to be run in a containerized development environment, which can be facilitated by tools like VS Code's Dev Containers feature among others. Containerized development environments provide a streamlined and consistent setup across various IDEs and code editors. They allow developers to work inside a container that comes pre-configured with a specific set of tools, runtime environments, and libraries tailored to the project's requirements. This approach ensures that all developers on the project have access to a uniform development environment, regardless of their local machine configuration, thereby enhancing collaboration and reducing setup time.

# Dev Container Setup

This repository includes a development container configuration to provide a consistent and convenient development environment.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker](https://www.docker.com/)

You will also need the following Visual Studio Code extensions:

- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Getting Started

To get started with the development container, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Open the repository in Visual Studio Code:**

   ```sh
   code .
   ```

3. **Open the Command Palette (Ctrl+Shift+P) and select:**

   ```
   Remote-Containers: Reopen in Container
   ```

Visual Studio Code will build the container image defined in `.devcontainer/Dockerfile` and set up the environment as defined in `.devcontainer/devcontainer.json`.

## Dev Container Configuration

The development container configuration is located in the `.devcontainer` directory and includes the following files:

- **`Dockerfile`**: Defines the Docker image to be used for the development container.
- **`devcontainer.json`**: Configuration file for the development container.

### Dockerfile

The `Dockerfile` sets up the base image and any necessary dependencies for your project. You can customize this file to include additional tools or libraries required for your development environment.

### docker-compose.yml

The `docker-compose.yml` file defines the services, volumes, and networks for your development environment. Here is an example configuration:

```yaml
version: '3'

services:
  app:
    build:
      context: ..
      dockerfile: .devcontainer/Dockerfile
    volumes:
      - ..:/workspace:cached
    command: /bin/sh -c "while sleep 1000; do :; done"
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
```

### devcontainer.json

The `devcontainer.json` file configures the development container settings, including extensions, workspace settings, and any post-create commands.

Example `devcontainer.json`:

```json
{
  "name": "My Dev Container",
  "dockerComposeFile": "./docker-compose.yml",
  "settings": {
    "terminal.integrated.shell.linux": "/bin/bash"
  },
  "extensions": ["ms-azuretools.vscode-docker", "esbenp.prettier-vscode"],
  "postCreateCommand": "pnpm install",
  "remoteUser": "vscode"
}
```

## Customizing the Dev Container

To customize the development container for your specific needs, you can modify the Dockerfile and devcontainer.json files. For example, you can add additional VS Code extensions, change the base image, or install new dependencies.

### Adding VS Code Extensions

To add more VS Code extensions, update the extensions array in devcontainer.json:

```
"extensions": [
    "ms-azuretools.vscode-docker",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
]
```

### Running Post-Create Commands

If you need to run any commands after the container is created, you can specify them in the postCreateCommand field in devcontainer.json:

```
"postCreateCommand": "pnpm install --frozen-lockfile"
```

### Conclusion

By using a development container, we ensure a consistent and reproducible development environment across all contributors. This setup reduces the "works on my machine" problems and streamlines the onboarding process for new developers. With the provided configuration, you can start developing immediately with all necessary tools and dependencies already in place. Happy coding!
