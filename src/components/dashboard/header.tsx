"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ShieldAlert, ShieldCheck, Clock } from "lucide-react";
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
  const initial = (userEmail?.[0] ?? "?").toUpperCase();

  return (
    <div className="sticky top-0 z-20 border-b glass-border glass-surface">
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        {/* Left: menu + live market */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full glass-surface glass-border md:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Live market pill */}
          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-bull/25 bg-bull/[0.06] px-3 py-1.5 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bull opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bull" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-bull">
              Live Market
            </span>
          </div>

          <div className="hidden min-w-0 md:block">
            <LivePriceStream />
          </div>
        </div>

        {/* Right: KYC action, theme, avatar */}
        <div className="flex shrink-0 items-center gap-2.5">
          {kycStatus !== "verified" && (
            <Link
              href="/dashboard/kyc"
              className={`hidden items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors sm:flex ${
                kycStatus === "pending"
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/15"
                  : "border-bear/30 bg-bear/10 text-bear hover:bg-bear/15"
              }`}
            >
              {kycStatus === "pending" ? (
                <>
                  <Clock className="h-3.5 w-3.5" />
                  KYC Pending
                </>
              ) : (
                <>
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Verify KYC
                </>
              )}
            </Link>
          )}

          {kycStatus === "verified" && (
            <span className="hidden items-center gap-1.5 rounded-full border border-bull/25 bg-bull/[0.06] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-bull sm:flex">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified
            </span>
          )}

          <ThemeToggle />

          <div
            title={userEmail}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-bull/15 text-sm font-semibold text-bull"
          >
            {initial}
          </div>
        </div>
      </div>

      {/* Mobile: prices below the bar */}
      <div className="border-t glass-border px-5 py-2.5 md:hidden">
        <LivePriceStream />
      </div>
    </div>
  );
}
