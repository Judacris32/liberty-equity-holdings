"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Mock/simulated tickers for portfolio display purposes.
// Not connected to a live feed in this section — wired to a real
// public market data source (e.g. CoinGecko) in a later section.
const MOCK_TICKERS = [
  { symbol: "BTC/USD", price: "94,182.40", change: 2.34, up: true },
  { symbol: "ETH/USD", price: "3,412.87", change: 1.12, up: true },
  { symbol: "EUR/USD", price: "1.0842", change: -0.18, up: false },
  { symbol: "XAU/USD", price: "2,631.55", change: 0.44, up: true },
  { symbol: "GBP/USD", price: "1.2716", change: -0.09, up: false },
  { symbol: "SOL/USD", price: "184.22", change: 4.87, up: true },
];

export function HeroTickerStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {MOCK_TICKERS.map((ticker, i) => (
        <motion.div
          key={ticker.symbol}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 + i * 0.08, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-full glass-surface glass-border px-4 py-2"
        >
          <span className="text-xs font-medium text-[rgb(var(--muted))]">
            {ticker.symbol}
          </span>
          <span className="text-xs font-semibold text-[rgb(var(--foreground))]">
            {ticker.price}
          </span>
          <span
            className={`flex items-center gap-0.5 text-xs font-medium ${
              ticker.up ? "text-bull" : "text-bear"
            }`}
          >
            {ticker.up ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(ticker.change)}%
          </span>
        </motion.div>
      ))}
    </div>
  );
}
