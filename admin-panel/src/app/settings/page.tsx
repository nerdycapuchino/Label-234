import Link from "next/link";

const SECTIONS = [
  {
    href: "/settings/users",
    title: "Users & Roles",
    desc: "Manage admin users, tailor accounts, and permission levels.",
  },
  {
    href: "/settings/payments",
    title: "Payment Gateway",
    desc: "Configure Razorpay API keys and payment settings.",
  },
  {
    href: "/settings/shipping",
    title: "Shipping & Delivery",
    desc: "Set shipping zones, rates, and delivery partner integrations.",
  },
  {
    href: "/settings/tax",
    title: "Tax Configuration",
    desc: "GST rates, HSN codes, and tax exemptions.",
  },
  {
    href: "/settings/integrations",
    title: "Integrations",
    desc: "Shiprocket, WhatsApp Business, Google Analytics, and more.",
  },
  {
    href: "/settings/store",
    title: "Store Information",
    desc: "Brand name, logo, boutique address, and contact details.",
  },
];

export default function AdminSettings() {
  return (
    <div className="p-8 space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure users, roles, payments, shipping, and integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all"
          >
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
