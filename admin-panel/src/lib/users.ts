import { apiRequest } from "./api";

export interface AdminUserRecord {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "MANAGER";
  active: boolean;
  createdAt: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role: string;
}

export async function getUsers(): Promise<AdminUserRecord[]> {
  return apiRequest<AdminUserRecord[]>("/api/users", { auth: true });
}

export async function createUser(input: CreateUserInput): Promise<AdminUserRecord> {
  return apiRequest<AdminUserRecord>("/api/users", {
    method: "POST",
    body: input,
    auth: true,
  });
}

export async function updateUser(
  id: string,
  input: Partial<{ name: string; role: string; active: boolean }>
): Promise<AdminUserRecord> {
  return apiRequest<AdminUserRecord>(`/api/users/${id}`, {
    method: "PATCH",
    body: input,
    auth: true,
  });
}

export async function deleteUser(id: string): Promise<void> {
  return apiRequest<void>(`/api/users/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
