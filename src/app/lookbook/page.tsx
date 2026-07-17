import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LookbookPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-serif text-5xl mb-8 leading-tight">Lookbook</h1>
          <p className="text-[13px] leading-relaxed text-brand-charcoal/70">Seasonal inspiration. Styled exclusively with Label 234 fabrics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["Festive '24", "Summer Whites", "Monsoon Hues", "Bridal Edit", "Pastel Dreams", "Heritage Weaves"].map((title, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-brand-sand mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-softBlack/20 group-hover:bg-brand-softBlack/40 transition-colors duration-500 flex items-end p-6">
                  <div>
                    <h3 className="text-white font-serif text-2xl">{title}</h3>
                    <p className="text-white/70 text-[11px] mt-2 uppercase tracking-widest">View Collection →</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
