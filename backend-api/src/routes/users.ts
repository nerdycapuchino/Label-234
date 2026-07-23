import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';

// Admin user management (Users & Roles). All routes require auth.

export default async function userRoutes(app: FastifyInstance) {
  // LIST all admin users
  app.get('/', async (request, reply) => {
    await request.jwtVerify();

    const users = await app.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return reply.send(users);
  });

  // CREATE admin user
  app.post('/', async (request, reply) => {
    await request.jwtVerify();

    const { email, password, name, role } = request.body as any;

    if (!email || !password || !name) {
      return reply.status(400).send({ message: 'Missing required fields' });
    }

    const existing = await app.prisma.user.findUnique({ where: { email } });
    if (existing) {
      return reply.status(400).send({ message: 'User already exists' });
    }

    const validRoles = ['SUPER_ADMIN', 'ADMIN', 'MANAGER'];
    const userRole = validRoles.includes(role) ? role : 'ADMIN';

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await app.prisma.user.create({
      data: { email, name, password: hashedPassword, role: userRole },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
      },
    });

    return reply.status(201).send(user);
  });

  // UPDATE user (role, active status, name)
  app.patch('/:id', async (request, reply) => {
    await request.jwtVerify();

    const { id } = request.params as { id: string };
    const { name, role, active } = request.body as any;

    const user = await app.prisma.user.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role }),
        ...(active !== undefined && { active }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        createdAt: true,
      },
    });

    return reply.send(user);
  });

  // DELETE user (cannot delete self)
  app.delete('/:id', async (request, reply) => {
    await request.jwtVerify();
    const currentUser = request.user as any;

    const { id } = request.params as { id: string };

    if (id === currentUser.id) {
      return reply.status(400).send({ message: 'Cannot delete your own account' });
    }

    await app.prisma.user.delete({ where: { id } });

    return reply.status(204).send();
  });
}
