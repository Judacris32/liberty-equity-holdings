"use client";

import * as React from "react";
import { useTheme } from "next-themes";

/**
 * Embeds TradingView's official free "Hotlists" widget — shows most
 * active, top gainers, and top losers with mini charts. Real, live
 * market data. Docs:
 * https://www.tradingview.com/widget-docs/widgets/watchlists/hotlists/
 */
export function TradingViewHotlists() {
  const container = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      exchange: "US",
      dataSource: "AllUSA",
      showChart: true,
      locale: "en",
      width: "100%",
      height: 480,
      isTransparent: true,
      colorTheme: resolvedTheme === "light" ? "light" : "dark",
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
