"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
import { deleteAccountDataAction } from "@/lib/actions/danger-zone";

export function DangerZone() {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const canConfirm = confirmText === "DELETE";

  const handleDelete = () => {
    setError(null);
    const formData = new FormData();
    formData.set("confirmation", confirmText);

    startTransition(async () => {
      const result = await deleteAccountDataAction({ error: null }, formData);
      // If deletion succeeds, the action redirects server-side and this
      // line is never reached.
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-bear/20 bg-bear/[0.03] p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bear/10">
          <AlertTriangle className="h-4 w-4 text-bear" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">
            Danger Zone
          </h3>
          <p className="text-xs text-[rgb(var(--muted))]">
            Permanently delete your account data
          </p>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-[rgb(var(--muted))]">
        This deletes your portfolio balances, order history, transaction
        history, and uploaded KYC documents, and signs you out. This action
        cannot be undone.
      </p>

      {!confirmOpen ? (
        <button
          onClick={() => setConfirmOpen(true)}
          className="flex w-fit items-center gap-2 rounded-full border border-bear/30 px-5 py-2.5 text-sm font-semibold text-bear transition-colors hover:bg-bear/10"
        >
          <Trash2 className="h-4 w-4" />
          Delete Account Data
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-3 overflow-hidden rounded-xl border border-bear/20 bg-bear/[0.04] p-4"
          >
            <p className="text-xs text-[rgb(var(--foreground))]">
              Type <span className="font-mono font-semibold text-bear">DELETE</span> to
              confirm.
            </p>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-lg border border-bear/30 bg-transparent px-3 py-2 text-sm text-[rgb(var(--foreground))] outline-none placeholder:text-[rgb(var(--muted))]/50"
            />

            {error && <p className="text-xs text-bear">{error}</p>}

            <div className="flex items-center gap-2">
              <button
                onClick={handleDelete}
                disabled={!canConfirm || isPending}
                className="flex items-center gap-2 rounded-full bg-bear px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isPending ? "Deleting..." : "Confirm Deletion"}
              </button>
              <button
                onClick={() => {
                  setConfirmOpen(false);
                  setConfirmText("");
                  setError(null);
                }}
                disabled={isPending}
                className="flex items-center gap-1.5 rounded-full glass-border border px-4 py-2.5 text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
