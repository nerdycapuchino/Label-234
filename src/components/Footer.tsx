import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-warmWhite text-brand-charcoal pt-10 pb-6 mt-12 border-t border-brand-border">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        
<<<<<<< HEAD
        {/* Instagram Feed Section */}
        <div className="pb-12 border-b border-brand-border mb-10">
          <div className="flex flex-col items-center justify-center mb-8">
            <h4 className="font-serif text-2xl tracking-[0.1em] mb-2">@LABEL_234</h4>
            <p className="text-[11px] uppercase tracking-widest opacity-70">Follow us on Instagram</p>
          </div>
          {/* SnapWidget iframe - Replace the src with your actual generated widget ID if different */}
          <div className="w-full overflow-hidden flex justify-center">
             <iframe src="https://snapwidget.com/embed/1070563" className="snapwidget-widget w-full max-w-[1200px] h-[250px]" allowtransparency="true" frameBorder="0" scrolling="no" style={{border: "none", overflow: "hidden"}}></iframe>
          </div>
        </div>

=======
>>>>>>> f346ffc2abfc67dc4113d1a1ea988cdc679e136f
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-brand-border text-left">
          <div className="flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <div>
<<<<<<< HEAD
              <h5 className="text-[11px] font-semibold uppercase tracking-wider">Secure Payments</h5>
=======
              <h5 className="text-[11px] font-semibold uppercase tracking-wider">Commitment to Quality</h5>
>>>>>>> f346ffc2abfc67dc4113d1a1ea988cdc679e136f
              <p className="text-[10px] opacity-70 mt-1">100% safe & trusted</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke shrink-0">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <div>
              <h5 className="text-[11px] font-semibold uppercase tracking-wider">Easy Returns</h5>
              <p className="text-[10px] opacity-70 mt-1">Hassle-free returns</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke shrink-0">
<<<<<<< HEAD
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <div>
              <h5 className="text-[11px] font-semibold uppercase tracking-wider">Customer Support</h5>
=======
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <div>
              <h5 className="text-[11px] font-medium uppercase tracking-wider">Customer Support</h5>
>>>>>>> f346ffc2abfc67dc4113d1a1ea988cdc679e136f
              <p className="text-[10px] opacity-70 mt-1">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke shrink-0">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <div>
              <h5 className="text-[11px] font-semibold uppercase tracking-wider">Worldwide Shipping</h5>
              <p className="text-[10px] opacity-70 mt-1">Pan India & International</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 py-12">
          <div className="md:col-span-1">
<<<<<<< HEAD
            <Link href="/" className="flex flex-col items-start mb-4">
              <h1 className="font-serif text-2xl tracking-[0.15em] uppercase">LABEL_234</h1>
              <span className="text-[8px] tracking-[0.3em] uppercase mt-1 opacity-80 pl-1">Panipat</span>
            </Link>
=======
            <Link href="/" className="font-serif text-2xl tracking-[0.15em] uppercase mb-4">LABEL_234</Link>
>>>>>>> f346ffc2abfc67dc4113d1a1ea988cdc679e136f
            <p className="text-[11px] opacity-70 leading-relaxed mb-6">Premium fabrics. Curated in Panipat. For the modern Indian woman.</p>
          </div>

          <div>
            <h6 className="text-[11px] tracking-widest font-semibold mb-5">SHOP</h6>
<<<<<<< HEAD
            <ul className="flex flex-col gap-3 text-[11px] font-medium opacity-70">
=======
            <ul className="flex flex-col items-center gap-3 text-[11px] font-medium opacity-70">
>>>>>>> f346ffc2abfc67dc4113d1a1ea988cdc679e136f
              <li><Link href="/collections" className="hover:opacity-100 transition-opacity">All Fabrics</Link></li>
              <li><Link href="/collections" className="hover:opacity-100 transition-opacity">New Arrivals</Link></li>
              <li><Link href="/collections" className="hover:opacity-100 transition-opacity">Bestsellers</Link></li>
              <li><Link href="/stitch" className="hover:opacity-100 transition-opacity">Stitched for You</Link></li>
            </ul>
          </div>
<<<<<<< HEAD

          <div>
            <h6 className="text-[11px] tracking-widest font-semibold mb-5">HELP</h6>
            <ul className="flex flex-col gap-3 text-[11px] font-medium opacity-70">
=======
          
          <div>

            <h6 className="text-[11px] tracking-widest font-semibold mb-5">HELP</h6>
            <ul className="flex flex-col items-center gap-3 text-[11px] font-medium opacity-70">
>>>>>>> f346ffc2abfc67dc4113d1a1ea988cdc679e136f
              <li><a href="#" className="hover:opacity-100 transition-opacity">FAQs</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Returns & Refunds</a></li>
            </ul>
          </div>

          <div>
            <h6 className="text-[11px] tracking-widest font-semibold mb-5">ABOUT</h6>
<<<<<<< HEAD
            <ul className="flex flex-col gap-3 text-[11px] font-medium opacity-70">
=======
            <ul className="font-medium opacity-70 flex flex-col items-center gap-3 text-[11px]">
>>>>>>> f346ffc2abfc67dc4113d1a1ea988cdc679e136f
              <li><a href="#" className="hover:opacity-100 transition-opacity">Our Story</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Visit Boutique</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h6 className="text-[11px] tracking-widest font-semibold mb-5">VISIT OUR BOUTIQUE</h6>
            <p className="text-[11px] opacity-70 leading-relaxed mb-4">Label_234<br/>Model Town, Panipat,<br/>Haryana - 132103</p>
          </div>
        </div>

<<<<<<< HEAD
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] opacity-60 border-t border-brand-border">
=======
        <div className="fex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] opacity-60 border-t border-brand-border">
>>>>>>> f346ffc2abfc67dc4113d1a1ea988cdc679e136f
          <p>© 2024 Label_234. All rights reserved.</p>
          <p className="flex items-center gap-1 text-center">Made in Panipat, Loved Everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
