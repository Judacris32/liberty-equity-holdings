import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAccount } from "@/lib/queries/account";
import { getRecentActivity } from "@/lib/queries/activity";
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

  const [account, notifications] = await Promise.all([
    getAccount(),
    getRecentActivity(),
  ]);

  // Portfolio value = what's available plus what trading has returned.
  const portfolioValue = account
    ? parseFloat(account.available_balance) + parseFloat(account.total_profit)
    : 0;

  return (
    <DashboardShell
      kycStatus={account?.kyc_status ?? "unverified"}
      userEmail={user.email ?? ""}
      isAdmin={account?.is_admin ?? false}
      portfolioValue={portfolioValue}
      notifications={notifications}
    >
      {children}
    </DashboardShell>
  );
}
