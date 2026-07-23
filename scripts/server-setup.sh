#!/bin/bash
set -euo pipefail

# One-time VPS setup for Label 234 backend-api (PostgreSQL + env).
# Run once as root on the server BEFORE the first deploy.sh.
# Safe to re-run: it skips steps already done.

DB_NAME="${DB_NAME:-label234_db}"
DB_USER="${DB_USER:-label234_user}"
DB_PASS="${DB_PASS:-}"
APP_DIR="${APP_DIR:-/var/www/234label}"

if [ -z "$DB_PASS" ]; then
  echo "ERROR: set DB_PASS to a strong password, e.g.:"
  echo "  DB_PASS='YourStrongPassword' bash scripts/server-setup.sh"
  exit 1
fi

echo "==> Installing PostgreSQL (if missing)..."
if ! command -v psql >/dev/null 2>&1; then
  apt-get update
  apt-get install -y postgresql postgresql-contrib
fi
systemctl enable --now postgresql

echo "==> Creating database and user (if missing)..."
sudo -u postgres psql <<SQL
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN
    CREATE ROLE ${DB_USER} LOGIN PASSWORD '${DB_PASS}';
  END IF;
END
\$\$;
SELECT 'CREATE DATABASE ${DB_NAME} OWNER ${DB_USER}'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME}')\gexec
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
SQL

echo "==> Writing backend-api/.env (if missing)..."
ENV_FILE="${APP_DIR}/backend-api/.env"
if [ ! -f "$ENV_FILE" ]; then
  JWT_SECRET="$(openssl rand -hex 32)"
  cat > "$ENV_FILE" <<ENV
DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@localhost:5432/${DB_NAME}"
NODE_ENV=production
PORT=3002
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=7d
CORS_ORIGINS=https://234label.com,https://www.234label.com,https://admin.234label.com
RAZORPAY_KEY_ID=REPLACE_ME
RAZORPAY_KEY_SECRET=REPLACE_ME
ENV
  echo "    Wrote $ENV_FILE (fill in RAZORPAY_* keys)."
else
  echo "    $ENV_FILE already exists, leaving it untouched."
fi

echo "==> Done. Next:"
echo "    1) Edit ${ENV_FILE} and set the real RAZORPAY keys."
echo "    2) Run: cd ${APP_DIR} && bash deploy.sh"
echo "    3) Seed first admin (see DEPLOYMENT.md)."
