"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Message sent successfully! We will get back to you soon.');
    // Normally you would handle form submission here
  };

  return (
    <main className="font-sans relative bg-brand-warmWhite min-h-screen">
      <Header />
      
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <h1 className="font-serif text-3xl md:text-4xl text-center mb-16 tracking-[0.1em]">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-2xl mb-6">Get in Touch</h2>
            <p className="opacity-70 mb-10 text-sm leading-relaxed">
              Have a question about a fabric, an order, or our custom stitching services? We'd love to hear from you. Fill out the form or reach out directly using the information below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 mt-1 opacity-70" />
                <div>
                  <h4 className="font-medium text-sm tracking-widest uppercase mb-1">Visit Boutique</h4>
                  <p className="opacity-70 text-sm leading-relaxed">Label_234<br/>Model Town, Panipat,<br/>Haryana - 132103</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 mt-1 opacity-70" />
                <div>
                  <h4 className="font-medium text-sm tracking-widest uppercase mb-1">Call Us</h4>
                  <p className="opacity-70 text-sm leading-relaxed">+91 98765 43210<br/>Mon-Sat: 10AM - 7PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 mt-1 opacity-70" />
                <div>
                  <h4 className="font-medium text-sm tracking-widest uppercase mb-1">Email Us</h4>
                  <p className="opacity-70 text-sm leading-relaxed">hello@label234.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Name</label>
                  <input type="text" id="name" required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Email</label>
                  <input type="email" id="email" required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal transition-colors" />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Subject</label>
                <input type="text" id="subject" required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal transition-colors" />
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Message</label>
                <textarea id="message" rows={4} required className="w-full border-b border-brand-border bg-transparent pb-2 focus:outline-none focus:border-brand-charcoal transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="bg-brand-charcoal text-white text-[11px] tracking-widest uppercase font-semibold py-4 px-8 self-start hover:bg-black transition-colors mt-4">
                Send Message
              </button>

              {status && <p className="text-sm text-green-700 mt-2 font-medium">{status}</p>}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
