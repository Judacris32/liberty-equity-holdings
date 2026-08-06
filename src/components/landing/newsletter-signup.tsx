"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

export function NewsletterSignup() {
  const [email, setEmail] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    const formData = new FormData();
    formData.set("email", email);

    startTransition(async () => {
      const res = await subscribeToNewsletter({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({ type: "success", message: "You're subscribed." });
        setEmail("");
      }
    });
  };

  return (
    <div className="rounded-2xl glass-surface glass-border p-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bull/10">
          <Mail className="h-4 w-4 text-bull" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[rgb(var(--foreground))]">
            Newsletter
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full flex-1 rounded-full glass-surface glass-border border px-4 py-2.5 text-sm text-[rgb(var(--foreground))] outline-none transition-colors placeholder:text-[rgb(var(--muted))]/60 focus:border-bull/50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-1.5 rounded-full bg-bull px-5 py-2.5 text-sm font-semibold text-[#07090e] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Subscribe
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`mt-2.5 flex items-center gap-1.5 text-xs ${
              result.type === "success" ? "text-bull" : "text-bear"
            }`}
          >
            {result.type === "success" && <CheckCircle2 className="h-3.5 w-3.5" />}
            {result.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
