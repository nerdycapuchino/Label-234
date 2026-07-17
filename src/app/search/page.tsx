import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="font-serif text-4xl mb-8">Search</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for fabrics, collections, styles..."
              className="w-full border border-brand-border p-4 pr-12 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent font-medium"
            />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon-stroke absolute right-4 top-1/2 -translate-y-1/2 opacity-40">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <h3 className="text-[11px] uppercase tracking-widest font-semibold mb-6 text-brand-textMuted">Popular Searches</h3>
          <div className="flex flex-wrap gap-3">
            {["Chikankari", "Silk", "Cotton", "Organza", "Festive", "Bridal", "Pastel", "Handloom", "Linen"].map((tag) => (
              <button key={tag} className="border border-brand-border px-4 py-2 text-[12px] font-medium hover:bg-brand-ivory transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
