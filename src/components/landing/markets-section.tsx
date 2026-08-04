"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MarketStatsStrip } from "./market-stats-strip";
import { LiveMarketTable } from "./live-market-table";
import { TradingViewScreener } from "./tradingview-screener";
import { TradingViewForexCrossRates } from "./tradingview-forex-cross-rates";
import { TradingViewTimeline } from "./tradingview-timeline";
import { TradingViewHotlists } from "./tradingview-hotlists";
import { TradingViewMarketOverview } from "./tradingview-market-overview";

function Block({
  eyebrow,
  title,
  description,
  children,
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bull">
            {eyebrow}
          </span>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-[rgb(var(--foreground))]">
            {title}
          </h3>
        </div>
        {description && (
          <p className="max-w-sm text-xs leading-relaxed text-[rgb(var(--muted))]">
            {description}
          </p>
        )}
      </div>
      {children}
    </motion.div>
  );
}

export function MarketsSection() {
  return (
    <section id="markets" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-bull/[0.05] blur-[150px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
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

        <div className="mb-14">
          <MarketStatsStrip />
        </div>

        {/* All views stacked and always visible */}
        <div className="flex flex-col gap-16">
          <Block
            eyebrow="Top assets"
            title="Live crypto prices"
            description="Rank, price, movement, and 7-day trend — refreshed automatically."
          >
            <LiveMarketTable />
          </Block>

          {/* Two-up row: movers + index overview */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Block eyebrow="Movers" title="Most active, gainers & losers">
              <TradingViewHotlists />
            </Block>
            <Block eyebrow="Benchmarks" title="Indices & futures" delay={0.1}>
              <TradingViewMarketOverview />
            </Block>
          </div>

          <Block
            eyebrow="Currencies"
            title="Forex cross rates"
            description="Live rates across the major currency pairs."
          >
            <TradingViewForexCrossRates />
          </Block>

          <Block
            eyebrow="Deep dive"
            title="Full market screener"
            description="Sort and filter across the wider market."
          >
            <TradingViewScreener />
          </Block>

          <Block
            eyebrow="Context"
            title="Top stories"
            description="Market-moving headlines as they land."
          >
            <TradingViewTimeline />
          </Block>
        </div>
      </div>
    </section>
  );
}
