import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';

export default async function authRoutes(app: FastifyInstance) {
  // REGISTER admin user (super admin only)
  app.post('/register', async (request, reply) => {
    const { email, password, name } = request.body as any;

    if (!email || !password || !name) {
      return reply.status(400).send({ message: 'Missing required fields' });
    }

    const existing = await app.prisma.user.findUnique({ where: { email } });
    if (existing) {
      return reply.status(400).send({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await app.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    return reply.status(201).send({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  });

  // LOGIN
  app.post('/login', async (request, reply) => {
    const { email, password } = request.body as any;

    if (!email || !password) {
      return reply.status(400).send({ message: 'Missing email or password' });
    }

    const user = await app.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.status(401).send({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return reply.status(401).send({ message: 'Invalid credentials' });
    }

    if (!user.active) {
      return reply.status(401).send({ message: 'User account is inactive' });
    }

    const token = app.jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    );

    return reply.send({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  });

  // VERIFY token
  app.get('/verify', async (request, reply) => {
    try {
      await request.jwtVerify();
      const user = request.user as any;

      const dbUser = await app.prisma.user.findUnique({ where: { id: user.id } });
      if (!dbUser?.active) {
        return reply.status(401).send({ message: 'User is inactive' });
      }

      return reply.send({
        user: {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role,
        },
      });
    } catch (err) {
      return reply.status(401).send({ message: 'Invalid token' });
    }
  });

  // CHANGE password
  app.post('/change-password', async (request, reply) => {
    await request.jwtVerify();
    const user = request.user as any;

    const { oldPassword, newPassword } = request.body as any;

    if (!oldPassword || !newPassword) {
      return reply.status(400).send({ message: 'Missing passwords' });
    }

    const dbUser = await app.prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) {
      return reply.status(404).send({ message: 'User not found' });
    }

    const validOldPassword = await bcrypt.compare(oldPassword, dbUser.password);
    if (!validOldPassword) {
      return reply.status(401).send({ message: 'Old password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await app.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return reply.send({ message: 'Password changed successfully' });
  });

  // LOGOUT (client-side only - JWT doesn't maintain state)
  app.post('/logout', async (request, reply) => {
    return reply.send({ message: 'Logged out successfully' });
  });
}
