"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Activity, PieChart, Radar } from "lucide-react";
import { formatCompactCurrency } from "@/lib/format-compact";

type GlobalStats = {
  total_market_cap_usd: number;
  total_volume_usd: number;
  btc_dominance: number;
  active_cryptocurrencies: number;
};

const COINGECKO_GLOBAL_URL = "https://api.coingecko.com/api/v3/global";
const POLL_INTERVAL_MS = 90_000;

// Each stat gets its own fitting accent — kept as tasteful low-opacity
// tints rather than solid blocks, so the row stays cohesive with the
// rest of the site while still reading as visually distinct at a glance.
const STAT_THEMES = {
  marketCap: {
    icon: Coins,
    text: "text-bull",
    bg: "bg-bull/10",
    border: "border-bull/20",
    glow: "hover:shadow-[0_0_28px_-8px_rgba(0,255,136,0.4)]",
    bar: "bg-bull",
  },
  volume: {
    icon: Activity,
    text: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/20",
    glow: "hover:shadow-[0_0_28px_-8px_rgba(56,189,248,0.4)]",
    bar: "bg-sky-400",
  },
  dominance: {
    icon: PieChart,
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    glow: "hover:shadow-[0_0_28px_-8px_rgba(251,191,36,0.4)]",
    bar: "bg-amber-400",
  },
  tracked: {
    icon: Radar,
    text: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    glow: "hover:shadow-[0_0_28px_-8px_rgba(167,139,250,0.4)]",
    bar: "bg-violet-400",
  },
} as const;

export function MarketStatsStrip() {
  const [stats, setStats] = React.useState<GlobalStats | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const fetchGlobal = async () => {
      try {
        const res = await fetch(COINGECKO_GLOBAL_URL);
        if (!res.ok) throw new Error("Failed to fetch global stats");
        const json = await res.json();
        if (!cancelled) {
          setStats({
            total_market_cap_usd: json.data.total_market_cap.usd,
            total_volume_usd: json.data.total_volume.usd,
            btc_dominance: json.data.market_cap_percentage.btc,
            active_cryptocurrencies: json.data.active_cryptocurrencies,
          });
        }
      } catch {
        // Silently skip — the table below still renders real per-coin data
        // even if this aggregate endpoint is briefly unavailable.
      }
    };

    fetchGlobal();
    const interval = setInterval(fetchGlobal, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const items = [
    {
      key: "marketCap",
      label: "Total Market Cap",
      value: stats ? formatCompactCurrency(stats.total_market_cap_usd) : null,
      theme: STAT_THEMES.marketCap,
      // Share of market cap represented by 24h volume gives the bar
      // something real to show rather than an arbitrary fill.
      fillPercent:
        stats && stats.total_market_cap_usd > 0
          ? Math.min((stats.total_volume_usd / stats.total_market_cap_usd) * 100 * 10, 100)
          : null,
      fillNote: "24h turnover",
    },
    {
      key: "volume",
      label: "24h Volume",
      value: stats ? formatCompactCurrency(stats.total_volume_usd) : null,
      theme: STAT_THEMES.volume,
      fillPercent: null,
      fillNote: null,
    },
    {
      key: "dominance",
      label: "BTC Dominance",
      value: stats ? `${stats.btc_dominance.toFixed(1)}%` : null,
      theme: STAT_THEMES.dominance,
      // A genuine percentage — the bar shows exactly what the number says.
      fillPercent: stats ? stats.btc_dominance : null,
      fillNote: "of total market",
    },
    {
      key: "tracked",
      label: "Active Coins Tracked",
      value: stats ? stats.active_cryptocurrencies.toLocaleString() : null,
      theme: STAT_THEMES.tracked,
      fillPercent: null,
      fillNote: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
          className={`group relative overflow-hidden rounded-xl border ${item.theme.bg} ${item.theme.border} ${item.theme.glow} px-4 py-4 transition-shadow duration-300`}
        >
          {/* Oversized watermark icon — bleeds off the corner, scales up
              subtly on hover. Reads as designed texture rather than a
              small decorative badge. */}
          <item.theme.icon
            aria-hidden
            className={`pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 opacity-[0.08] transition-transform duration-500 group-hover:scale-110 ${item.theme.text}`}
          />

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={item.value ?? "loading"}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-xl font-semibold tabular-nums text-[rgb(var(--foreground))] sm:text-2xl"
              >
                {item.value ?? (
                  <span className="inline-block h-7 w-20 animate-pulse rounded bg-white/[0.08]" />
                )}
              </motion.p>
            </AnimatePresence>

            <p className="mt-1 text-xs text-[rgb(var(--muted))]">{item.label}</p>

            {/* Only rendered where the number is genuinely a proportion —
                the layout responds to the data instead of forcing every
                card into the same shape. */}
            {item.fillPercent !== null && (
              <div className="mt-3">
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.fillPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.3 + i * 0.06, ease: "easeOut" }}
                    className={`h-full rounded-full ${item.theme.bar}`}
                  />
                </div>
                <p className="mt-1.5 text-[10px] text-[rgb(var(--muted))]">
                  {item.fillNote}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
