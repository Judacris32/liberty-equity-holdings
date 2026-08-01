import { Inbox } from "lucide-react";
import { getPendingKycSubmissions } from "@/lib/queries/admin";
import { KycReviewCard } from "@/components/admin/kyc-review-card";

export default async function AdminKycPage() {
  const submissions = await getPendingKycSubmissions();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">
          KYC Review Queue
        </h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          {submissions.length} submission{submissions.length === 1 ? "" : "s"} awaiting review.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl glass-surface glass-border p-12 text-center">
          <Inbox className="h-8 w-8 text-[rgb(var(--muted))]" />
          <p className="text-sm text-[rgb(var(--muted))]">
            No pending submissions right now.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {submissions.map((submission) => (
            <KycReviewCard key={submission.id} submission={submission} />
          ))}
        </div>
      )}
    </div>
  );
}
