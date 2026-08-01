"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, Lock, Eye, EyeOff } from "lucide-react";
import { passwordSchema, type PasswordInput } from "@/lib/validations/settings";
import { updatePasswordAction } from "@/lib/actions/settings";
import { FormField } from "@/components/auth/form-field";

export function PasswordForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<{ type: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: PasswordInput) => {
    setResult(null);
    const formData = new FormData();
    formData.set("newPassword", data.newPassword);
    formData.set("confirmPassword", data.confirmPassword);

    startTransition(async () => {
      const res = await updatePasswordAction({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({ type: "success", message: "Password updated successfully." });
        reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-2xl glass-surface glass-border p-5" noValidate>
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06]">
          <Lock className="h-4 w-4 text-[rgb(var(--foreground))]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">Password</h3>
          <p className="text-xs text-[rgb(var(--muted))]">Update your account password</p>
        </div>
      </div>

      <FormField
        label="New password"
        type={showPassword ? "text" : "password"}
        placeholder="At least 8 characters"
        autoComplete="new-password"
        error={errors.newPassword?.message}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        {...register("newPassword")}
      />

      <FormField
        label="Confirm new password"
        type={showPassword ? "text" : "password"}
        placeholder="Re-enter your new password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

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
        disabled={isPending}
        className="flex w-fit items-center justify-center gap-2 rounded-full glass-surface glass-border border px-6 py-2.5 text-sm font-semibold text-[rgb(var(--foreground))] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
