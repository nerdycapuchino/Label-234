import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="font-serif text-5xl mb-8 leading-tight">Our Philosophy</h1>
          <p className="text-[13px] leading-relaxed text-brand-charcoal/70 tracking-wide uppercase">One Fabric. One Owner. No Repeats.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-24">
          <div>
            <h2 className="font-serif text-2xl mb-6">The Art of Exclusivity</h2>
            <p className="text-[13px] leading-relaxed text-brand-charcoal/80 mb-4">
              In a world of mass production, we chose a different path. Every fabric in our collection is sourced as a single piece — once it finds its owner, it is retired forever. No restocks. No replicas. No exceptions.
            </p>
            <p className="text-[13px] leading-relaxed text-brand-charcoal/80">
              This isn't scarcity for the sake of marketing. It's respect for the craft, the artisan, and the woman who wears it.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl mb-6">Crafted, Not Manufactured</h2>
            <p className="text-[13px] leading-relaxed text-brand-charcoal/80 mb-4">
              Each fabric passes through the hands of master weavers and embroiderers who have inherited their skills across generations. From the handlooms of Panipat to the chikankari ateliers, every thread carries a story.
            </p>
            <p className="text-[13px] leading-relaxed text-brand-charcoal/80">
              We believe that when you wear Label 234, you don't just wear a garment — you wear a legacy.
            </p>
          </div>
        </div>

        <div className="border-t border-brand-border pt-16 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl mb-6">Sustainability by Design</h2>
          <p className="text-[13px] leading-relaxed text-brand-charcoal/80 mb-4">
            By producing only one piece of each fabric, we eliminate overproduction — the fashion industry's biggest environmental sin. Zero dead stock. Zero waste. Every fabric finds a home.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
