import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { SecuritySection } from "@/components/landing/security-section";
import { FaqSection } from "@/components/landing/faq-section";

export const metadata: Metadata = {
  title: "Security | Liberty Equity Holdings",
  description:
    "HTTP-only session cookies, server-side route guarding, KYC-gated deposits, and encryption at rest and in transit.",
};

export default function SecurityPage() {
  return (
    <>
      <Navbar transparentOnTop={false} />
      <main className="min-h-screen pt-20">
        <SecuritySection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
