import { Inbox } from "lucide-react";
import { getPendingWithdrawalRequests } from "@/lib/queries/admin";
import { WithdrawalReviewCard } from "@/components/admin/withdrawal-review-card";

export default async function AdminWithdrawalsPage() {
  const requests = await getPendingWithdrawalRequests();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">
          Withdrawal Review Queue
        </h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          {requests.length} request{requests.length === 1 ? "" : "s"} awaiting review.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl glass-surface glass-border p-12 text-center">
          <Inbox className="h-8 w-8 text-[rgb(var(--muted))]" />
          <p className="text-sm text-[rgb(var(--muted))]">
            No pending withdrawal requests right now.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((request) => (
            <WithdrawalReviewCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
}
