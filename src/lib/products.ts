import { backendGet } from "@/lib/backend";

export interface Product {
  id: string;
  title: string;
  slug: string;
  pricePerMeter: number;
  description: string;
  fabricType: string;
  work: string;
  widthInches: number | null;
  careInstructions: string;
  isSoldOut: boolean;
  eligibleForBespoke: boolean;
  images: string[];
}

interface BackendImage {
  url: string;
}

interface BackendProduct {
  id: string;
  title: string;
  slug: string;
  pricePerMeter: number;
  description: string;
  fabricType: string;
  work: string;
  widthInches: number | null;
  careInstructions: string;
  isSoldOut: boolean;
  eligibleForBespoke: boolean;
  images: BackendImage[];
}

function normalize(p: BackendProduct): Product {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    pricePerMeter: p.pricePerMeter,
    description: p.description,
    fabricType: p.fabricType,
    work: p.work,
    widthInches: p.widthInches,
    careInstructions: p.careInstructions,
    isSoldOut: p.isSoldOut,
    eligibleForBespoke: p.eligibleForBespoke,
    images: (p.images || []).map((img) => img.url).filter(Boolean),
  };
}

export async function getProducts(): Promise<Product[]> {
  const data = await backendGet<BackendProduct[]>("/api/products");
  return Array.isArray(data) ? data.map(normalize) : [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await backendGet<BackendProduct>(
    `/api/products/${encodeURIComponent(slug)}`
  );
  return data ? normalize(data) : null;
}
