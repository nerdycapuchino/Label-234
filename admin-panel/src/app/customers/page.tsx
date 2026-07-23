"use client";

import { useEffect, useState } from "react";
import { getAdminCustomers, type AdminCustomer } from "@/lib/customers";

function formatJoined(iso: string) {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setCustomers(await getAdminCustomers());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load customers");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-2">
            Manage customer profiles, measurements, and purchase history.
          </p>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers..."
          className="border border-border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring w-64"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
          {error}
        </p>
      )}

      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-4 mb-4">
            <div className="col-span-2">Customer</div>
            <div>Phone</div>
            <div>Orders</div>
            <div>Joined</div>
          </div>
          {loading ? (
            <p className="text-sm text-muted-foreground py-6">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6">
              {customers.length === 0
                ? "No customers yet. They appear here once orders are placed."
                : "No customers match your search."}
            </p>
          ) : (
            <div className="space-y-3">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  className="grid grid-cols-5 items-center py-3 border-b border-border/30 last:border-0"
                >
                  <div className="col-span-2">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.email}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{c.phone || "-"}</div>
                  <div className="text-sm">{c._count?.orders ?? 0}</div>
                  <div className="text-sm text-muted-foreground">{formatJoined(c.createdAt)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
