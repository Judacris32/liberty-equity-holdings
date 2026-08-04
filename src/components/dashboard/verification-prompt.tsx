"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  ChevronDown,
  UserCheck,
  FileText,
  Lock,
  ArrowRight,
  Clock,
} from "lucide-react";

const REQUIREMENTS = [
  {
    icon: UserCheck,
    title: "Identity Check",
    description: "A passport, national ID, or driver's licence.",
  },
  {
    icon: FileText,
    title: "Clear Document",
    description: "Readable, uncropped, and not expired.",
  },
  {
    icon: Lock,
    title: "Private Storage",
    description: "Uploaded to private storage — never a public URL.",
  },
];

export function VerificationPrompt({
  kycStatus,
}: {
  kycStatus: "unverified" | "pending" | "verified";
}) {
  const [expanded, setExpanded] = React.useState(false);

  // Nothing to prompt once the account is verified.
  if (kycStatus === "verified") return null;

  const isPending = kycStatus === "pending";

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        isPending
          ? "border-amber-500/25 bg-amber-500/[0.04]"
          : "glass-surface glass-border"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isPending ? "bg-amber-500/10" : "bg-bull/10"
            }`}
          >
            {isPending ? (
              <Clock className="h-5 w-5 text-amber-500" />
            ) : (
              <ShieldAlert className="h-5 w-5 text-bull" />
            )}
          </div>
          <div>
            <p className="font-semibold text-[rgb(var(--foreground))]">
              {isPending ? "Verification Under Review" : "Verification Required"}
            </p>
            <p className="mt-0.5 text-sm text-[rgb(var(--muted))]">
              {isPending
                ? "Your document has been submitted and is awaiting review."
                : "Complete KYC to unlock deposits and withdrawals."}
            </p>
          </div>
        </div>

        {!isPending && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 rounded-full glass-surface glass-border border px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] transition-colors hover:bg-white/[0.04]"
            aria-expanded={expanded}
          >
            View Requirements
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && !isPending && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t glass-border px-5 pb-6 pt-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {REQUIREMENTS.map((req) => (
                  <div
                    key={req.title}
                    className="rounded-xl glass-surface glass-border border p-4 text-center"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-bull/10">
                      <req.icon className="h-4 w-4 text-bull" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-[rgb(var(--foreground))]">
                      {req.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--muted))]">
                      {req.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/dashboard/kyc"
                  className="group flex items-center gap-2 rounded-full bg-bull px-7 py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.02]"
                >
                  Start Verification Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
