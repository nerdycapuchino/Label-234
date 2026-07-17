import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite">
      <Header variant="dark" />
      <div className="pt-32 px-6 md:px-12 max-w-[1920px] mx-auto min-h-[60vh]">
        <h1 className="font-serif text-4xl mb-8 text-brand-charcoal">All Collections</h1>
        <p className="opacity-70 mb-12 text-brand-charcoal">Discover our exclusive one-of-one fabrics.</p>
        
        {/* Placeholder for Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/collections/sample-product" className="group">
            <div className="aspect-[3/4] bg-brand-sand flex items-center justify-center rounded-sm mb-4 group-hover:opacity-90 transition-opacity">
              <span className="opacity-50 text-sm text-brand-charcoal">Sample Product 1</span>
            </div>
            <h3 className="font-serif text-lg text-brand-charcoal">Midnight Bloom Silk</h3>
            <p className="text-sm opacity-70 text-brand-charcoal">₹ 24,500</p>
          </Link>

          <Link href="/collections/sample-product" className="group">
            <div className="aspect-[3/4] bg-brand-sand flex items-center justify-center rounded-sm mb-4 group-hover:opacity-90 transition-opacity">
              <span className="opacity-50 text-sm text-brand-charcoal">Sample Product 2</span>
            </div>
            <h3 className="font-serif text-lg text-brand-charcoal">Crimson Zari Georgette</h3>
            <p className="text-sm opacity-70 text-brand-charcoal">₹ 18,900</p>
          </Link>

          <Link href="/collections/sample-product" className="group">
            <div className="aspect-[3/4] bg-brand-sand flex items-center justify-center rounded-sm mb-4 group-hover:opacity-90 transition-opacity">
              <span className="opacity-50 text-sm text-brand-charcoal">Sample Product 3</span>
            </div>
            <h3 className="font-serif text-lg text-brand-charcoal">Ivory Chanderi Cotton</h3>
            <p className="text-sm opacity-70 text-brand-charcoal">₹ 12,000</p>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
