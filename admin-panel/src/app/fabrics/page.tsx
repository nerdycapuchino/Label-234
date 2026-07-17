export default function AdminFabrics() {
  const fabrics = [
    { id: "FAB-001", name: "Pastel Chikankari Cotton", roll: "Roll #12A", status: "Reserved", customer: "Aditi Sharma" },
    { id: "FAB-002", name: "Ivory Silk Organza", roll: "Roll #8C", status: "Available", customer: "-" },
    { id: "FAB-003", name: "Sage Green Cotton Silk", roll: "Roll #15B", status: "Used", customer: "Priya Kapoor" },
    { id: "FAB-004", name: "Blush Pink Organza", roll: "Roll #22D", status: "Available", customer: "-" },
    { id: "FAB-005", name: "Midnight Zari Georgette", roll: "Roll #7F", status: "Reserved", customer: "Meera Patel" },
    { id: "FAB-006", name: "Lavender Chanderi", roll: "Roll #3A", status: "Available", customer: "-" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fabric Library</h1>
          <p className="text-muted-foreground mt-2">Track every exclusive fabric roll — the heart of Label 234.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow hover:bg-primary/90 transition-colors">
          Add Fabric Roll
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Fabrics</h3>
          <p className="text-2xl font-bold">142</p>
        </div>
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Available</h3>
          <p className="text-2xl font-bold text-green-600">98</p>
        </div>
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Reserved</h3>
          <p className="text-2xl font-bold text-amber-600">26</p>
        </div>
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Sold / Used</h3>
          <p className="text-2xl font-bold text-red-600">18</p>
        </div>
      </div>

      {/* Fabric Table */}
      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-4 mb-4">
            <div>ID</div>
            <div className="col-span-2">Fabric Name</div>
            <div>Roll</div>
            <div>Status</div>
            <div>Customer</div>
          </div>
          <div className="space-y-3">
            {fabrics.map((fab) => (
              <div key={fab.id} className="grid grid-cols-6 items-center py-3 border-b border-border/30 last:border-0">
                <div className="text-sm font-mono text-muted-foreground">{fab.id}</div>
                <div className="col-span-2 text-sm font-medium">{fab.name}</div>
                <div className="text-sm text-muted-foreground">{fab.roll}</div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    fab.status === "Available" ? "bg-green-100 text-green-800" :
                    fab.status === "Reserved" ? "bg-amber-100 text-amber-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {fab.status}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{fab.customer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
