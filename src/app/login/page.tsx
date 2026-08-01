import Link from "next/link";
import type { Metadata } from "next";
import { LineChart, Lock, History } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log In | Liberty Equity Holdings",
};

export default function LoginPage() {
  return (
  <AuthShell
    title="Welcome back"
    subtitle="Log in to access your investment portfolio and live asset performance."
    image="https://images.unsplash.com/photo-1566866856854-a0b3d69a62c0?auto=format&fit=crop&w=1600&q=80"
    imageAlt="City skyline of illuminated buildings at night"
    panelHeadline="Your investments keep compounding around the clock."
    panelSubcopy="Your guaranteed returns, active allocations, and portfolio growth are right where you left them."
    panelPoints={[
      {
        icon: LineChart,
        title: "Guaranteed growth tracking",
        description:
          "Monitor your active tiers and fixed-return progress in real time with absolute clarity.",
      },
      {
        icon: History,
        title: "Complete allocation history",
        description:
          "Every deposit, interest payout, and portfolio milestone securely logged and reviewable.",
      },
      {
        icon: Lock,
        title: "Institutional-grade security",
        description:
          "Advanced server-side protection safeguarding your capital and personal assets on every request.",
      },
    ]}
    footer={
      <>
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-bull hover:underline">
          Create one
        </Link>
      </>
    }
  >
    <LoginForm />
  </AuthShell>
);
}
