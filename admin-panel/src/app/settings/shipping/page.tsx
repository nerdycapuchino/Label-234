"use client";

import {
  SettingsHeader,
  Field,
  inputClass,
  SaveBar,
} from "@/components/settings/SettingsPage";
import { useSettingsSection } from "@/components/settings/useSettingsSection";
import type { ShippingSettings } from "@/lib/settings";

const DEFAULTS: ShippingSettings = {
  freeShippingThreshold: 5000,
  defaultRate: 150,
  zones: [],
};

export default function ShippingSettingsPage() {
  const { data, setData, loading, saving, saved, error, save } =
    useSettingsSection<ShippingSettings>("shipping", DEFAULTS);

  function updateZone(idx: number, patch: Partial<ShippingSettings["zones"][number]>) {
    const zones = data.zones.map((z, i) => (i === idx ? { ...z, ...patch } : z));
    setData({ ...data, zones });
  }

  function addZone() {
    setData({
      ...data,
      zones: [...data.zones, { name: "", rate: 0, freeAbove: 0 }],
    });
  }

  function removeZone(idx: number) {
    setData({ ...data, zones: data.zones.filter((_, i) => i !== idx) });
  }

  return (
    <div className="p-8 space-y-8 max-w-3xl">
      <SettingsHeader
        title="Shipping & Delivery"
        desc="Set shipping zones, rates, and delivery partner integrations."
      />
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <form onSubmit={save} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Free Shipping Above (₹)">
              <input
                className={inputClass}
                type="number"
                min={0}
                value={data.freeShippingThreshold}
                onChange={(e) =>
                  setData({ ...data, freeShippingThreshold: Number(e.target.value) })
                }
              />
            </Field>
            <Field label="Default Rate (₹)">
              <input
                className={inputClass}
                type="number"
                min={0}
                value={data.defaultRate}
                onChange={(e) => setData({ ...data, defaultRate: Number(e.target.value) })}
              />
            </Field>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Shipping Zones</h3>
              <button
                type="button"
                onClick={addZone}
                className="text-xs px-3 py-1.5 border border-border rounded-md hover:bg-accent transition-colors"
              >
                + Add Zone
              </button>
            </div>
            {data.zones.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No zones. Default rate applies everywhere.
              </p>
            ) : (
              <div className="space-y-3">
                {data.zones.map((zone, idx) => (
                  <div key={idx} className="grid grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end">
                    <Field label="Zone Name">
                      <input
                        className={inputClass}
                        value={zone.name}
                        onChange={(e) => updateZone(idx, { name: e.target.value })}
                        placeholder="North India"
                      />
                    </Field>
                    <Field label="Rate (₹)">
                      <input
                        className={inputClass}
                        type="number"
                        min={0}
                        value={zone.rate}
                        onChange={(e) => updateZone(idx, { rate: Number(e.target.value) })}
                      />
                    </Field>
                    <Field label="Free Above (₹)">
                      <input
                        className={inputClass}
                        type="number"
                        min={0}
                        value={zone.freeAbove}
                        onChange={(e) => updateZone(idx, { freeAbove: Number(e.target.value) })}
                      />
                    </Field>
                    <button
                      type="button"
                      onClick={() => removeZone(idx)}
                      className="text-xs text-destructive hover:underline pb-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <SaveBar saving={saving} saved={saved} error={error} />
        </form>
      )}
    </div>
  );
}
