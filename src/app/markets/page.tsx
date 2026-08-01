import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { TradingViewTicker } from "@/components/landing/tradingview-ticker";
import { MarketsSection } from "@/components/landing/markets-section";
import { TransparencySection } from "@/components/landing/transparency-section";

export const metadata: Metadata = {
  title: "Markets | Liberty Equity Holdings",
  description:
    "Live crypto prices, market caps, and volume — streamed straight from the source, refreshed automatically.",
};

export default function MarketsPage() {
  return (
    <>
      <Navbar transparentOnTop={false} />
      <main className="min-h-screen pt-20">
        <TradingViewTicker />
        <MarketsSection />
        <TransparencySection />
      </main>
      <Footer />
    </>
  );
}
