"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout, type AdminUser } from "@/lib/auth";

const NAV = [
  { section: null, items: [{ href: "/", label: "Dashboard" }] },
  {
    section: "Catalog",
    items: [
      { href: "/products", label: "Products" },
      { href: "/fabrics", label: "Fabric Library (USP)" },
    ],
  },
  {
    section: "Sales",
    items: [
      { href: "/orders", label: "Orders & Tracking" },
      { href: "/customers", label: "Customers" },
    ],
  },
  {
    section: "Settings",
    items: [{ href: "/settings", label: "Platform Settings" }],
  },
];

export function Sidebar({ user }: { user?: AdminUser | null }) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <aside className="w-64 border-r border-border bg-muted/40 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="font-bold text-lg tracking-widest uppercase">Label_234 Admin</h1>
        <p className="text-xs text-muted-foreground mt-1">Management Portal</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1 text-sm font-medium">
        {NAV.map((group, i) => (
          <div key={i} className="flex flex-col gap-1">
            {group.section && (
              <div className="pt-4 pb-1">
                <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {group.section}
                </span>
              </div>
            )}
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? "px-3 py-2 rounded-md bg-accent text-accent-foreground"
                      : "px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-muted-foreground hover:text-foreground"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-border mt-auto">
        {user && (
          <div className="px-3 pb-3">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors text-left"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
