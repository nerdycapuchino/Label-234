import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24 text-center max-w-3xl">
        <h1 className="font-serif text-4xl mb-8">About Label 234</h1>
        <p className="text-[13px] leading-relaxed text-brand-charcoal/80 mb-6">
          Label 234 was born out of a desire to preserve exclusivity in an era of fast fashion. 
          Rooted in Panipat, the textile hub of India, we curate one-of-a-kind, premium fabrics.
        </p>
        <p className="text-[13px] leading-relaxed text-brand-charcoal/80">
          Our philosophy is simple: One Fabric. One Owner. No Repeats. 
          Once a fabric is sold, it is never restocked.
        </p>
      </div>
      <Footer />
    </main>
  );
}
