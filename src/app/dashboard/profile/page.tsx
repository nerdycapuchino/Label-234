import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <h1 className="font-serif text-4xl mb-8 border-b border-brand-border pb-6">My Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          <div>
            <label className="text-[11px] uppercase tracking-widest font-semibold text-brand-textMuted block mb-2">First Name</label>
            <input type="text" defaultValue="Aditi" className="w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent mb-6" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest font-semibold text-brand-textMuted block mb-2">Last Name</label>
            <input type="text" defaultValue="Sharma" className="w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent mb-6" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest font-semibold text-brand-textMuted block mb-2">Email</label>
            <input type="email" defaultValue="aditi@example.com" className="w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent mb-6" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest font-semibold text-brand-textMuted block mb-2">Phone</label>
            <input type="tel" defaultValue="+91 98765 43210" className="w-full border border-brand-border p-3 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent mb-6" />
          </div>
        </div>
        <button className="mt-4 bg-brand-softBlack text-white py-3 px-10 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors">
          SAVE CHANGES
        </button>
      </div>
      <Footer />
    </main>
  );
}
