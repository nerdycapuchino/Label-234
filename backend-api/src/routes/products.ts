import { FastifyInstance } from 'fastify';

export default async function productRoutes(app: FastifyInstance) {
  // GET all products
  app.get('/', async (request, reply) => {
    const products = await app.prisma.product.findMany({
      where: { isActive: true },
      include: {
        images: { orderBy: { position: 'asc' } },
        fabrics: { where: { status: 'AVAILABLE' } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reply.send(products);
  });

  // GET single product by slug
  app.get('/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };

    const product = await app.prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { position: 'asc' } },
        fabrics: { where: { status: 'AVAILABLE' } },
      },
    });

    if (!product) {
      return reply.status(404).send({ message: 'Product not found' });
    }

    return reply.send(product);
  });

  // GET all products (admin) - includes inactive
  app.get(
    '/admin/all',
    async (request, reply) => {
      // Verify JWT in middleware
      await request.jwtVerify();

      const products = await app.prisma.product.findMany({
        include: {
          images: { orderBy: { position: 'asc' } },
          fabrics: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return reply.send(products);
    }
  );

  // CREATE product (admin)
  app.post(
    '/',
    async (request, reply) => {
      await request.jwtVerify();

      const {
        slug,
        title,
        description,
        fabricType,
        work,
        pricePerMeter,
        widthInches,
        careInstructions,
        images,
      } = request.body as any;

      if (!slug || !title || !pricePerMeter) {
        return reply.status(400).send({ message: 'Missing required fields' });
      }

      const product = await app.prisma.product.create({
        data: {
          slug,
          title,
          description,
          fabricType,
          work,
          pricePerMeter,
          widthInches,
          careInstructions,
          images: {
            create: (images || []).map((url: string, idx: number) => ({
              url,
              position: idx,
            })),
          },
        },
        include: { images: true },
      });

      return reply.status(201).send(product);
    }
  );

  // UPDATE product (admin)
  app.patch(
    '/:id',
    async (request, reply) => {
      await request.jwtVerify();

      const { id } = request.params as { id: string };
      const updateData = request.body as any;

      const product = await app.prisma.product.update({
        where: { id },
        data: updateData,
        include: { images: true },
      });

      return reply.send(product);
    }
  );

  // DELETE product (admin)
  app.delete(
    '/:id',
    async (request, reply) => {
      await request.jwtVerify();

      const { id } = request.params as { id: string };

      await app.prisma.product.delete({ where: { id } });

      return reply.status(204).send();
    }
  );
}
