import { FastifyInstance } from 'fastify';

export default async function customerRoutes(app: FastifyInstance) {
  // CREATE/GET customer (auto-create or update on first order)
  app.post('/', async (request, reply) => {
    const { email, name, phone } = request.body as any;

    if (!email || !name) {
      return reply.status(400).send({ message: 'Missing email or name' });
    }

    const customer = await app.prisma.customer.upsert({
      where: { email },
      update: { name, phone },
      create: { email, name, phone },
    });

    return reply.status(201).send(customer);
  });

  // GET customer by ID
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const customer = await app.prisma.customer.findUnique({
      where: { id },
      include: {
        measurements: true,
        addresses: true,
        orders: { orderBy: { createdAt: 'desc' }, take: 10 },
      },
    });

    if (!customer) {
      return reply.status(404).send({ message: 'Customer not found' });
    }

    return reply.send(customer);
  });

  // GET customer by email
  app.get('/email/:email', async (request, reply) => {
    const { email } = request.params as { email: string };

    const customer = await app.prisma.customer.findUnique({
      where: { email },
      include: {
        measurements: true,
        addresses: true,
        orders: { orderBy: { createdAt: 'desc' }, take: 10 },
      },
    });

    if (!customer) {
      return reply.status(404).send({ message: 'Customer not found' });
    }

    return reply.send(customer);
  });

  // GET all customers (admin)
  app.get(
    '/admin/all',
    async (request, reply) => {
      await request.jwtVerify();

      const customers = await app.prisma.customer.findMany({
        include: {
          measurements: true,
          addresses: true,
          _count: { select: { orders: true } },
        },
        orderBy: { createdAt: 'desc' },
      });

      return reply.send(customers);
    }
  );

  // UPDATE customer profile
  app.patch(
    '/:id',
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { name, phone } = request.body as any;

      const customer = await app.prisma.customer.update({
        where: { id },
        data: { name, phone },
      });

      return reply.send(customer);
    }
  );

  // ADD measurement
  app.post(
    '/:id/measurements',
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { name, chest, waist, length, shoulder, armLength } = request.body as any;

      const measurement = await app.prisma.customerMeasurement.create({
        data: {
          customerId: id,
          name,
          chest,
          waist,
          length,
          shoulder,
          armLength,
        },
      });

      return reply.status(201).send(measurement);
    }
  );

  // UPDATE measurement
  app.patch(
    '/measurements/:id',
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const updateData = request.body as any;

      const measurement = await app.prisma.customerMeasurement.update({
        where: { id },
        data: updateData,
      });

      return reply.send(measurement);
    }
  );

  // ADD address
  app.post(
    '/:id/addresses',
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { label, street, city, state, postalCode, country, isDefault } = request.body as any;

      if (!label || !street || !city || !state) {
        return reply.status(400).send({ message: 'Missing required address fields' });
      }

      const address = await app.prisma.customerAddress.create({
        data: {
          customerId: id,
          label,
          street,
          city,
          state,
          postalCode,
          country: country || 'IN',
          isDefault,
        },
      });

      return reply.status(201).send(address);
    }
  );

  // UPDATE address
  app.patch(
    '/addresses/:id',
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const updateData = request.body as any;

      const address = await app.prisma.customerAddress.update({
        where: { id },
        data: updateData,
      });

      return reply.send(address);
    }
  );

  // DELETE address
  app.delete(
    '/addresses/:id',
    async (request, reply) => {
      const { id } = request.params as { id: string };

      await app.prisma.customerAddress.delete({ where: { id } });

      return reply.status(204).send();
    }
  );
}
