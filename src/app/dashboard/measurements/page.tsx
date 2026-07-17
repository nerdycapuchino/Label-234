import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SavedMeasurementsPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <div className="flex justify-between items-center border-b border-brand-border pb-6 mb-8">
          <h1 className="font-serif text-4xl">Saved Measurements</h1>
          <button className="bg-brand-softBlack text-white py-3 px-8 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors">ADD NEW</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-brand-border p-6 bg-brand-ivory">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[13px]">My Kurta Size</h3>
              <span className="text-[11px] text-brand-textMuted">Default</span>
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-[13px] mb-6">
              <span className="text-brand-textMuted">Bust</span><span>36 inches</span>
              <span className="text-brand-textMuted">Waist</span><span>30 inches</span>
              <span className="text-brand-textMuted">Hips</span><span>38 inches</span>
              <span className="text-brand-textMuted">Shoulder</span><span>14 inches</span>
              <span className="text-brand-textMuted">Sleeve Length</span><span>22 inches</span>
              <span className="text-brand-textMuted">Kurta Length</span><span>42 inches</span>
            </div>
            <button className="border border-brand-charcoal px-4 py-2 text-[11px] font-bold tracking-widest uppercase hover:bg-brand-charcoal hover:text-white transition-colors">EDIT</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
