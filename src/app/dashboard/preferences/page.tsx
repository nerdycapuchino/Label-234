import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PreferencesPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <h1 className="font-serif text-4xl mb-8 border-b border-brand-border pb-6">Preferences & Notifications</h1>
        <div className="max-w-xl space-y-8">
          <div className="flex justify-between items-center border-b border-brand-border pb-6">
            <div>
              <h3 className="font-bold text-[13px]">Email Notifications</h3>
              <p className="text-[11px] text-brand-textMuted mt-1">Receive updates about orders and new arrivals</p>
            </div>
            <button className="w-12 h-6 bg-brand-softBlack rounded-full relative"><span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span></button>
          </div>
          <div className="flex justify-between items-center border-b border-brand-border pb-6">
            <div>
              <h3 className="font-bold text-[13px]">SMS Alerts</h3>
              <p className="text-[11px] text-brand-textMuted mt-1">Get production stage updates via SMS</p>
            </div>
            <button className="w-12 h-6 bg-brand-sand rounded-full relative"><span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span></button>
          </div>
          <div className="flex justify-between items-center border-b border-brand-border pb-6">
            <div>
              <h3 className="font-bold text-[13px]">New Collection Alerts</h3>
              <p className="text-[11px] text-brand-textMuted mt-1">Be the first to know when exclusive fabrics drop</p>
            </div>
            <button className="w-12 h-6 bg-brand-softBlack rounded-full relative"><span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span></button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
