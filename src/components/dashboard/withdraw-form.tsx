"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, ArrowUpFromLine } from "lucide-react";
import { withdrawAction } from "@/lib/actions/transaction";
import { formatCurrency } from "@/lib/format-currency";

export function WithdrawForm({ availableBalance }: { availableBalance: number }) {
  const [amount, setAmount] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<{ type: "success" | "error"; message: string } | null>(null);

  const parsedAmount = parseFloat(amount);
  const isValid = !Number.isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= availableBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setResult(null);
    const formData = new FormData();
    formData.set("amount", amount);

    startTransition(async () => {
      const res = await withdrawAction({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({ type: "success", message: "Withdrawal completed successfully." });
        setAmount("");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl glass-surface glass-border p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06]">
          <ArrowUpFromLine className="h-4 w-4 text-[rgb(var(--foreground))]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">Withdraw Funds</h3>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="withdraw-amount" className="text-xs font-medium text-[rgb(var(--muted))]">
            Amount
          </label>
          <span className="text-xs text-[rgb(var(--muted))]">
            Available: {formatCurrency(availableBalance)}
          </span>
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[rgb(var(--muted))]">$</span>
          <input
            id="withdraw-amount"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl glass-surface glass-border border px-4 py-2.5 pl-7 text-sm text-[rgb(var(--foreground))] outline-none transition-colors focus:border-bull/50"
          />
        </div>
        {amount && !isValid && (
          <p className="mt-1.5 text-xs text-bear">
            {parsedAmount > availableBalance ? "Amount exceeds available balance." : "Enter a valid amount."}
          </p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
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
        disabled={!isValid || isPending}
        className="flex items-center justify-center gap-2 rounded-full glass-surface glass-border border py-3 text-sm font-semibold text-[rgb(var(--foreground))] transition-transform hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Processing..." : "Withdraw"}
      </button>
    </form>
  );
}
