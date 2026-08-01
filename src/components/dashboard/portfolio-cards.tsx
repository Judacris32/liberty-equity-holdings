import { Wallet, TrendingUp, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import type { Account } from "@/lib/queries/account";

const CARD_CONFIG = [
  {
    key: "available_balance" as const,
    label: "Available Balance",
    icon: Wallet,
    accent: "text-bull",
    bg: "bg-bull/10",
  },
  {
    key: "total_profit" as const,
    label: "Total Profit",
    icon: TrendingUp,
    accent: "text-bull",
    bg: "bg-bull/10",
  },
  {
    key: "total_deposits" as const,
    label: "Total Deposits",
    icon: ArrowDownToLine,
    accent: "text-[rgb(var(--foreground))]",
    bg: "bg-white/[0.06]",
  },
  {
    key: "total_withdrawals" as const,
    label: "Total Withdrawals",
    icon: ArrowUpFromLine,
    accent: "text-[rgb(var(--foreground))]",
    bg: "bg-white/[0.06]",
  },
];

export function PortfolioCards({ account }: { account: Account }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARD_CONFIG.map((card) => (
        <div
          key={card.key}
          className="rounded-2xl glass-surface glass-border p-5"
        >
          <div
            className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}
          >
            <card.icon className={`h-5 w-5 ${card.accent}`} />
          </div>
          <p className="text-xs font-medium text-[rgb(var(--muted))]">
            {card.label}
          </p>
          <p className="mt-1.5 text-2xl font-semibold tracking-tight text-[rgb(var(--foreground))]">
            {formatCurrency(account[card.key])}
          </p>
        </div>
      ))}
    </div>
  );
}
