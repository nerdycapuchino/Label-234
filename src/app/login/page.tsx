import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24 flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md">
          <h1 className="font-serif text-4xl mb-2 text-center">Welcome Back</h1>
          <p className="text-[13px] text-brand-textMuted text-center mb-10">Sign in to your Label 234 account</p>

          <div className="space-y-4 mb-6">
            <input type="email" placeholder="Email Address" className="w-full border border-brand-border p-3.5 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
            <input type="password" placeholder="Password" className="w-full border border-brand-border p-3.5 text-[13px] outline-none focus:border-brand-charcoal transition-colors bg-transparent" />
          </div>

          <div className="flex justify-between items-center mb-8 text-[12px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-brand-charcoal" />
              <span>Remember me</span>
            </label>
            <a href="#" className="underline text-brand-textMuted hover:text-brand-charcoal">Forgot password?</a>
          </div>

          <button className="w-full bg-brand-softBlack text-white py-4 text-[11px] font-semibold tracking-widest uppercase hover:bg-black transition-colors mb-6">
            SIGN IN
          </button>

          <p className="text-center text-[13px] text-brand-textMuted">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline text-brand-charcoal font-medium">Create one</Link>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
