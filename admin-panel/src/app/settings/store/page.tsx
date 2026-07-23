"use client";

import {
  SettingsHeader,
  Field,
  inputClass,
  SaveBar,
} from "@/components/settings/SettingsPage";
import { useSettingsSection } from "@/components/settings/useSettingsSection";
import type { StoreInfo } from "@/lib/settings";

const DEFAULTS: StoreInfo = {
  brandName: "",
  legalName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  gstin: "",
};

export default function StoreSettingsPage() {
  const { data, setData, loading, saving, saved, error, save } =
    useSettingsSection<StoreInfo>("store_info", DEFAULTS);

  return (
    <div className="p-8 space-y-8 max-w-3xl">
      <SettingsHeader
        title="Store Information"
        desc="Brand name, logo, boutique address, and contact details."
      />
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <form onSubmit={save} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Brand Name">
              <input
                className={inputClass}
                value={data.brandName}
                onChange={(e) => setData({ ...data, brandName: e.target.value })}
                placeholder="Label 234"
              />
            </Field>
            <Field label="Legal Entity Name">
              <input
                className={inputClass}
                value={data.legalName}
                onChange={(e) => setData({ ...data, legalName: e.target.value })}
                placeholder="Label 234 Pvt Ltd"
              />
            </Field>
            <Field label="Contact Email">
              <input
                className={inputClass}
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="hello@label234.com"
              />
            </Field>
            <Field label="Contact Phone">
              <input
                className={inputClass}
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </Field>
            <Field label="Address Line 1">
              <input
                className={inputClass}
                value={data.addressLine1}
                onChange={(e) => setData({ ...data, addressLine1: e.target.value })}
                placeholder="Model Town"
              />
            </Field>
            <Field label="Address Line 2">
              <input
                className={inputClass}
                value={data.addressLine2}
                onChange={(e) => setData({ ...data, addressLine2: e.target.value })}
              />
            </Field>
            <Field label="City">
              <input
                className={inputClass}
                value={data.city}
                onChange={(e) => setData({ ...data, city: e.target.value })}
                placeholder="Panipat"
              />
            </Field>
            <Field label="State">
              <input
                className={inputClass}
                value={data.state}
                onChange={(e) => setData({ ...data, state: e.target.value })}
                placeholder="Haryana"
              />
            </Field>
            <Field label="Postal Code">
              <input
                className={inputClass}
                value={data.postalCode}
                onChange={(e) => setData({ ...data, postalCode: e.target.value })}
                placeholder="132103"
              />
            </Field>
            <Field label="GSTIN">
              <input
                className={inputClass}
                value={data.gstin}
                onChange={(e) => setData({ ...data, gstin: e.target.value })}
                placeholder="06ABCDE1234F1Z5"
              />
            </Field>
          </div>
          <SaveBar saving={saving} saved={saved} error={error} />
        </form>
      )}
    </div>
  );
}
