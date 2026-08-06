"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import type { ActivityNotification } from "@/lib/queries/activity";

export function DashboardShell({
  kycStatus,
  userEmail,
  isAdmin = false,
  portfolioValue = 0,
  notifications = [],
  children,
}: {
  kycStatus: "unverified" | "pending" | "verified";
  userEmail: string;
  isAdmin?: boolean;
  portfolioValue?: number;
  notifications?: ActivityNotification[];
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isAdmin={isAdmin}
        portfolioValue={portfolioValue}
      />

      <div className="md:pl-64">
        <DashboardHeader
          onMenuClick={() => setMobileOpen(true)}
          kycStatus={kycStatus}
          userEmail={userEmail}
          notifications={notifications}
        />
        <div className="p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
