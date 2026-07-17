import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function MyOrdersPage() {
  return (
    <main className="min-h-screen bg-brand-warmWhite font-sans text-brand-charcoal">
      <Header variant="dark" />
      <div className="max-w-[1920px] mx-auto pt-32 px-6 md:px-12 pb-24">
        <h1 className="font-serif text-4xl mb-8 border-b border-brand-border pb-6">My Orders</h1>

        <div className="flex flex-col gap-6">
          {[
            { id: "#234-9812", status: "In Production", date: "Oct 12, 2024", total: "₹ 12,500" },
            { id: "#234-9808", status: "Delivered", date: "Sep 28, 2024", total: "₹ 6,125" },
            { id: "#234-9801", status: "Delivered", date: "Aug 15, 2024", total: "₹ 8,900" },
          ].map((order, i) => (
            <div key={i} className="border border-brand-border bg-brand-ivory p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="font-bold text-[13px]">Order {order.id}</span>
                  <span className="ml-4 text-[11px] text-brand-textMuted">{order.date}</span>
                </div>
                <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px]">Total: <strong>{order.total}</strong></span>
                <Link href={`/dashboard/orders/${order.id.replace("#", "")}`} className="border border-brand-charcoal px-4 py-2 text-[11px] font-bold tracking-widest uppercase hover:bg-brand-charcoal hover:text-white transition-colors">
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
