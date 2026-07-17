import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24 max-w-3xl">
        <h1 className="font-serif text-4xl mb-12 text-center">Frequently Asked Questions</h1>
        
        <div className="flex flex-col gap-6">
          <div className="border-b border-brand-border pb-6">
            <h3 className="font-bold text-[13px] mb-2">Are the fabrics really exclusive?</h3>
            <p className="text-[13px] text-brand-charcoal/80">Yes. We source only one cut of each premium fabric. Once it's sold to you, it will never be restocked or sold to anyone else.</p>
          </div>
          <div className="border-b border-brand-border pb-6">
            <h3 className="font-bold text-[13px] mb-2">How does the bespoke tailoring work?</h3>
            <p className="text-[13px] text-brand-charcoal/80">Select an eligible fabric and click "Stitch This Fabric". You will be guided through measuring yourself and selecting designs (necklines, sleeves, etc.) that complement your chosen material.</p>
          </div>
          <div className="border-b border-brand-border pb-6">
            <h3 className="font-bold text-[13px] mb-2">Can I book an appointment at the boutique?</h3>
            <p className="text-[13px] text-brand-charcoal/80">Absolutely. You can book an appointment from your customer dashboard to visit us in Panipat for a personal consultation and measurement session.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
