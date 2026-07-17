import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <h1 className="font-serif text-4xl mb-8 border-b border-brand-border pb-6">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12">
          {/* Sidebar */}
          <div className="flex flex-col gap-4 text-[13px] font-medium text-brand-charcoal/80">
            <button className="text-left py-2 font-bold text-brand-charcoal border-l-2 border-brand-charcoal pl-4 -ml-[18px]">Overview</button>
            <button className="text-left py-2 hover:text-brand-charcoal pl-4 -ml-[18px]">My Orders</button>
            <button className="text-left py-2 hover:text-brand-charcoal pl-4 -ml-[18px]">My Measurements</button>
            <button className="text-left py-2 hover:text-brand-charcoal pl-4 -ml-[18px]">Appointments</button>
            <button className="text-left py-2 hover:text-brand-charcoal pl-4 -ml-[18px]">Wishlist</button>
            <button className="text-left py-2 hover:text-brand-charcoal pl-4 -ml-[18px] mt-8 text-red-700">Logout</button>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex flex-col gap-12">
            
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-widest mb-6">Recent Orders</h2>
              <div className="border border-brand-border p-6 bg-brand-ivory text-[13px]">
                <div className="flex justify-between items-center border-b border-brand-border pb-4 mb-4">
                  <div>
                    <span className="font-bold">Order #234-9812</span>
                    <span className="ml-4 text-brand-textMuted">Placed on Oct 12, 2024</span>
                  </div>
                  <span className="bg-[#EAE6E1] px-3 py-1 text-[11px] font-bold uppercase tracking-widest">In Production</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-brand-sand shrink-0">
                      <img src="https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=200&auto=format&fit=crop" alt="Item" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">Pastel Chikankari Cotton</p>
                      <p className="text-[11px] text-brand-textMuted mt-1">Bespoke Stitching Included</p>
                    </div>
                  </div>
                  <button className="border border-brand-charcoal px-4 py-2 text-[11px] font-bold tracking-widest uppercase hover:bg-brand-charcoal hover:text-white transition-colors">Track Progress</button>
                </div>
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[13px] font-bold uppercase tracking-widest">Saved Measurements</h2>
                <button className="text-[11px] underline">Add New</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-brand-border p-6 bg-brand-ivory text-[13px]">
                  <p className="font-bold mb-2">My Kurta Size (Standard)</p>
                  <p className="text-brand-textMuted mb-4">Last updated: Sept 10, 2024</p>
                  <button className="border border-brand-charcoal px-4 py-2 text-[11px] font-bold tracking-widest uppercase hover:bg-brand-charcoal hover:text-white transition-colors">Edit Measurements</button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
