"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, User, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Basic fade in for Hero elements
    gsap.from('.hero-elem', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.5
    });

    // Parallax image
    gsap.to('.hero-bg', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <main ref={container} className="font-sans relative bg-brand-warmWhite">
      {/* Top Banner */}
      <div className="bg-brand-softBlack text-white px-6 py-2.5 text-[11px] tracking-widest flex flex-col md:flex-row justify-between items-center z-50 relative">
        <div className="flex items-center gap-2 opacity-80">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Panipat, India
        </div>
        <div className="text-center font-medium opacity-90 tracking-wider">
          One-of-a-kind fabrics. Once sold, never repeated.
        </div>
        <div className="flex items-center gap-2 opacity-80">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          Free Shipping on orders above ₹5,000
        </div>
      </div>

      {/* Transparent Header Over Hero */}
      <Header variant="transparent" />

      {/* Hero Section */}
      <section className="relative h-[95vh] w-full flex items-center overflow-hidden bg-black">
        <img src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=2000&auto=format&fit=crop"
          alt="Floral pattern fabric" className="hero-bg absolute inset-0 w-full object-cover" style={{ height: "120%", top: "-10%" }} />
        
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 text-white px-12 md:px-24 max-w-4xl pt-20">
          <span className="hero-elem block text-[11px] tracking-[0.2em] uppercase mb-4 opacity-90 font-medium">One Fabric. One Owner.</span>
          <h2 className="hero-elem font-serif text-6xl md:text-8xl leading-[1.1] mb-6 tracking-wide">
            Every Fabric<br/>Has One Owner.
          </h2>
          <p className="hero-elem font-sans text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-light">
            Curated in Panipat.<br/>Never Restocked.
          </p>

          <div className="hero-elem flex flex-col sm:flex-row gap-8 items-start sm:items-center">
            <Link href="/product" className="border border-white/50 px-8 py-3.5 text-xs tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-3">
              Explore Collection
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Pillars Features Section */}
      <section className="bg-brand-warmWhite border-b border-brand-border py-12 px-6">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-brand-border">
          <div className="flex items-center justify-center gap-6 p-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-80">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <div className="text-left">
              <h3 className="font-semibold text-[13px] mb-1">No Repeats</h3>
              <p className="text-[12px] text-brand-charcoal/60 leading-snug">Once sold,<br/>it's gone forever.</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 p-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-80">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            <div className="text-left">
              <h3 className="font-semibold text-[13px] mb-1">Premium Quality</h3>
              <p className="text-[12px] text-brand-charcoal/60 leading-snug">Handpicked fabrics,<br/>quality you can feel.</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 p-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-80">
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
              <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
              <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
            </svg>
            <div className="text-left">
              <h3 className="font-semibold text-[13px] mb-1">Custom Stitching</h3>
              <p className="text-[12px] text-brand-charcoal/60 leading-snug">Made to your<br/>measurements.</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 p-4">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-80">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <div className="text-left">
              <h3 className="font-semibold text-[13px] mb-1">Worldwide Delivery</h3>
              <p className="text-[12px] text-brand-charcoal/60 leading-snug">Delivered to your<br/>doorstep with care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Collections Slider */}
      <section className="py-24 px-12 max-w-[1920px] mx-auto border-b border-brand-border">
        <div className="flex flex-col lg:flex-row gap-8 items-end lg:items-center">
          <div className="min-w-[280px] w-[280px] pr-8 pb-8">
            <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-brand-charcoal block mb-4">EXPLORE COLLECTIONS</span>
            <h2 className="font-serif text-4xl leading-[1.1] mb-6">Find Your<br/>Perfect Fabric</h2>
            <p className="text-brand-charcoal/70 text-[13px] leading-relaxed mb-8">Curated collections for every<br/>day, every occasion, every you.</p>
            <a href="#" className="arrow-link inline-flex items-center gap-2 border-b border-brand-charcoal pb-0.5 text-xs uppercase tracking-widest font-semibold hover:opacity-70 transition-opacity">
              VIEW ALL COLLECTIONS 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>

          <div className="flex-1 flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x">
            {[
              { title: "Daily Wear", sub: "Effortless. Light. Beautiful.", img: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop" },
              { title: "Festive & Occasion", sub: "Make every moment yours.", img: "https://images.unsplash.com/photo-1605007530663-99933ee1375d?q=80&w=600&auto=format&fit=crop" },
              { title: "Luxury Edit", sub: "Timeless. Exclusive. You.", img: "https://images.unsplash.com/photo-1596468759714-d843ec29a4de?q=80&w=600&auto=format&fit=crop" },
              { title: "New Arrivals", sub: "Fresh. Unique. Handpicked.", img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop" }
            ].map((item, i) => (
              <a key={i} href="#" className="group snap-start relative min-w-[300px] h-[380px] rounded-sm overflow-hidden block flex-shrink-0">
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white w-full pr-12">
                  <h3 className="font-serif text-2xl mb-1">{item.title}</h3>
                  <p className="text-xs opacity-90 font-light mb-4">{item.sub}</p>
                  <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 px-12 max-w-[1920px] mx-auto bg-brand-warmWhite">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-[11px] tracking-[0.15em] uppercase font-semibold text-brand-charcoal">OUR BEST SELLERS</h3>
        </div>

        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x">
          {[
            { title: "Floral Chikankari Cotton", price: "₹ 1,850", img: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=400&auto=format&fit=crop" },
            { title: "Pastel Georgette", price: "₹ 2,450", img: "https://images.unsplash.com/photo-1579738202506-6252d4c0627e?q=80&w=400&auto=format&fit=crop" },
            { title: "Ivory Linen", price: "₹ 1,950", img: "https://images.unsplash.com/photo-1605007530663-99933ee1375d?q=80&w=400&auto=format&fit=crop" },
            { title: "Peach Organza", price: "₹ 2,150", img: "https://images.unsplash.com/photo-1596468759714-d843ec29a4de?q=80&w=400&auto=format&fit=crop" },
          ].map((item, i) => (
            <Link key={i} href="/product" className="min-w-[260px] snap-start cursor-pointer group">
              <div className="relative h-[260px] bg-brand-sand mb-4 overflow-hidden rounded-sm">
                <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.title} />
                <button className="absolute top-3 right-3 text-white opacity-80 hover:opacity-100">
                  <Heart size={20} strokeWidth={1.5} />
                </button>
              </div>
              <h4 className="font-semibold text-[13px] mb-1">{item.title}</h4>
              <p className="text-[12px] text-brand-charcoal/70 mb-3">{item.price} / mtr</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stitch For You */}
      <section className="flex flex-col lg:flex-row max-w-[1920px] mx-auto border-y border-brand-border">
        <div className="lg:w-1/3 h-[40vh] lg:h-auto relative">
          <img src="https://images.unsplash.com/photo-1612422656368-232128c7042a?q=80&w=1000&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover grayscale" alt="Artisan hands stitching fabric" />
        </div>

        <div className="lg:w-2/3 bg-brand-warmWhite p-16 lg:p-24 flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-charcoal block mb-4">STITCH FOR YOU</span>
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.1] mb-6">From Fabric to<br/>Your Perfect Fit</h2>
            <p className="text-brand-charcoal/70 text-[13px] mb-10 leading-relaxed max-w-sm">Choose your fabric, share your measurements, and we'll take care of the rest.</p>
            <button className="bg-brand-softBlack text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-black transition-colors active:scale-95">
              START YOUR CUSTOM ORDER
            </button>
          </div>

          <div className="md:w-1/2 flex flex-col gap-10">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border border-brand-border flex items-center justify-center shrink-0">
                <span className="font-serif text-xl">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Choose Your Fabric</h4>
                <p className="text-xs text-brand-charcoal/60">Pick from our exclusive collection</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border border-brand-border flex items-center justify-center shrink-0">
                <span className="font-serif text-xl">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Share Measurements</h4>
                <p className="text-xs text-brand-charcoal/60">We ensure the perfect fit</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full border border-brand-border flex items-center justify-center shrink-0">
                <span className="font-serif text-xl">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">We Stitch & Deliver</h4>
                <p className="text-xs text-brand-charcoal/60">Delivered to your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-brand-ivory border-b border-brand-border">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row">
          <div className="lg:w-1/3 p-16 lg:p-20 flex flex-col justify-center">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-charcoal block mb-4">OUR STORY</span>
            <h2 className="font-serif text-4xl leading-[1.1] mb-6">Crafted with Care.<br/>Curated for You.</h2>
            <p className="text-brand-charcoal/70 text-[13px] leading-relaxed mb-8">At Label_234, every fabric is handpicked in Panipat with a simple belief—every woman deserves a fabric as unique as she is. We handpick each fabric in limited quantities, so what you choose is truly yours.</p>
            <a href="#" className="arrow-link w-max text-[11px] font-semibold tracking-widest inline-flex items-center gap-2 border-b border-brand-charcoal pb-0.5 hover:opacity-70 transition-opacity">
              KNOW MORE ABOUT US 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div className="lg:w-5/12 flex items-center justify-around p-12 border-y lg:border-y-0 lg:border-x border-brand-border">
            <div className="flex flex-col items-center text-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-60">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span className="font-serif text-4xl">1000+</span>
              <span className="text-[11px] font-medium text-brand-charcoal/60">Unique Fabrics</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-60">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="font-serif text-4xl">5000+</span>
              <span className="text-[11px] font-medium text-brand-charcoal/60">Happy Customers</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-60">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
              </svg>
              <span className="font-serif text-4xl">5+</span>
              <span className="text-[11px] font-medium text-brand-charcoal/60">Years of Trust</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-60">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span className="font-serif text-4xl">1</span>
              <span className="text-[11px] font-medium text-brand-charcoal/60">Boutique in Panipat</span>
            </div>
          </div>

          <div className="lg:w-1/4 h-[40vh] lg:h-auto relative">
            <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Boutique Interior" />
          </div>
        </div>
      </section>

      {/* Loved by Real Women */}
      <section className="py-24 bg-brand-warmWhite border-b border-brand-border text-center relative overflow-hidden">
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-charcoal block mb-3">LOVED BY REAL WOMEN</span>
        <h2 className="font-serif text-4xl mb-14">Real Stories. Real Happiness.</h2>
        
        <a href="#" className="absolute right-12 top-24 arrow-link hidden md:flex text-[11px] font-semibold tracking-widest items-center gap-2 border-b border-brand-charcoal pb-0.5 hover:opacity-70 transition-opacity">
          VIEW ALL REVIEWS 
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>

        <div className="max-w-[1920px] mx-auto px-12 relative flex items-center">
          <button className="w-10 h-10 bg-transparent rounded-full border border-brand-border flex shrink-0 items-center justify-center hover:bg-brand-sand transition-colors mr-6">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x w-full">
            <div className="min-w-[480px] bg-brand-ivory rounded-sm p-5 flex items-stretch gap-6 text-left snap-center">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop" className="w-32 object-cover shrink-0" alt="Customer" />
              <div className="flex flex-col justify-center">
                <span className="text-3xl font-serif text-brand-charcoal/30 leading-none block">"</span>
                <p className="text-[13px] font-medium leading-relaxed mb-4">The fabric is beyond beautiful. You can feel the quality the moment you touch it. Truly one-of-a-kind!</p>
                <p className="text-[11px] font-semibold text-brand-charcoal mb-1">— Neha S.</p>
                <div className="flex text-brand-charcoal text-[10px]">★★★★★</div>
              </div>
            </div>

            <div className="min-w-[480px] bg-brand-ivory rounded-sm p-5 flex items-stretch gap-6 text-left snap-center">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop" className="w-32 object-cover shrink-0" alt="Customer" />
              <div className="flex flex-col justify-center">
                <span className="text-3xl font-serif text-brand-charcoal/30 leading-none block">"</span>
                <p className="text-[13px] font-medium leading-relaxed mb-4">Got my outfit stitched and it fits like a dream. The team is so helpful and the service is amazing.</p>
                <p className="text-[11px] font-semibold text-brand-charcoal mb-1">— Priyanka M.</p>
                <div className="flex text-brand-charcoal text-[10px]">★★★★★</div>
              </div>
            </div>

            <div className="min-w-[480px] bg-brand-ivory rounded-sm p-5 flex items-stretch gap-6 text-left snap-center">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop" className="w-32 object-cover shrink-0" alt="Customer" />
              <div className="flex flex-col justify-center">
                <span className="text-3xl font-serif text-brand-charcoal/30 leading-none block">"</span>
                <p className="text-[13px] font-medium leading-relaxed mb-4">Finally a brand that offers exclusive fabrics and personalized stitching. Absolutely in love!</p>
                <p className="text-[11px] font-semibold text-brand-charcoal mb-1">— Anjali K.</p>
                <div className="flex text-brand-charcoal text-[10px]">★★★★★</div>
              </div>
            </div>
          </div>

          <button className="w-10 h-10 bg-transparent rounded-full border border-brand-border flex shrink-0 items-center justify-center hover:bg-brand-sand transition-colors ml-6">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </section>

      {/* From Our Instagram */}
      <section className="py-16 bg-brand-warmWhite border-b border-brand-border">
        <div className="max-w-[1920px] mx-auto px-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[11px] tracking-[0.15em] uppercase font-semibold text-brand-charcoal">FROM OUR INSTAGRAM</h3>
            <h2 className="font-serif text-2xl font-medium">@label_234</h2>
            <a href="#" className="arrow-link hidden md:flex text-[11px] font-semibold tracking-widest items-center gap-2 border-b border-brand-charcoal pb-0.5 hover:opacity-70 transition-opacity">
              FOLLOW US 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <a href="#" className="block aspect-[4/3] rounded-sm overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1583391733958-65e28228d411?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Instagram Post" />
            </a>
            <a href="#" className="block aspect-[4/3] rounded-sm overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1596468759714-d843ec29a4de?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Instagram Post" />
            </a>
            <a href="#" className="block aspect-[4/3] rounded-sm overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Instagram Post" />
            </a>
            <a href="#" className="block aspect-[4/3] rounded-sm overflow-hidden group hidden md:block">
              <img src="https://images.unsplash.com/photo-1605007530663-99933ee1375d?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Instagram Post" />
            </a>
            <a href="#" className="block aspect-[4/3] rounded-sm overflow-hidden group hidden md:block">
              <img src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Instagram Post" />
            </a>
            <a href="#" className="block aspect-[4/3] rounded-sm bg-[#EBE7DF] flex flex-col items-center justify-center text-center p-4 hover:bg-brand-sand transition-colors group">
              <span className="text-[12px] font-medium mb-3">View More<br/>on Instagram</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-70 group-hover:opacity-100 transition-opacity">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
