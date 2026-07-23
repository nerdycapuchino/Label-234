import { apiRequest } from "./api";

export interface FabricProduct {
  id: string;
  title: string;
  slug: string;
  fabricType: string;
}

export interface FabricRecord {
  id: string;
  rollNumber: string;
  quantityMeters: number;
  reservedMeters: number;
  soldMeters: number;
  status: "AVAILABLE" | "RESERVED" | "SOLD_OUT";
  product: FabricProduct;
  rolls: unknown[];
  createdAt: string;
}

export interface CreateFabricInput {
  productId: string;
  rollNumber: string;
  quantityMeters: number;
}

export async function getFabricInventory(): Promise<FabricRecord[]> {
  return apiRequest<FabricRecord[]>("/api/fabrics/admin/inventory", {
    auth: true,
  });
}

export async function createFabric(
  input: CreateFabricInput
): Promise<FabricRecord> {
  return apiRequest<FabricRecord>("/api/fabrics", {
    method: "POST",
    body: input,
    auth: true,
  });
}

export async function updateFabric(
  id: string,
  input: Partial<{
    status: string;
    quantityMeters: number;
    reservedMeters: number;
    soldMeters: number;
  }>
): Promise<FabricRecord> {
  return apiRequest<FabricRecord>(`/api/fabrics/${id}`, {
    method: "PATCH",
    body: input,
    auth: true,
  });
}

export async function deleteFabric(id: string): Promise<void> {
  return apiRequest<void>(`/api/fabrics/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
