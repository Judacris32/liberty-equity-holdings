"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2, MailCheck } from "lucide-react";
import { requestPasswordResetAction } from "@/lib/actions/password-reset";
import { FormField } from "./form-field";

export function ForgotPasswordForm({ linkExpired = false }: { linkExpired?: boolean }) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [sentTo, setSentTo] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.set("email", email);

    startTransition(async () => {
      const res = await requestPasswordResetAction({ error: null }, formData);
      if (res.error) setError(res.error);
      else setSentTo(email);
    });
  };

  if (sentTo) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl glass-surface glass-border border px-6 py-8 text-center">
        <MailCheck className="h-9 w-9 text-bull" />
        <p className="text-sm font-semibold text-[rgb(var(--foreground))]">Check your email</p>
        <p className="text-sm leading-relaxed text-[rgb(var(--muted))]">
          If an account exists for <span className="font-medium text-[rgb(var(--foreground))]">{sentTo}</span>,
          we&apos;ve sent a link to reset your password. It may take a minute — check your spam folder too.
        </p>
        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="mt-2 text-xs font-medium text-bull hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {linkExpired && (
        <p className="rounded-lg bg-bear/10 px-3 py-2 text-xs text-bear">
          That reset link has expired or was already used. Enter your email to get a new one.
        </p>
      )}

      <FormField
        label="Email address"
        name="email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error ?? undefined}
      />

      <button
        type="submit"
        disabled={isPending || !email}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-bull py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Sending link..." : "Send Reset Link"}
      </button>

      <Link href="/login" className="text-center text-xs font-medium text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]">
        Back to log in
      </Link>
    </form>
  );
}
