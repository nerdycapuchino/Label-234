"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/products";

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base =
      process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3002";
    fetch(`${base}/api/products`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        const normalized: Product[] = Array.isArray(data)
          ? data.map((p: any) => ({
              id: p.id,
              title: p.title,
              slug: p.slug,
              pricePerMeter: p.pricePerMeter,
              description: p.description,
              fabricType: p.fabricType,
              work: p.work,
              widthInches: p.widthInches,
              careInstructions: p.careInstructions,
              isSoldOut: p.isSoldOut,
              eligibleForBespoke: p.eligibleForBespoke,
              images: (p.images || []).map((i: any) => i.url).filter(Boolean),
            }))
          : [];
        setProducts(normalized.slice(0, 8));
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-12 max-w-[1920px] mx-auto bg-brand-warmWhite">
        <h3 className="text-[11px] tracking-[0.15em] uppercase font-semibold text-brand-charcoal mb-8">
          OUR LATEST FABRICS
        </h3>
        <p className="text-[13px] text-brand-charcoal/50">Loading…</p>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-12 max-w-[1920px] mx-auto bg-brand-warmWhite">
      <div className="flex justify-between items-end mb-8">
        <h3 className="text-[11px] tracking-[0.15em] uppercase font-semibold text-brand-charcoal">
          OUR LATEST FABRICS
        </h3>
        <Link
          href="/collections"
          className="text-[11px] font-semibold tracking-widest uppercase border-b border-brand-charcoal pb-0.5 hover:opacity-70 transition-opacity"
        >
          View All
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/collections/${product.slug}`}
            className="min-w-[260px] snap-start cursor-pointer group"
          >
            <div className="relative h-[260px] bg-brand-sand mb-4 overflow-hidden rounded-sm">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={product.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[11px] uppercase tracking-widest text-brand-charcoal/40">
                  No Image
                </div>
              )}
              <button className="absolute top-3 right-3 text-white opacity-80 hover:opacity-100">
                <Heart size={20} strokeWidth={1.5} />
              </button>
              {product.isSoldOut && (
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-white/90 px-2 py-0.5 font-semibold text-[#A25E54]">
                  Sold
                </span>
              )}
            </div>
            <h4 className="font-semibold text-[13px] mb-1">{product.title}</h4>
            <p className="text-[12px] text-brand-charcoal/70 mb-3">
              ₹ {product.pricePerMeter.toLocaleString("en-IN")} / mtr
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
