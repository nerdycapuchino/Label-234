"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const shipping = getTotalPrice() > 5000 ? 0 : 150;
  const total = getTotalPrice() + shipping;

  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request to backend (Strapi) to create order
    setTimeout(() => {
      clearCart();
      alert('Order Placed Successfully! (Cash on Delivery)');
      setLoading(false);
      router.push('/');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <main className="font-sans relative bg-brand-warmWhite min-h-screen">
        <Header />
        <div className="text-center py-32">
          <p className="mb-4">Your cart is empty.</p>
          <button onClick={() => router.push('/collections')} className="underline">Go Shopping</button>
        </div>
      </main>
    );
  }

  return (
    <main className="font-sans relative bg-brand-warmWhite min-h-screen">
      <Header />
      
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <h1 className="font-serif text-3xl tracking-[0.1em] mb-10 text-center">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-8">
              <div>
                <h3 className="font-serif text-xl mb-4">Contact Information</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Email</label>
                    <input type="email" required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal" />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Phone</label>
                    <input type="tel" required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl mb-4">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">First Name</label>
                    <input type="text" required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Last Name</label>
                    <input type="text" required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Address</label>
                    <input type="text" required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">City</label>
                    <input type="text" required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">PIN Code</label>
                    <input type="text" required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl mb-4">Payment</h3>
                <div className="p-4 border border-brand-border bg-white flex items-center justify-between">
                  <span className="font-medium">Cash on Delivery (COD)</span>
                  <div className="w-4 h-4 rounded-full border-4 border-black"></div>
                </div>
                <p className="text-[10px] opacity-60 mt-2">*Online payments (Razorpay) will be integrated in the next phase.</p>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-charcoal text-white text-[11px] tracking-widest uppercase font-semibold py-5 hover:bg-black transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Place Order (₹ ${total.toLocaleString()})`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white border border-brand-border p-8 sticky top-24">
              <h3 className="font-serif text-xl mb-6">In Your Cart</h3>
              
              <div className="flex flex-col gap-6 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 shrink-0 bg-brand-sand relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-charcoal text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-xs mb-1">{item.title}</h4>
                      <p className="text-xs opacity-70">₹ {item.price.toLocaleString()} / mtr</p>
                    </div>
                    <div className="font-medium text-sm">
                      ₹ {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-border pt-6 flex flex-col gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Subtotal</span>
                  <span className="font-medium">₹ {getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `₹ ${shipping}`}</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-brand-border">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-serif text-xl">₹ {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
