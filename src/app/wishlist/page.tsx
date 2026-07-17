import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <h1 className="font-serif text-4xl mb-8 border-b border-brand-border pb-6">My Wishlist</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            { name: "Pastel Chikankari Cotton", price: "₹ 2,450 / mtr" },
            { name: "Ivory Silk Organza", price: "₹ 4,200 / mtr" },
          ].map((item, i) => (
            <div key={i} className="group">
              <div className="aspect-[3/4] bg-brand-sand mb-4 relative overflow-hidden">
                <button className="absolute top-3 right-3 z-10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" className="text-red-500">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              <h3 className="font-medium text-[13px] mb-1">{item.name}</h3>
              <p className="text-[12px] text-brand-charcoal/80 mb-3">{item.price}</p>
              <button className="w-full bg-brand-softBlack text-white py-3 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors">
                ADD TO BAG
              </button>
            </div>
          ))}
        </div>

        {/* Empty state hint */}
        <div className="mt-16 text-center border-t border-brand-border pt-12">
          <p className="text-[13px] text-brand-textMuted mb-4">Discover more exclusive fabrics</p>
          <Link href="/collections" className="inline-block border border-brand-charcoal px-8 py-3 text-[11px] font-semibold tracking-widest uppercase hover:bg-brand-charcoal hover:text-white transition-colors">
            BROWSE COLLECTIONS
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
