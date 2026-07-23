"use client";

import { useEffect, useState } from "react";
import { SettingsHeader, inputClass } from "@/components/settings/SettingsPage";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  type AdminUserRecord,
} from "@/lib/users";

const ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER"];

export default function UsersSettingsPage() {
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
  });
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      setUsers(await getUsers());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
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
      await createUser(form);
      setForm({ name: "", email: "", password: "", role: "ADMIN" });
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(u: AdminUserRecord) {
    try {
      await updateUser(u.id, { active: !u.active });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function handleRoleChange(u: AdminUserRecord, role: string) {
    try {
      await updateUser(u.id, { role });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <SettingsHeader
        title="Users & Roles"
        desc="Manage admin users, tailor accounts, and permission levels."
      />

      <div className="flex justify-end">
        <button
          onClick={() => setShowForm((v) => !v)}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          {showForm ? "Cancel" : "Add User"}
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
          <h2 className="text-lg font-semibold">New Admin User</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className={inputClass}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className={inputClass}
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <select
              className={inputClass}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Creating…" : "Create User"}
          </button>
        </form>
      )}

      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border pb-4 mb-4">
            <div className="col-span-2">User</div>
            <div>Role</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>
          {loading ? (
            <p className="text-sm text-muted-foreground py-6">Loading…</p>
          ) : (
            <div className="space-y-3">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="grid grid-cols-5 items-center py-3 border-b border-border/30 last:border-0"
                >
                  <div className="col-span-2">
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <div>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u, e.target.value)}
                      className="border border-border rounded-md px-2 py-1 text-xs bg-transparent outline-none focus:ring-2 focus:ring-ring"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      onClick={() => handleToggleActive(u)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        u.active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {u.active ? "Active" : "Inactive"}
                    </button>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => handleDelete(u.id)}
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
