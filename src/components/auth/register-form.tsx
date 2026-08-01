"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { registerAction } from "@/lib/actions/auth";
import { FormField } from "./form-field";

export function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: RegisterInput) => {
    setServerError(null);
    const formData = new FormData();
    formData.set("fullName", data.fullName);
    formData.set("email", data.email);
    formData.set("password", data.password);
    formData.set("confirmPassword", data.confirmPassword);
    formData.set("agreeToTerms", data.agreeToTerms ? "on" : "");

    startTransition(async () => {
      const result = await registerAction({ error: null }, formData);
      if (result?.error) {
        setServerError(result.error);
      }
      // On success, registerAction redirects server-side.
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <FormField
        label="Full name"
        type="text"
        placeholder="Jordan Blake"
        autoComplete="name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      <FormField
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormField
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="At least 8 characters"
        autoComplete="new-password"
        error={errors.password?.message}
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
        {...register("password")}
      />

      <FormField
        label="Confirm password"
        type={showPassword ? "text" : "password"}
        placeholder="Re-enter your password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <label className="flex items-start gap-2.5 text-xs text-[rgb(var(--muted))]">
        <input
          type="checkbox"
          {...register("agreeToTerms")}
          className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent accent-bull"
        />
        <span>
          I agree to the{" "}
          <a href="#" className="font-medium text-bull hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-bull hover:underline">
            Privacy Policy
          </a>
        </span>
      </label>
      {errors.agreeToTerms && (
        <p className="-mt-2 text-xs text-bear">{errors.agreeToTerms.message}</p>
      )}

      {serverError && (
        <p className="rounded-lg bg-bear/10 px-3 py-2 text-xs text-bear">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-bull py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}
