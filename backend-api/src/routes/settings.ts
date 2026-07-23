import { FastifyInstance } from 'fastify';

// Settings are stored as key -> JSON string in the Settings table.
// Sections: store_info, payment_gateway, shipping, tax, integrations.

const ALLOWED_KEYS = [
  'store_info',
  'payment_gateway',
  'shipping',
  'tax',
  'integrations',
];

export default async function settingsRoutes(app: FastifyInstance) {
  // GET all settings (admin) - returns { key: parsedValue }
  app.get('/', async (request, reply) => {
    await request.jwtVerify();

    const rows = await app.prisma.settings.findMany();
    const result: Record<string, unknown> = {};
    for (const row of rows) {
      try {
        result[row.key] = JSON.parse(row.value);
      } catch {
        result[row.key] = row.value;
      }
    }
    return reply.send(result);
  });

  // GET single setting by key (admin)
  app.get('/:key', async (request, reply) => {
    await request.jwtVerify();

    const { key } = request.params as { key: string };
    const row = await app.prisma.settings.findUnique({ where: { key } });

    if (!row) {
      return reply.send({ key, value: null });
    }

    let value: unknown;
    try {
      value = JSON.parse(row.value);
    } catch {
      value = row.value;
    }
    return reply.send({ key, value });
  });

  // UPSERT a setting section (admin)
  app.put('/:key', async (request, reply) => {
    await request.jwtVerify();

    const { key } = request.params as { key: string };
    if (!ALLOWED_KEYS.includes(key)) {
      return reply.status(400).send({ message: `Unknown settings key: ${key}` });
    }

    const value = JSON.stringify(request.body ?? {});

    const row = await app.prisma.settings.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    return reply.send({ key: row.key, value: JSON.parse(row.value) });
  });
}
