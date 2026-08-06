"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ArrowDownToLine,
  ArrowUpFromLine,
  CandlestickChart,
  ShieldCheck,
  Inbox,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/format-relative-time";
import type { ActivityNotification } from "@/lib/queries/activity";

const KIND_ICON = {
  deposit: ArrowDownToLine,
  withdrawal: ArrowUpFromLine,
  order: CandlestickChart,
  kyc: ShieldCheck,
} as const;

const KIND_TINT = {
  deposit: "bg-bull/10 text-bull",
  withdrawal: "bg-amber-400/10 text-amber-400",
  order: "bg-sky-400/10 text-sky-400",
  kyc: "bg-violet-400/10 text-violet-400",
} as const;

export function NotificationBell({
  notifications,
}: {
  notifications: ActivityNotification[];
}) {
  const [open, setOpen] = React.useState(false);
  const [read, setRead] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const unreadCount = read ? 0 : notifications.length;

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setOpen((v) => !v);
    if (!open) setRead(true);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={handleToggle}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex h-9 w-9 items-center justify-center rounded-full glass-surface glass-border transition-colors hover:bg-white/[0.04]"
      >
        <Bell className="h-4 w-4 text-[rgb(var(--foreground))]" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-bear px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-2xl glass-surface glass-border shadow-xl sm:w-96"
          >
            <div className="border-b glass-border px-4 py-3">
              <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                Notifications
              </p>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                  <Inbox className="h-6 w-6 text-[rgb(var(--muted))]" />
                  <p className="text-xs text-[rgb(var(--muted))]">
                    Nothing yet — activity will show up here.
                  </p>
                </div>
              ) : (
                notifications.map((item) => {
                  const Icon = KIND_ICON[item.kind];
                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 border-b border-white/[0.04] px-4 py-3 last:border-0"
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${KIND_TINT[item.kind]}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-[rgb(var(--foreground))]">
                          {item.message}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[rgb(var(--muted))]">
                          {item.detail}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] text-[rgb(var(--muted))]">
                        {formatRelativeTime(item.created_at)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block border-t glass-border px-4 py-3 text-center text-xs font-semibold text-bull transition-colors hover:bg-white/[0.03]"
            >
              View All Activity
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
