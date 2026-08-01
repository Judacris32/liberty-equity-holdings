import { ArrowDownToLine, ArrowUpFromLine, Activity, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import type { Account } from "@/lib/queries/account";

export function StatRow({
  account,
  orderCount,
}: {
  account: Account;
  orderCount: number;
}) {
  const stats = [
    {
      icon: ArrowDownToLine,
      label: "Total Deposits",
      value: formatCurrency(account.total_deposits),
      tint: "text-bull",
      bg: "bg-bull/10",
    },
    {
      icon: ArrowUpFromLine,
      label: "Total Withdrawals",
      value: formatCurrency(account.total_withdrawals),
      tint: "text-sky-400",
      bg: "bg-sky-400/10",
    },
    {
      icon: Activity,
      label: "Orders Placed",
      value: orderCount.toString(),
      tint: "text-violet-400",
      bg: "bg-violet-400/10",
    },
    {
      icon: Wallet,
      label: "Account Status",
      value:
        account.kyc_status === "verified"
          ? "Verified"
          : account.kyc_status === "pending"
          ? "In Review"
          : "Unverified",
      tint:
        account.kyc_status === "verified" ? "text-bull" : "text-amber-400",
      bg: account.kyc_status === "verified" ? "bg-bull/10" : "bg-amber-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-xl glass-surface glass-border p-4 transition-colors hover:bg-white/[0.02]"
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
            >
              <stat.icon className={`h-3.5 w-3.5 ${stat.tint}`} />
            </div>
            <p className="truncate text-xs text-[rgb(var(--muted))]">
              {stat.label}
            </p>
          </div>
          <p className="mt-3 text-lg font-semibold tabular-nums text-[rgb(var(--foreground))]">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
