"use client";

import * as React from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { resetPasswordAction } from "@/lib/actions/password-reset";
import { FormField } from "./form-field";

export function ResetPasswordForm() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    startTransition(async () => {
      const res = await resetPasswordAction({ error: null }, formData);
      // On success the action redirects to the dashboard.
      if (res?.error) setError(res.error);
    });
  };

  const toggle = (
    <button
      type="button"
      onClick={() => setShow((v) => !v)}
      className="text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <FormField
        label="New password"
        name="password"
        type={show ? "text" : "password"}
        placeholder="••••••••"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rightElement={toggle}
      />
      <FormField
        label="Confirm new password"
        name="confirmPassword"
        type={show ? "text" : "password"}
        placeholder="••••••••"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <p className="text-[11px] text-[rgb(var(--muted))]">
        At least 8 characters, with one uppercase letter and one number.
      </p>

      {error && (
        <p className="rounded-lg bg-bear/10 px-3 py-2 text-xs text-bear">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending || !password || !confirmPassword}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-bull py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Updating..." : "Set New Password"}
      </button>
    </form>
  );
}
