"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Grid3x3, ListFilter, ArrowLeftRight } from "lucide-react";
import { MarketStatsStrip } from "./market-stats-strip";
import { LiveMarketTable } from "./live-market-table";
import { TradingViewHeatmap } from "./tradingview-heatmap";
import { TradingViewScreener } from "./tradingview-screener";
import { TradingViewForexCrossRates } from "./tradingview-forex-cross-rates";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "heatmap", label: "Heatmap", icon: Grid3x3 },
  { id: "screener", label: "Screener", icon: ListFilter },
  { id: "forex", label: "Forex", icon: ArrowLeftRight },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function MarketsSection() {
  const [activeTab, setActiveTab] = React.useState<TabId>("overview");

  return (
    <section id="markets" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-bull/[0.05] blur-[150px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Asymmetric header: copy + photo */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
              Live, not staged
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
              The market, exactly as it stands right now.
            </h2>
            <p className="mt-4 text-balance leading-relaxed text-[rgb(var(--muted))]">
              Real prices and real market caps, streamed live and refreshed
              automatically, nothing staged, nothing delayed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl glass-border border">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Low angle view of city high-rise buildings during daytime"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        <div className="mb-6">
          <MarketStatsStrip />
        </div>

        {/* Tab switcher */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "border-bull/40 bg-bull/10 text-bull"
                    : "glass-border glass-surface text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {activeTab === "overview" && <LiveMarketTable />}
            {activeTab === "heatmap" && <TradingViewHeatmap />}
            {activeTab === "screener" && <TradingViewScreener />}
            {activeTab === "forex" && <TradingViewForexCrossRates />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
