import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import type { Account } from "@/lib/queries/account";

/**
 * Reacts to the account's genuine state — verification status, whether
 * funds have moved, whether any trade has been placed. Not a decorative
 * progress bar; each step reflects something real in the database.
 */
export function SetupProgress({
  account,
  hasTransactions,
  hasOrders,
}: {
  account: Account;
  hasTransactions: boolean;
  hasOrders: boolean;
}) {
  const steps = [
    {
      id: "account",
      label: "Create your account",
      done: true,
      href: null,
    },
    {
      id: "kyc",
      label:
        account.kyc_status === "pending"
          ? "Verification in review"
          : "Verify your identity",
      done: account.kyc_status === "verified",
      pending: account.kyc_status === "pending",
      href: "/dashboard/kyc",
    },
    {
      id: "fund",
      label: "Fund your account",
      done: hasTransactions,
      href: "/dashboard/deposit",
    },
    {
      id: "trade",
      label: "Place your first trade",
      done: hasOrders,
      href: "/dashboard/trading",
    },
  ];

  const completed = steps.filter((s) => s.done).length;
  const percent = (completed / steps.length) * 100;

  // Once everything's done, this card has served its purpose.
  if (completed === steps.length) return null;

  return (
    <div className="rounded-2xl glass-surface glass-border p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
          Get set up
        </h3>
        <span className="text-xs text-[rgb(var(--muted))]">
          {completed} of {steps.length}
        </span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-bull transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-5 flex flex-col gap-1">
        {steps.map((step) => {
          const content = (
            <div
              className={`flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors ${
                step.href && !step.done ? "hover:bg-white/[0.03]" : ""
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  step.done
                    ? "border-bull bg-bull"
                    : step.pending
                    ? "border-amber-400"
                    : "border-white/20"
                }`}
              >
                {step.done && <Check className="h-3 w-3 text-[#07090e]" />}
                {step.pending && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                )}
              </div>
              <span
                className={`flex-1 text-sm ${
                  step.done
                    ? "text-[rgb(var(--muted))] line-through"
                    : "text-[rgb(var(--foreground))]"
                }`}
              >
                {step.label}
              </span>
              {step.href && !step.done && (
                <ChevronRight className="h-3.5 w-3.5 text-[rgb(var(--muted))]" />
              )}
            </div>
          );

          return step.href && !step.done ? (
            <Link key={step.id} href={step.href}>
              {content}
            </Link>
          ) : (
            <div key={step.id}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
