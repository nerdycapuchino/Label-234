"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, type DashboardStats } from "@/lib/stats";

const STAGE_LABEL: Record<string, string> = {
  ORDER_PLACED: "Order Placed",
  FABRIC_RESERVED: "Fabric Reserved",
  CUTTING: "Cutting",
  STITCHING: "Stitching",
  QUALITY_CHECK: "Quality Check",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const STAGE_STYLE: Record<string, string> = {
  ORDER_PLACED: "bg-blue-100 text-blue-800",
  FABRIC_RESERVED: "bg-indigo-100 text-indigo-800",
  CUTTING: "bg-amber-100 text-amber-800",
  STITCHING: "bg-amber-100 text-amber-800",
  QUALITY_CHECK: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-cyan-100 text-cyan-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setStats(await getDashboardStats());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">Welcome to the Label 234 Management Panel.</p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
          {error}
        </p>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard
          label="Total Revenue"
          value={loading ? "…" : `₹ ${stats!.totalRevenue.toLocaleString("en-IN")}`}
          sub={loading ? "" : `${stats!.paidOrderCount} paid orders`}
        />
        <KpiCard
          label="Active Orders"
          value={loading ? "…" : String(stats!.activeOrders)}
          sub="In production"
        />
        <KpiCard
          label="Fabric Reserved"
          value={loading ? "…" : String(stats!.reservedFabrics)}
          sub="Unique cuts blocked"
        />
        <KpiCard
          label="Customers"
          value={loading ? "…" : String(stats!.totalCustomers)}
          sub={loading ? "" : `${stats!.totalProducts} products live`}
        />
      </div>

      {/* Recent Orders */}
      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <a href="/orders" className="text-sm text-primary hover:underline">
            View All
          </a>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-sm text-muted-foreground py-4">Loading…</p>
          ) : stats!.recentOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">
              No orders yet. Orders placed on the storefront will appear here.
            </p>
          ) : (
            <div className="space-y-4">
              {stats!.recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex justify-between items-center py-3 border-b border-border/50 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium">#{o.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.customerName}
                      {o.firstItem ? ` • ${o.firstItem}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        STAGE_STYLE[o.productionStatus] ?? "bg-muted"
                      }`}
                    >
                      {STAGE_LABEL[o.productionStatus] ?? o.productionStatus}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      ₹{o.totalAmount.toLocaleString("en-IN")} • {formatDate(o.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="p-6 border border-border rounded-xl bg-card text-card-foreground shadow-sm">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </h3>
      <p className="text-3xl font-bold">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-2">{sub}</p>}
    </div>
  );
}
