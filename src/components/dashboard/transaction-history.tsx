import { ArrowDownToLine, ArrowUpFromLine, History } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import type { Transaction } from "@/lib/queries/transactions";

export function TransactionHistory({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl glass-surface glass-border p-8 text-center">
        <History className="h-6 w-6 text-[rgb(var(--muted))]" />
        <p className="text-xs text-[rgb(var(--muted))]">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl glass-surface glass-border">
      <div className="border-b glass-border px-5 py-3">
        <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
          Recent Transactions
        </h3>
      </div>
      <div className="divide-y divide-white/[0.06]">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between gap-3 px-5 py-3.5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  tx.type === "deposit" ? "bg-bull/10" : "bg-white/[0.06]"
                }`}
              >
                {tx.type === "deposit" ? (
                  <ArrowDownToLine className="h-3.5 w-3.5 text-bull" />
                ) : (
                  <ArrowUpFromLine className="h-3.5 w-3.5 text-[rgb(var(--foreground))]" />
                )}
              </div>
              <div>
                <p className="text-xs font-medium capitalize text-[rgb(var(--foreground))]">
                  {tx.type}
                </p>
                <p className="text-[10px] text-[rgb(var(--muted))]">
                  {new Date(tx.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <span
              className={`text-sm font-semibold ${
                tx.type === "deposit" ? "text-bull" : "text-[rgb(var(--foreground))]"
              }`}
            >
              {tx.type === "deposit" ? "+" : "-"}
              {formatCurrency(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
