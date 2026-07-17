import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="font-serif text-5xl mb-8 leading-tight">Our Story</h1>
          <p className="text-[13px] leading-relaxed text-brand-charcoal/70">From the textile heart of India to your wardrobe.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="bg-brand-sand aspect-square flex items-center justify-center text-sm opacity-50">Timeline Image</div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-brand-textMuted font-semibold">2022 — The Beginning</span>
              <h2 className="font-serif text-2xl mt-2 mb-4">Born in Panipat</h2>
              <p className="text-[13px] leading-relaxed text-brand-charcoal/80">
                Label 234 was founded with one radical idea: what if every fabric was truly unique? Inspired by Panipat's rich textile heritage — the city that supplies fabrics to the world — we set out to curate one-of-one pieces that celebrate Indian craftsmanship.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-start">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-brand-textMuted font-semibold">2023 — The Atelier</span>
              <h2 className="font-serif text-2xl mt-2 mb-4">Opening the Boutique</h2>
              <p className="text-[13px] leading-relaxed text-brand-charcoal/80">
                We opened our doors in Model Town, Panipat — a space where customers could touch, feel, and fall in love with fabrics before committing. Our bespoke tailoring studio was born, offering end-to-end garment creation from a single exclusive fabric.
              </p>
            </div>
            <div className="bg-brand-sand aspect-square flex items-center justify-center text-sm opacity-50">Boutique Image</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="bg-brand-sand aspect-square flex items-center justify-center text-sm opacity-50">Digital Image</div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-brand-textMuted font-semibold">2024 — Going Digital</span>
              <h2 className="font-serif text-2xl mt-2 mb-4">The Online Experience</h2>
              <p className="text-[13px] leading-relaxed text-brand-charcoal/80">
                We brought the boutique experience online — allowing customers across India and beyond to explore exclusive fabrics, customize stitching, and track their bespoke garment's journey from fabric to finished piece, all from their screens.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
