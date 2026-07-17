export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">Welcome to the Label 234 Management Panel.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow hover:bg-primary/90 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 border border-border rounded-xl bg-card text-card-foreground shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">₹ 14,25,000</p>
          <p className="text-xs text-green-600 mt-2 font-medium">+12.5% from last month</p>
        </div>
        <div className="p-6 border border-border rounded-xl bg-card text-card-foreground shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Active Orders</h3>
          <p className="text-3xl font-bold">42</p>
          <p className="text-xs text-muted-foreground mt-2">12 awaiting production</p>
        </div>
        <div className="p-6 border border-border rounded-xl bg-card text-card-foreground shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Fabric Reserved</h3>
          <p className="text-3xl font-bold">18</p>
          <p className="text-xs text-muted-foreground mt-2">Unique cuts currently blocked</p>
        </div>
        <div className="p-6 border border-border rounded-xl bg-card text-card-foreground shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Appointments</h3>
          <p className="text-3xl font-bold">5</p>
          <p className="text-xs text-muted-foreground mt-2">Boutique visits this week</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
        {/* Recent Orders Table Placeholder */}
        <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Bespoke Orders</h2>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0 last:pb-0">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-muted rounded-md shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium">Order #234-98{10+i}</p>
                      <p className="text-xs text-muted-foreground">Pastel Chikankari • Bespoke Kurta</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Tailor Assigned
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">Due: Oct {15+i}, 2024</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed Placeholder */}
        <div className="border border-border rounded-xl bg-card shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Production Activity</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></div>
              <div>
                <p className="text-sm font-medium">Pattern prepared for #234-9812</p>
                <p className="text-xs text-muted-foreground">Master Ji • 10 mins ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 shrink-0"></div>
              <div>
                <p className="text-sm font-medium">Payment verified for #234-9815</p>
                <p className="text-xs text-muted-foreground">System • 45 mins ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-purple-500 shrink-0"></div>
              <div>
                <p className="text-sm font-medium">New Fabric Reserved: Ivory Silk</p>
                <p className="text-xs text-muted-foreground">Storefront • 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
