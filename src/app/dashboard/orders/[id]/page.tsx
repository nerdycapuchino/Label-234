import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function OrderDetailPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <h1 className="font-serif text-4xl mb-2">Order #234-9812</h1>
        <p className="text-[13px] text-brand-textMuted mb-8">Placed on Oct 12, 2024</p>

        {/* Production Tracker */}
        <div className="border border-brand-border bg-brand-ivory p-8 mb-12">
          <h2 className="text-[13px] font-bold uppercase tracking-widest mb-8">Production Progress</h2>
          <div className="flex items-center justify-between max-w-3xl">
            {["Order Placed", "Fabric Cut", "Stitching", "Quality Check", "Shipped", "Delivered"].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${i <= 2 ? "bg-brand-softBlack text-white" : "bg-brand-sand text-brand-textMuted"}`}>
                  {i <= 2 ? "✓" : i + 1}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-medium ${i <= 2 ? "text-brand-charcoal" : "text-brand-textMuted"}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border border-brand-border p-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4">Items</h3>
            <div className="flex gap-4">
              <div className="w-20 h-24 bg-brand-sand shrink-0"></div>
              <div>
                <p className="text-[13px] font-semibold">Pastel Chikankari Cotton</p>
                <p className="text-[11px] text-brand-textMuted mt-1">2.5 Metres • Bespoke Kurta</p>
                <p className="text-[13px] font-semibold mt-2">₹ 12,500</p>
              </div>
            </div>
          </div>
          <div className="border border-brand-border p-6">
            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-4">Shipping Address</h3>
            <p className="text-[13px] text-brand-charcoal/80 leading-relaxed">Aditi Sharma<br/>42, Sector 15, Gurgaon<br/>Haryana - 122001<br/>+91 98765 43210</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
