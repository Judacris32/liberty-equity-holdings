"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Pencil,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  upsertCryptoOptionAction,
  toggleCryptoOptionActiveAction,
  deleteCryptoOptionAction,
  updateBankDetailsAction,
} from "@/lib/actions/deposit-settings";
import type { CryptoDepositOption, BankTransferDetails } from "@/lib/queries/deposit-settings";

function Toast({ result }: { result: { type: "success" | "error"; message: string } | null }) {
  return (
    <AnimatePresence mode="wait">
      {result && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
            result.type === "success" ? "bg-bull/10 text-bull" : "bg-bear/10 text-bear"
          }`}
        >
          {result.type === "success" ? (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <XCircle className="h-3.5 w-3.5 shrink-0" />
          )}
          {result.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CryptoOptionForm({
  option,
  onDone,
}: {
  option: CryptoDepositOption | null;
  onDone: () => void;
}) {
  const [symbol, setSymbol] = React.useState(option?.symbol ?? "");
  const [network, setNetwork] = React.useState(option?.network ?? "");
  const [address, setAddress] = React.useState(option?.address ?? "");
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (option) formData.set("id", option.id);
    formData.set("symbol", symbol);
    formData.set("network", network);
    formData.set("address", address);
    formData.set("displayOrder", String(option?.display_order ?? 99));

    startTransition(async () => {
      const res = await upsertCryptoOptionAction({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({ type: "success", message: "Saved." });
        setTimeout(onDone, 600);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-xl bg-white/[0.03] p-4">
      <div className="grid grid-cols-2 gap-3">
        <input
          required
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Symbol (e.g. BTC)"
          className="rounded-lg glass-surface glass-border border px-3 py-2 text-sm text-[rgb(var(--foreground))] outline-none focus:border-bull/50"
        />
        <input
          required
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          placeholder="Network (e.g. Ethereum (ERC-20))"
          className="rounded-lg glass-surface glass-border border px-3 py-2 text-sm text-[rgb(var(--foreground))] outline-none focus:border-bull/50"
        />
      </div>
      <input
        required
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Wallet address"
        className="rounded-lg glass-surface glass-border border px-3 py-2 font-mono text-xs text-[rgb(var(--foreground))] outline-none focus:border-bull/50"
      />
      <Toast result={result} />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-full bg-bull px-4 py-2 text-xs font-semibold text-[#07090e] transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          Save
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-full glass-border border px-4 py-2 text-xs font-medium text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function CryptoOptionsManager({ initialOptions }: { initialOptions: CryptoDepositOption[] }) {
  const [options, setOptions] = React.useState(initialOptions);
  const [editingId, setEditingId] = React.useState<string | "new" | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const handleToggle = (option: CryptoDepositOption) => {
    const formData = new FormData();
    formData.set("id", option.id);
    formData.set("isActive", String(option.is_active));
    startTransition(async () => {
      await toggleCryptoOptionActiveAction({ error: null }, formData);
      setOptions((prev) =>
        prev.map((o) => (o.id === option.id ? { ...o, is_active: !o.is_active } : o))
      );
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this crypto option? This can't be undone.")) return;
    const formData = new FormData();
    formData.set("id", id);
    startTransition(async () => {
      await deleteCryptoOptionAction({ error: null }, formData);
      setOptions((prev) => prev.filter((o) => o.id !== id));
    });
  };

  return (
    <div className="rounded-2xl glass-surface glass-border p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
          Crypto Deposit Addresses
        </h3>
        <button
          onClick={() => setEditingId("new")}
          className="flex items-center gap-1.5 rounded-full glass-border border px-3 py-1.5 text-xs font-medium text-bull transition-colors hover:bg-bull/10"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {editingId === "new" && (
          <CryptoOptionForm option={null} onDone={() => setEditingId(null)} />
        )}

        {options.map((option) =>
          editingId === option.id ? (
            <CryptoOptionForm
              key={option.id}
              option={option}
              onDone={() => setEditingId(null)}
            />
          ) : (
            <div
              key={option.id}
              className={`flex items-center justify-between gap-3 rounded-xl border p-3.5 ${
                option.is_active ? "glass-border glass-surface" : "border-white/[0.04] opacity-50"
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[rgb(var(--foreground))]">
                    {option.symbol}
                  </span>
                  <span className="text-[10px] text-[rgb(var(--muted))]">{option.network}</span>
                  {!option.is_active && (
                    <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[9px] uppercase text-[rgb(var(--muted))]">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate font-mono text-xs text-[rgb(var(--muted))]">
                  {option.address}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => handleToggle(option)}
                  disabled={isPending}
                  aria-label={option.is_active ? "Hide" : "Show"}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[rgb(var(--muted))] transition-colors hover:bg-white/[0.06] hover:text-[rgb(var(--foreground))]"
                >
                  {option.is_active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => setEditingId(option.id)}
                  aria-label="Edit"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[rgb(var(--muted))] transition-colors hover:bg-white/[0.06] hover:text-[rgb(var(--foreground))]"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(option.id)}
                  disabled={isPending}
                  aria-label="Delete"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[rgb(var(--muted))] transition-colors hover:bg-bear/10 hover:text-bear"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )
        )}

        {options.length === 0 && editingId !== "new" && (
          <p className="py-4 text-center text-xs text-[rgb(var(--muted))]">
            No crypto options yet, add one above.
          </p>
        )}
      </div>
    </div>
  );
}

function BankDetailsManager({ initialDetails }: { initialDetails: BankTransferDetails | null }) {
  const [accountName, setAccountName] = React.useState(initialDetails?.account_name ?? "");
  const [accountNumber, setAccountNumber] = React.useState(initialDetails?.account_number ?? "");
  const [bankName, setBankName] = React.useState(initialDetails?.bank_name ?? "");
  const [swiftBic, setSwiftBic] = React.useState(initialDetails?.swift_bic ?? "");
  const [routingNumber, setRoutingNumber] = React.useState(initialDetails?.routing_number ?? "");
  const [iban, setIban] = React.useState(initialDetails?.iban ?? "");
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    const formData = new FormData();
    if (initialDetails) formData.set("id", initialDetails.id);
    formData.set("accountName", accountName);
    formData.set("accountNumber", accountNumber);
    formData.set("bankName", bankName);
    formData.set("swiftBic", swiftBic);
    formData.set("routingNumber", routingNumber);
    formData.set("iban", iban);

    startTransition(async () => {
      const res = await updateBankDetailsAction({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({ type: "success", message: "Bank details updated." });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl glass-surface glass-border p-5"
    >
      <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
        Bank Transfer Details
      </h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-[rgb(var(--muted))]">
            Account Holder Name
          </label>
          <input
            required
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="e.g. Liberty Equity Holdings Ltd"
            className="w-full rounded-lg glass-surface glass-border border px-3 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none focus:border-bull/50"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[rgb(var(--muted))]">
            Account Number
          </label>
          <input
            required
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="e.g. 0123456789"
            className="w-full rounded-lg glass-surface glass-border border px-3 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none focus:border-bull/50"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[rgb(var(--muted))]">
            Bank Name
          </label>
          <input
            required
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="e.g. First Atlantic Bank"
            className="w-full rounded-lg glass-surface glass-border border px-3 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none focus:border-bull/50"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[rgb(var(--muted))]">
            SWIFT / BIC Code
          </label>
          <input
            required
            value={swiftBic}
            onChange={(e) => setSwiftBic(e.target.value)}
            placeholder="e.g. FABKUS33XXX"
            className="w-full rounded-lg glass-surface glass-border border px-3 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none focus:border-bull/50"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[rgb(var(--muted))]">
            Routing Number <span className="text-[rgb(var(--muted))]/60">(optional)</span>
          </label>
          <input
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            placeholder="e.g. 021000021"
            className="w-full rounded-lg glass-surface glass-border border px-3 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none focus:border-bull/50"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[rgb(var(--muted))]">
            IBAN <span className="text-[rgb(var(--muted))]/60">(optional)</span>
          </label>
          <input
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            placeholder="e.g. GB29 NWBK 6016 1331 9268 19"
            className="w-full rounded-lg glass-surface glass-border border px-3 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none focus:border-bull/50"
          />
        </div>
      </div>

      <Toast result={result} />

      <button
        type="submit"
        disabled={isPending}
        className="flex w-fit items-center gap-2 rounded-full bg-bull px-5 py-2.5 text-sm font-semibold text-[#07090e] transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        Save Bank Details
      </button>
    </form>
  );
}

export function AdminDepositSettingsManager({
  cryptoOptions,
  bankDetails,
}: {
  cryptoOptions: CryptoDepositOption[];
  bankDetails: BankTransferDetails | null;
}) {
  return (
    <div className="flex flex-col gap-5">
      <CryptoOptionsManager initialOptions={cryptoOptions} />
      <BankDetailsManager initialDetails={bankDetails} />
    </div>
  );
}
