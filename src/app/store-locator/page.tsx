import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function StoreLocatorPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-serif text-5xl mb-8 leading-tight">Visit Our Boutique</h1>
          <p className="text-[13px] leading-relaxed text-brand-charcoal/70">Experience our fabrics in person at our flagship store.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-brand-sand aspect-video flex items-center justify-center text-sm opacity-50 rounded-sm">
            Google Maps Embed
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-2xl mb-4">Label_234 Boutique</h2>
            <div className="text-[13px] leading-relaxed text-brand-charcoal/80 space-y-3 mb-8">
              <p>Model Town, Panipat,<br/>Haryana - 132103, India</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Hours:</strong> Mon – Sat, 10:00 AM – 7:00 PM</p>
              <p><strong>Closed:</strong> Sundays & Public Holidays</p>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-softBlack text-white py-3 px-8 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors w-fit">
              GET DIRECTIONS
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
