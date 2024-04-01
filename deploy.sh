## Start PM2 service
SERVICE_NAME="nest-backend-api"

# Check if the service is running
if pm2 list | grep -q "$SERVICE_NAME"; then
    # Service is running, stop it
    echo "deleting pm2 $SERVICE_NAME..."
    pm2 delete "$SERVICE_NAME"
fi

## prisma migration
pnpm prisma migrate deploy --schema=./apps/api/prisma/schema.prisma

## prisma generate client
pnpm prisma generate --schema=./apps/api/prisma/schema.prisma

## build backend
pnpm nx build api


# Service is not running, start it
pm2 start "pnpm nx start api" --name="$SERVICE_NAME"
