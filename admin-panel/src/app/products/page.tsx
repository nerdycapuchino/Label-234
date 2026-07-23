"use client";

import { useEffect, useState } from "react";
import {
  getAdminProducts,
  createProduct,
  deleteProduct,
  type Product,
  type CreateProductInput,
} from "@/lib/products";

const EMPTY_FORM: CreateProductInput = {
  slug: "",
  title: "",
  description: "",
  fabricType: "",
  work: "",
  pricePerMeter: 0,
  widthInches: 44,
  careInstructions: "Dry clean recommended",
  images: [],
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateProductInput>(EMPTY_FORM);
  const [imageInput, setImageInput] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload: CreateProductInput = {
        ...form,
        slug: form.slug || slugify(form.title),
        images: imageInput
          .split(/[\n,]/)
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await createProduct(payload);
      setForm(EMPTY_FORM);
      setImageInput("");
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    try {
      await deleteProduct(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
          <p className="text-muted-foreground mt-2">Manage fabrics and inventory.</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow hover:bg-primary/90 transition-colors"
        >
          {showForm ? "Cancel" : "Add New Fabric"}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3">
          {error}
        </p>
      )}

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="border border-border rounded-xl bg-card p-6 space-y-4 shadow-sm"
        >
          <h2 className="text-lg font-semibold">New Fabric</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium mb-1.5">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent"
                placeholder="Pastel Chikankari Cotton"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Slug (auto if blank)</label>
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent"
                placeholder="pastel-chikankari-cotton"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Price / Meter (₹) *</label>
              <input
                required
                type="number"
                min={0}
                value={form.pricePerMeter || ""}
                onChange={(e) => setForm({ ...form, pricePerMeter: Number(e.target.value) })}
                className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent"
                placeholder="2450"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Fabric Type</label>
              <input
                value={form.fabricType}
                onChange={(e) => setForm({ ...form, fabricType: e.target.value })}
                className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent"
                placeholder="Cotton"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Work</label>
              <input
                value={form.work}
                onChange={(e) => setForm({ ...form, work: e.target.value })}
                className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent"
                placeholder="Chikankari"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Width (inches)</label>
              <input
                type="number"
                min={0}
                value={form.widthInches ?? ""}
                onChange={(e) => setForm({ ...form, widthInches: Number(e.target.value) })}
                className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent"
                placeholder="44"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent resize-none"
                placeholder="Hand-embroidered chikankari on breathable cotton."
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium mb-1.5">Care Instructions</label>
              <input
                value={form.careInstructions}
                onChange={(e) => setForm({ ...form, careInstructions: e.target.value })}
                className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent"
                placeholder="Dry clean / gentle wash"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium mb-1.5">
                Image URLs (one per line or comma-separated)
              </label>
              <textarea
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                rows={2}
                className="w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent resize-none"
                placeholder="https://…/image1.jpg"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : "Create Product"}
            </button>
          </div>
        </form>
      )}

      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-4 mb-4">
            <div className="col-span-2">Fabric</div>
            <div>Price / Mtr</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>
          {loading ? (
            <p className="text-sm text-muted-foreground py-6">Loading…</p>
          ) : products.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6">
              No products yet. Click &ldquo;Add New Fabric&rdquo; to create one.
            </p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="grid grid-cols-5 items-center py-2">
                  <div className="col-span-2 flex gap-4 items-center">
                    {product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0].url}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded-md shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-muted rounded-md shrink-0" />
                    )}
                    <div>
                      <span className="text-sm font-medium">{product.title}</span>
                      <p className="text-xs text-muted-foreground">
                        {product.fabricType}
                        {product.work ? ` / ${product.work}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm">₹{product.pricePerMeter.toLocaleString("en-IN")}</div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.isSoldOut
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {product.isSoldOut ? "Sold Out" : "Available"}
                    </span>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => handleDelete(product.id)}
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
