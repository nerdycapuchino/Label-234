import { apiRequest } from "./api";

export interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  position: number;
}

export interface Fabric {
  id: string;
  rollNumber: string;
  quantityMeters: number;
  reservedMeters: number;
  soldMeters: number;
  status: "AVAILABLE" | "RESERVED" | "SOLD_OUT";
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  fabricType: string;
  work: string;
  pricePerMeter: number;
  widthInches: number | null;
  careInstructions: string;
  isActive: boolean;
  isSoldOut: boolean;
  eligibleForBespoke: boolean;
  images: ProductImage[];
  fabrics: Fabric[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  slug: string;
  title: string;
  description: string;
  fabricType: string;
  work: string;
  pricePerMeter: number;
  widthInches?: number | null;
  careInstructions: string;
  images: string[];
}

export async function getAdminProducts(): Promise<Product[]> {
  return apiRequest<Product[]>("/api/products/admin/all", { auth: true });
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  return apiRequest<Product>("/api/products", {
    method: "POST",
    body: input,
    auth: true,
  });
}

export async function updateProduct(
  id: string,
  input: Partial<CreateProductInput> & { isActive?: boolean; isSoldOut?: boolean }
): Promise<Product> {
  return apiRequest<Product>(`/api/products/${id}`, {
    method: "PATCH",
    body: input,
    auth: true,
  });
}

export async function deleteProduct(id: string): Promise<void> {
  return apiRequest<void>(`/api/products/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
