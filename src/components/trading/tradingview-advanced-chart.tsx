"use client";

import * as React from "react";
import { useTheme } from "next-themes";

/**
 * Embeds TradingView's official free "Advanced Real-Time Chart" widget.
 * Real, live public market data — not mock. Docs:
 * https://www.tradingview.com/widget/advanced-chart/
 */
export function TradingViewAdvancedChart({ symbol }: { symbol: string }) {
  const container = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "15",
      timezone: "Etc/UTC",
      theme: resolvedTheme === "light" ? "light" : "dark",
      style: "1",
      locale: "en",
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      support_host: "https://www.tradingview.com",
    });

    container.current.appendChild(script);
  }, [symbol, resolvedTheme]);

  return (
    <div className="h-[500px] overflow-hidden rounded-2xl glass-surface glass-border p-1 sm:h-[600px]">
      <div
        ref={container}
        className="tradingview-widget-container h-full w-full"
      />
    </div>
  );
}
