import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AddressesPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <div className="flex justify-between items-center border-b border-brand-border pb-6 mb-8">
          <h1 className="font-serif text-4xl">My Addresses</h1>
          <button className="bg-brand-softBlack text-white py-3 px-8 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors">ADD NEW</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-brand-border p-6 bg-brand-ivory">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[13px]">Home</h3>
              <span className="text-[11px] px-2 py-0.5 bg-brand-sand text-brand-charcoal uppercase tracking-widest font-semibold">Default</span>
            </div>
            <p className="text-[13px] text-brand-charcoal/80 leading-relaxed mb-6">Aditi Sharma<br/>42, Sector 15, Gurgaon<br/>Haryana - 122001<br/>+91 98765 43210</p>
            <div className="flex gap-4">
              <button className="border border-brand-charcoal px-4 py-2 text-[11px] font-bold tracking-widest uppercase hover:bg-brand-charcoal hover:text-white transition-colors">EDIT</button>
              <button className="text-[11px] font-bold tracking-widest uppercase text-red-600 hover:underline">DELETE</button>
            </div>
          </div>
          <div className="border border-brand-border p-6 bg-brand-ivory">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[13px]">Office</h3>
            </div>
            <p className="text-[13px] text-brand-charcoal/80 leading-relaxed mb-6">Aditi Sharma<br/>Tower B, DLF Cyber City<br/>Gurgaon, Haryana - 122002<br/>+91 98765 43210</p>
            <div className="flex gap-4">
              <button className="border border-brand-charcoal px-4 py-2 text-[11px] font-bold tracking-widest uppercase hover:bg-brand-charcoal hover:text-white transition-colors">EDIT</button>
              <button className="text-[11px] font-bold tracking-widest uppercase text-red-600 hover:underline">DELETE</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
