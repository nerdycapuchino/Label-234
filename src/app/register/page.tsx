import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24 flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md">
          <h1 className="font-serif text-4xl mb-2 text-center">Create Account</h1>
          <p className="text-[13px] text-brand-textMuted text-center mb-10">Join Label 234 for exclusive access</p>

          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full border border-brand-border p-3.5 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
              <input type="text" placeholder="Last Name" className="w-full border border-brand-border p-3.5 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full border border-brand-border p-3.5 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
            <input type="tel" placeholder="Phone Number" className="w-full border border-brand-border p-3.5 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
            <input type="password" placeholder="Password" className="w-full border border-brand-border p-3.5 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
            <input type="password" placeholder="Confirm Password" className="w-full border border-brand-border p-3.5 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
          </div>

          <button className="w-full bg-brand-softBlack text-white py-4 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors mb-6">
            CREATE ACCOUNT
          </button>

          <p className="text-center text-[13px] text-brand-textMuted">
            Already have an account?{" "}
            <Link href="/login" className="underline text-brand-charcoal font-medium">Sign in</Link>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
