import { backendPost, backendGet } from "@/lib/backend";
import type { CartItem } from "@/store/cartStore";

export interface CheckoutContact {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

interface Customer {
  id: string;
  email: string;
  name: string;
}

interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
}

interface PaymentConfig {
  configured: boolean;
  keyId: string | null;
}

export async function getPaymentConfig(): Promise<PaymentConfig> {
  const cfg = await backendGet<PaymentConfig>("/api/payments/config");
  return cfg ?? { configured: false, keyId: null };
}

// Create (or upsert) the customer for this checkout.
export async function createCustomer(
  contact: CheckoutContact
): Promise<Customer | null> {
  return backendPost<Customer>("/api/customers", {
    email: contact.email,
    name: `${contact.firstName} ${contact.lastName}`.trim(),
    phone: contact.phone,
  });
}

// Create the internal order from cart items.
export async function createOrder(
  customerId: string,
  items: CartItem[],
  subtotal: number,
  shippingCost: number
): Promise<Order | null> {
  const orderItems = items.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
    lengthMeters: item.length,
    pricePerMeter: item.price,
    totalPrice: item.price * item.length * item.quantity,
  }));

  return backendPost<Order>("/api/orders", {
    customerId,
    items: orderItems,
    subtotal,
    shippingCost,
    tax: 0,
    totalAmount: subtotal + shippingCost,
  });
}

interface RazorpayOrderResponse {
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export async function createRazorpayOrder(
  orderId: string
): Promise<RazorpayOrderResponse | null> {
  return backendPost<RazorpayOrderResponse>("/api/payments/create-order", {
    orderId,
  });
}

export async function verifyPayment(payload: {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): Promise<{ success: boolean } | null> {
  return backendPost<{ success: boolean }>("/api/payments/verify", payload);
}

// Load the Razorpay checkout script once.
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
