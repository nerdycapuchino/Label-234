"use client";

import { useEffect, useState } from "react";
import {
  getFabricInventory,
  createFabric,
  deleteFabric,
  type FabricRecord,
} from "@/lib/fabrics";
import { getAdminProducts, type Product } from "@/lib/products";

const STATUS_STYLE: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-800",
  RESERVED: "bg-amber-100 text-amber-800",
  SOLD_OUT: "bg-red-100 text-red-800",
};

export default function AdminFabrics() {
  const [fabrics, setFabrics] = useState<FabricRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [productId, setProductId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [meters, setMeters] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [fab, prod] = await Promise.all([
        getFabricInventory(),
        getAdminProducts(),
      ]);
      setFabrics(fab);
      setProducts(prod);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load fabrics");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!productId || !rollNumber || meters <= 0) {
      setError("Pick a product, roll number, and meters.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await createFabric({ productId, rollNumber, quantityMeters: meters });
      setProductId("");
      setRollNumber("");
      setMeters(0);
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add fabric roll");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this fabric roll?")) return;
    try {
      await deleteFabric(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  const available = fabrics.filter((f) => f.status === "AVAILABLE").length;
  const reserved = fabrics.filter((f) => f.status === "RESERVED").length;
  const soldOut = fabrics.filter((f) => f.status === "SOLD_OUT").length;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fabric Library</h1>
          <p className="text-muted-foreground mt-2">
            Track every exclusive fabric roll — the heart of Label 234.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow hover:bg-primary/90 transition-colors"
        >
          {showForm ? "Cancel" : "Add Fabric Roll"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Rolls</h3>
          <p className="text-2xl font-bold">{fabrics.length}</p>
        </div>
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Available</h3>
          <p className="text-2xl font-bold text-green-600">{available}</p>
        </div>
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Reserved</h3>
          <p className="text-2xl font-bold text-amber-600">{reserved}</p>
        </div>
        <div className="p-5 border border-border rounded-xl bg-card shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Sold Out</h3>
          <p className="text-2xl font-bold text-red-600">{soldOut}</p>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="border border-border rounded-xl bg-card p-6 space-y-4 shadow-sm"
        >
          <h2 className="text-lg font-semibold">New Fabric Roll</h2>
          {products.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Add a product first before creating fabric rolls.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1.5">Product *</label>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent"
                >
                  <option value="">Select product…</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Roll Number *</label>
                <input
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent"
                  placeholder="ROLL-001-A"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Meters *</label>
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={meters || ""}
                  onChange={(e) => setMeters(Number(e.target.value))}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent"
                  placeholder="10"
                />
              </div>
            </div>
          )}
          {products.length > 0 && (
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Add Roll"}
            </button>
          )}
        </form>
      )}

      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-4 mb-4">
            <div>Roll #</div>
            <div className="col-span-2">Fabric</div>
            <div>Meters (avail/total)</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>
          {loading ? (
            <p className="text-sm text-muted-foreground py-6">Loading…</p>
          ) : fabrics.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6">
              No fabric rolls yet. Click &ldquo;Add Fabric Roll&rdquo; to create one.
            </p>
          ) : (
            <div className="space-y-3">
              {fabrics.map((f) => (
                <div
                  key={f.id}
                  className="grid grid-cols-6 items-center py-3 border-b border-border/30 last:border-0"
                >
                  <div className="text-sm font-mono text-muted-foreground">{f.rollNumber}</div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium">{f.product.title}</p>
                    <p className="text-xs text-muted-foreground">{f.product.fabricType}</p>
                  </div>
                  <div className="text-sm">
                    {(f.quantityMeters - f.reservedMeters - f.soldMeters).toFixed(1)} /{" "}
                    {f.quantityMeters.toFixed(1)} m
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        STATUS_STYLE[f.status] ?? "bg-muted text-muted-foreground"
                      }`}
                    >
                      {f.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="text-xs text-destructive hover:underline"
                    >
                      Delete
                    </button>
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
