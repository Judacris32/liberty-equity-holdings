import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ProofToast } from "@/components/landing/proof-toast";
import { TradingViewTicker } from "@/components/landing/tradingview-ticker";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { MarketsSection } from "@/components/landing/markets-section";
import { SecuritySection } from "@/components/landing/security-section";
import { TransparencySection } from "@/components/landing/transparency-section";
import { InsightsSection } from "@/components/landing/insights-section";
import { FaqSection } from "@/components/landing/faq-section";
import { AboutSection } from "@/components/landing/about-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <TradingViewTicker />
      <HowItWorksSection />
      <MarketsSection />
      <SecuritySection />
      <TransparencySection />
      <InsightsSection />
      <FaqSection />
      <AboutSection />
      <FinalCtaSection />
      <Footer />
      <ProofToast />
    </main>
  );
}
