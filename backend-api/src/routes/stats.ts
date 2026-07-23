import { FastifyInstance } from 'fastify';

export default async function statsRoutes(app: FastifyInstance) {
  // Dashboard aggregate stats (admin)
  app.get('/dashboard', async (request, reply) => {
    await request.jwtVerify();

    const [
      paidOrders,
      activeOrders,
      reservedFabrics,
      totalProducts,
      totalCustomers,
      recentOrders,
    ] = await Promise.all([
      // Revenue = sum of totalAmount for COMPLETED payments
      app.prisma.order.findMany({
        where: { paymentStatus: 'COMPLETED' },
        select: { totalAmount: true },
      }),
      // Active orders = not delivered/cancelled
      app.prisma.order.count({
        where: {
          productionStatus: {
            notIn: ['DELIVERED', 'CANCELLED'],
          },
        },
      }),
      // Fabric rolls currently reserved
      app.prisma.fabric.count({ where: { status: 'RESERVED' } }),
      app.prisma.product.count({ where: { isActive: true } }),
      app.prisma.customer.count(),
      app.prisma.order.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: { select: { name: true, email: true } },
          items: { select: { product: { select: { title: true } } } },
        },
      }),
    ]);

    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    return reply.send({
      totalRevenue,
      paidOrderCount: paidOrders.length,
      activeOrders,
      reservedFabrics,
      totalProducts,
      totalCustomers,
      recentOrders: recentOrders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        customerName: o.customer.name,
        totalAmount: o.totalAmount,
        productionStatus: o.productionStatus,
        paymentStatus: o.paymentStatus,
        firstItem: o.items[0]?.product?.title ?? null,
        createdAt: o.createdAt,
      })),
    });
  });
}
