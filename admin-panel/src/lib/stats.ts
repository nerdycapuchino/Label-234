import { apiRequest } from "./api";

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  productionStatus: string;
  paymentStatus: string;
  firstItem: string | null;
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  paidOrderCount: number;
  activeOrders: number;
  reservedFabrics: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: RecentOrder[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return apiRequest<DashboardStats>("/api/stats/dashboard", { auth: true });
}
