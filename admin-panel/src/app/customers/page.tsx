export default function AdminCustomers() {
  const customers = [
    { name: "Aditi Sharma", email: "aditi@example.com", orders: 4, spent: "₹ 48,500", joined: "Jan 2024" },
    { name: "Priya Kapoor", email: "priya@example.com", orders: 2, spent: "₹ 22,300", joined: "Mar 2024" },
    { name: "Meera Patel", email: "meera@example.com", orders: 6, spent: "₹ 72,100", joined: "Nov 2023" },
    { name: "Sneha Reddy", email: "sneha@example.com", orders: 1, spent: "₹ 8,900", joined: "Sep 2024" },
    { name: "Isha Gupta", email: "isha@example.com", orders: 3, spent: "₹ 35,750", joined: "Jun 2024" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-2">Manage customer profiles, measurements, and purchase history.</p>
        </div>
        <div className="relative">
          <input type="text" placeholder="Search customers..." className="border border-border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring w-64" />
        </div>
      </div>

      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-4 mb-4">
            <div className="col-span-2">Customer</div>
            <div>Orders</div>
            <div>Total Spent</div>
            <div>Joined</div>
            <div>Actions</div>
          </div>
          <div className="space-y-3">
            {customers.map((c, i) => (
              <div key={i} className="grid grid-cols-6 items-center py-3 border-b border-border/30 last:border-0">
                <div className="col-span-2">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.email}</p>
                </div>
                <div className="text-sm">{c.orders}</div>
                <div className="text-sm font-medium">{c.spent}</div>
                <div className="text-sm text-muted-foreground">{c.joined}</div>
                <div>
                  <button className="px-3 py-1 text-xs border border-border rounded-md hover:bg-accent transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
