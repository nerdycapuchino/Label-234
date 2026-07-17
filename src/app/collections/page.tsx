"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, ChevronDown, Filter, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CollectionsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const products = [
    { title: "Floral Chikankari Cotton", price: "₹ 1,850", img: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=400&auto=format&fit=crop", category: "Daily Wear" },
    { title: "Pastel Georgette", price: "₹ 2,450", img: "https://images.unsplash.com/photo-1579738202506-6252d4c0627e?q=80&w=400&auto=format&fit=crop", category: "Festive" },
    { title: "Ivory Linen", price: "₹ 1,950", img: "https://images.unsplash.com/photo-1605007530663-99933ee1375d?q=80&w=400&auto=format&fit=crop", category: "Luxury" },
    { title: "Peach Organza", price: "₹ 2,150", img: "https://images.unsplash.com/photo-1596468759714-d843ec29a4de?q=80&w=400&auto=format&fit=crop", category: "Festive" },
    { title: "Lavender Silk", price: "₹ 3,250", img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=400&auto=format&fit=crop", category: "Luxury" },
    { title: "Bottle Green Chiffon", price: "₹ 2,250", img: "https://images.unsplash.com/photo-1596468759714-d843ec29a4de?q=80&w=400&auto=format&fit=crop", category: "Daily Wear" },
    { title: "Midnight Blue Velvet", price: "₹ 4,500", img: "https://images.unsplash.com/photo-1612422656368-232128c7042a?q=80&w=400&auto=format&fit=crop", category: "Luxury" },
    { title: "Crimson Red Silk", price: "₹ 3,800", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400&auto=format&fit=crop", category: "Festive" },
  ];

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <main className="font-sans relative bg-brand-warmWhite min-h-screen">
      {/* Top Banner */}
      <div className="bg-brand-warmWhite border-b border-brand-border text-brand-charcoal px-6 py-2.5 text-[11px] tracking-widest flex flex-col md:flex-row justify-between items-center z-50 relative">
        <div className="flex items-center gap-2 opacity-80 font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Panipat, India
        </div>
        <div className="text-center font-medium opacity-90 tracking-wider">
          One-of-a-kind fabrics. Once sold, never repeated.
        </div>
        <div className="flex items-center gap-2 opacity-80 font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          Free Shipping on orders above ₹5,000
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Hero Banner for Collections */}
      <section className="bg-brand-sand py-20 px-12 text-center border-b border-brand-border">
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-charcoal block mb-4">OUR FABRICS</span>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6">Curated Collections</h2>
        <p className="text-brand-charcoal/70 text-[13px] leading-relaxed max-w-lg mx-auto">Explore our carefully handpicked fabrics. Each piece is unique, bringing you the finest textures and prints directly from Panipat.</p>
      </section>

      {/* Main Content */}
      <section className="max-w-[1920px] mx-auto px-12 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-[240px] shrink-0">
          <div className="flex items-center gap-2 mb-8 text-[11px] tracking-widest uppercase font-semibold border-b border-brand-border pb-4">
            <SlidersHorizontal size={14} /> Filters
          </div>

          <div className="mb-8">
            <h4 className="text-[11px] font-semibold tracking-widest uppercase mb-4 opacity-70">Category</h4>
            <ul className="flex flex-col gap-3 text-[13px] font-medium text-brand-charcoal/80">
              {['All', 'Daily Wear', 'Festive', 'Luxury'].map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveFilter(cat)}
                    className={`hover:text-black transition-colors flex items-center gap-2 ${activeFilter === cat ? 'text-black font-semibold' : ''}`}
                  >
<<<<<<< HEAD
                    <span className={`w-3 h-3 rounded-full border ${activeFilter === cat ? 'border-black bg-brand-sand' : 'border-brand-charcoal/30'}`}></span>
=======
                    <span className={bw-3 h-3 rounded-full border ${activeFilter === cat ? 'border-black bg-brand-sand' : 'border-brand-charcoal/30'}`}></span>
>>>>>>> f346ffc2abfc67dc4113d1a1ea988cdc679e136f
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 text-[11px] font-medium tracking-wide text-brand-charcoal/70">
            <span>Showing {filteredProducts.length} fabrics</span>
            <div className="flex items-center gap-2 cursor-pointer hover:text-black">
              Sort by: Recommended <ChevronDown size={14} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((item, i) => (
              <Link key={i} href="/product" className="group cursor-pointer block">
                <div className="relative aspect-[3/4] bg-brand-sand mb-4 overflow-hidden rounded-sm">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.title} />
                  <button className="absolute top-3 right-3 text-white opacity-80 hover:opacity-100 hover:scale-110 transition-transform">
                    <Heart size={20} strokeWidth={1.5} />
                  </button>
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[10px] tracking-widest uppercase font-semibold block text-center">Quick View</span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-[9px] uppercase tracking-widest text-brand-charcoal/50 font-semibold block mb-1">{item.category}</span>
                  <h4 className="font-semibold text-[13px] mb-1">{item.title}</h4>
                  <p className="text-[12px] text-brand-charcoal/70 mb-3">{item.price} / mtr</p>
                  <div className="flex gap-2 justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#EAC9B5] border border-black/10"></span>
                    <span className="w-3 h-3 rounded-full bg-[#62473D] border border-black/10"></span>
                    <span className="w-3 h-3 rounded-full bg-[#A23D3D] border border-black/10"></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
