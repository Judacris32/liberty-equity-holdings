import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import type { Account } from "@/lib/queries/account";

export function BalanceHero({ account }: { account: Account }) {
  const balance = parseFloat(account.available_balance);
  const profit = parseFloat(account.total_profit);
  const deposits = parseFloat(account.total_deposits);
  const withdrawals = parseFloat(account.total_withdrawals);

  const isProfit = profit >= 0;
  // Return relative to what was actually put in — a real derived metric
  // rather than a decorative number.
  const returnPercent = deposits > 0 ? (profit / deposits) * 100 : 0;

  return (
    <div className="relative overflow-hidden rounded-2xl glass-surface glass-border p-6 sm:p-8">
      {/* Ambient accent, tinted by whether the account is up or down */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[100px] ${
          isProfit ? "bg-bull/[0.12]" : "bg-bear/[0.10]"
        }`}
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Eye className="h-3.5 w-3.5 text-[rgb(var(--muted))]" />
            <p className="text-xs font-medium uppercase tracking-wider text-[rgb(var(--muted))]">
              Available Balance
            </p>
          </div>

          <p className="mt-3 text-4xl font-semibold tracking-tight text-[rgb(var(--foreground))] sm:text-5xl">
            {formatCurrency(balance)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
                isProfit ? "bg-bull/10 text-bull" : "bg-bear/10 text-bear"
              }`}
            >
              {isProfit ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {isProfit ? "+" : ""}
              {formatCurrency(profit)}
            </span>
            <span className="text-sm text-[rgb(var(--muted))]">
              {isProfit ? "+" : ""}
              {returnPercent.toFixed(2)}% on deposits
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/deposit"
            className="flex items-center gap-2 rounded-full bg-bull px-6 py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.03]"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Deposit
          </Link>
          <Link
            href="/dashboard/withdraw"
            className="flex items-center gap-2 rounded-full glass-border border px-6 py-3 text-sm font-semibold text-[rgb(var(--foreground))] transition-colors hover:bg-white/[0.04]"
          >
            <ArrowUpFromLine className="h-4 w-4" />
            Withdraw
          </Link>
        </div>
      </div>

      {/* Deposit vs withdrawal split — a proportion bar that actually
          reflects the account's own history. */}
      <div className="relative mt-8 border-t glass-border pt-6">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-[rgb(var(--muted))]">
            <span className="h-2 w-2 rounded-full bg-bull" />
            Deposited {formatCurrency(deposits)}
          </span>
          <span className="flex items-center gap-1.5 text-[rgb(var(--muted))]">
            Withdrawn {formatCurrency(withdrawals)}
            <span className="h-2 w-2 rounded-full bg-white/25" />
          </span>
        </div>
        <div className="mt-2.5 flex h-1.5 gap-1 overflow-hidden rounded-full">
          <div
            className="rounded-full bg-bull transition-all duration-700"
            style={{
              width: `${
                deposits + withdrawals > 0
                  ? (deposits / (deposits + withdrawals)) * 100
                  : 50
              }%`,
            }}
          />
          <div className="flex-1 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
}
