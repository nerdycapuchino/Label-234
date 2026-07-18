import { fetchAPI, getStrapiMedia } from "@/lib/api";

export interface Product {
  id: string;
  documentId?: string;
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

const fallbackImages = [
  "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=1200&auto=format&fit=crop",
];

export const fallbackProducts: Product[] = [
  {
    id: "sample-product",
    title: "Pastel Chikankari Cotton",
    slug: "sample-product",
    pricePerMeter: 2450,
    description:
      "Hand-embroidered chikankari on breathable cotton. Lightweight, luxurious, and crafted for comfort.",
    fabricType: "Cotton",
    work: "Chikankari",
    widthInches: 44,
    careInstructions: "Dry clean / gentle wash",
    isSoldOut: false,
    eligibleForBespoke: true,
    images: fallbackImages,
  },
  {
    id: "midnight-bloom-silk",
    title: "Midnight Bloom Silk",
    slug: "midnight-bloom-silk",
    pricePerMeter: 24500,
    description: "A rich silk fabric with a deep floral surface for occasion wear.",
    fabricType: "Silk",
    work: "Printed",
    widthInches: 44,
    careInstructions: "Dry clean only",
    isSoldOut: false,
    eligibleForBespoke: true,
    images: [fallbackImages[1]],
  },
  {
    id: "crimson-zari-georgette",
    title: "Crimson Zari Georgette",
    slug: "crimson-zari-georgette",
    pricePerMeter: 18900,
    description: "Flowing georgette with zari detailing and a festive crimson tone.",
    fabricType: "Georgette",
    work: "Zari",
    widthInches: 44,
    careInstructions: "Dry clean only",
    isSoldOut: false,
    eligibleForBespoke: true,
    images: [fallbackImages[2]],
  },
];

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function extractMediaUrls(media: unknown): string[] {
  const mediaRecord = asRecord(media);
  const data = mediaRecord.data ?? media;
  const entries = Array.isArray(data) ? data : data ? [data] : [];

  return entries
    .map((entry) => {
      const record = asRecord(entry);
      const attributes = asRecord(record.attributes);
      return asString(record.url ?? attributes.url);
    })
    .filter(Boolean)
    .map((url) => getStrapiMedia(url))
    .filter((url): url is string => Boolean(url));
}

function normalizeProduct(entry: unknown): Product {
  const record = asRecord(entry);
  const attributes = asRecord(record.attributes);
  const source = Object.keys(attributes).length > 0 ? attributes : record;
  const title = asString(source.title, "Untitled Fabric");
  const slug = asString(source.slug, asString(record.documentId, String(record.id ?? title)));
  const images = extractMediaUrls(source.images);

  return {
    id: asString(record.documentId, String(record.id ?? slug)),
    documentId: asString(record.documentId) || undefined,
    title,
    slug,
    pricePerMeter: asNumber(source.price_per_meter),
    description: asString(source.description, "A limited Label 234 fabric selected for custom clothing."),
    fabricType: asString(source.fabric_type, "Fabric"),
    work: asString(source.work, "Craft"),
    widthInches: source.width_inches == null ? null : asNumber(source.width_inches),
    careInstructions: asString(source.care_instructions, "Dry clean recommended"),
    isSoldOut: Boolean(source.is_sold_out),
    eligibleForBespoke: source.eligible_for_bespoke !== false,
    images: images.length > 0 ? images : [fallbackImages[0]],
  };
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetchAPI("/products", {
    populate: "*",
    "sort[0]": "createdAt:desc",
  });
  const products = Array.isArray(response?.data) ? response.data.map(normalizeProduct) : [];

  return products.length > 0 ? products : fallbackProducts;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const response = await fetchAPI("/products", {
    populate: "*",
    "filters[slug][$eq]": slug,
  });
  const products = Array.isArray(response?.data) ? response.data.map(normalizeProduct) : [];

  return products[0] ?? fallbackProducts.find((product) => product.slug === slug) ?? fallbackProducts[0];
}
