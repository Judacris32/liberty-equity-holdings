"use client";

import * as React from "react";
import { ArrowUpRight, ArrowDownRight, Radio } from "lucide-react";
import type { TradableSymbol } from "@/lib/tradable-symbols";

/**
 * Subscribes to Binance's free public WebSocket trade stream for real-time
 * tick-by-tick price updates. This is genuine live market data streamed
 * directly from Binance — not simulated. No API key required; this is a
 * public, unauthenticated market data stream.
 *
 * For symbols without a Binance stream (e.g. FX pairs), falls back to a
 * static "streaming unavailable" state rather than fabricating ticks.
 */
export function LiveTickerFeed({ symbol }: { symbol: TradableSymbol }) {
  const [price, setPrice] = React.useState<number | null>(null);
  const [prevPrice, setPrevPrice] = React.useState<number | null>(null);
  const [connected, setConnected] = React.useState(false);
  const wsRef = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    setPrice(null);
    setPrevPrice(null);
    setConnected(false);

    if (!symbol.binanceStream) return;

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.binanceStream}@trade`
    );
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const newPrice = parseFloat(data.p);
        setPrice((current) => {
          if (current !== null) setPrevPrice(current);
          return newPrice;
        });
      } catch {
        // Ignore malformed frames
      }
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [symbol.binanceStream]);

  if (!symbol.binanceStream) {
    return (
      <div className="flex items-center gap-2 rounded-xl glass-surface glass-border px-4 py-3 text-xs text-[rgb(var(--muted))]">
        Live tick streaming isn&apos;t available for {symbol.label} in this
        demo, forex data is shown via the chart above.
      </div>
    );
  }

  const up = prevPrice !== null && price !== null && price >= prevPrice;
  const hasComparison = prevPrice !== null && price !== null;

  return (
    <div className="flex items-center justify-between rounded-xl glass-surface glass-border px-4 py-3">
      <div className="flex items-center gap-2">
        <Radio
          className={`h-3.5 w-3.5 ${
            connected ? "text-bull" : "text-[rgb(var(--muted))]"
          }`}
        />
        <span className="text-xs font-medium text-[rgb(var(--muted))]">
          {connected ? "Live" : "Connecting..."} &middot; {symbol.label}
        </span>
      </div>

      {price !== null ? (
        <span
          className={`text-lg font-semibold tabular-nums ${
            hasComparison ? (up ? "text-bull" : "text-bear") : "text-[rgb(var(--foreground))]"
          }`}
        >
          {hasComparison &&
            (up ? (
              <ArrowUpRight className="mr-1 inline h-4 w-4" />
            ) : (
              <ArrowDownRight className="mr-1 inline h-4 w-4" />
            ))}
          $
          {price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ) : (
        <span className="text-xs text-[rgb(var(--muted))]">Waiting for data...</span>
      )}
    </div>
  );
}
