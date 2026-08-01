"use client";

import * as React from "react";
import { ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";

type PricePoint = {
  usd: number;
  usd_24h_change: number;
};

type PriceData = {
  bitcoin: PricePoint;
  ethereum: PricePoint;
};

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true";

const POLL_INTERVAL_MS = 30_000;

/**
 * Polls CoinGecko's free public API for real, live BTC/ETH prices.
 * This is genuine market data, not mocked. Falls back gracefully to a
 * loading state if the request fails (e.g. offline, rate-limited).
 */
export function LivePriceStream() {
  const [data, setData] = React.useState<PriceData | null>(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    const fetchPrices = async () => {
      try {
        const res = await fetch(COINGECKO_URL);
        if (!res.ok) throw new Error("Failed to fetch prices");
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (error && !data) {
    return (
      <span className="text-xs text-[rgb(var(--muted))]">
        Live prices unavailable
      </span>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center gap-2 text-xs text-[rgb(var(--muted))]">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Loading live prices...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <PricePill label="BTC" point={data.bitcoin} />
      <PricePill label="ETH" point={data.ethereum} />
    </div>
  );
}

function PricePill({ label, point }: { label: string; point: PricePoint }) {
  const up = point.usd_24h_change >= 0;

  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className="font-semibold text-[rgb(var(--foreground))]">
        {label}
      </span>
      <span className="text-[rgb(var(--muted))]">
        $
        {point.usd.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      <span
        className={`flex items-center gap-0.5 font-medium ${
          up ? "text-bull" : "text-bear"
        }`}
      >
        {up ? (
          <ArrowUpRight className="h-3 w-3" />
        ) : (
          <ArrowDownRight className="h-3 w-3" />
        )}
        {Math.abs(point.usd_24h_change).toFixed(2)}%
      </span>
    </div>
  );
}
