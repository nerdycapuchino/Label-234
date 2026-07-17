import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ShippingPage() {
  return (
    <main className="font-sans relative bg-brand-warmWhite min-h-screen">
      <Header />
      
      <section className="max-w-[800px] mx-auto px-6 md:px-12 py-20">
        <h1 className="font-serif text-3xl md:text-4xl text-center mb-12 tracking-[0.1em]">Shipping & Delivery</h1>
        
        <div className="prose prose-sm md:prose-base prose-neutral mx-auto opacity-80 text-brand-charcoal leading-relaxed">
          <p className="mb-6">
            At Label_234, we ensure that your chosen fabrics reach you safely and swiftly. We partner with reliable courier services for all our shipments.
          </p>
          
          <h3 className="font-serif text-xl mt-8 mb-4">Domestic Shipping</h3>
          <p className="mb-6">
            We offer free shipping on all domestic orders above ₹5,000. For orders below this amount, a standard shipping fee applies. Orders are typically processed and dispatched within 2-3 business days. Delivery within India usually takes 4-7 business days depending on the location.
          </p>

          <h3 className="font-serif text-xl mt-8 mb-4">International Shipping</h3>
          <p className="mb-6">
            We ship globally! International shipping charges are calculated at checkout based on the weight of your order and the destination country. Please note that customs duties and taxes, if applicable in your country, are to be borne by the customer.
          </p>

          <h3 className="font-serif text-xl mt-8 mb-4">Order Tracking</h3>
          <p className="mb-6">
            Once your order is dispatched, you will receive a tracking link via email and SMS. You can use this link to monitor the real-time status of your delivery.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
