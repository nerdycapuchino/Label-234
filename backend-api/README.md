# Label 234 Backend API

**Products, Orders, Customers, Fabric Library Management**

Stack: Fastify + Prisma + PostgreSQL + TypeScript

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure .env
cp .env.example .env
# Edit .env with your PostgreSQL connection string and secrets

# 3. Generate Prisma client
npm run prisma:generate

# 4. Run migrations (creates database schema)
npm run prisma:migrate

# 5. Start development server
npm run dev
```

## Database

PostgreSQL required. Update `DATABASE_URL` in `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/label234_db"
```

## API Routes

### Auth
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login, get JWT token
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout (client-side)

### Products (Public)
- `GET /api/products` - List active products
- `GET /api/products/:slug` - Get product by slug

### Products (Admin)
- `GET /api/products/admin/all` - List all products (auth required)
- `POST /api/products` - Create product (auth required)
- `PATCH /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)

### Fabrics (Public)
- `GET /api/fabrics` - List available fabrics

### Fabrics (Admin)
- `GET /api/fabrics/admin/inventory` - View fabric inventory (auth required)
- `POST /api/fabrics` - Add fabric (auth required)
- `PATCH /api/fabrics/:id` - Update fabric (auth required)
- `POST /api/fabrics/:id/reserve` - Reserve fabric meters (auth required)
- `DELETE /api/fabrics/:id` - Delete fabric (auth required)

### Orders
- `POST /api/orders` - Create order (public)
- `GET /api/orders/:id` - Get order details (public)
- `GET /api/orders/customer/:customerId` - Get customer orders (public)
- `GET /api/orders/admin/all` - List all orders (auth required)
- `PATCH /api/orders/:id/status` - Update production status (auth required)
- `PATCH /api/orders/:id/payment` - Update payment status (auth required)
- `POST /api/orders/:id/refund` - Process refund (auth required)
- `DELETE /api/orders/:id` - Delete order (auth required)

### Customers
- `POST /api/customers` - Create/update customer
- `GET /api/customers/:id` - Get customer profile
- `GET /api/customers/email/:email` - Get customer by email
- `GET /api/customers/admin/all` - List all customers (auth required)
- `PATCH /api/customers/:id` - Update customer profile
- `POST /api/customers/:id/measurements` - Add measurement
- `PATCH /api/customers/measurements/:id` - Update measurement
- `POST /api/customers/:id/addresses` - Add address
- `PATCH /api/customers/addresses/:id` - Update address
- `DELETE /api/customers/addresses/:id` - Delete address

## Production

```bash
# Build
npm run build

# Start
npm start
```

Deploy via PM2:
```bash
pm2 start dist/index.js --name "label234-api" --exp-backoff-restart-delay=100
```

## Notes

- All admin routes require valid JWT token
- CORS enabled for localhost and deployment domains
- Password hashing via bcryptjs
- JWT expiry: 7 days (configurable in .env)
