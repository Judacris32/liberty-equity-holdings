import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { getAccount } from "@/lib/queries/account";
import { getRecentTransactions } from "@/lib/queries/transactions";
import { getRecentOrders } from "@/lib/queries/orders";
import { BalanceHero } from "@/components/dashboard/balance-hero";
import { StatRow } from "@/components/dashboard/stat-row";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { SetupProgress } from "@/components/dashboard/setup-progress";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardOverviewPage() {
  const [account, transactions, orders] = await Promise.all([
    getAccount(),
    getRecentTransactions(),
    getRecentOrders(),
  ]);

  if (!account) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">
            Overview
          </h1>
        </div>
        <div className="flex flex-col items-center gap-4 rounded-2xl glass-surface glass-border p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10">
            <AlertCircle className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-base font-medium text-[rgb(var(--foreground))]">
              We couldn&apos;t load your account
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[rgb(var(--muted))]">
              Your profile exists, but no account record is attached to it
              yet. This usually resolves on its own — try refreshing, and
              reach out if it persists.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="mt-1 rounded-full bg-bull px-5 py-2.5 text-sm font-semibold text-[#07090e] transition-transform hover:scale-[1.03]"
          >
            Refresh
          </Link>
        </div>
      </div>
    );
  }

  const displayName =
    account.email?.split("@")[0].replace(/[._-]/g, " ") ?? "there";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold capitalize tracking-tight text-[rgb(var(--foreground))]">
          {greeting()}, {displayName}
        </h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Here&apos;s where things stand right now.
        </p>
      </div>

      <BalanceHero account={account} />

      <StatRow account={account} orderCount={orders.length} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <ActivityFeed transactions={transactions} orders={orders} />
        <SetupProgress
          account={account}
          hasTransactions={transactions.length > 0}
          hasOrders={orders.length > 0}
        />
      </div>
    </div>
  );
}
