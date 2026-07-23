"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { verifyToken, type AdminUser } from "@/lib/auth";

const PUBLIC_ROUTES = ["/login"];

export function AuthShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  const isPublic = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    let active = true;

    async function check() {
      if (isPublic) {
        setChecked(true);
        return;
      }
      const verified = await verifyToken();
      if (!active) return;
      if (!verified) {
        router.replace("/login");
        return;
      }
      setUser(verified);
      setChecked(true);
    }

    check();
    return () => {
      active = false;
    };
  }, [pathname, isPublic, router]);

  // Public routes (login) render without the admin shell.
  if (isPublic) {
    return <>{children}</>;
  }

  // While verifying, show a light loading state.
  if (!checked) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return (
    <>
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </>
  );
}
