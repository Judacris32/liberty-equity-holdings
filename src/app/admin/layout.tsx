import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isCurrentUserAdmin } from "@/lib/queries/admin";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const isAdmin = await isCurrentUserAdmin();
  if (!isAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b glass-border glass-surface px-5 py-3.5">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-medium text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </Link>
          <span className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-bull" />
            <span className="text-sm font-semibold text-[rgb(var(--foreground))]">
              Admin
            </span>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <div className="p-5 sm:p-8">{children}</div>
    </div>
  );
}
