"use client";

import Link from "next/link";

export function SettingsHeader({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="border-b border-border pb-6 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-2">{desc}</p>
      </div>
      <Link
        href="/settings"
        className="text-sm text-muted-foreground hover:text-foreground shrink-0"
      >
        ← Back to Settings
      </Link>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "w-full border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring bg-transparent";

export function SaveBar({
  saving,
  saved,
  error,
}: {
  saving: boolean;
  saved: boolean;
  error: string;
}) {
  return (
    <div className="flex items-center gap-4 pt-2">
      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
      {saved && <span className="text-sm text-green-600">Saved.</span>}
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}
