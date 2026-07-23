import { apiRequest } from "./api";

export type ProductionStatus =
  | "ORDER_PLACED"
  | "FABRIC_RESERVED"
  | "CUTTING"
  | "STITCHING"
  | "QUALITY_CHECK"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED"
  | "PARTIAL_REFUND";

export interface OrderItem {
  id: string;
  quantity: number;
  lengthMeters: number;
  pricePerMeter: number;
  totalPrice: number;
  isCustomTailored: boolean;
  product?: { title: string };
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  productionStatus: ProductionStatus;
  customer: { id: string; name: string; email: string };
  items: OrderItem[];
  createdAt: string;
}

export async function getAdminOrders(): Promise<AdminOrder[]> {
  return apiRequest<AdminOrder[]>("/api/orders/admin/all", { auth: true });
}

export async function updateOrderStatus(
  id: string,
  status: ProductionStatus,
  note?: string
): Promise<AdminOrder> {
  return apiRequest<AdminOrder>(`/api/orders/${id}/status`, {
    method: "PATCH",
    body: { status, note },
    auth: true,
  });
}

export async function refundOrder(
  id: string,
  amount: number,
  reason?: string
): Promise<AdminOrder> {
  return apiRequest<AdminOrder>(`/api/orders/${id}/refund`, {
    method: "POST",
    body: { amount, reason },
    auth: true,
  });
}
