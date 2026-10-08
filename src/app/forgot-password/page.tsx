import Link from "next/link";
import type { Metadata } from "next";
import { Mail, Clock, Lock } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password | Liberty Equity Holdings",
};

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter the email you signed up with and we'll send you a reset link."
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
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-bull hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <ForgotPasswordForm linkExpired={searchParams?.error === "link_expired"} />
    </AuthShell>
  );
}
