"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Heart, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface HeaderProps {
  variant?: 'transparent' | 'solid' | 'dark';
}

export default function Header({ variant = 'solid' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const cartItemsCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
  useEffect(() => {
    if (variant !== 'transparent') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  // Determine actual styles based on scroll state & variant
  const isTransparent = variant === 'transparent' && !isScrolled;
  
  const headerClasses = isTransparent
    ? 'bg-transparent text-white py-6 absolute top-[40px] left-0 w-full' // 40px accounts for top banner
    : 'bg-white border-b border-brand-border text-brand-charcoal py-4 sticky top-0 shadow-sm';

  return (
    <>
      <header className={`w-full px-6 md:px-12 z-40 transition-all duration-300 ${headerClasses}`}>
        <div className="max-w-[1920px] mx-auto flex items-center justify-between">
          
          {/* Mobile Hamburger */}
          <button 
            className="md:hidden flex items-center justify-center p-2 -ml-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          {/* Left Nav (Desktop) */}
          <nav className="hidden md:flex gap-10 text-[11px] tracking-[0.15em] font-medium items-center w-1/3">
            <Link href="/" className={`opacity-80 hover:opacity-100 ${pathname === '/' ? 'border-b pb-1' : ''} ${isTransparent ? 'border-white' : 'border-brand-charcoal'}`}>SHOP</Link>
            <Link href="/collections" className={`flex items-center gap-1 opacity-80 hover:opacity-100 group ${pathname === '/collections' ? 'border-b pb-1' : ''} ${isTransparent ? 'border-white' : 'border-brand-charcoal'}`}>
              COLLECTIONS <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            <Link href="/stitch" className="opacity-80 hover:opacity-100">STITCH FOR YOU</Link>
          </nav>
          
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center justify-center w-1/3 text-center">
            <h1 className="font-serif text-2xl md:text-3xl tracking-[0.15em]">LABEL_234</h1>
            <span className="text-[8px] md:text-[9px] tracking-[0.3em] mt-0.5 md:mt-1 opacity-80 uppercase">Panipat</span>
          </Link>

          {/* Right Nav (Desktop & Mobile Icons) */}
          <nav className="flex gap-4 md:gap-8 text-[11px] tracking-[0.15em] font-medium items-center justify-end w-1/3">
            <Link href="/journal" className="hidden lg:block opacity-80 hover:opacity-100">JOURNAL</Link>
            <Link href="/about" className="hidden lg:block opacity-80 hover:opacity-100 mr-4">ABOUT US</Link>
            <div className="flex gap-3 md:gap-5 items-center">
              <button className="hidden sm:block opacity-80 hover:opacity-100 transition-transform active:scale-95">
                <Search size={18} strokeWidth={1.2} className={!isTransparent ? 'icon-stroke' : ''} />
              </button>
              <button className="hidden sm:block opacity-80 hover:opacity-100 transition-transform active:scale-95">
                <User size={18} strokeWidth={1.2} className={!isTransparent ? 'icon-stroke' : ''} />
              </button>
              <button className="opacity-80 hover:opacity-100 transition-transform active:scale-95 relative">
                <Heart size={18} strokeWidth={1.2} className={!isTransparent ? 'icon-stroke' : ''} />
                {!isTransparent && <span className="absolute -top-1.5 -right-2 bg-brand-softBlack text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>}
              </button>
              <Link href="/cart" className="opacity-80 hover:opacity-100 transition-transform active:scale-95 relative cursor-pointer">
                <ShoppingBag size={18} strokeWidth={1.2} className={!isTransparent ? 'icon-stroke' : ''} />
                {(!isTransparent || cartItemsCount > 0) && cartItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-brand-softBlack text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[60] transition-transform duration-500 ease-in-out transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden flex flex-col`}>
        <div className="flex items-center justify-between p-6 border-b border-brand-border text-brand-charcoal">
          <Link href="/" className="flex flex-col items-start" onClick={() => setMobileMenuOpen(false)}>
            <h1 className="font-serif text-2xl tracking-[0.15em] uppercase">LABEL_234</h1>
            <span className="text-[8px] tracking-[0.3em] uppercase mt-0.5 opacity-80">Panipat</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 opacity-70 hover:opacity-100">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="flex flex-col gap-6 p-8 text-sm tracking-widest uppercase font-semibold text-brand-charcoal overflow-y-auto">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-brand-border/50">Shop</Link>
          <Link href="/collections" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-brand-border/50">Collections</Link>
          <Link href="/stitch" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-brand-border/50">Stitch For You</Link>
          <Link href="/journal" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-brand-border/50">Journal</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="pb-4 border-b border-brand-border/50">About Us</Link>
          
          <div className="flex gap-6 mt-8">
            <button className="flex flex-col items-center gap-2 opacity-70">
              <Search size={20} strokeWidth={1.2} />
              <span className="text-[9px]">Search</span>
            </button>
            <button className="flex flex-col items-center gap-2 opacity-70">
              <User size={20} strokeWidth={1.2} />
              <span className="text-[9px]">Account</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
