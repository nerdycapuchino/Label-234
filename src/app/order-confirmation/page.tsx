"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

function Confirmation() {
  const params = useSearchParams();
  const orderNumber = params.get("order");

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
          <p className="text-[13px] text-brand-charcoal/80 mb-2">
            Your order has been placed successfully.
          </p>
          {orderNumber ? (
            <p className="text-[13px] text-brand-textMuted mb-8">
              Order <span className="font-semibold">#{orderNumber}</span> • A confirmation
              will be sent to your email.
            </p>
          ) : (
            <p className="text-[13px] text-brand-textMuted mb-8">
              A confirmation will be sent to your email.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/orders"
              className="bg-brand-softBlack text-white py-3 px-8 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors"
            >
              TRACK YOUR ORDER
            </Link>
            <Link
              href="/collections"
              className="border border-brand-charcoal py-3 px-8 text-[11px] font-semibold tracking-widest uppercase hover:bg-brand-ivory transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <Confirmation />
    </Suspense>
  );
}
