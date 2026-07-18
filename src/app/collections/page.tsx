import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getProducts } from "@/lib/products";

export default async function CollectionsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-brand-warmWhite">
      <Header variant="solid" />
      <div className="pt-32 px-6 md:px-12 max-w-[1920px] mx-auto min-h-[60vh]">
        <h1 className="font-serif text-4xl mb-8 text-brand-charcoal">All Collections</h1>
        <p className="opacity-70 mb-12 text-brand-charcoal">Discover our exclusive one-of-one fabrics.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link href={`/collections/${product.slug}`} key={product.id} className="group">
              <div className="aspect-[3/4] bg-brand-sand rounded-sm mb-4 overflow-hidden group-hover:opacity-90 transition-opacity">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg text-brand-charcoal">{product.title}</h3>
                  <p className="text-xs opacity-60 text-brand-charcoal mt-1">
                    {product.fabricType}{product.work ? ` / ${product.work}` : ""}
                  </p>
                </div>
                {product.isSoldOut ? (
                  <span className="text-[10px] uppercase tracking-widest text-[#A25E54] font-semibold">Sold</span>
                ) : null}
              </div>
              <p className="text-sm opacity-70 text-brand-charcoal mt-2">
                Rs. {product.pricePerMeter.toLocaleString("en-IN")} / mtr
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
