import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { AboutSection } from "@/components/landing/about-section";
import { InsightsSection } from "@/components/landing/insights-section";

export const metadata: Metadata = {
  title: "About | Liberty Equity Holdings",
  description:
    "Why Liberty Equity Holdings exists, clarity over hype, security by default, and no guaranteed returns.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar transparentOnTop={false} />
      <main className="min-h-screen pt-20">
        <AboutSection />
        <InsightsSection />
      </main>
      <Footer />
    </>
  );
}
