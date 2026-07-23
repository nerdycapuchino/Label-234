import { apiRequest } from "./api";

export interface AdminCustomer {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  createdAt: string;
  _count?: { orders: number };
  measurements?: unknown[];
  addresses?: unknown[];
}

export async function getAdminCustomers(): Promise<AdminCustomer[]> {
  return apiRequest<AdminCustomer[]>("/api/customers/admin/all", {
    auth: true,
  });
}
