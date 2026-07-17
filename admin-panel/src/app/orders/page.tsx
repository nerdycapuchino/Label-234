export default function AdminOrders() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground mt-2">Track bespoke tailoring and fabric orders.</p>
        </div>
      </div>
      
      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-border/50 last:border-0 last:pb-0">
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 bg-muted rounded-md shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold">Order #234-98{10+i}</p>
                    <p className="text-xs text-muted-foreground mt-1">Customer: Aditi Sharma • ₹12,500</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Pattern Prep
                  </span>
                  <button className="px-3 py-1 text-xs border border-border rounded-md hover:bg-accent transition-colors">
                    Update Stage
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
