import { FastifyInstance } from 'fastify';
import crypto from 'crypto';

export default async function orderRoutes(app: FastifyInstance) {
  // CREATE order (public - from checkout)
  app.post('/', async (request, reply) => {
    const {
      customerId,
      items,
      subtotal,
      shippingCost = 0,
      tax = 0,
      totalAmount,
    } = request.body as any;

    if (!customerId || !items || items.length === 0) {
      return reply.status(400).send({ message: 'Missing required fields' });
    }

    const orderNumber = `ORD-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

    const order = await app.prisma.order.create({
      data: {
        orderNumber,
        customerId,
        subtotal,
        shippingCost,
        tax,
        totalAmount,
        paymentStatus: 'PENDING',
        productionStatus: 'ORDER_PLACED',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            fabricId: item.fabricId || null,
            quantity: item.quantity || 1,
            lengthMeters: item.lengthMeters || 0,
            pricePerMeter: item.pricePerMeter,
            totalPrice: item.totalPrice,
            isCustomTailored: item.isCustomTailored || false,
            neckline: item.neckline || null,
            sleeves: item.sleeves || null,
            length: item.length || null,
            customNotes: item.customNotes || null,
          })),
        },
      },
      include: {
        items: { include: { product: true, fabric: true } },
        customer: true,
      },
    });

    return reply.status(201).send(order);
  });

  // GET order by ID
  app.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const order = await app.prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true, fabric: true } },
        customer: true,
        statusHistory: true,
      },
    });

    if (!order) {
      return reply.status(404).send({ message: 'Order not found' });
    }

    return reply.send(order);
  });

  // GET orders by customer
  app.get('/customer/:customerId', async (request, reply) => {
    const { customerId } = request.params as { customerId: string };

    const orders = await app.prisma.order.findMany({
      where: { customerId },
      include: {
        items: { include: { product: true } },
        statusHistory: { orderBy: { createdAt: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reply.send(orders);
  });

  // GET all orders (admin)
  app.get(
    '/admin/all',
    async (request, reply) => {
      await request.jwtVerify();

      const orders = await app.prisma.order.findMany({
        include: {
          items: { include: { product: true, fabric: true } },
          customer: true,
          statusHistory: { orderBy: { createdAt: 'desc' } },
        },
        orderBy: { createdAt: 'desc' },
      });

      return reply.send(orders);
    }
  );

  // UPDATE order status (admin)
  app.patch(
    '/:id/status',
    async (request, reply) => {
      await request.jwtVerify();

      const { id } = request.params as { id: string };
      const { status, note } = request.body as any;

      if (!status) {
        return reply.status(400).send({ message: 'Missing status' });
      }

      const order = await app.prisma.order.update({
        where: { id },
        data: { productionStatus: status },
      });

      // Create status history
      await app.prisma.orderStatusHistory.create({
        data: {
          orderId: id,
          status,
          note,
        },
      });

      return reply.send(order);
    }
  );

  // UPDATE payment status (admin - after Razorpay webhook)
  app.patch(
    '/:id/payment',
    async (request, reply) => {
      await request.jwtVerify();

      const { id } = request.params as { id: string };
      const { paymentStatus, razorpayOrderId, razorpayPaymentId } = request.body as any;

      const order = await app.prisma.order.update({
        where: { id },
        data: {
          paymentStatus,
          razorpayOrderId,
          razorpayPaymentId,
        },
      });

      return reply.send(order);
    }
  );

  // Process refund (admin - Razorpay integration)
  app.post(
    '/:id/refund',
    async (request, reply) => {
      await request.jwtVerify();

      const { id } = request.params as { id: string };
      const { amount, reason } = request.body as any;

      if (!amount) {
        return reply.status(400).send({ message: 'Missing refund amount' });
      }

      const order = await app.prisma.order.findUnique({ where: { id } });
      if (!order) {
        return reply.status(404).send({ message: 'Order not found' });
      }

      // TODO: Call Razorpay refund API
      // For now, just update payment status
      const refundStatus = amount >= order.totalAmount ? 'REFUNDED' : 'PARTIAL_REFUND';

      const updated = await app.prisma.order.update({
        where: { id },
        data: { paymentStatus: refundStatus },
      });

      return reply.send(updated);
    }
  );

  // DELETE order (admin - only if not paid)
  app.delete(
    '/:id',
    async (request, reply) => {
      await request.jwtVerify();

      const { id } = request.params as { id: string };

      const order = await app.prisma.order.findUnique({ where: { id } });
      if (order?.paymentStatus === 'COMPLETED') {
        return reply.status(400).send({ message: 'Cannot delete paid orders' });
      }

      await app.prisma.order.delete({ where: { id } });

      return reply.status(204).send();
    }
  );
}
