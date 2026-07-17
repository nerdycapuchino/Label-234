import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetailPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      
      <div className="max-w-[1920px] mx-auto pt-32">
        {/* Breadcrumbs */}
        <div className="px-6 md:px-12 py-5 text-[11px] text-brand-textMuted font-medium tracking-wide flex gap-2">
          <Link href="/" className="hover:text-brand-charcoal transition-colors">Home</Link> /
          <Link href="/collections" className="hover:text-brand-charcoal transition-colors">Collections</Link> /
          <Link href="/collections" className="hover:text-brand-charcoal transition-colors">Festive</Link> /
          <span className="text-brand-charcoal">Pastel Chikankari Cotton</span>
        </div>

        <section className="px-6 md:px-12 pb-16 flex flex-col lg:flex-row gap-16">
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
            </div>

            {/* Main Featured Image */}
            <div className="flex-1 relative rounded-sm overflow-hidden bg-brand-ivory cursor-crosshair">
              <img src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1200&auto=format&fit=crop"
                alt="Pastel Chikankari Cotton Fabric" className="w-full h-full object-cover" />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Product Information (45%) */}
          <div className="lg:w-[45%] flex flex-col pt-4 lg:pr-12">
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
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

            {/* Length Input & Total */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-[13px] font-medium">Length (in metres)</span>
              <div className="flex items-center border border-brand-border rounded-sm h-10">
                <button className="w-10 h-full flex items-center justify-center hover:bg-brand-ivory transition-colors text-lg">−</button>
                <input type="text" value="2.5" className="w-12 h-full text-center text-[13px] font-medium border-x border-brand-border bg-transparent outline-none" readOnly />
                <button className="w-10 h-full flex items-center justify-center hover:bg-brand-ivory transition-colors text-lg">+</button>
              </div>
              <span className="text-[14px] font-semibold">Total: ₹ 6,125</span>
            </div>

            {/* Actions: Side-by-side Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="bg-brand-softBlack text-white py-4 text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-black transition-colors">
                ADD TO BAG
              </button>
              <button className="bg-white border border-brand-charcoal text-brand-charcoal py-4 text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-brand-ivory transition-colors">
                STITCH THIS FABRIC
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-border text-[11px] font-medium text-brand-charcoal/80">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
                  <rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg> Free Shipping
              </div>
              <div className="w-[1px] h-4 bg-brand-border"></div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg> Easy Returns
              </div>
            </div>
          </div>
        </section>
        
        {/* Tabs Content */}
        <section className="px-6 md:px-12 pb-16">
          <div className="flex gap-8 border-b border-brand-border text-[11px] tracking-widest uppercase font-medium text-brand-textMuted mb-8">
            <button className="pb-3 border-b-2 border-brand-charcoal text-brand-charcoal font-bold">DETAILS</button>
            <button className="pb-3 hover:text-brand-charcoal transition-colors">CARE</button>
            <button className="pb-3 hover:text-brand-charcoal transition-colors">SHIPPING</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] border-b border-brand-border pb-12">
            <div className="pr-12 lg:border-r border-brand-border">
              <p className="text-[13px] leading-relaxed text-brand-charcoal/90 mb-8 max-w-[90%]">
                A delicate blend of tradition and elegance.<br/>
                This pastel chikankari cotton is hand-embroidered by skilled artisans of Panipat. Soft, breathable, and perfect for every season.<br/>
                Ideal for kurtas, suits, dupattas, and more.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-border pl-12">
              <div className="flex flex-col items-center text-center px-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke mb-4">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1">ONE-OF-A-KIND</h4>
                <p className="text-[11px] text-brand-textMuted leading-snug">Once sold,<br/>never restocked.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke mb-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>
                <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1">AUTHENTIC CRAFT</h4>
                <p className="text-[11px] text-brand-textMuted leading-snug">Handcrafted by<br/>skilled artisans.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
