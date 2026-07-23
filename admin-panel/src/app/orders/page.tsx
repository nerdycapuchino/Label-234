"use client";

import { useEffect, useState } from "react";
import {
  getAdminOrders,
  updateOrderStatus,
  refundOrder,
  type AdminOrder,
  type ProductionStatus,
} from "@/lib/orders";

const STAGES: ProductionStatus[] = [
  "ORDER_PLACED",
  "FABRIC_RESERVED",
  "CUTTING",
  "STITCHING",
  "QUALITY_CHECK",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

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

const PAYMENT_STYLE: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  COMPLETED: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-200 text-gray-800",
  PARTIAL_REFUND: "bg-orange-100 text-orange-800",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setOrders(await getAdminOrders());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatusChange(id: string, status: ProductionStatus) {
    setUpdatingId(id);
    setError("");
    try {
      await updateOrderStatus(id, status);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setUpdatingId("");
    }
  }

  async function handleRefund(order: AdminOrder) {
    const input = prompt(
      `Refund amount for #${order.orderNumber} (max ₹${order.totalAmount}). Enter amount:`,
      String(order.totalAmount)
    );
    if (input === null) return;
    const amount = Number(input);
    if (!Number.isFinite(amount) || amount <= 0 || amount > order.totalAmount) {
      setError("Invalid refund amount.");
      return;
    }
    setUpdatingId(order.id);
    setError("");
    try {
      await refundOrder(order.id, amount);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Refund failed");
    } finally {
      setUpdatingId("");
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground mt-2">
            Track bespoke tailoring and fabric orders.
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
          {error}
        </p>
      )}

      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="p-6">
          {loading ? (
            <p className="text-sm text-muted-foreground py-6">Loading…</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6">
              No orders yet. Orders placed on the storefront will appear here.
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center py-4 border-b border-border/50 last:border-0 last:pb-0"
                >
                  <div className="flex gap-6 items-center">
                    <div>
                      <p className="text-sm font-bold">#{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {order.customer.name} • {order.customer.email} • ₹
                        {order.totalAmount.toLocaleString("en-IN")}
                      </p>
                      <span
                        className={`inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          PAYMENT_STYLE[order.paymentStatus] ?? "bg-muted"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        STAGE_STYLE[order.productionStatus] ?? "bg-muted"
                      }`}
                    >
                      {STAGE_LABEL[order.productionStatus] ?? order.productionStatus}
                    </span>
                    <select
                      value={order.productionStatus}
                      disabled={updatingId === order.id}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as ProductionStatus)
                      }
                      className="border border-border rounded-md px-2 py-1 text-xs bg-transparent outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {STAGE_LABEL[s]}
                        </option>
                      ))}
                    </select>
                    {(order.paymentStatus === "COMPLETED" ||
                      order.paymentStatus === "PARTIAL_REFUND") && (
                      <button
                        onClick={() => handleRefund(order)}
                        disabled={updatingId === order.id}
                        className="px-3 py-1 text-xs border border-border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
                      >
                        Refund
                      </button>
                    )}
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
