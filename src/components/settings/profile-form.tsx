"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, User } from "lucide-react";
import { profileSchema, type ProfileInput } from "@/lib/validations/settings";
import { updateProfileAction } from "@/lib/actions/settings";
import { FormField } from "@/components/auth/form-field";

export function ProfileForm({
  email,
  defaultFullName,
}: {
  email: string;
  defaultFullName: string;
}) {
  const [isPending, startTransition] = React.useTransition();
  const [result, setResult] = React.useState<{ type: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: defaultFullName },
  });

  const onSubmit = (data: ProfileInput) => {
    setResult(null);
    const formData = new FormData();
    formData.set("fullName", data.fullName);

    startTransition(async () => {
      const res = await updateProfileAction({ error: null }, formData);
      if (res.error) {
        setResult({ type: "error", message: res.error });
      } else {
        setResult({ type: "success", message: "Profile updated." });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-2xl glass-surface glass-border p-5" noValidate>
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bull/10">
          <User className="h-4 w-4 text-bull" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">Profile</h3>
          <p className="text-xs text-[rgb(var(--muted))]">Your personal details</p>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[rgb(var(--muted))]">
          Email address
        </label>
        <input
          value={email}
          disabled
          className="w-full cursor-not-allowed rounded-xl glass-surface glass-border border px-4 py-2.5 text-sm text-[rgb(var(--muted))] opacity-70"
        />
      </div>

      <FormField
        label="Full name"
        type="text"
        placeholder="Jordan Blake"
        error={errors.fullName?.message}
        {...register("fullName")}
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
        className="flex w-fit items-center justify-center gap-2 rounded-full bg-bull px-6 py-2.5 text-sm font-semibold text-[#07090e] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
