import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getAccount } from "@/lib/queries/account";
import { getRecentTransactions } from "@/lib/queries/transactions";
import { getRecentOrders } from "@/lib/queries/orders";
import { BalanceHero } from "@/components/dashboard/balance-hero";
import { StatGrid } from "@/components/dashboard/stat-grid";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { SetupProgress } from "@/components/dashboard/setup-progress";
import { VerificationPrompt } from "@/components/dashboard/verification-prompt";
import { SupportCard } from "@/components/dashboard/support-card";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { TradingViewMarketOverview } from "@/components/landing/tradingview-market-overview";
import { TradingViewTimeline } from "@/components/landing/tradingview-timeline";
import { BarChart3, Newspaper } from "lucide-react";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardOverviewPage() {
  const supabase = await createClient();

  const [account, transactions, orders, { data: userData }] = await Promise.all([
    getAccount(),
    getRecentTransactions(),
    getRecentOrders(),
    supabase.auth.getUser(),
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

  // Prefer the real name given at sign-up. Fall back to a cleaned-up
  // version of the email's local part only if no name was ever set.
  const fullName = userData?.user?.user_metadata?.full_name as string | undefined;
  const firstName = fullName?.trim().split(/\s+/)[0];

  const displayName =
    firstName ||
    (account?.email
      ? account.email
          .split("@")[0]
          .replace(/[._-]+/g, " ")
          .split(" ")
          .filter(Boolean)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "there");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold capitalize tracking-tight text-[rgb(var(--foreground))] sm:text-3xl">
            {greeting()}, {displayName}!
          </h1>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${
              account.account_type === "business"
                ? "bg-violet-400/10 text-violet-400"
                : account.account_type === "standard"
                  ? "bg-sky-400/10 text-sky-400"
                  : "bg-white/[0.06] text-[rgb(var(--muted))]"
            }`}
          >
            {account.account_type}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-[rgb(var(--muted))]">
            Account Status:
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              account.kyc_status === "verified"
                ? "bg-bull/10 text-bull"
                : account.kyc_status === "pending"
                  ? "bg-amber-500/10 text-amber-500"
                  : "bg-white/[0.06] text-[rgb(var(--muted))]"
            }`}
          >
            {account.kyc_status === "verified"
              ? "Verified"
              : account.kyc_status === "pending"
                ? "Pending Review"
                : "Active"}
          </span>
        </div>
      </div>

      {/* Balance beside the stat grid, matching a dense terminal layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.15fr]">
        <BalanceHero account={account} />
        <StatGrid account={account} orderCount={orders.length} />
      </div>

      <VerificationPrompt kycStatus={account.kyc_status} />

      {/* Market overview beside live news */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <DashboardPanel icon={BarChart3} title="Market Overview">
          <TradingViewMarketOverview />
        </DashboardPanel>
        <DashboardPanel icon={Newspaper} title="Live Market News">
          <TradingViewTimeline />
        </DashboardPanel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <ActivityFeed transactions={transactions} orders={orders} />
        <div className="flex flex-col gap-6">
          <SetupProgress
            account={account}
            hasTransactions={transactions.length > 0}
            hasOrders={orders.length > 0}
          />
          <SupportCard />
        </div>
      </div>
    </div>
  );
}
