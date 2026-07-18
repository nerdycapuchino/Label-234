import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <h1 className="font-serif text-4xl mb-8 border-b border-brand-border pb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12">
          {/* Left Column: Forms */}
          <div className="flex flex-col gap-10">
            
            {/* Contact Info */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-widest mb-6">1. Contact Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <input type="email" placeholder="Email Address" className="w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
                <input type="tel" placeholder="Phone Number" className="w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-widest mb-6">2. Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
                <input type="text" placeholder="Last Name" className="w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
                <input type="text" placeholder="Address Line 1" className="col-span-2 w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
                <input type="text" placeholder="City" className="w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
                <input type="text" placeholder="Postal Code" className="w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-widest mb-6">3. Payment</h2>
              <div className="border border-brand-border p-6 flex flex-col items-center justify-center text-center gap-4 bg-brand-ivory">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-50">
                  <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
                <p className="text-[13px] text-brand-charcoal/80">You will be redirected to Razorpay to complete your purchase securely.</p>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-brand-ivory border border-brand-border p-8 h-fit">
            <h2 className="text-[13px] font-bold uppercase tracking-widest mb-6">Order Summary</h2>
            
            <div className="flex gap-4 border-b border-brand-border pb-6 mb-6">
              <div className="w-20 h-24 bg-brand-sand shrink-0">
                <img src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=200&auto=format&fit=crop" alt="Item" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-[13px] font-semibold">Pastel Chikankari Cotton</h3>
                  <p className="text-[11px] text-brand-textMuted mt-1">2.5 Metres</p>
                </div>
                <p className="text-[13px] font-semibold text-right">₹ 6,125</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-[13px] mb-6 border-b border-brand-border pb-6">
              <div className="flex justify-between">
                <span className="text-brand-charcoal/80">Subtotal</span>
                <span>₹ 6,125</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-charcoal/80">Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="font-serif text-xl">Total</span>
              <span className="font-serif text-xl">₹ 6,125</span>
            </div>

            <button className="w-full bg-brand-softBlack text-white py-4 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors">
              PAY SECURELY WITH RAZORPAY
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
