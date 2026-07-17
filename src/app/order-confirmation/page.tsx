import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 className="font-serif text-4xl mb-4">Thank You!</h1>
          <p className="text-[13px] text-brand-charcoal/80 mb-2">Your order has been placed successfully.</p>
          <p className="text-[13px] text-brand-textMuted mb-8">Order #234-9816 • Confirmation sent to your email</p>

          <div className="border border-brand-border bg-brand-ivory p-8 text-left mb-8">
            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-6">Order Summary</h3>
            <div className="flex gap-4 border-b border-brand-border pb-4 mb-4">
              <div className="w-16 h-20 bg-brand-sand shrink-0"></div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold">Pastel Chikankari Cotton</p>
                <p className="text-[11px] text-brand-textMuted mt-1">2.5 Metres • Bespoke Stitching</p>
              </div>
              <p className="text-[13px] font-semibold">₹ 6,125</p>
            </div>
            <div className="flex justify-between text-[13px] font-semibold">
              <span>Total Paid</span>
              <span>₹ 6,125</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/orders" className="bg-brand-softBlack text-white py-3 px-8 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors">
              TRACK YOUR ORDER
            </Link>
            <Link href="/collections" className="border border-brand-charcoal py-3 px-8 text-[11px] font-semibold tracking-widest uppercase hover:bg-brand-ivory transition-colors">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
