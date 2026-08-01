import { getAccount } from "@/lib/queries/account";
import { getRecentTransactions } from "@/lib/queries/transactions";
import { WithdrawForm } from "@/components/dashboard/withdraw-form";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { KycGate } from "@/components/dashboard/kyc-gate";

export default async function WithdrawPage() {
  const account = await getAccount();
  const transactions = await getRecentTransactions();
  const isVerified = account?.kyc_status === "verified";
  const availableBalance = account ? parseFloat(account.available_balance) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">Withdraw</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Move funds out of your available balance.
        </p>
      </div>

      {isVerified ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.2fr]">
          <WithdrawForm availableBalance={availableBalance} />
          <TransactionHistory transactions={transactions} />
        </div>
      ) : (
        <KycGate action="withdrawals" />
      )}
    </div>
  );
}
