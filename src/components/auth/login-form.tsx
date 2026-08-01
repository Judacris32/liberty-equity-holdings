"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { loginAction } from "@/lib/actions/auth";
import { FormField } from "./form-field";

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: LoginInput) => {
    setServerError(null);
    const formData = new FormData();
    formData.set("email", data.email);
    formData.set("password", data.password);

    startTransition(async () => {
      const result = await loginAction({ error: null }, formData);
      if (result?.error) {
        setServerError(result.error);
      }
      // On success, loginAction redirects server-side.
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
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
        placeholder="••••••••"
        autoComplete="current-password"
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

      <div className="flex justify-end">
        <a href="#" className="text-xs font-medium text-bull hover:underline">
          Forgot password?
        </a>
      </div>

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
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
