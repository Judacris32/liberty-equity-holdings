"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ArrowDownToLine, ArrowUpFromLine, ListOrdered, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import type { Account } from "@/lib/queries/account";

export function StatGrid({
  account,
  orderCount,
}: {
  account: Account;
  orderCount: number;
}) {
  const stats = [
    {
      id: "profit",
      label: "Total Profit",
      value: formatCurrency(account.total_profit),
      icon: TrendingUp,
      href: "/dashboard/trading",
      tint: "bg-bull/10",
      iconColor: "text-bull",
    },
    {
      id: "deposits",
      label: "Total Deposit",
      value: formatCurrency(account.total_deposits),
      icon: ArrowDownToLine,
      href: "/dashboard/deposit",
      tint: "bg-sky-400/10",
      iconColor: "text-sky-400",
    },
    {
      id: "withdrawals",
      label: "Total Withdraw",
      value: formatCurrency(account.total_withdrawals),
      icon: ArrowUpFromLine,
      href: "/dashboard/withdraw",
      tint: "bg-amber-400/10",
      iconColor: "text-amber-400",
    },
    {
      id: "orders",
      label: "Orders Placed",
      value: orderCount.toLocaleString(),
      icon: ListOrdered,
      href: "/dashboard/trading",
      tint: "bg-violet-400/10",
      iconColor: "text-violet-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
        >
          <Link
            href={stat.href}
            className="group flex h-full flex-col rounded-2xl glass-surface glass-border p-5 transition-colors hover:bg-white/[0.03]"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.tint}`}
              >
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
              <ChevronRight className="h-4 w-4 text-[rgb(var(--muted))] transition-transform group-hover:translate-x-0.5" />
            </div>

            <p className="mt-5 text-sm text-[rgb(var(--muted))]">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-[rgb(var(--foreground))]">
              {stat.value}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
