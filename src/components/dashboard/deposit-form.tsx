"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, ArrowDownToLine } from "lucide-react";
import { depositAction } from "@/lib/actions/transaction";

const QUICK_AMOUNTS = [100, 500, 1000, 5000];

export function DepositForm() {
  const [amount, setAmount] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<{ type: "success" | "error"; message: string } | null>(null);

  const parsedAmount = parseFloat(amount);
  const isValid = !Number.isNaN(parsedAmount) && parsedAmount > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setResult(null);
    const formData = new FormData();
    formData.set("amount", amount);

    startTransition(async () => {
      const res = await depositAction({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({ type: "success", message: "Deposit completed successfully." });
        setAmount("");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl glass-surface glass-border p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bull/10">
          <ArrowDownToLine className="h-4 w-4 text-bull" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">Deposit Funds</h3>
        </div>
      </div>

      <div>
        <label htmlFor="deposit-amount" className="mb-1.5 block text-xs font-medium text-[rgb(var(--muted))]">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[rgb(var(--muted))]">$</span>
          <input
            id="deposit-amount"
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
        <div className="mt-2 flex flex-wrap gap-2">
          {QUICK_AMOUNTS.map((qa) => (
            <button
              key={qa}
              type="button"
              onClick={() => setAmount(String(qa))}
              className="rounded-full glass-border border px-3 py-1 text-xs text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--foreground))]"
            >
              ${qa.toLocaleString()}
            </button>
          ))}
        </div>
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
        className="flex items-center justify-center gap-2 rounded-full bg-bull py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Processing..." : "Deposit"}
      </button>
    </form>
  );
}
