import crypto from 'crypto';
import Razorpay from 'razorpay';

// Razorpay is optional at boot. If keys are missing the payment endpoints
// return a clear error instead of crashing the server.

let client: Razorpay | null = null;

export function getRazorpay(): Razorpay | null {
  if (client) return client;
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret || key_id === 'REPLACE_ME') {
    return null;
  }
  client = new Razorpay({ key_id, key_secret });
  return client;
}

export function isRazorpayConfigured(): boolean {
  return getRazorpay() !== null;
}

// Verify a Razorpay payment signature (HMAC SHA256 of order_id|payment_id).
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  // timing-safe compare
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// Verify a Razorpay webhook signature.
export function verifyWebhookSignature(
  body: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
