# Backend API Setup Guide

## Phase 1: Foundation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Step 1: PostgreSQL Setup (Local Development)

#### Windows
1. Download from https://www.postgresql.org/download/windows/
2. Install with default settings, remember postgres password
3. Open pgAdmin or psql terminal
4. Create database:
   ```sql
   CREATE DATABASE label234_db;
   CREATE USER label234_user WITH PASSWORD 'label234_pass';
   ALTER ROLE label234_user SET client_encoding TO 'utf8';
   ALTER ROLE label234_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE label234_user SET default_transaction_deferrable TO 'on';
   ALTER ROLE label234_user SET default_transaction_deferrable TO 'off';
   ALTER ROLE label234_user SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE label234_db TO label234_user;
   ```

#### Mac (using Homebrew)
```bash
brew install postgresql@15
brew services start postgresql@15

# Open psql
psql postgres

# Create database and user (paste above SQL)
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

sudo -u postgres psql

# Create database and user (paste SQL from Windows section)
```

### Step 2: Install Backend Dependencies

```bash
cd backend-api
npm install
```

### Step 3: Generate Prisma Client

```bash
npm run prisma:generate
```

### Step 4: Create Database Schema

```bash
npm run prisma:migrate
# When prompted, give the migration a name like "init"
```

This creates all tables: users, products, fabrics, orders, customers, etc.

### Step 5: Create First Admin User

```bash
# Start the dev server
npm run dev
```

In another terminal, create first admin:
```bash
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@label234.com",
    "password": "ChangeMe123!",
    "name": "Admin User"
  }'
```

Response:
```json
{
  "id": "xxx",
  "email": "admin@label234.com",
  "name": "Admin User",
  "role": "ADMIN"
}
```

### Step 6: Login and Get Token

```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@label234.com",
    "password": "ChangeMe123!"
  }'
```

Response:
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "xxx",
    "email": "admin@label234.com",
    "name": "Admin User",
    "role": "ADMIN"
  }
}
```

**Save the token** — use in all admin API requests:
```bash
# Example: Create product
curl -X POST http://localhost:3002/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "slug": "pastel-chikankari",
    "title": "Pastel Chikankari Cotton",
    "description": "Hand-embroidered chikankari...",
    "fabricType": "Cotton",
    "work": "Chikankari",
    "pricePerMeter": 2450,
    "widthInches": 44,
    "careInstructions": "Dry clean / gentle wash",
    "images": [
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=1200"
    ]
  }'
```

---

## Testing API Endpoints

### 1. Health Check
```bash
curl http://localhost:3002/health
```

### 2. Create Product (requires token)
```bash
curl -X POST http://localhost:3002/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{...}'
```

### 3. List Products (public)
```bash
curl http://localhost:3002/api/products
```

### 4. Create Fabric (requires token)
```bash
curl -X POST http://localhost:3002/api/fabrics \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "productId": "PRODUCT_ID_HERE",
    "rollNumber": "ROLL-001-A",
    "quantityMeters": 10
  }'
```

### 5. Create Order (public)
```bash
curl -X POST http://localhost:3002/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "CUSTOMER_ID",
    "items": [{
      "productId": "PRODUCT_ID",
      "fabricId": "FABRIC_ID",
      "quantity": 1,
      "lengthMeters": 2.5,
      "pricePerMeter": 2450,
      "totalPrice": 6125
    }],
    "subtotal": 6125,
    "shippingCost": 0,
    "tax": 0,
    "totalAmount": 6125
  }'
```

---

## Troubleshooting

**"Error: connect ECONNREFUSED 127.0.0.1:5432"**
- PostgreSQL is not running
- Start it: `brew services start postgresql@15` (Mac) or Windows Services

**"Database label234_db does not exist"**
- Run: `npm run prisma:migrate` (creates DB)

**"Invalid DATABASE_URL"**
- Check `.env` file syntax
- Format: `postgresql://user:password@host:port/database`

**"JWT Error"**
- Ensure Authorization header: `Authorization: Bearer <token>`
- Tokens expire after 7 days, re-login

---

## Next Steps

1. ✅ Backend API running locally
2. → Wire admin panel to API endpoints
3. → Wire storefront to API endpoints
4. → Deploy to VPS with PostgreSQL

**Checkpoint:** Test all 5 endpoints above. Report any errors.
