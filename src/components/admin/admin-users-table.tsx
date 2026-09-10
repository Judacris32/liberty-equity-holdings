"use client";

import * as React from "react";
import { Search, ShieldCheck, Clock, ShieldAlert as ShieldOff, Crown } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import type { AdminAccountSummary } from "@/lib/queries/admin-users";

const ACCOUNT_TYPE_STYLES = {
  basic: "bg-white/[0.06] text-[rgb(var(--muted))]",
  standard: "bg-sky-400/10 text-sky-400",
  business: "bg-violet-400/10 text-violet-400",
} as const;

const KYC_STATUS_CONFIG = {
  verified: { icon: ShieldCheck, label: "Verified", className: "bg-bull/10 text-bull" },
  pending: { icon: Clock, label: "Pending", className: "bg-amber-500/10 text-amber-500" },
  unverified: { icon: ShieldOff, label: "Unverified", className: "bg-bear/10 text-bear" },
} as const;

const FILTERS = ["all", "basic", "standard", "business"] as const;

export function AdminUsersTable({ accounts }: { accounts: AdminAccountSummary[] }) {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("all");

  const filtered = accounts.filter((account) => {
    const matchesFilter = filter === "all" || account.account_type === filter;
    const matchesSearch = account.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[rgb(var(--muted))]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email..."
            className="w-full rounded-full glass-surface glass-border border py-2 pl-9 pr-4 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
          />
        </div>

        <div className="flex gap-1 rounded-full glass-border border p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-bull/10 text-bull"
                  : "text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl glass-surface glass-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b glass-border text-[10px] uppercase tracking-wider text-[rgb(var(--muted))]">
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Account Type</th>
                <th className="px-5 py-3 font-semibold">KYC Status</th>
                <th className="px-5 py-3 font-semibold">Balance</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filtered.map((account) => {
                const kyc = KYC_STATUS_CONFIG[account.kyc_status];
                return (
                  <tr key={account.user_id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[rgb(var(--foreground))]">{account.email}</span>
                        {account.is_admin && (
                          <span title="Admin">
                            <Crown className="h-3.5 w-3.5 text-amber-400" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase ${ACCOUNT_TYPE_STYLES[account.account_type]}`}
                      >
                        {account.account_type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${kyc.className}`}
                      >
                        <kyc.icon className="h-3 w-3" />
                        {kyc.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[rgb(var(--foreground))]">
                      {formatCurrency(account.available_balance)}
                    </td>
                    <td className="px-5 py-3.5 text-[rgb(var(--muted))]">
                      {new Date(account.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-xs text-[rgb(var(--muted))]">
                    No accounts match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-[rgb(var(--muted))]">
        {filtered.length} of {accounts.length} account{accounts.length === 1 ? "" : "s"} shown.
      </p>
    </div>
  );
}
