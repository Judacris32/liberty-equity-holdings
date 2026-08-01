"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CandlestickChart,
  ArrowDownToLine,
  ArrowUpFromLine,
  ShieldCheck,
  ShieldAlert,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { logoutAction } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Trading", href: "/dashboard/trading", icon: CandlestickChart },
  { label: "Deposit", href: "/dashboard/deposit", icon: ArrowDownToLine },
  { label: "Withdraw", href: "/dashboard/withdraw", icon: ArrowUpFromLine },
  { label: "KYC Verification", href: "/dashboard/kyc", icon: ShieldCheck },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({
  mobileOpen,
  onClose,
  isAdmin = false,
}: {
  mobileOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}) {
  const pathname = usePathname();

  const navItems = isAdmin
    ? [...NAV_ITEMS, { label: "Admin Review", href: "/admin/kyc", icon: ShieldAlert }]
    : NAV_ITEMS;

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-6">
        <Logo />
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-8 w-8 items-center justify-center rounded-full glass-surface glass-border md:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute inset-0 rounded-xl bg-bull/10 border border-bull/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon
                className={`relative z-10 h-4 w-4 ${
                  isActive ? "text-bull" : "text-[rgb(var(--muted))]"
                }`}
              />
              <span
                className={`relative z-10 ${
                  isActive
                    ? "text-[rgb(var(--foreground))]"
                    : "text-[rgb(var(--muted))]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t glass-border p-3">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[rgb(var(--muted))] transition-colors hover:bg-bear/10 hover:text-bear"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 glass-surface glass-border border-r md:block">
        {content}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="absolute inset-y-0 left-0 w-72 glass-surface glass-border border-r"
          >
            {content}
          </motion.aside>
        </div>
      )}
    </>
  );
}
