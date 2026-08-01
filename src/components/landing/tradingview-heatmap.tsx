"use client";

import * as React from "react";
import { useTheme } from "next-themes";

/**
 * Embeds TradingView's official free "Crypto Coins Heatmap" widget.
 * Real, live public market data — not mock. Docs:
 * https://www.tradingview.com/widget/crypto-coins-heatmap/
 */
export function TradingViewHeatmap() {
  const container = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      dataSource: "Crypto",
      blockSize: "market_cap_calc",
      blockColor: "change",
      locale: "en",
      symbolUrl: "",
      colorTheme: resolvedTheme === "light" ? "light" : "dark",
      hasTopBar: false,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: "100%",
      height: "400",
    });

    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="overflow-hidden rounded-2xl glass-surface glass-border p-1">
      <div
        ref={container}
        className="tradingview-widget-container"
        style={{ height: 400 }}
      />
    </div>
  );
}
