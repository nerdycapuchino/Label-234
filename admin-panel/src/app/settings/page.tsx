export default function AdminSettings() {
  return (
    <div className="p-8 space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground mt-2">Configure users, roles, payments, shipping, and integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">Users & Roles</h3>
          <p className="text-sm text-muted-foreground">Manage admin users, tailor accounts, and permission levels.</p>
        </div>
        <div className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">Payment Gateway</h3>
          <p className="text-sm text-muted-foreground">Configure Razorpay API keys and payment settings.</p>
        </div>
        <div className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">Shipping & Delivery</h3>
          <p className="text-sm text-muted-foreground">Set shipping zones, rates, and delivery partner integrations.</p>
        </div>
        <div className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">Tax Configuration</h3>
          <p className="text-sm text-muted-foreground">GST rates, HSN codes, and tax exemptions.</p>
        </div>
        <div className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">Integrations</h3>
          <p className="text-sm text-muted-foreground">Shiprocket, WhatsApp Business, Google Analytics, and more.</p>
        </div>
        <div className="border border-border rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">Store Information</h3>
          <p className="text-sm text-muted-foreground">Brand name, logo, boutique address, and contact details.</p>
        </div>
      </div>
    </div>
  );
}
