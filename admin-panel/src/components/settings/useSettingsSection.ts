"use client";

import { useEffect, useState } from "react";
import { getSetting, saveSetting, type SettingsKey } from "@/lib/settings";

export function useSettingsSection<T>(key: SettingsKey, defaults: T) {
  const [data, setData] = useState<T>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const value = await getSetting<T>(key);
        if (active && value) setData({ ...defaults, ...value });
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Load failed");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  async function save(e?: React.FormEvent) {
    e?.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      await saveSetting<T>(key, data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return { data, setData, loading, saving, saved, error, save };
}
