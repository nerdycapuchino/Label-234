#!/bin/bash
# Server Setup & Deployment Script for 234label
# To be executed on the production server (root@72.61.255.54)

APP_DIR="/var/www/234label"
PORT=3000
APP_NAME="234label-web"
DOMAIN="234label.com"

echo "Starting deployment for $APP_NAME..."

# 1. Setup Directory
if [ ! -d "$APP_DIR" ]; then
  echo "Creating app directory at $APP_DIR..."
  mkdir -p $APP_DIR
fi

cd $APP_DIR

# 2. Pull Latest Code (Assuming repo is already cloned. If not, it will fail here, prompting user to clone first)
if [ -d ".git" ]; then
  echo "Pulling latest changes from Git..."
  git pull origin main
else
  echo "Error: Git repository not found in $APP_DIR. Please clone the repository first."
  exit 1
fi

# 3. Install & Build
echo "Installing dependencies..."
npm install

echo "Building Next.js application..."
npm run build

# 4. Restart PM2
echo "Restarting application via PM2 on port $PORT..."
# Kill all pm2 processes to guarantee the old ArtiQ server dies
pm2 delete all 2>/dev/null || true
PORT=$PORT pm2 start npm --name "$APP_NAME" -- start
pm2 save

echo "Deployment complete! Your app should be running internally on port $PORT."
echo "Make sure Nginx is configured to reverse proxy traffic for $DOMAIN to port $PORT."
