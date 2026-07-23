"use client";

import {
  SettingsHeader,
  Field,
  inputClass,
  SaveBar,
} from "@/components/settings/SettingsPage";
import { useSettingsSection } from "@/components/settings/useSettingsSection";
import type { TaxSettings } from "@/lib/settings";

const DEFAULTS: TaxSettings = {
  gstEnabled: true,
  gstRate: 5,
  hsnCode: "",
  pricesIncludeTax: true,
};

export default function TaxSettingsPage() {
  const { data, setData, loading, saving, saved, error, save } =
    useSettingsSection<TaxSettings>("tax", DEFAULTS);

  return (
    <div className="p-8 space-y-8 max-w-2xl">
      <SettingsHeader
        title="Tax Configuration"
        desc="GST rates, HSN codes, and tax exemptions."
      />
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <form onSubmit={save} className="space-y-5">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={data.gstEnabled}
              onChange={(e) => setData({ ...data, gstEnabled: e.target.checked })}
              className="h-4 w-4"
            />
            GST enabled
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Field label="GST Rate (%)" hint="Textiles are typically 5% (below ₹1000) or 12%.">
              <input
                className={inputClass}
                type="number"
                min={0}
                step={0.5}
                value={data.gstRate}
                onChange={(e) => setData({ ...data, gstRate: Number(e.target.value) })}
              />
            </Field>
            <Field label="HSN Code" hint="e.g. 5208 for cotton fabrics.">
              <input
                className={inputClass}
                value={data.hsnCode}
                onChange={(e) => setData({ ...data, hsnCode: e.target.value })}
                placeholder="5208"
              />
            </Field>
          </div>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={data.pricesIncludeTax}
              onChange={(e) => setData({ ...data, pricesIncludeTax: e.target.checked })}
              className="h-4 w-4"
            />
            Prices are inclusive of tax
          </label>
          <SaveBar saving={saving} saved={saved} error={error} />
        </form>
      )}
    </div>
  );
}
