"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, ChevronDown, Plus, Minus, Maximize2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetail() {
  const [length, setLength] = useState(2.5);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: 'prod_1',
      title: 'Pastel Chikankari Cotton',
      price: 2450,
      image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1200&auto=format&fit=crop',
      quantity: 1,
      length: length,
    });
    alert('Added to Cart!');
  };

  return (
    <main className="font-sans relative bg-brand-warmWhite">
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

      {/* Main PDP Content */}
      <div className="max-w-[1920px] mx-auto">
        <div className="px-12 py-5 text-[11px] text-brand-textMuted font-medium tracking-wide flex gap-2">
          <Link href="/" className="hover:text-brand-charcoal transition-colors">Home</Link> /
          <a href="#" className="hover:text-brand-charcoal transition-colors">Collections</a> /
          <a href="#" className="hover:text-brand-charcoal transition-colors">Festive</a> /
          <span className="text-brand-charcoal">Pastel Chikankari Cotton</span>
        </div>

        <section className="px-12 pb-16 flex flex-col lg:flex-row gap-16">
          {/* Left: Image Gallery (55%) */}
          <div className="lg:w-[55%] flex gap-4 h-[75vh]">
            {/* Vertical Thumbnails */}
            <div className="flex flex-col gap-3 w-[80px] shrink-0 h-full overflow-y-auto hide-scrollbar relative">
              <button className="border border-brand-charcoal/30 rounded-sm overflow-hidden p-0.5">
                <img src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=200&auto=format&fit=crop"
                  alt="Thumbnail 1" className="w-full h-[100px] object-cover rounded-sm" />
              </button>
              <button className="border border-transparent hover:border-brand-border rounded-sm overflow-hidden p-0.5 transition-colors">
                <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=200&auto=format&fit=crop"
                  alt="Thumbnail 2" className="w-full h-[100px] object-cover rounded-sm opacity-70 hover:opacity-100 transition-opacity" />
              </button>
              <button className="border border-transparent hover:border-brand-border rounded-sm overflow-hidden p-0.5 transition-colors">
                <img src="https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=200&auto=format&fit=crop"
                  alt="Thumbnail 3" className="w-full h-[100px] object-cover rounded-sm opacity-70 hover:opacity-100 transition-opacity" />
              </button>
              <button className="border border-transparent hover:border-brand-border rounded-sm overflow-hidden p-0.5 transition-colors">
                <img src="https://images.unsplash.com/photo-1620799140733-1f3ebce82766?q=80&w=200&auto=format&fit=crop"
                  alt="Thumbnail 4" className="w-full h-[100px] object-cover rounded-sm opacity-70 hover:opacity-100 transition-opacity" />
              </button>
              <button className="border border-transparent hover:border-brand-border rounded-sm overflow-hidden p-0.5 transition-colors">
                <img src="https://images.unsplash.com/photo-1579738202506-6252d4c0627e?q=80&w=200&auto=format&fit=crop"
                  alt="Thumbnail 5" className="w-full h-[100px] object-cover rounded-sm opacity-70 hover:opacity-100 transition-opacity" />
              </button>
              <div className="flex justify-center mt-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                <ChevronDown size={20} />
              </div>
            </div>

            {/* Main Featured Image */}
            <div className="flex-1 relative rounded-sm overflow-hidden bg-brand-ivory cursor-crosshair group">
              <img src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1200&auto=format&fit=crop"
                alt="Pastel Chikankari Cotton Fabric" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                <Maximize2 size={18} strokeWidth={1.2} className="icon-stroke" />
              </button>
            </div>
          </div>

          {/* Right: Product Information (45%) */}
          <div className="lg:w-[45%] flex flex-col pt-4 pr-12">
            {/* Tags */}
            <div className="flex items-center gap-3 text-[10px] font-semibold tracking-widest uppercase mb-4 text-brand-charcoal">
              <span className="text-[#A25E54]">LIMITED EDITION</span>
              <span className="w-1 h-1 rounded-full bg-brand-border"></span>
              <span>ONLY 1 PIECE LEFT</span>
            </div>

            {/* Title & Wishlist */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="font-serif text-4xl text-brand-charcoal leading-tight">Pastel Chikankari Cotton</h1>
              <button className="mt-2 text-brand-charcoal hover:opacity-70 transition-opacity">
                <Heart size={24} strokeWidth={1.2} className="icon-stroke" />
              </button>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-2xl font-medium tracking-wide">₹ 2,450 <span className="text-base text-brand-textMuted font-normal">/ mtr</span></div>
              <div className="text-[11px] text-brand-textMuted mt-1">Inclusive of all taxes</div>
            </div>

            {/* Short Desc */}
            <p className="text-[13.5px] leading-relaxed text-brand-charcoal/80 mb-8 max-w-[85%]">
              Hand-embroidered chikankari on breathable cotton. Lightweight, luxurious, and crafted for comfort.
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-[120px_10px_1fr] gap-y-2 text-[13px] mb-8 text-brand-charcoal/90">
              <div className="font-medium">Fabric Type</div><div>:</div><div>Cotton</div>
              <div className="font-medium">Work</div><div>:</div><div>Chikankari</div>
              <div className="font-medium">Width</div><div>:</div><div>44 inches</div>
              <div className="font-medium">Care</div><div>:</div><div>Dry Clean / Gentle Wash</div>
            </div>

            {/* Colour Selection */}
            <div className="mb-8 flex items-center gap-4">
              <span className="text-[13px] font-medium">Colour: <span className="font-normal text-brand-textMuted ml-1">Sand Blossom</span></span>
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 rounded-full bg-[#EACDB8] border border-black/10 outline outline-1 outline-offset-2 outline-brand-charcoal"></button>
                <button className="w-6 h-6 rounded-full bg-[#E5A8A0] border border-black/10 hover:scale-110 transition-transform"></button>
                <button className="w-6 h-6 rounded-full bg-[#C8D3C4] border border-black/10 hover:scale-110 transition-transform"></button>
                <button className="w-6 h-6 rounded-full bg-[#9DA8AE] border border-black/10 hover:scale-110 transition-transform"></button>
                <button className="w-6 h-6 rounded-full bg-[#242A36] border border-black/10 hover:scale-110 transition-transform"></button>
                <button className="w-6 h-6 rounded-full border border-brand-border text-[10px] font-medium flex items-center justify-center text-brand-textMuted hover:border-brand-charcoal transition-colors">+3</button>
              </div>
            </div>

            {/* Length Input & Total */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-[13px] font-medium">Length (in metres)</span>
              <div className="flex items-center border border-brand-border rounded-sm h-10">
                <button 
                  onClick={() => setLength(l => Math.max(0.5, l - 0.5))}
                  className="w-10 h-full flex items-center justify-center hover:bg-brand-ivory transition-colors text-lg"
                >
                  <Minus size={14} />
                </button>
                <input type="text" value={length} readOnly
                  className="w-12 h-full text-center text-[13px] font-medium border-x border-brand-border bg-transparent outline-none" />
                <button 
                  onClick={() => setLength(l => l + 0.5)}
                  className="w-10 h-full flex items-center justify-center hover:bg-brand-ivory transition-colors text-lg"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-[14px] font-semibold">Total: ₹ {(length * 2450).toLocaleString()}</span>
            </div>

            {/* Actions: Side-by-side Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                onClick={handleAddToCart}
                className="bg-brand-softBlack text-white py-4 text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-black transition-colors active:scale-95"
              >
                ADD TO BAG
              </button>
              <button className="bg-white border border-brand-charcoal text-brand-charcoal py-4 text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-brand-ivory transition-colors active:scale-95">
                STITCH THIS FABRIC
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-border text-[11px] font-medium text-brand-charcoal/80">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                Free Shipping above ₹5,000
              </div>
              <div className="w-[1px] h-4 bg-brand-border"></div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Easy Returns
              </div>
              <div className="w-[1px] h-4 bg-brand-border"></div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Secure Payment
              </div>
            </div>
          </div>
        </section>

        {/* You May Also Love (Truncated for brevity, mimicking the structure) */}
        <section className="px-12 pb-24 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[12px] tracking-[0.1em] uppercase font-semibold text-brand-charcoal">YOU MAY ALSO LOVE</h3>
            <a href="#" className="text-[11px] tracking-widest uppercase font-medium flex items-center gap-2 hover:opacity-70 transition-opacity">
              VIEW ALL <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>

          <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x pb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[280px] w-[280px] snap-start group cursor-pointer">
                <div className="relative aspect-[3/2] bg-brand-sand mb-4 overflow-hidden rounded-sm">
                  <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Product" />
                  <button className="absolute top-3 right-3 text-white hover:text-red-400 transition-colors">
                    <Heart size={20} />
                  </button>
                </div>
                <h4 className="font-medium text-[13px] mb-1">Ivory Chikankari Cotton</h4>
                <p className="text-[12px] text-brand-charcoal/80">₹ 2,350 / mtr</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
