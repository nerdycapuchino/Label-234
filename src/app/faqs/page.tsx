"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqs = [
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide! International shipping charges are calculated at checkout based on the destination."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 7 days of delivery for unstitched fabrics. Customized or stitched orders cannot be returned."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you will receive an email with the tracking details."
  },
  {
    question: "Do you offer custom stitching?",
    answer: "Yes, we offer bespoke stitching services. Please visit our 'Stitch For You' section for more details."
  }
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="font-sans relative bg-brand-warmWhite min-h-screen">
      <Header />
      
      <section className="max-w-[800px] mx-auto px-6 md:px-12 py-20">
        <h1 className="font-serif text-3xl md:text-4xl text-center mb-12 tracking-[0.1em]">Frequently Asked Questions</h1>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-brand-border pb-4">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left flex justify-between items-center py-4 text-brand-charcoal hover:opacity-80 transition-opacity"
              >
                <span className="font-medium tracking-wide text-sm">{faq.question}</span>
                <span className="text-xl leading-none">{openIndex === index ? '-' : '+'}</span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-sm opacity-70 leading-relaxed pb-4 pr-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
