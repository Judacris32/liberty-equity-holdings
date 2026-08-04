"use client";

import * as React from "react";
import { useTheme } from "next-themes";

/**
 * Embeds TradingView's official free "Market Overview" widget — tabbed
 * index/futures/bond views with mini charts. Real, live market data.
 * Docs: https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/
 */
export function TradingViewMarketOverview() {
  const container = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: resolvedTheme === "light" ? "light" : "dark",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      width: "100%",
      height: 480,
      largeChartUrl: "",
      isTransparent: true,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      tabs: [
        {
          title: "Indices",
          symbols: [
            { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
            { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" },
            { s: "FOREXCOM:DJI", d: "Dow 30" },
            { s: "INDEX:NKY", d: "Nikkei 225" },
            { s: "INDEX:DEU40", d: "DAX Index" },
          ],
          originalTitle: "Indices",
        },
        {
          title: "Futures",
          symbols: [
            { s: "CME_MINI:ES1!", d: "S&P 500" },
            { s: "COMEX:GC1!", d: "Gold" },
            { s: "NYMEX:CL1!", d: "Crude Oil" },
            { s: "COMEX:SI1!", d: "Silver" },
          ],
          originalTitle: "Futures",
        },
      ],
    });

    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="overflow-hidden rounded-2xl glass-surface glass-border p-1">
      <div
        ref={container}
        className="tradingview-widget-container"
        style={{ height: 480 }}
      />
    </div>
  );
}
