import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowUpRight,
  ArrowDownRight,
  Inbox,
} from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import type { Transaction } from "@/lib/queries/transactions";
import type { OrderRecord } from "@/lib/queries/orders";

type FeedItem = {
  id: string;
  kind: "deposit" | "withdrawal" | "buy" | "sell";
  title: string;
  subtitle: string;
  amount: string;
  isPositive: boolean;
  createdAt: string;
};

const ICONS = {
  deposit: ArrowDownToLine,
  withdrawal: ArrowUpFromLine,
  buy: ArrowUpRight,
  sell: ArrowDownRight,
} as const;

/**
 * Merges orders and transactions into a single chronological feed —
 * a real dashboard shows what happened in order, not two disconnected
 * lists the user has to mentally interleave themselves.
 */
function buildFeed(
  transactions: Transaction[],
  orders: OrderRecord[]
): FeedItem[] {
  const txItems: FeedItem[] = transactions.map((tx) => ({
    id: `tx-${tx.id}`,
    kind: tx.type,
    title: tx.type === "deposit" ? "Deposit" : "Withdrawal",
    subtitle: tx.status === "completed" ? "Completed" : tx.status,
    amount: `${tx.type === "deposit" ? "+" : "-"}${formatCurrency(tx.amount)}`,
    isPositive: tx.type === "deposit",
    createdAt: tx.created_at,
  }));

  const orderItems: FeedItem[] = orders.map((order) => {
    const pnl = parseFloat(order.pnl);
    return {
      id: `order-${order.id}`,
      kind: order.side,
      title: `${order.side === "buy" ? "Buy" : "Sell"} ${order.symbol}`,
      subtitle: `${formatCurrency(order.amount)} · ${order.speed}`,
      amount: `${pnl >= 0 ? "+" : ""}${formatCurrency(pnl)}`,
      isPositive: pnl >= 0,
      createdAt: order.created_at,
    };
  });

  return [...txItems, ...orderItems]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 8);
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function ActivityFeed({
  transactions,
  orders,
}: {
  transactions: Transaction[];
  orders: OrderRecord[];
}) {
  const feed = buildFeed(transactions, orders);

  return (
    <div className="overflow-hidden rounded-2xl glass-surface glass-border">
      <div className="flex items-center justify-between border-b glass-border px-5 py-4">
        <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
          Recent Activity
        </h3>
        <Link
          href="/dashboard/trading"
          className="text-xs font-medium text-bull hover:underline"
        >
          View all
        </Link>
      </div>

      {feed.length === 0 ? (
        <div className="flex flex-col items-center gap-3 px-5 py-14 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.04]">
            <Inbox className="h-5 w-5 text-[rgb(var(--muted))]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[rgb(var(--foreground))]">
              Nothing here yet
            </p>
            <p className="mt-1 text-xs text-[rgb(var(--muted))]">
              Your trades, deposits, and withdrawals will show up here.
            </p>
          </div>
          <Link
            href="/dashboard/trading"
            className="mt-1 rounded-full bg-bull px-5 py-2 text-xs font-semibold text-[#07090e] transition-transform hover:scale-[1.03]"
          >
            Place your first trade
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.06]">
          {feed.map((item) => {
            const Icon = ICONS[item.kind];
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      item.isPositive ? "bg-bull/10" : "bg-white/[0.06]"
                    }`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${
                        item.isPositive
                          ? "text-bull"
                          : "text-[rgb(var(--foreground))]"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[rgb(var(--foreground))]">
                      {item.title}
                    </p>
                    <p className="truncate text-xs text-[rgb(var(--muted))]">
                      {item.subtitle} · {relativeTime(item.createdAt)}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 text-sm font-semibold tabular-nums ${
                    item.isPositive ? "text-bull" : "text-[rgb(var(--foreground))]"
                  }`}
                >
                  {item.amount}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
