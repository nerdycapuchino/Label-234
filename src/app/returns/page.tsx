import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24 max-w-3xl">
        <h1 className="font-serif text-4xl mb-12 text-center">Returns & Refunds</h1>
        
        <div className="flex flex-col gap-8">
          <section>
            <h3 className="font-bold text-[13px] mb-3 uppercase tracking-widest">Fabric Orders</h3>
            <p className="text-[13px] text-brand-charcoal/80 mb-4">
              We accept returns for unstitched fabric within 7 days of delivery, provided the fabric is unused, unwashed, and in its original condition. Once we receive the returned item, a full refund will be initiated to your original payment method.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-[13px] mb-3 uppercase tracking-widest">Bespoke Stitched Garments</h3>
            <p className="text-[13px] text-brand-charcoal/80">
              Because bespoke garments are custom tailored to your exact measurements, they are <strong>non-returnable and non-refundable</strong>. 
              However, if there is a fitting issue or a defect in craftsmanship, please contact us within 3 days of delivery and we will offer a complimentary alteration service.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
