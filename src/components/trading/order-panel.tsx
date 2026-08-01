"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Clock, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { placeOrderAction } from "@/lib/actions/trading";
import { formatCurrency } from "@/lib/format-currency";
import type { TradableSymbol } from "@/lib/tradable-symbols";

type OrderResult = {
  type: "success" | "error";
  message: string;
};

export function OrderPanel({
  symbol,
  availableBalance,
}: {
  symbol: TradableSymbol;
  availableBalance: number;
}) {
  const [side, setSide] = React.useState<"buy" | "sell">("buy");
  const [amount, setAmount] = React.useState("");
  const [speed, setSpeed] = React.useState<"standard" | "instant">("standard");
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<OrderResult | null>(null);

  const parsedAmount = parseFloat(amount);
  const isValidAmount =
    !Number.isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= availableBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAmount) return;

    setResult(null);
    const formData = new FormData();
    formData.set("symbol", symbol.label);
    formData.set("side", side);
    formData.set("amount", amount);
    formData.set("speed", speed);

    startTransition(async () => {
      const res = await placeOrderAction({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else if (res.success) {
        const { pnl } = res.success;
        setResult({
          type: "success",
          message:
            pnl >= 0
              ? `Order filled — simulated gain of ${formatCurrency(pnl)}`
              : `Order filled — simulated loss of ${formatCurrency(Math.abs(pnl))}`,
        });
        setAmount("");
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl glass-surface glass-border p-5">
      <div>
        <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
          Place Order
        </h3>
        <p className="mt-0.5 text-xs text-[rgb(var(--muted))]">
          {symbol.label} &middot; Simulated execution for demo purposes
        </p>
      </div>

      {/* BUY / SELL toggle */}
      <div className="grid grid-cols-2 gap-2 rounded-xl glass-border border p-1">
        <button
          type="button"
          onClick={() => setSide("buy")}
          className={`rounded-lg py-2.5 text-sm font-semibold transition-colors ${
            side === "buy"
              ? "bg-bull text-[#07090e]"
              : "text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setSide("sell")}
          className={`rounded-lg py-2.5 text-sm font-semibold transition-colors ${
            side === "sell"
              ? "bg-bear text-white"
              : "text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
          }`}
        >
          Sell
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="amount" className="text-xs font-medium text-[rgb(var(--muted))]">
              Investment Amount
            </label>
            <span className="text-xs text-[rgb(var(--muted))]">
              Available: {formatCurrency(availableBalance)}
            </span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[rgb(var(--muted))]">
              $
            </span>
            <input
              id="amount"
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
          {amount && !isValidAmount && (
            <p className="mt-1.5 text-xs text-bear">
              {parsedAmount > availableBalance
                ? "Amount exceeds available balance."
                : "Enter a valid amount."}
            </p>
          )}
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium text-[rgb(var(--muted))]">
            Transaction Speed
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSpeed("standard")}
              className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                speed === "standard"
                  ? "border-bull/40 bg-bull/10 text-bull"
                  : "glass-border text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              Standard
            </button>
            <button
              type="button"
              onClick={() => setSpeed("instant")}
              className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                speed === "instant"
                  ? "border-bull/40 bg-bull/10 text-bull"
                  : "glass-border text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              Instant
            </button>
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
          disabled={!isValidAmount || isPending}
          className={`flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-transform hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100 ${
            side === "buy" ? "bg-bull text-[#07090e] shadow-glow" : "bg-bear text-white shadow-glow-bear"
          }`}
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isPending ? "Submitting..." : `${side === "buy" ? "Buy" : "Sell"} ${symbol.label}`}
        </button>
      </form>
    </div>
  );
}
