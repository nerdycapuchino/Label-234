import { FastifyInstance } from 'fastify';
import {
  getRazorpay,
  isRazorpayConfigured,
  verifyPaymentSignature,
} from '../services/razorpay.js';

export default async function paymentRoutes(app: FastifyInstance) {
  // Public config: tells the storefront the key id + whether payments are on.
  app.get('/config', async (_request, reply) => {
    return reply.send({
      configured: isRazorpayConfigured(),
      keyId: process.env.RAZORPAY_KEY_ID || null,
    });
  });

  // Create a Razorpay order for an existing internal order (public - checkout).
  app.post('/create-order', async (request, reply) => {
    const { orderId } = request.body as { orderId?: string };
    if (!orderId) {
      return reply.status(400).send({ message: 'Missing orderId' });
    }

    const order = await app.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return reply.status(404).send({ message: 'Order not found' });
    }

    const razorpay = getRazorpay();
    if (!razorpay) {
      return reply
        .status(503)
        .send({ message: 'Payments are not configured on the server.' });
    }

    const rzpOrder = await razorpay.orders.create({
      amount: Math.round(order.totalAmount * 100), // paise
      currency: 'INR',
      receipt: order.orderNumber,
      notes: { internalOrderId: order.id },
    });

    await app.prisma.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: rzpOrder.id, paymentMethod: 'razorpay' },
    });

    return reply.send({
      razorpayOrderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  });

  // Verify payment after Razorpay checkout completes (public - checkout).
  app.post('/verify', async (request, reply) => {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderId,
    } = request.body as {
      razorpayOrderId?: string;
      razorpayPaymentId?: string;
      razorpaySignature?: string;
      orderId?: string;
    };

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !orderId) {
      return reply.status(400).send({ message: 'Missing verification fields' });
    }

    const valid = verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!valid) {
      await app.prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'FAILED' },
      });
      return reply.status(400).send({ message: 'Invalid payment signature' });
    }

    const order = await app.prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'COMPLETED',
        razorpayPaymentId,
        productionStatus: 'ORDER_PLACED',
      },
    });

    return reply.send({ success: true, order });
  });

  // Process a refund (admin) via Razorpay.
  app.post('/refund', async (request, reply) => {
    await request.jwtVerify();

    const { orderId, amount, reason } = request.body as {
      orderId?: string;
      amount?: number;
      reason?: string;
    };

    if (!orderId || !amount) {
      return reply.status(400).send({ message: 'Missing orderId or amount' });
    }

    const order = await app.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return reply.status(404).send({ message: 'Order not found' });
    }
    if (!order.razorpayPaymentId) {
      return reply
        .status(400)
        .send({ message: 'Order has no Razorpay payment to refund' });
    }

    const razorpay = getRazorpay();
    if (!razorpay) {
      return reply
        .status(503)
        .send({ message: 'Payments are not configured on the server.' });
    }

    await razorpay.payments.refund(order.razorpayPaymentId, {
      amount: Math.round(amount * 100),
      notes: { reason: reason || 'Refund issued by admin' },
    });

    const refundStatus =
      amount >= order.totalAmount ? 'REFUNDED' : 'PARTIAL_REFUND';

    const updated = await app.prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: refundStatus },
    });

    return reply.send({ success: true, order: updated });
  });
}
