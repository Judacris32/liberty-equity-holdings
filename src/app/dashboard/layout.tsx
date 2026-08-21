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

  // Portfolio Value and Available Balance are intentionally the same
  // number. available_balance is the one real spendable figure on the
  // account — total_profit is a separate running stat, not a second pot
  // of money sitting on top of it (any real profit already gets folded
  // into available_balance the moment it's earned). Adding them together
  // here would double-count that money and show a bigger number than
  // what's actually in the account.
  const portfolioValue = account ? parseFloat(account.available_balance) : 0;

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
