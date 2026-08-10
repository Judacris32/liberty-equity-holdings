import { getAccount } from "@/lib/queries/account";
import { getRecentTransactions } from "@/lib/queries/transactions";
import { getMyDepositRequests } from "@/lib/queries/deposit-requests";
import { DepositFlow } from "@/components/dashboard/deposit-flow";
import { DepositRequestStatusList } from "@/components/dashboard/deposit-request-status-list";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { KycGate } from "@/components/dashboard/kyc-gate";

export default async function DepositPage() {
  const account = await getAccount();
  const transactions = await getRecentTransactions();
  const depositRequests = await getMyDepositRequests();
  const isVerified = account?.kyc_status === "verified";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">Deposit</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Send funds to the address below, then submit proof for review.
        </p>
      </div>

      {isVerified ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.2fr]">
          <DepositFlow />
          <div className="flex flex-col gap-5">
            <DepositRequestStatusList requests={depositRequests} />
            <TransactionHistory transactions={transactions} />
          </div>
        </div>
      ) : (
        <KycGate action="deposits" />
      )}
    </div>
  );
}
