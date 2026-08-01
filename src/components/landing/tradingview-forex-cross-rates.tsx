"use client";

import * as React from "react";
import { useTheme } from "next-themes";

/**
 * Embeds TradingView's official free "Forex Cross Rates" widget — a
 * matrix of major currency pairs. Real, live public market data. Docs:
 * https://www.tradingview.com/widget/forex-cross-rates/
 */
export function TradingViewForexCrossRates() {
  const container = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 500,
      currencies: ["EUR", "USD", "GBP", "JPY", "CHF", "AUD", "CAD", "NZD"],
      isTransparent: true,
      colorTheme: resolvedTheme === "light" ? "light" : "dark",
      locale: "en",
    });

    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="overflow-hidden rounded-2xl glass-surface glass-border p-1">
      <div
        ref={container}
        className="tradingview-widget-container"
        style={{ height: 500 }}
      />
    </div>
  );
}
