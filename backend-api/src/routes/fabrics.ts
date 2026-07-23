import { FastifyInstance } from 'fastify';

export default async function fabricRoutes(app: FastifyInstance) {
  // GET all fabrics (public - available only)
  app.get('/', async (request, reply) => {
    const fabrics = await app.prisma.fabric.findMany({
      where: { status: 'AVAILABLE' },
      include: {
        product: { include: { images: true } },
        rolls: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return reply.send(fabrics);
  });

  // GET fabric inventory (admin)
  app.get(
    '/admin/inventory',
    async (request, reply) => {
      await request.jwtVerify();

      const fabrics = await app.prisma.fabric.findMany({
        include: {
          product: true,
          rolls: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return reply.send(fabrics);
    }
  );

  // GET single fabric
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const fabric = await app.prisma.fabric.findUnique({
      where: { id },
      include: {
        product: { include: { images: true } },
        rolls: true,
      },
    });

    if (!fabric) {
      return reply.status(404).send({ message: 'Fabric not found' });
    }

    return reply.send(fabric);
  });

  // CREATE fabric (admin)
  app.post(
    '/',
    async (request, reply) => {
      await request.jwtVerify();

      const { productId, rollNumber, quantityMeters } = request.body as any;

      if (!productId || !rollNumber || !quantityMeters) {
        return reply.status(400).send({ message: 'Missing required fields' });
      }

      const fabric = await app.prisma.fabric.create({
        data: {
          productId,
          rollNumber,
          quantityMeters,
          status: 'AVAILABLE',
        },
        include: { product: true },
      });

      return reply.status(201).send(fabric);
    }
  );

  // UPDATE fabric status (admin)
  app.patch(
    '/:id',
    async (request, reply) => {
      await request.jwtVerify();

      const { id } = request.params as { id: string };
      const { status, quantityMeters, reservedMeters, soldMeters } = request.body as any;

      const fabric = await app.prisma.fabric.update({
        where: { id },
        data: {
          ...(status && { status }),
          ...(quantityMeters !== undefined && { quantityMeters }),
          ...(reservedMeters !== undefined && { reservedMeters }),
          ...(soldMeters !== undefined && { soldMeters }),
        },
        include: { product: true, rolls: true },
      });

      return reply.send(fabric);
    }
  );

  // RESERVE fabric meters for order (internal)
  app.post(
    '/:id/reserve',
    async (request, reply) => {
      await request.jwtVerify();

      const { id } = request.params as { id: string };
      const { meters, orderId } = request.body as any;

      if (!meters || !orderId) {
        return reply.status(400).send({ message: 'Missing meters or orderId' });
      }

      const fabric = await app.prisma.fabric.findUnique({ where: { id } });
      if (!fabric) {
        return reply.status(404).send({ message: 'Fabric not found' });
      }

      if (fabric.quantityMeters - fabric.reservedMeters < meters) {
        return reply.status(400).send({ message: 'Insufficient fabric available' });
      }

      const updated = await app.prisma.fabric.update({
        where: { id },
        data: {
          reservedMeters: fabric.reservedMeters + meters,
          status: fabric.quantityMeters - (fabric.reservedMeters + meters) <= 0 ? 'SOLD_OUT' : 'RESERVED',
        },
      });

      return reply.send(updated);
    }
  );

  // DELETE fabric (admin)
  app.delete(
    '/:id',
    async (request, reply) => {
      await request.jwtVerify();

      const { id } = request.params as { id: string };

      await app.prisma.fabric.delete({ where: { id } });

      return reply.status(204).send();
    }
  );
}
