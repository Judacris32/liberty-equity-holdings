"use client";

import * as React from "react";
import { Landmark, Bitcoin, Check, X, Loader2 } from "lucide-react";
import { approveWithdrawalAction, rejectWithdrawalAction } from "@/lib/actions/admin";
import { formatCurrency } from "@/lib/format-currency";
import type { PendingWithdrawalRequest } from "@/lib/queries/admin";

export function WithdrawalReviewCard({ request }: { request: PendingWithdrawalRequest }) {
  const [isPending, startTransition] = React.useTransition();
  const [resolved, setResolved] = React.useState<"approved" | "rejected" | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleDecision = (action: "approve" | "reject") => {
    setError(null);
    const formData = new FormData();
    formData.set("requestId", request.id);
    formData.set("userId", request.user_id);
    formData.set("amount", request.amount);

    startTransition(async () => {
      const result =
        action === "approve"
          ? await approveWithdrawalAction({ error: null }, formData)
          : await rejectWithdrawalAction({ error: null }, formData);

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
        Withdrawal request {resolved}
        {resolved === "approved" && ` — ${formatCurrency(request.amount)} deducted from their balance`}.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl glass-surface glass-border p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl glass-border border bg-white/[0.03]">
            {request.method === "bank" ? (
              <Landmark className="h-6 w-6 text-bull" />
            ) : (
              <Bitcoin className="h-6 w-6 text-bull" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
              {formatCurrency(request.amount)}
            </p>
            <p className="mt-0.5 text-xs text-[rgb(var(--muted))]">{request.userEmail}</p>
            <p className="mt-0.5 text-xs text-[rgb(var(--muted))]">
              {new Date(request.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
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

      {/* Destination details — this is what the admin actually needs to
          act on outside the platform */}
      <div className="rounded-xl bg-white/[0.03] p-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--muted))]">
          Send funds to
        </p>
        {request.method === "bank" ? (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <dt className="text-[rgb(var(--muted))]">Account Name</dt>
            <dd className="text-[rgb(var(--foreground))]">{request.bank_account_name}</dd>
            <dt className="text-[rgb(var(--muted))]">Account Number</dt>
            <dd className="font-mono text-[rgb(var(--foreground))]">
              {request.bank_account_number}
            </dd>
            <dt className="text-[rgb(var(--muted))]">Bank Name</dt>
            <dd className="text-[rgb(var(--foreground))]">{request.bank_name}</dd>
            <dt className="text-[rgb(var(--muted))]">SWIFT / BIC</dt>
            <dd className="font-mono text-[rgb(var(--foreground))]">{request.bank_swift}</dd>
          </dl>
        ) : (
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-xs">
            <dt className="text-[rgb(var(--muted))]">Network</dt>
            <dd className="text-[rgb(var(--foreground))]">{request.crypto_network}</dd>
            <dt className="text-[rgb(var(--muted))]">Address</dt>
            <dd className="break-all font-mono text-[rgb(var(--foreground))]">
              {request.crypto_address}
            </dd>
          </dl>
        )}
      </div>
    </div>
  );
}
