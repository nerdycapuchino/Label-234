"use client";

import {
  SettingsHeader,
  Field,
  inputClass,
  SaveBar,
} from "@/components/settings/SettingsPage";
import { useSettingsSection } from "@/components/settings/useSettingsSection";
import type { IntegrationSettings } from "@/lib/settings";

const DEFAULTS: IntegrationSettings = {
  shiprocketEmail: "",
  shiprocketPassword: "",
  whatsappNumber: "",
  whatsappApiKey: "",
  googleAnalyticsId: "",
};

export default function IntegrationsSettingsPage() {
  const { data, setData, loading, saving, saved, error, save } =
    useSettingsSection<IntegrationSettings>("integrations", DEFAULTS);

  return (
    <div className="p-8 space-y-8 max-w-2xl">
      <SettingsHeader
        title="Integrations"
        desc="Shiprocket, WhatsApp Business, Google Analytics, and more."
      />
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <form onSubmit={save} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Shiprocket</h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Account Email">
                <input
                  className={inputClass}
                  type="email"
                  value={data.shiprocketEmail}
                  onChange={(e) => setData({ ...data, shiprocketEmail: e.target.value })}
                />
              </Field>
              <Field label="Password / API Key">
                <input
                  className={inputClass}
                  type="password"
                  value={data.shiprocketPassword}
                  onChange={(e) => setData({ ...data, shiprocketPassword: e.target.value })}
                />
              </Field>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">WhatsApp Business</h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Business Number">
                <input
                  className={inputClass}
                  value={data.whatsappNumber}
                  onChange={(e) => setData({ ...data, whatsappNumber: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </Field>
              <Field label="API Key">
                <input
                  className={inputClass}
                  type="password"
                  value={data.whatsappApiKey}
                  onChange={(e) => setData({ ...data, whatsappApiKey: e.target.value })}
                />
              </Field>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Google Analytics</h3>
            <Field label="Measurement ID" hint="e.g. G-XXXXXXXXXX">
              <input
                className={inputClass}
                value={data.googleAnalyticsId}
                onChange={(e) => setData({ ...data, googleAnalyticsId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
              />
            </Field>
          </div>

          <SaveBar saving={saving} saved={saved} error={error} />
        </form>
      )}
    </div>
  );
}
