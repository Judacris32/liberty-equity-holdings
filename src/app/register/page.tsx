import Link from "next/link";
import type { Metadata } from "next";
import { Wallet, Eye, ShieldCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account | Liberty Equity Holdings",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes only a few minutes to start your investment journey with us."
      image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
      imageAlt="Low angle view of city high-rise buildings during daytime"
      panelHeadline="Built on absolute transparency and guaranteed growth."
      panelSubcopy="Secure your financial future with structured investment plans, transparent tiers, and guaranteed returns."
      panelPoints={[
        {
          icon: Wallet,
          title: "Accessible entry tiers",
          description:
            "Start with the portfolio amount that fits your goals and unlock guaranteed returns instantly.",
        },
        {
          icon: Eye,
          title: "Transparent growth structures",
          description:
            "Clear asset allocation and fixed interest percentages with zero hidden fees or surprises.",
        },
        {
          icon: ShieldCheck,
          title: "Secured from day one",
          description:
            "Institutional-grade protection and thorough verification safeguarding your capital.",
        },
      ]}
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-bull hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
