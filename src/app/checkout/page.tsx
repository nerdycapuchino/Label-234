"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import {
  getPaymentConfig,
  createCustomer,
  createOrder,
  createRazorpayOrder,
  verifyPayment,
  loadRazorpayScript,
  type CheckoutContact,
} from "@/lib/checkout";

const EMPTY: CheckoutContact = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  postalCode: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<CheckoutContact>(EMPTY);
  const [paymentsOn, setPaymentsOn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getPaymentConfig().then((c) => setPaymentsOn(c.configured));
  }, []);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  function update(field: keyof CheckoutContact, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate(): string | null {
    if (items.length === 0) return "Your cart is empty.";
    if (!form.email || !form.phone) return "Email and phone are required.";
    if (!form.firstName || !form.lastName) return "Name is required.";
    if (!form.address || !form.city || !form.postalCode)
      return "Full shipping address is required.";
    return null;
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const customer = await createCustomer(form);
      if (!customer) throw new Error("Could not save customer details.");

      const order = await createOrder(customer.id, items, subtotal, shipping);
      if (!order) throw new Error("Could not create your order.");

      // No payment gateway configured → place as pending and confirm.
      if (!paymentsOn) {
        clearCart();
        router.push(`/order-confirmation?order=${order.orderNumber}`);
        return;
      }

      // Razorpay flow.
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Could not load payment gateway.");

      const rzp = await createRazorpayOrder(order.id);
      if (!rzp) throw new Error("Could not start payment.");

      const options = {
        key: rzp.keyId,
        amount: rzp.amount,
        currency: rzp.currency,
        name: "Label 234",
        description: `Order ${order.orderNumber}`,
        order_id: rzp.razorpayOrderId,
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#1a1a1a" },
        handler: async (response: any) => {
          const result = await verifyPayment({
            orderId: order.id,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          if (result?.success) {
            clearCart();
            router.push(`/order-confirmation?order=${order.orderNumber}`);
          } else {
            setError("Payment could not be verified. Please contact support.");
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent";

  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />

      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <h1 className="font-serif text-4xl mb-8 border-b border-brand-border pb-6">Checkout</h1>

        {mounted && items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-brand-charcoal/70 mb-6">Your cart is empty.</p>
            <a
              href="/collections"
              className="inline-block bg-brand-softBlack text-white py-3 px-8 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12">
            {/* Left: Forms */}
            <div className="flex flex-col gap-10">
              <section>
                <h2 className="text-[13px] font-bold uppercase tracking-widest mb-6">1. Contact Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <input type="email" placeholder="Email Address" className={inputClass}
                    value={form.email} onChange={(e) => update("email", e.target.value)} required />
                  <input type="tel" placeholder="Phone Number" className={inputClass}
                    value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                </div>
              </section>

              <section>
                <h2 className="text-[13px] font-bold uppercase tracking-widest mb-6">2. Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className={inputClass}
                    value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                  <input type="text" placeholder="Last Name" className={inputClass}
                    value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                  <input type="text" placeholder="Address" className={`col-span-2 ${inputClass}`}
                    value={form.address} onChange={(e) => update("address", e.target.value)} required />
                  <input type="text" placeholder="City" className={inputClass}
                    value={form.city} onChange={(e) => update("city", e.target.value)} required />
                  <input type="text" placeholder="Postal Code" className={inputClass}
                    value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} required />
                </div>
              </section>

              <section>
                <h2 className="text-[13px] font-bold uppercase tracking-widest mb-6">3. Payment</h2>
                <div className="border border-brand-border p-6 text-center text-[13px] text-brand-charcoal/80 bg-brand-ivory">
                  {paymentsOn
                    ? "You will complete payment securely via Razorpay."
                    : "Payment on confirmation. Our team will contact you to finalise payment."}
                </div>
              </section>
            </div>

            {/* Right: Summary */}
            <div className="bg-brand-ivory border border-brand-border p-8 h-fit">
              <h2 className="text-[13px] font-bold uppercase tracking-widest mb-6">Order Summary</h2>

              <div className="flex flex-col gap-4 border-b border-brand-border pb-6 mb-6">
                {mounted && items.map((item) => (
                  <div key={item.id} className="flex justify-between text-[13px]">
                    <span className="text-brand-charcoal/80">
                      {item.title} · {item.length}m × {item.quantity}
                    </span>
                    <span>₹ {(item.price * item.length * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 text-[13px] mb-6 border-b border-brand-border pb-6">
                <div className="flex justify-between">
                  <span className="text-brand-charcoal/80">Subtotal</span>
                  <span>₹ {subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-charcoal/80">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹ ${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-xl">Total</span>
                <span className="font-serif text-xl">₹ {total.toLocaleString("en-IN")}</span>
              </div>

              {error && (
                <p className="text-[12px] text-red-600 mb-4 border border-red-200 bg-red-50 p-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-softBlack text-white py-4 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-50"
              >
                {submitting
                  ? "Processing…"
                  : paymentsOn
                  ? "Pay & Place Order"
                  : "Place Order"}
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </main>
  );
}
