#!/bin/bash

# This script will check if the .env file and 
# certificates exists and if not, it will create it from the .env.example file.

# Check if openssl is installed
if ! command -v openssl &> /dev/null 2>&1
then
    echo "Error: OpenSSL is not installed. Please install OpenSSL and try again."
    exit 1
fi

# Check if the file exists
if [ ! -f ./.env.local ] || [ ! -f ./.env.secrets.local ]; then
    # Create a copy of the example file without the ".example" extension
    cp ".env.local.example" ".env.local"
    cp ".env.secrets.local.example" ".env.secrets.local"
    echo "Env created"
fi

# Check if key.pem and cert.pem files exist, if not, generate a self-signed SSL/TLS certificate
if [ ! -f ./certs ]; then
    echo "Creating certs folder for SSL certificates"
    mkdir certs
fi

if [ ! -f ./certs/key.pem ] || [ ! -f ./certs/cert.pem ]; then
  echo "Creating a self-signed certificate:"
  openssl req -x509 -newkey rsa:2048 -keyout ./certs/key.pem -subj "/CN=localhost" -addext "subjectAltName = DNS:localhost" -out ./certs/cert.pem -days 365 -nodes
  echo "Self-signed certificate is created"
fi
