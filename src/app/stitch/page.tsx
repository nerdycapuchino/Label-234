import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function StitchPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24 text-center max-w-4xl">
        <h1 className="font-serif text-4xl mb-8">Stitch For You</h1>
        <p className="text-[13px] leading-relaxed text-brand-charcoal/80 mb-12">
          Turn any exclusive fabric into a masterpiece. 
          Our bespoke tailoring service lets you customize the perfect ethnic garment right from your screen.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="border border-brand-border p-8 bg-brand-ivory">
            <span className="text-3xl font-serif text-brand-charcoal opacity-50 mb-4 block">01</span>
            <h3 className="font-bold uppercase tracking-widest text-[11px] mb-2">Select Your Fabric</h3>
            <p className="text-[13px] text-brand-textMuted">Browse our limited-edition collections and reserve your unique piece.</p>
          </div>
          <div className="border border-brand-border p-8 bg-brand-ivory">
            <span className="text-3xl font-serif text-brand-charcoal opacity-50 mb-4 block">02</span>
            <h3 className="font-bold uppercase tracking-widest text-[11px] mb-2">Design & Measure</h3>
            <p className="text-[13px] text-brand-textMuted">Choose necklines, sleeves, and provide your exact measurements online.</p>
          </div>
          <div className="border border-brand-border p-8 bg-brand-ivory">
            <span className="text-3xl font-serif text-brand-charcoal opacity-50 mb-4 block">03</span>
            <h3 className="font-bold uppercase tracking-widest text-[11px] mb-2">Track & Receive</h3>
            <p className="text-[13px] text-brand-textMuted">Watch your garment come to life in your dashboard with production updates.</p>
          </div>
        </div>

        <div className="mt-16">
          <Link href="/collections" className="bg-brand-softBlack text-white py-4 px-12 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors inline-block">
            CHOOSE A FABRIC TO START
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
