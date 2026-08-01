"use client";

import * as React from "react";
import { FileText, Check, X, Loader2 } from "lucide-react";
import { approveKycAction, rejectKycAction } from "@/lib/actions/admin";
import type { PendingKycSubmission } from "@/lib/queries/admin";

const DOCUMENT_LABELS: Record<string, string> = {
  passport: "Passport",
  national_id: "National ID Card",
  drivers_license: "Driver's License",
};

export function KycReviewCard({ submission }: { submission: PendingKycSubmission }) {
  const [isPending, startTransition] = React.useTransition();
  const [resolved, setResolved] = React.useState<"approved" | "rejected" | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleDecision = (action: "approve" | "reject") => {
    setError(null);
    const formData = new FormData();
    formData.set("submissionId", submission.id);
    formData.set("userId", submission.user_id);

    startTransition(async () => {
      const result =
        action === "approve"
          ? await approveKycAction({ error: null }, formData)
          : await rejectKycAction({ error: null }, formData);

      if (result.error) {
        setError(result.error);
      } else {
        setResolved(action === "approve" ? "approved" : "rejected");
      }
    });
  };

  if (resolved) {
    return (
      <div
        className={`flex items-center gap-2 rounded-2xl glass-border border p-4 text-sm ${
          resolved === "approved" ? "bg-bull/5 text-bull" : "bg-bear/5 text-bear"
        }`}
      >
        {resolved === "approved" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        Submission {resolved}.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl glass-surface glass-border p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        {submission.signedUrl ? (
          <a
            href={submission.signedUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl glass-border border bg-white/[0.03] transition-colors hover:bg-white/[0.06]"
          >
            <FileText className="h-6 w-6 text-bull" />
          </a>
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl glass-border border">
            <FileText className="h-6 w-6 text-[rgb(var(--muted))]" />
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-[rgb(var(--foreground))]">
            {submission.userEmail}
          </p>
          <p className="mt-0.5 text-xs text-[rgb(var(--muted))]">
            {DOCUMENT_LABELS[submission.document_type]} &middot;{" "}
            {new Date(submission.submitted_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          {submission.signedUrl && (
            <a
              href={submission.signedUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-xs font-medium text-bull hover:underline"
            >
              View document
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {error && <p className="text-xs text-bear">{error}</p>}
        <button
          onClick={() => handleDecision("reject")}
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-full glass-border border px-4 py-2 text-xs font-medium text-bear transition-colors hover:bg-bear/10 disabled:opacity-50"
        >
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
          Reject
        </button>
        <button
          onClick={() => handleDecision("approve")}
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-full bg-bull px-4 py-2 text-xs font-semibold text-[#07090e] transition-transform hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100"
        >
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          Approve
        </button>
      </div>
    </div>
  );
}
