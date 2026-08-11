import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import type { WithdrawalRequest } from "@/lib/queries/withdrawal-requests";

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    label: "Pending Review",
    className: "bg-amber-500/10 text-amber-500",
  },
  approved: {
    icon: CheckCircle2,
    label: "Approved",
    className: "bg-bull/10 text-bull",
  },
  rejected: {
    icon: XCircle,
    label: "Rejected",
    className: "bg-bear/10 text-bear",
  },
} as const;

export function WithdrawalRequestStatusList({ requests }: { requests: WithdrawalRequest[] }) {
  if (requests.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl glass-surface glass-border">
      <div className="border-b glass-border px-5 py-3">
        <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
          Your Withdrawal Requests
        </h3>
      </div>
      <div className="divide-y divide-white/[0.06]">
        {requests.map((request) => {
          const config = STATUS_CONFIG[request.status];
          return (
            <div
              key={request.id}
              className="flex items-center justify-between gap-3 px-5 py-3.5"
            >
              <div>
                <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                  {formatCurrency(request.amount)}
                </p>
                <p className="text-[10px] text-[rgb(var(--muted))]">
                  {request.method === "bank" ? "Bank Transfer" : "Crypto"} &middot;{" "}
                  {new Date(request.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <span
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${config.className}`}
              >
                <config.icon className="h-3 w-3" />
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
