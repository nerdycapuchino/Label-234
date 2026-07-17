import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CategoriesPage() {
  const categories = [
    { name: "Cotton", count: 24, desc: "Breathable, handloom cotton fabrics" },
    { name: "Silk", count: 18, desc: "Pure silk and silk-blend luxuries" },
    { name: "Organza", count: 12, desc: "Sheer, lightweight organza weaves" },
    { name: "Chikankari", count: 15, desc: "Hand-embroidered Lucknowi craft" },
    { name: "Linen", count: 9, desc: "Crisp, premium linen textiles" },
    { name: "Chanderi", count: 7, desc: "Traditional Chanderi weaves" },
    { name: "Georgette", count: 11, desc: "Flowing georgette drapes" },
    { name: "Handloom", count: 20, desc: "Artisan handloom heritage fabrics" },
  ];

  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <h1 className="font-serif text-4xl mb-2 text-center">Shop by Category</h1>
        <p className="text-[13px] text-brand-textMuted text-center mb-16">Explore our curated fabric categories</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <Link href="/collections" key={i} className="group border border-brand-border p-8 hover:bg-brand-ivory transition-colors text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-brand-sand rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-[11px] font-bold uppercase tracking-wider">{cat.name.slice(0, 2)}</span>
              </div>
              <h3 className="font-serif text-xl mb-2">{cat.name}</h3>
              <p className="text-[11px] text-brand-textMuted mb-3">{cat.desc}</p>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-charcoal/50">{cat.count} Fabrics</span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
