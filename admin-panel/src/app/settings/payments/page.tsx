"use client";

import {
  SettingsHeader,
  Field,
  inputClass,
  SaveBar,
} from "@/components/settings/SettingsPage";
import { useSettingsSection } from "@/components/settings/useSettingsSection";
import type { PaymentGateway } from "@/lib/settings";

const DEFAULTS: PaymentGateway = {
  razorpayKeyId: "",
  razorpayKeySecret: "",
  testMode: true,
};

export default function PaymentSettingsPage() {
  const { data, setData, loading, saving, saved, error, save } =
    useSettingsSection<PaymentGateway>("payment_gateway", DEFAULTS);

  return (
    <div className="p-8 space-y-8 max-w-2xl">
      <SettingsHeader
        title="Payment Gateway"
        desc="Configure Razorpay API keys and payment settings."
      />
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <form onSubmit={save} className="space-y-5">
          <Field
            label="Razorpay Key ID"
            hint="Starts with rzp_test_ (test) or rzp_live_ (production)."
          >
            <input
              className={inputClass}
              value={data.razorpayKeyId}
              onChange={(e) => setData({ ...data, razorpayKeyId: e.target.value })}
              placeholder="rzp_test_xxxxxxxxxxxx"
            />
          </Field>
          <Field
            label="Razorpay Key Secret"
            hint="Stored server-side. Never exposed to the storefront."
          >
            <input
              className={inputClass}
              type="password"
              value={data.razorpayKeySecret}
              onChange={(e) => setData({ ...data, razorpayKeySecret: e.target.value })}
              placeholder="••••••••••••••••"
            />
          </Field>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={data.testMode}
              onChange={(e) => setData({ ...data, testMode: e.target.checked })}
              className="h-4 w-4"
            />
            Test mode (use test keys, no real charges)
          </label>
          <SaveBar saving={saving} saved={saved} error={error} />
        </form>
      )}
    </div>
  );
}
