"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  Plus,
  Minus,
  CheckCircle2,
  XCircle,
  User,
  X,
} from "lucide-react";
import {
  findAccountByEmailAction,
  adjustBalanceAction,
} from "@/lib/actions/balance-adjustment";
import { formatCurrency } from "@/lib/format-currency";

type FoundAccount = {
  user_id: string;
  email: string;
  available_balance: string;
};

export function AdminBalanceAdjuster() {
  const [email, setEmail] = React.useState("");
  const [account, setAccount] = React.useState<FoundAccount | null>(null);
  const [searchError, setSearchError] = React.useState<string | null>(null);
  const [isSearching, startSearch] = React.useTransition();

  const [direction, setDirection] = React.useState<"credit" | "debit">("credit");
  const [amount, setAmount] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [isAdjusting, startAdjust] = React.useTransition();
  const [result, setResult] = React.useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    setResult(null);
    const formData = new FormData();
    formData.set("email", email);

    startSearch(async () => {
      const res = await findAccountByEmailAction({ error: null }, formData);
      if (res.error || !res.account) {
        setSearchError(res.error ?? "Account not found.");
        setAccount(null);
      } else {
        setAccount(res.account);
      }
    });
  };

  const handleAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;
    setResult(null);

    const formData = new FormData();
    formData.set("userId", account.user_id);
    formData.set("direction", direction);
    formData.set("amount", amount);
    formData.set("reason", reason);

    startAdjust(async () => {
      const res = await adjustBalanceAction({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({
          type: "success",
          message: `Balance updated. New balance will show next time you look up this account.`,
        });
        setAmount("");
        setReason("");
        // Refresh the displayed balance locally so the admin sees the effect
        // immediately without needing to re-search.
        const submittedAmount = parseFloat(amount);
        const delta = direction === "credit" ? submittedAmount : -submittedAmount;
        setAccount((prev) =>
          prev
            ? {
                ...prev,
                available_balance: (parseFloat(prev.available_balance) + delta).toFixed(2),
              }
            : prev
        );
      }
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          className="flex-1 rounded-full glass-surface glass-border border px-4 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="flex items-center gap-1.5 rounded-full bg-bull px-5 py-2.5 text-sm font-semibold text-[#07090e] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
        >
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Find
        </button>
      </form>

      {searchError && <p className="text-xs text-bear">{searchError}</p>}

      {/* Account found — adjustment form */}
      <AnimatePresence>
        {account && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl glass-surface glass-border p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bull/10">
                    <User className="h-4 w-4 text-bull" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                      {account.email}
                    </p>
                    <p className="text-xs text-[rgb(var(--muted))]">
                      Current balance: {formatCurrency(account.available_balance)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAccount(null);
                    setResult(null);
                  }}
                  aria-label="Clear"
                  className="text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAdjust} className="mt-5 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDirection("credit")}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                      direction === "credit"
                        ? "border-bull/40 bg-bull/10 text-bull"
                        : "glass-border text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Credit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirection("debit")}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                      direction === "debit"
                        ? "border-bear/40 bg-bear/10 text-bear"
                        : "glass-border text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
                    }`}
                  >
                    <Minus className="h-3.5 w-3.5" />
                    Debit
                  </button>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--muted))]">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[rgb(var(--muted))]">
                      $
                    </span>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-xl glass-surface glass-border border px-4 py-2.5 pl-7 text-sm text-[rgb(var(--foreground))] outline-none transition-colors focus:border-bull/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--muted))]">
                    Reason (required, visible to the user)
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Compensation for a delayed withdrawal on Aug 3"
                    className="w-full resize-none rounded-xl glass-surface glass-border border px-4 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className={`flex items-start gap-2 rounded-lg px-3 py-2 text-xs ${
                        result.type === "success" ? "bg-bull/10 text-bull" : "bg-bear/10 text-bear"
                      }`}
                    >
                      {result.type === "success" ? (
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      ) : (
                        <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      )}
                      {result.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isAdjusting}
                  className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100 ${
                    direction === "credit"
                      ? "bg-bull text-[#07090e] shadow-glow"
                      : "bg-bear text-white shadow-glow-bear"
                  }`}
                >
                  {isAdjusting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isAdjusting
                    ? "Processing..."
                    : `${direction === "credit" ? "Credit" : "Debit"} Account`}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
