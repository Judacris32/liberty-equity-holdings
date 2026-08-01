import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export function KycGate({ action }: { action: "deposits" | "withdrawals" }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl glass-surface glass-border p-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bull/10">
        <ShieldAlert className="h-6 w-6 text-bull" />
      </div>
      <p className="text-sm font-medium text-[rgb(var(--foreground))]">
        Verify your identity to unlock {action}
      </p>
      <p className="max-w-sm text-xs text-[rgb(var(--muted))]">
        Complete KYC verification to enable {action} on your account.
      </p>
      <Link
        href="/dashboard/kyc"
        className="mt-2 rounded-full bg-bull px-5 py-2 text-xs font-semibold text-[#07090e] transition-transform hover:scale-[1.03]"
      >
        Start Verification
      </Link>
    </div>
  );
}
