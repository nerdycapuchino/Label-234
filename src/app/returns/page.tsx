import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReturnsPage() {
  return (
    <main className="font-sans relative bg-brand-warmWhite min-h-screen">
      <Header />
      
      <section className="max-w-[800px] mx-auto px-6 md:px-12 py-20">
        <h1 className="font-serif text-3xl md:text-4xl text-center mb-12 tracking-[0.1em]">Returns & Refunds</h1>
        
        <div className="prose prose-sm md:prose-base prose-neutral mx-auto opacity-80 text-brand-charcoal leading-relaxed">
          <p className="mb-6">
            We want you to love the fabrics you purchase from Label_234. If you are not entirely satisfied with your purchase, we're here to help.
          </p>
          
          <h3 className="font-serif text-xl mt-8 mb-4">Eligibility for Returns</h3>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>Returns are accepted within 7 days of delivery.</li>
            <li>Items must be unused, unwashed, and in the exact condition you received them.</li>
            <li>Fabrics must not be cut or altered in any way.</li>
            <li><strong>Note:</strong> Customized orders (Stitch For You) are final sale and cannot be returned or exchanged.</li>
          </ul>

          <h3 className="font-serif text-xl mt-8 mb-4">Refund Process</h3>
          <p className="mb-6">
            Once we receive your returned item, our quality team will inspect it. We will notify you on the status of your refund. If approved, the refund will be initiated to your original method of payment within 5-7 business days.
          </p>

          <h3 className="font-serif text-xl mt-8 mb-4">How to Initiate a Return</h3>
          <p className="mb-6">
            To initiate a return, please contact our support team at returns@label234.com with your order number and reason for return. We will provide you with further instructions on how to send the item back to us.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
