import { CheckCircle2, Clock, ShieldAlert } from "lucide-react";

const STATUS_CONFIG = {
  unverified: {
    label: "Unverified",
    icon: ShieldAlert,
    className: "bg-bear/10 text-bear",
  },
  pending: {
    label: "Pending Review",
    icon: Clock,
    className: "bg-amber-500/10 text-amber-500",
  },
  verified: {
    label: "Verified",
    icon: CheckCircle2,
    className: "bg-bull/10 text-bull",
  },
} as const;

export function KycStatusBadge({
  status,
}: {
  status: "unverified" | "pending" | "verified";
}) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${config.className}`}
    >
      <config.icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}
