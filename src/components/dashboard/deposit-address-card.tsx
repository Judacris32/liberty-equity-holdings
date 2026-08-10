"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Bitcoin, Landmark, Info } from "lucide-react";
import {
  CRYPTO_DEPOSIT_OPTIONS,
  BANK_TRANSFER_DETAILS,
  type CryptoDepositOption,
} from "@/lib/deposit-addresses";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can fail (e.g. insecure context) — fail silently
      // rather than throwing an error over a convenience feature.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg glass-surface glass-border transition-colors hover:bg-white/[0.06]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="h-3.5 w-3.5 text-bull" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Copy className="h-3.5 w-3.5 text-[rgb(var(--muted))]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function CryptoAddressRow({ option }: { option: CryptoDepositOption }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl glass-surface glass-border border p-3.5">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[rgb(var(--foreground))]">
            {option.symbol}
          </span>
          <span className="text-[10px] text-[rgb(var(--muted))]">{option.network}</span>
        </div>
        <p className="mt-1 truncate font-mono text-xs text-[rgb(var(--muted))]">
          {option.address}
        </p>
      </div>
      <CopyButton value={option.address} />
    </div>
  );
}

export function DepositAddressCard({
  tab,
  onTabChange,
}: {
  tab: "crypto" | "bank";
  onTabChange: (tab: "crypto" | "bank") => void;
}) {
  return (
    <div className="rounded-2xl glass-surface glass-border p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
          Deposit Address
        </h3>
        <div className="flex gap-1 rounded-full glass-border border p-1">
          <button
            type="button"
            onClick={() => onTabChange("crypto")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === "crypto"
                ? "bg-bull/10 text-bull"
                : "text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
            }`}
          >
            <Bitcoin className="h-3.5 w-3.5" />
            Crypto
          </button>
          <button
            type="button"
            onClick={() => onTabChange("bank")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === "bank"
                ? "bg-bull/10 text-bull"
                : "text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
            }`}
          >
            <Landmark className="h-3.5 w-3.5" />
            Bank Transfer
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {tab === "crypto"
          ? CRYPTO_DEPOSIT_OPTIONS.map((option) => (
              <CryptoAddressRow key={option.id} option={option} />
            ))
          : BANK_TRANSFER_DETAILS.map((field) => (
              <div
                key={field.label}
                className="flex items-center justify-between gap-3 rounded-xl glass-surface glass-border border p-3.5"
              >
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wide text-[rgb(var(--muted))]">
                    {field.label}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-[rgb(var(--foreground))]">
                    {field.value}
                  </p>
                </div>
                <CopyButton value={field.value} />
              </div>
            ))}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-bull/[0.06] p-3">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bull" />
        <p className="text-[11px] leading-relaxed text-[rgb(var(--muted))]">
          Demo addresses for display purposes. Deposits on this platform are
          simulated using the amount form below — sending funds here won&apos;t
          credit your account.
        </p>
      </div>
    </div>
  );
}
