"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { forgotPasswordSchema, resetPasswordSchema } from "@/lib/validations/password-reset";

export type PasswordResetState = { error: string | null; success?: boolean };

// Works out the site's own URL so the email link comes back to whichever
// deployment the user is on (localhost, either Vercel project, or a custom
// domain). NEXT_PUBLIC_SITE_URL overrides it if set.
async function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  const h = await headers();
  const origin = h.get("origin");
  if (origin) return origin;
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function requestPasswordResetAction(
  _prevState: PasswordResetState,
  formData: FormData
): Promise<PasswordResetState> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Enter a valid email address." };
  }

  const supabase = await createClient();
  const siteUrl = await getSiteUrl();

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    // The email template builds the link from this:
    // {{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password
    redirectTo: `${siteUrl}/auth/confirm`,
  });

  if (error) {
    console.error("[password-reset] resetPasswordForEmail:", error.message);
    // Supabase's built-in mailer allows only a few emails per hour.
    if (error.status === 429 || /rate limit/i.test(error.message)) {
      return { error: "Too many reset requests. Please wait a few minutes and try again." };
    }
    return { error: "We couldn't send the reset email. Please try again." };
  }

  // Same response whether or not the email has an account, so the form
  // can't be used to check who is registered.
  return { error: null, success: true };
}

export async function resetPasswordAction(
  _prevState: PasswordResetState,
  formData: FormData
): Promise<PasswordResetState> {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid password." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your reset link has expired. Please request a new one." };
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    console.error("[password-reset] updateUser:", error.message);
    if (/different from the old/i.test(error.message)) {
      return { error: "Your new password must be different from your old one." };
    }
    return { error: "Couldn't update your password. Please try again." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard?passwordReset=1");
}
