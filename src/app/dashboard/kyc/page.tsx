import { CheckCircle2, Clock } from "lucide-react";
import { getAccount } from "@/lib/queries/account";
import { KycStatusBadge } from "@/components/kyc/kyc-status-badge";
import { KycUploadForm } from "@/components/kyc/kyc-upload-form";

export default async function KycPage() {
  const account = await getAccount();
  const status = account?.kyc_status ?? "unverified";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--foreground))]">
            KYC Verification
          </h1>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">
            Verify your identity to unlock deposits and withdrawals.
          </p>
        </div>
        <KycStatusBadge status={status} />
      </div>

      <div className="max-w-xl rounded-2xl glass-surface glass-border p-6">
        {status === "verified" && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bull/10">
              <CheckCircle2 className="h-6 w-6 text-bull" />
            </div>
            <p className="text-sm font-medium text-[rgb(var(--foreground))]">
              Your identity has been verified
            </p>
            <p className="max-w-sm text-xs text-[rgb(var(--muted))]">
              Deposits and withdrawals are now unlocked on your account.
            </p>
          </div>
        )}

        {status === "pending" && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
            <p className="text-sm font-medium text-[rgb(var(--foreground))]">
              Your document is under review
            </p>
            <p className="max-w-sm text-xs text-[rgb(var(--muted))]">
              This typically takes 1–2 business days. We&apos;ll update your
              verification status as soon as the review is complete.
            </p>
          </div>
        )}

        {status === "unverified" && <KycUploadForm />}
      </div>
    </div>
  );
}
