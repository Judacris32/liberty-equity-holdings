import { getAccount } from "@/lib/queries/account";
import { getRecentOrders } from "@/lib/queries/orders";
import { TradingWorkspace } from "@/components/trading/trading-workspace";
import { OrderHistory } from "@/components/trading/order-history";

export default async function TradingPage() {
  const account = await getAccount();
  const orders = await getRecentOrders();
  const availableBalance = account ? parseFloat(account.available_balance) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">
          Trading Terminal
        </h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Live charts and simulated order execution.
        </p>
      </div>

      <TradingWorkspace availableBalance={availableBalance} />
      <OrderHistory orders={orders} />
    </div>
  );
}
