"use client";

import * as React from "react";
import { Menu, ShieldAlert, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LivePriceStream } from "./live-price-stream";

export function DashboardHeader({
  onMenuClick,
  kycStatus,
  userEmail,
}: {
  onMenuClick: () => void;
  kycStatus: "unverified" | "pending" | "verified";
  userEmail: string;
}) {
  const [bannerDismissed, setBannerDismissed] = React.useState(false);

  return (
    <div className="sticky top-0 z-20 border-b glass-border glass-surface">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full glass-surface glass-border md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="hidden sm:block">
            <LivePriceStream />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[rgb(var(--muted))] sm:block">
            {userEmail}
          </span>
          <ThemeToggle />
        </div>
      </div>

      <div className="px-5 pb-3 sm:hidden">
        <LivePriceStream />
      </div>

      {kycStatus !== "verified" && !bannerDismissed && (
        <div className="flex items-center justify-between gap-3 bg-bull/[0.06] px-5 py-2.5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0 text-bull" />
            <p className="text-xs text-[rgb(var(--foreground))]">
              {kycStatus === "pending"
                ? "Your KYC verification is being reviewed."
                : "Verify your identity to unlock deposits and withdrawals."}
            </p>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss"
            className="text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
