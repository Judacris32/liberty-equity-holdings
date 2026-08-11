import { getAccount } from "@/lib/queries/account";
import { getRecentTransactions } from "@/lib/queries/transactions";
import { getMyWithdrawalRequests } from "@/lib/queries/withdrawal-requests";
import { WithdrawRequestForm } from "@/components/dashboard/withdraw-request-form";
import { WithdrawalRequestStatusList } from "@/components/dashboard/withdrawal-request-status-list";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { KycGate } from "@/components/dashboard/kyc-gate";

export default async function WithdrawPage() {
  const account = await getAccount();
  const transactions = await getRecentTransactions();
  const withdrawalRequests = await getMyWithdrawalRequests();
  const isVerified = account?.kyc_status === "verified";
  const availableBalance = account ? parseFloat(account.available_balance) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">Withdraw</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Request a withdrawal to your bank account or crypto wallet.
        </p>
      </div>

      {isVerified ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.2fr]">
          <WithdrawRequestForm availableBalance={availableBalance} />
          <div className="flex flex-col gap-5">
            <WithdrawalRequestStatusList requests={withdrawalRequests} />
            <TransactionHistory transactions={transactions} />
          </div>
        </div>
      ) : (
        <KycGate action="withdrawals" />
      )}
    </div>
  );
}
