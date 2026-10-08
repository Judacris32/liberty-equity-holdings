import Link from "next/link";
import type { Metadata } from "next";
import { Mail, Clock, Lock } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Set New Password | Liberty Equity Holdings",
};

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage() {
  // The email link signs the user in via /auth/callback before landing
  // here. No session means the link was invalid, expired, or opened in a
  // different browser from the one that requested it.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <AuthShell
      title={user ? "Set a new password" : "Link expired"}
      subtitle={
        user
          ? `Choose a new password for ${user.email}.`
          : "This reset link is no longer valid. Request a new one to continue."
      }
      image="https://images.unsplash.com/photo-1566866856854-a0b3d69a62c0?auto=format&fit=crop&w=1600&q=80"
      imageAlt="City skyline of illuminated buildings at night"
      panelHeadline="Locked out? It happens."
      panelSubcopy="Reset your password in a couple of minutes and get straight back to your dashboard."
      panelPoints={[
        {
          icon: Mail,
          title: "A one-time link by email",
          description: "We send a secure link to the email on your account.",
        },
        {
          icon: Clock,
          title: "Short-lived by design",
          description: "Each link works once and expires soon after it is sent.",
        },
        {
          icon: Lock,
          title: "Your account stays yours",
          description: "Only someone with access to your inbox can reset the password.",
        },
      ]}
      footer={
        <>
          Back to{" "}
          <Link href="/login" className="font-medium text-bull hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {user ? (
        <ResetPasswordForm />
      ) : (
        <Link
          href="/forgot-password"
          className="flex w-full items-center justify-center rounded-full bg-bull py-3 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.01]"
        >
          Request a new link
        </Link>
      )}
    </AuthShell>
  );
}
