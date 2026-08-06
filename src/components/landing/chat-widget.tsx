"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { submitSupportMessage } from "@/lib/actions/support";

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", message);

    startTransition(async () => {
      const res = await submitSupportMessage({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({ type: "success", message: "Sent — we'll reply by email." });
        setMessage("");
      }
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-2xl glass-surface glass-border shadow-2xl"
          >
            <div className="flex items-center justify-between border-b glass-border px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
                  Leave us a message
                </p>
                <p className="mt-0.5 text-xs text-[rgb(var(--muted))]">
                  Not a live chat — we typically reply within a day.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[rgb(var(--muted))] transition-colors hover:bg-white/[0.06]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {result?.type === "success" ? (
              <div className="flex flex-col items-center gap-2 px-5 py-10 text-center">
                <CheckCircle2 className="h-8 w-8 text-bull" />
                <p className="text-sm font-medium text-[rgb(var(--foreground))]">
                  {result.message}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
                <input
                  type="text"
                  placeholder="Name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl glass-surface glass-border border px-3.5 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl glass-surface glass-border border px-3.5 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="How can we help?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="resize-none rounded-xl glass-surface glass-border border px-3.5 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
                />

                {result?.type === "error" && (
                  <p className="text-xs text-bear">{result.message}</p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center justify-center gap-2 rounded-full bg-bull py-2.5 text-sm font-semibold text-[#07090e] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-bull text-[#07090e] shadow-glow"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
