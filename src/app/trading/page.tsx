import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { TradingViewTicker } from "@/components/landing/tradingview-ticker";
import { TRADING_FEATURES } from "@/lib/trading-features";

export const metadata: Metadata = {
  title: "Trading | Liberty Equity Holdings",
  description:
    "A live trading terminal for crypto, forex, and preferred stock — real-time execution, full order history, no hidden mechanics.",
};

export default function TradingPage() {
  return (
    <>
      <Navbar transparentOnTop={false} />
      <main className="min-h-screen pt-20">
        <section className="relative py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
              The terminal
            </span>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
              One terminal, real execution.
            </h1>
            <p className="mt-4 text-balance leading-relaxed text-[rgb(var(--muted))]">
              Live pricing, order execution, and a complete history of every
              trade you place, nothing simulated where it counts, nothing
              hidden afterward.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2 rounded-full bg-bull px-7 py-3.5 text-sm font-semibold text-[#07090e] shadow-glow transition-transform hover:scale-[1.03]"
              >
                Open the Terminal
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/markets"
                className="rounded-full glass-surface glass-border px-7 py-3.5 text-sm font-semibold text-[rgb(var(--foreground))] transition-colors hover:bg-white/[0.04]"
              >
                View Live Markets
              </Link>
            </div>
          </div>
        </section>

        <TradingViewTicker />

        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {TRADING_FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl glass-surface glass-border p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bull/10">
                    <feature.icon className="h-4 w-4 text-bull" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-[rgb(var(--foreground))]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
