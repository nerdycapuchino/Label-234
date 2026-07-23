import { apiRequest } from "./api";

export interface StoreInfo {
  brandName: string;
  legalName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  gstin: string;
}

export interface PaymentGateway {
  razorpayKeyId: string;
  razorpayKeySecret: string;
  testMode: boolean;
}

export interface ShippingZone {
  name: string;
  rate: number;
  freeAbove: number;
}

export interface ShippingSettings {
  freeShippingThreshold: number;
  defaultRate: number;
  zones: ShippingZone[];
}

export interface TaxSettings {
  gstEnabled: boolean;
  gstRate: number;
  hsnCode: string;
  pricesIncludeTax: boolean;
}

export interface IntegrationSettings {
  shiprocketEmail: string;
  shiprocketPassword: string;
  whatsappNumber: string;
  whatsappApiKey: string;
  googleAnalyticsId: string;
}

export type SettingsKey =
  | "store_info"
  | "payment_gateway"
  | "shipping"
  | "tax"
  | "integrations";

export async function getSetting<T>(key: SettingsKey): Promise<T | null> {
  const res = await apiRequest<{ key: string; value: T | null }>(
    `/api/settings/${key}`,
    { auth: true }
  );
  return res.value;
}

export async function saveSetting<T>(key: SettingsKey, value: T): Promise<T> {
  const res = await apiRequest<{ key: string; value: T }>(
    `/api/settings/${key}`,
    { method: "PUT", body: value, auth: true }
  );
  return res.value;
}
