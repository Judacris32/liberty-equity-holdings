import { History, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import type { OrderRecord } from "@/lib/queries/orders";

export function OrderHistory({ orders }: { orders: OrderRecord[] }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl glass-surface glass-border p-8 text-center">
        <History className="h-6 w-6 text-[rgb(var(--muted))]" />
        <p className="text-xs text-[rgb(var(--muted))]">No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl glass-surface glass-border">
      <div className="border-b glass-border px-5 py-3">
        <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">Recent Orders</h3>
      </div>
      <div className="divide-y divide-white/[0.06]">
        {orders.map((order) => {
          const pnl = parseFloat(order.pnl);
          const isProfit = pnl >= 0;

          return (
            <div key={order.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    order.side === "buy" ? "bg-bull/10" : "bg-bear/10"
                  }`}
                >
                  {order.side === "buy" ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-bull" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-bear" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium text-[rgb(var(--foreground))]">
                    {order.side === "buy" ? "Buy" : "Sell"} {order.symbol}
                  </p>
                  <p className="text-[10px] text-[rgb(var(--muted))]">
                    {formatCurrency(order.amount)} &middot;{" "}
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${isProfit ? "text-bull" : "text-bear"}`}>
                {isProfit ? "+" : ""}
                {formatCurrency(pnl)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
