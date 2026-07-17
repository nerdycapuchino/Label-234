import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-muted/40 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="font-bold text-lg tracking-widest uppercase">Label_234 Admin</h1>
        <p className="text-xs text-muted-foreground mt-1">Management Portal</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 text-sm font-medium">
        <Link href="/" className="px-3 py-2 rounded-md bg-accent text-accent-foreground">Dashboard</Link>
        <div className="pt-4 pb-1">
          <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Catalog</span>
        </div>
        <Link href="/products" className="px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground">Products</Link>
        <Link href="/fabrics" className="px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground">Fabric Library (USP)</Link>
        <div className="pt-4 pb-1">
          <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sales</span>
        </div>
        <Link href="/orders" className="px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground">Orders & Tracking</Link>
        <Link href="/customers" className="px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground">Customers</Link>
        <div className="pt-4 pb-1">
          <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Settings</span>
        </div>
        <Link href="/settings" className="px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground">Platform Settings</Link>
      </nav>
      <div className="p-4 border-t border-border mt-auto">
        <button className="w-full px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors text-left">Log Out</button>
      </div>
    </aside>
  );
}
