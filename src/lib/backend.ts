// Storefront client for the Label 234 backend API (products, orders, customers).
// Public product reads need no auth.

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3002";

export async function backendGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Backend request failed: ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error("Error fetching backend API:", error);
    return null;
  }
}

export async function backendPost<T>(
  path: string,
  body: unknown
): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`Backend POST failed: ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error("Error posting to backend API:", error);
    return null;
  }
}
