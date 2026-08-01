import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAccount } from "@/lib/queries/account";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belt-and-suspenders check — middleware already guards this route, but
  // Server Components should never assume upstream checks always ran.
  if (!user) {
    redirect("/login");
  }

  const account = await getAccount();

  return (
    <DashboardShell
      kycStatus={account?.kyc_status ?? "unverified"}
      userEmail={user.email ?? ""}
      isAdmin={account?.is_admin ?? false}
    >
      {children}
    </DashboardShell>
  );
}
