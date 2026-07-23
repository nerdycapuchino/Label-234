import { apiRequest, setToken, clearToken } from "./api";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: AdminUser;
}

export async function login(email: string, password: string): Promise<AdminUser> {
  const res = await apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
  setToken(res.token);
  return res.user;
}

export async function verifyToken(): Promise<AdminUser | null> {
  try {
    const res = await apiRequest<{ user: AdminUser }>("/api/auth/verify", {
      auth: true,
    });
    return res.user;
  } catch {
    return null;
  }
}

export function logout() {
  clearToken();
}
