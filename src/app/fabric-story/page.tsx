import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FabricStoryPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="font-serif text-5xl mb-8 leading-tight">The Fabric Story</h1>
          <p className="text-[13px] leading-relaxed text-brand-charcoal/70">Every thread has a journey. Every weave has a soul.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-24">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-ivory border border-brand-border flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-60">
                <circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle>
                <line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 className="font-serif text-xl mb-3">Handloom Heritage</h3>
            <p className="text-[13px] text-brand-charcoal/80 leading-relaxed">Our cottons, silks, and linens are woven on traditional handlooms by artisans whose families have practiced the craft for centuries.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-ivory border border-brand-border flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-60">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="font-serif text-xl mb-3">Quality First</h3>
            <p className="text-[13px] text-brand-charcoal/80 leading-relaxed">Every roll is hand-inspected for weave consistency, colour depth, and texture before it earns a place in our curated inventory.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-ivory border border-brand-border flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke opacity-60">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 className="font-serif text-xl mb-3">One of One</h3>
            <p className="text-[13px] text-brand-charcoal/80 leading-relaxed">We purchase single cuts of each design. Once a fabric is sold, it is permanently retired — making your garment truly irreplaceable.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
