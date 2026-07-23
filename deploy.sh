#!/bin/bash
set -euo pipefail

# Server deployment script for Label 234.
# Run on the VPS after cloning/pulling this repository into /var/www/234label.
#
# One-time server prerequisites (run scripts/server-setup.sh first):
#   - PostgreSQL installed, database + user created
#   - backend-api/.env present (DATABASE_URL, JWT_SECRET, RAZORPAY_* , CORS_ORIGINS)

APP_DIR="${APP_DIR:-/var/www/234label}"
NGINX_CONF="${NGINX_CONF:-/etc/nginx/sites-available/234label.conf}"

echo "Deploying Label 234 from $APP_DIR"
cd "$APP_DIR"

if [ -d .git ]; then
  git pull --ff-only origin main
fi

echo "Installing storefront dependencies..."
npm install --legacy-peer-deps

echo "Building storefront..."
npm run build

echo "Installing admin panel dependencies..."
npm install --prefix admin-panel --legacy-peer-deps

echo "Building admin panel..."
npm run build --prefix admin-panel

echo "Installing backend API dependencies..."
npm install --prefix backend-api

echo "Generating Prisma client..."
npm run prisma:generate --prefix backend-api

echo "Running database migrations..."
npm run prisma:deploy --prefix backend-api

echo "Building backend API..."
npm run build --prefix backend-api

echo "Installing CMS dependencies..."
npm install --prefix backend

echo "Building CMS..."
npm run build --prefix backend

echo "Starting PM2 apps..."
pm2 delete 234label-web 234label-admin 234label-api 234label-cms 2>/dev/null || true
pm2 start ecosystem.config.cjs --update-env
pm2 save

if [ -f deploy/nginx/234label.conf ]; then
  echo "Installing Nginx config..."
  cp deploy/nginx/234label.conf "$NGINX_CONF"
  ln -sfn "$NGINX_CONF" /etc/nginx/sites-enabled/234label.conf
  nginx -t
  systemctl reload nginx
fi

echo "Deployment complete."
echo "Expected internal ports: web=3000 admin=3001 api=3002 cms=1337"
