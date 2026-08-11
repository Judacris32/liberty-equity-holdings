"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Bitcoin, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { submitWithdrawalRequest } from "@/lib/actions/withdrawal-request";
import { formatCurrency } from "@/lib/format-currency";

const CRYPTO_NETWORKS = ["Bitcoin", "Ethereum (ERC-20)", "Tron (TRC-20)"];

export function WithdrawRequestForm({ availableBalance }: { availableBalance: number }) {
  const [method, setMethod] = React.useState<"bank" | "crypto">("bank");
  const [amount, setAmount] = React.useState("");

  // Bank fields
  const [bankAccountName, setBankAccountName] = React.useState("");
  const [bankAccountNumber, setBankAccountNumber] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const [bankSwift, setBankSwift] = React.useState("");

  // Crypto fields
  const [cryptoAddress, setCryptoAddress] = React.useState("");
  const [cryptoNetwork, setCryptoNetwork] = React.useState(CRYPTO_NETWORKS[0]);

  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<{ type: "success" | "error"; message: string } | null>(null);

  const parsedAmount = parseFloat(amount);
  const isValidAmount =
    !Number.isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= availableBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAmount) return;

    setResult(null);
    const formData = new FormData();
    formData.set("method", method);
    formData.set("amount", amount);

    if (method === "bank") {
      formData.set("bankAccountName", bankAccountName);
      formData.set("bankAccountNumber", bankAccountNumber);
      formData.set("bankName", bankName);
      formData.set("bankSwift", bankSwift);
    } else {
      formData.set("cryptoAddress", cryptoAddress);
      formData.set("cryptoNetwork", cryptoNetwork);
    }

    startTransition(async () => {
      const res = await submitWithdrawalRequest({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({
          type: "success",
          message: "Submitted — your withdrawal is now pending admin review.",
        });
        setAmount("");
        setBankAccountName("");
        setBankAccountNumber("");
        setBankName("");
        setBankSwift("");
        setCryptoAddress("");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl glass-surface glass-border p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
            Request Withdrawal
          </h3>
          <p className="mt-0.5 text-xs text-[rgb(var(--muted))]">
            Available: {formatCurrency(availableBalance)}
          </p>
        </div>
        <div className="flex gap-1 rounded-full glass-border border p-1">
          <button
            type="button"
            onClick={() => setMethod("bank")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              method === "bank"
                ? "bg-bull/10 text-bull"
                : "text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
            }`}
          >
            <Landmark className="h-3.5 w-3.5" />
            Bank
          </button>
          <button
            type="button"
            onClick={() => setMethod("crypto")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              method === "crypto"
                ? "bg-bull/10 text-bull"
                : "text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
            }`}
          >
            <Bitcoin className="h-3.5 w-3.5" />
            Crypto
          </button>
        </div>
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

      <AnimatePresence mode="wait">
        {method === "bank" ? (
          <motion.div
            key="bank"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 overflow-hidden"
          >
            <input
              required
              value={bankAccountName}
              onChange={(e) => setBankAccountName(e.target.value)}
              placeholder="Account holder name"
              className="rounded-xl glass-surface glass-border border px-4 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
            />
            <input
              required
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
              placeholder="Account number"
              className="rounded-xl glass-surface glass-border border px-4 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Bank name"
                className="rounded-xl glass-surface glass-border border px-4 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
              />
              <input
                required
                value={bankSwift}
                onChange={(e) => setBankSwift(e.target.value)}
                placeholder="SWIFT / BIC"
                className="rounded-xl glass-surface glass-border border px-4 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="crypto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 overflow-hidden"
          >
            <input
              required
              value={cryptoAddress}
              onChange={(e) => setCryptoAddress(e.target.value)}
              placeholder="Wallet address"
              className="rounded-xl glass-surface glass-border border px-4 py-2.5 font-mono text-xs text-[rgb(var(--foreground))] outline-none transition-colors placeholder:font-sans placeholder:text-sm placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
            />
            <select
              value={cryptoNetwork}
              onChange={(e) => setCryptoNetwork(e.target.value)}
              className="rounded-xl glass-surface glass-border border px-4 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors focus:border-bull/50"
            >
              {CRYPTO_NETWORKS.map((network) => (
                <option key={network} value={network}>
                  {network}
                </option>
              ))}
            </select>
          </motion.div>
        )}
      </AnimatePresence>

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
        className="flex items-center justify-center gap-2 rounded-full glass-surface glass-border border py-3 text-sm font-semibold text-[rgb(var(--foreground))] transition-transform hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Submitting..." : "Submit for Review"}
      </button>
    </form>
  );
}
