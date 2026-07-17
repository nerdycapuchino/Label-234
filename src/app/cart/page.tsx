"use client";

import React from 'react';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const shipping = getTotalPrice() > 5000 ? 0 : 150;
  const total = getTotalPrice() + shipping;

  return (
    <main className="font-sans relative bg-brand-warmWhite min-h-screen">
      <Header />
      
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <h1 className="font-serif text-3xl tracking-[0.1em] mb-10">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-20 border-y border-brand-border">
            <p className="text-brand-charcoal/70 mb-6">Your shopping cart is currently empty.</p>
            <Link href="/collections" className="inline-block bg-brand-charcoal text-white text-[11px] tracking-widest uppercase font-semibold py-4 px-8 hover:bg-black transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="hidden md:grid grid-cols-12 text-[10px] uppercase tracking-widest font-semibold opacity-70 border-b border-brand-border pb-4 mb-6">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
              
              <div className="flex flex-col gap-8">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-brand-border/50 pb-8">
                    {/* Product Details */}
                    <div className="col-span-1 md:col-span-6 flex gap-6">
                      <div className="w-24 h-32 shrink-0 bg-brand-sand">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[9px] uppercase tracking-widest text-brand-charcoal/50 font-semibold mb-1">Fabric</span>
                        <h4 className="font-semibold text-sm mb-2">{item.title}</h4>
                        <p className="text-sm opacity-80 mb-2">₹ {item.price.toLocaleString()} / mtr</p>
                        <button onClick={() => removeItem(item.id)} className="text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 flex items-center gap-1 mt-auto">
                          <X size={12} /> Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Quantity Control */}
                    <div className="col-span-1 md:col-span-3 flex md:justify-center">
                      <div className="flex items-center border border-brand-border">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 opacity-70 hover:opacity-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 text-sm font-medium w-12 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 opacity-70 hover:opacity-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total Price */}
                    <div className="col-span-1 md:col-span-3 text-left md:text-right font-medium">
                      ₹ {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-brand-border p-8 sticky top-24">
                <h3 className="font-serif text-xl mb-6">Order Summary</h3>
                
                <div className="flex flex-col gap-4 text-sm mb-6 border-b border-brand-border pb-6">
                  <div className="flex justify-between">
                    <span className="opacity-70">Subtotal</span>
                    <span className="font-medium">₹ {getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : `₹ ${shipping}`}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-serif text-xl">₹ {total.toLocaleString()}</span>
                </div>
                
                <Link href="/checkout" className="w-full block text-center bg-brand-charcoal text-white text-[11px] tracking-widest uppercase font-semibold py-4 hover:bg-black transition-colors mb-4">
                  Proceed to Checkout
                </Link>
                
                <p className="text-[10px] opacity-60 text-center leading-relaxed">
                  Taxes and shipping calculated at checkout.<br/>
                  Free shipping on orders above ₹5,000.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
