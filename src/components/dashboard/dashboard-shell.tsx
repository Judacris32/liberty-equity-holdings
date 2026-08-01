"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";

export function DashboardShell({
  kycStatus,
  userEmail,
  isAdmin = false,
  children,
}: {
  kycStatus: "unverified" | "pending" | "verified";
  userEmail: string;
  isAdmin?: boolean;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isAdmin={isAdmin}
      />

      <div className="md:pl-64">
        <DashboardHeader
          onMenuClick={() => setMobileOpen(true)}
          kycStatus={kycStatus}
          userEmail={userEmail}
        />
        <div className="p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
