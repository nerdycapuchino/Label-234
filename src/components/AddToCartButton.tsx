"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [length, setLength] = useState(2.5);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const total = product.pricePerMeter * length;

  function updateLength(nextLength: number) {
    setLength(Math.max(0.5, Number(nextLength.toFixed(1))));
  }

  function handleAddToCart() {
    addItem({
      id: product.id,
      title: product.title,
      price: product.pricePerMeter,
      image: product.images[0],
      quantity: 1,
      length,
    });
    setAdded(true);
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-6 mb-8">
        <span className="text-[13px] font-medium">Length (in metres)</span>
        <div className="flex items-center border border-brand-border rounded-sm h-10">
          <button
            type="button"
            onClick={() => updateLength(length - 0.5)}
            className="w-10 h-full flex items-center justify-center hover:bg-brand-ivory transition-colors"
            aria-label="Reduce fabric length"
          >
            <Minus size={14} />
          </button>
          <input
            type="text"
            value={length.toFixed(1)}
            className="w-12 h-full text-center text-[13px] font-medium border-x border-brand-border bg-transparent outline-none"
            readOnly
          />
          <button
            type="button"
            onClick={() => updateLength(length + 0.5)}
            className="w-10 h-full flex items-center justify-center hover:bg-brand-ivory transition-colors"
            aria-label="Increase fabric length"
          >
            <Plus size={14} />
          </button>
        </div>
        <span className="text-[14px] font-semibold">Total: Rs. {total.toLocaleString("en-IN")}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.isSoldOut}
          className="bg-brand-softBlack text-white py-4 text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-black transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {product.isSoldOut ? "Sold Out" : "Add To Bag"}
        </button>
        <Link
          href="/stitch"
          className="bg-white border border-brand-charcoal text-brand-charcoal py-4 text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-brand-ivory transition-colors text-center"
        >
          Stitch This Fabric
        </Link>
      </div>
      {added ? (
        <p className="text-[12px] text-brand-charcoal/70 mb-6">
          Added to cart. <Link href="/cart" className="underline">View cart</Link>
        </p>
      ) : (
        <div className="mb-6" />
      )}
    </>
  );
}
