"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Sparkline } from "./sparkline";
import { formatCompactCurrency, formatPrice, formatPercent } from "@/lib/format-compact";

type CoinMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number | null;
  price_change_percentage_24h_in_currency: number | null;
  price_change_percentage_7d_in_currency: number | null;
  sparkline_in_7d?: { price: number[] };
};

const COINGECKO_MARKETS_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=true&price_change_percentage=1h,24h,7d";

const POLL_INTERVAL_MS = 60_000;

function PercentCell({ value }: { value: number | null }) {
  if (value === null || Number.isNaN(value)) {
    return <span className="text-[rgb(var(--muted))]">—</span>;
  }
  const isUp = value >= 0;
  return (
    <span className={isUp ? "text-bull" : "text-bear"}>{formatPercent(value)}</span>
  );
}

export function LiveMarketTable() {
  const [coins, setCoins] = React.useState<CoinMarket[] | null>(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    const fetchMarkets = async () => {
      try {
        const res = await fetch(COINGECKO_MARKETS_URL);
        if (!res.ok) throw new Error("Failed to fetch markets");
        const data = await res.json();
        if (!cancelled) {
          setCoins(data);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    };

    fetchMarkets();
    const interval = setInterval(fetchMarkets, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (error && !coins) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl glass-surface glass-border p-12 text-center text-sm text-[rgb(var(--muted))]">
        Live market data is temporarily unavailable. Please try again shortly.
      </div>
    );
  }

  if (!coins) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl glass-surface glass-border p-16 text-sm text-[rgb(var(--muted))]">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading live market data...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl glass-surface glass-border">
      {/* Header row — hidden on small screens, shown from sm up */}
      <div className="hidden grid-cols-[2rem_1.8fr_1fr_0.8fr_0.8fr_0.8fr_1fr_1fr_100px_auto] items-center gap-3 border-b glass-border px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[rgb(var(--muted))] sm:grid">
        <span>#</span>
        <span>Coin</span>
        <span className="text-right">Price</span>
        <span className="text-right">1h</span>
        <span className="text-right">24h</span>
        <span className="text-right">7d</span>
        <span className="text-right">Market Cap</span>
        <span className="text-right">Volume (24h)</span>
        <span className="text-right">Last 7 Days</span>
        <span />
      </div>

      <div className="divide-y divide-white/[0.06]">
        {coins.map((coin, i) => (
          <motion.div
            key={coin.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
            className="grid grid-cols-2 items-center gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02] sm:grid-cols-[2rem_1.8fr_1fr_0.8fr_0.8fr_0.8fr_1fr_1fr_100px_auto]"
          >
            <span className="hidden text-xs text-[rgb(var(--muted))] sm:block">
              {i + 1}
            </span>

            <div className="col-span-2 flex items-center gap-2.5 sm:col-span-1">
              <Image
                src={coin.image}
                alt={coin.name}
                width={24}
                height={24}
                className="h-6 w-6 shrink-0 rounded-full"
                unoptimized
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[rgb(var(--foreground))]">
                  {coin.name}
                </p>
                <p className="text-xs uppercase text-[rgb(var(--muted))]">
                  {coin.symbol}
                </p>
              </div>
            </div>

            <span className="text-right text-sm font-medium text-[rgb(var(--foreground))]">
              {formatPrice(coin.current_price)}
            </span>

            <span className="hidden text-right text-sm sm:block">
              <PercentCell value={coin.price_change_percentage_1h_in_currency} />
            </span>
            <span className="hidden text-right text-sm sm:block">
              <PercentCell value={coin.price_change_percentage_24h_in_currency} />
            </span>
            <span className="hidden text-right text-sm sm:block">
              <PercentCell value={coin.price_change_percentage_7d_in_currency} />
            </span>

            <span className="hidden text-right text-sm text-[rgb(var(--foreground))] sm:block">
              {formatCompactCurrency(coin.market_cap)}
            </span>
            <span className="hidden text-right text-sm text-[rgb(var(--foreground))] sm:block">
              {formatCompactCurrency(coin.total_volume)}
            </span>

            <span className="hidden justify-end sm:flex">
              {coin.sparkline_in_7d?.price && (
                <Sparkline data={coin.sparkline_in_7d.price} />
              )}
            </span>

            <div className="flex justify-end">
              <Link
                href="/register"
                className="rounded-full border border-bull/30 px-3.5 py-1.5 text-xs font-semibold text-bull transition-colors hover:bg-bull/10"
              >
                Trade
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
