import 'dotenv/config';
import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import './types/index.js';

// Import routes
import productRoutes from './routes/products.js';
import fabricRoutes from './routes/fabrics.js';
import orderRoutes from './routes/orders.js';
import customerRoutes from './routes/customers.js';
import authRoutes from './routes/auth.js';
import settingsRoutes from './routes/settings.js';
import userRoutes from './routes/users.js';
import statsRoutes from './routes/stats.js';
import paymentRoutes from './routes/payments.js';

const prisma = new PrismaClient();

const app = Fastify({
  logger: true,
});

// Plugins
const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://234label.com',
  'https://www.234label.com',
  'https://admin.234label.com',
];
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
  : defaultOrigins;

app.register(fastifyCors, {
  origin: corsOrigins,
  credentials: true,
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'dev-secret-change-in-prod',
  sign: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
});

// Middleware
app.decorate('prisma', prisma);

// Health check
app.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
}));

// Routes
app.register(authRoutes, { prefix: '/api/auth' });
app.register(productRoutes, { prefix: '/api/products' });
app.register(fabricRoutes, { prefix: '/api/fabrics' });
app.register(orderRoutes, { prefix: '/api/orders' });
app.register(customerRoutes, { prefix: '/api/customers' });
app.register(settingsRoutes, { prefix: '/api/settings' });
app.register(userRoutes, { prefix: '/api/users' });
app.register(statsRoutes, { prefix: '/api/stats' });
app.register(paymentRoutes, { prefix: '/api/payments' });

// Error handler
app.setErrorHandler((error: any, request, reply) => {
  app.log.error(error);
  const status = typeof error?.statusCode === 'number' ? error.statusCode : 500;
  reply.status(status).send({
    statusCode: status,
    message: error?.message ?? 'Internal Server Error',
  });
});

// Graceful shutdown
const signals = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
  process.on(signal, async () => {
    console.log(`\n${signal} received, shutting down gracefully...`);
    await app.close();
    await prisma.$disconnect();
    process.exit(0);
  });
});

// Start server
const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 3002, host: '0.0.0.0' });
    console.log(`🚀 Server running on http://0.0.0.0:${process.env.PORT || 3002}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
