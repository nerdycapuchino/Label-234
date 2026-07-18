import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductBySlug } from "@/lib/products";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductBySlug(id);
  const [featuredImage, ...thumbnailImages] = product.images;

  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="solid" />

      <div className="max-w-[1920px] mx-auto pt-32">
        <div className="px-6 md:px-12 py-5 text-[11px] text-brand-textMuted font-medium tracking-wide flex gap-2">
          <Link href="/" className="hover:text-brand-charcoal transition-colors">Home</Link> /
          <Link href="/collections" className="hover:text-brand-charcoal transition-colors">Collections</Link> /
          <span className="text-brand-charcoal">{product.title}</span>
        </div>

        <section className="px-6 md:px-12 pb-16 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-7/12 flex gap-4 h-[75vh] min-h-[520px]">
            <div className="hidden sm:flex flex-col gap-3 w-[80px] shrink-0 h-full overflow-y-auto hide-scrollbar relative">
              {[featuredImage, ...thumbnailImages].map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={`border rounded-sm overflow-hidden p-0.5 ${index === 0 ? "border-brand-charcoal/30" : "border-transparent hover:border-brand-border"}`}
                  type="button"
                >
                  <img
                    src={image}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className={`w-full h-[100px] object-cover rounded-sm ${index === 0 ? "" : "opacity-70 hover:opacity-100 transition-opacity"}`}
                  />
                </button>
              ))}
            </div>

            <div className="flex-1 relative rounded-sm overflow-hidden bg-brand-ivory cursor-crosshair">
              <img src={featuredImage} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="lg:w-5/12 flex flex-col pt-4 lg:pr-12">
            <div className="flex items-center gap-3 text-[10px] font-semibold tracking-widest uppercase mb-4 text-brand-charcoal">
              <span className="text-[#A25E54]">Limited Edition</span>
              <span className="w-1 h-1 rounded-full bg-brand-border" />
              <span>{product.isSoldOut ? "Sold Out" : "Only 1 Piece Left"}</span>
            </div>

            <div className="flex justify-between items-start mb-4">
              <h1 className="font-serif text-4xl text-brand-charcoal leading-tight">{product.title}</h1>
            </div>

            <div className="mb-6">
              <div className="text-2xl font-medium tracking-wide">
                Rs. {product.pricePerMeter.toLocaleString("en-IN")} <span className="text-base text-brand-textMuted font-normal">/ mtr</span>
              </div>
              <div className="text-[11px] text-brand-textMuted mt-1">Inclusive of all taxes</div>
            </div>

            <p className="text-[13.5px] leading-relaxed text-brand-charcoal/80 mb-8 max-w-prose">
              {product.description}
            </p>

            <div className="grid gap-y-2 text-[13px] mb-8 text-brand-charcoal/90" style={{ gridTemplateColumns: "120px 10px 1fr" }}>
              <div className="font-medium">Fabric Type</div><div>:</div><div>{product.fabricType}</div>
              <div className="font-medium">Work</div><div>:</div><div>{product.work}</div>
              <div className="font-medium">Width</div><div>:</div><div>{product.widthInches ? `${product.widthInches} inches` : "Available on request"}</div>
              <div className="font-medium">Care</div><div>:</div><div>{product.careInstructions}</div>
            </div>

            <AddToCartButton product={product} />

            <div className="flex items-center justify-between pt-4 border-t border-brand-border text-[11px] font-medium text-brand-charcoal/80">
              <div className="flex items-center gap-2">Free Shipping</div>
              <div className="w-[1px] h-4 bg-brand-border" />
              <div className="flex items-center gap-2">Easy Returns</div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-16">
          <div className="flex gap-8 border-b border-brand-border text-[11px] tracking-widest uppercase font-medium text-brand-textMuted mb-8">
            <button className="pb-3 border-b-2 border-brand-charcoal text-brand-charcoal font-bold" type="button">Details</button>
            <button className="pb-3 hover:text-brand-charcoal transition-colors" type="button">Care</button>
            <button className="pb-3 hover:text-brand-charcoal transition-colors" type="button">Shipping</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] border-b border-brand-border pb-12">
            <div className="pr-12 lg:border-r border-brand-border">
              <p className="text-[13px] leading-relaxed text-brand-charcoal/90 mb-8 max-w-prose">
                {product.description}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-border pl-0 lg:pl-12 mt-8 lg:mt-0">
              <div className="flex flex-col items-center text-center px-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1">One Of A Kind</h4>
                <p className="text-[11px] text-brand-textMuted leading-snug">Once sold,<br />never restocked.</p>
              </div>
              <div className="flex flex-col items-center text-center px-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider mb-1">Authentic Craft</h4>
                <p className="text-[11px] text-brand-textMuted leading-snug">Selected for<br />bespoke tailoring.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
