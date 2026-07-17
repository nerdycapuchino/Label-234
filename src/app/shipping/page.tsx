import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24 max-w-3xl">
        <h1 className="font-serif text-4xl mb-12 text-center">Shipping & Delivery</h1>
        
        <div className="flex flex-col gap-8">
          <section>
            <h3 className="font-bold text-[13px] mb-3 uppercase tracking-widest">Delivery Timelines</h3>
            <p className="text-[13px] text-brand-charcoal/80 mb-4">
              <strong>Fabric Only Orders:</strong> Dispatched within 2-3 business days. Delivery typically takes 4-7 days depending on your location in India.
            </p>
            <p className="text-[13px] text-brand-charcoal/80">
              <strong>Bespoke Tailoring Orders:</strong> Custom stitched garments require 10-14 days for production. You can track the progress of your garment directly from your dashboard.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-[13px] mb-3 uppercase tracking-widest">Shipping Costs</h3>
            <p className="text-[13px] text-brand-charcoal/80">
              We offer FREE shipping across India on all orders above ₹5,000. For orders below ₹5,000, a standard shipping fee of ₹150 applies.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
