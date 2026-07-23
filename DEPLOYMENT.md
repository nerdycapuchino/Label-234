# Label 234 — Deployment Guide

Four apps on one VPS, managed by PM2, fronted by Nginx:

| App | Dir | Port | Domain |
|-----|-----|------|--------|
| Storefront (Next) | `/` | 3000 | 234label.com |
| Admin panel (Next) | `admin-panel/` | 3001 | admin.234label.com |
| Backend API (Fastify) | `backend-api/` | 3002 | api.234label.com |
| CMS (Strapi, blogs only) | `backend/` | 1337 | cms.234label.com |

Data lives in **PostgreSQL** (backend-api). Strapi keeps its own SQLite for blog content.

---

## First-time server setup (run once)

SSH into the VPS as root, then:

```bash
cd /var/www/234label
git pull origin main

# 1. Install Postgres + create DB + write backend-api/.env
DB_PASS='CHOOSE_A_STRONG_PASSWORD' bash scripts/server-setup.sh

# 2. Edit backend-api/.env → set the real Razorpay keys
nano backend-api/.env
#   RAZORPAY_KEY_ID=rzp_live_xxx
#   RAZORPAY_KEY_SECRET=xxx

# 3. Full deploy (installs deps, migrates DB, builds, starts PM2, nginx)
bash deploy.sh

# 4. Seed the first admin user
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@label234.com","password":"CHANGE_ME","name":"Admin"}'
```

Then point DNS `api.234label.com` → server IP, and add HTTPS:

```bash
certbot --nginx -d api.234label.com
```

---

## Routine deploys (after the first)

```bash
cd /var/www/234label && bash deploy.sh
```

`deploy.sh` pulls main, installs deps, runs `prisma migrate deploy`, builds all
apps, and restarts PM2.

---

## Environment variables

`backend-api/.env` (never committed — created by `server-setup.sh`):

```
DATABASE_URL=postgresql://label234_user:PASS@localhost:5432/label234_db
NODE_ENV=production
PORT=3002
JWT_SECRET=<random 32-byte hex>
JWT_EXPIRES_IN=7d
CORS_ORIGINS=https://234label.com,https://www.234label.com,https://admin.234label.com
RAZORPAY_KEY_ID=rzp_live_xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx   # optional, for webhook verification
```

Storefront + admin read their API URL from `ecosystem.config.cjs`
(`NEXT_PUBLIC_BACKEND_API_URL` / `NEXT_PUBLIC_API_URL` → `https://api.234label.com`).

---

## Verify after deploy

```bash
pm2 status                                   # all 4 apps online
curl https://api.234label.com/health         # {"status":"ok"}
curl https://api.234label.com/api/products   # [] or product list
```

- Admin: https://admin.234label.com → log in
- Storefront: https://234label.com/collections → products render
- Place a test order → appears in admin dashboard + orders

---

## Rollback

```bash
cd /var/www/234label
git log --oneline -5
git reset --hard <previous-commit>
bash deploy.sh
```

Migrations are additive; a code rollback is safe. To undo a schema change,
restore from a DB backup (set up `pg_dump` cron separately).
