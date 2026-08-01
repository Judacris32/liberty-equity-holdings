"use client";

import * as React from "react";
import { useTheme } from "next-themes";

/**
 * Embeds TradingView's official free "Ticker Tape" widget.
 * This pulls REAL, live public market data directly from TradingView —
 * it is not mock data. Docs: https://www.tradingview.com/widget/ticker-tape/
 */
export function TradingViewTicker() {
  const container = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "COINBASE:BTCUSD", title: "Bitcoin" },
        { proName: "COINBASE:ETHUSD", title: "Ethereum" },
        { proName: "FX:EURUSD", title: "EUR/USD" },
        { proName: "FX:GBPUSD", title: "GBP/USD" },
        { proName: "OANDA:XAUUSD", title: "Gold" },
        { proName: "COINBASE:SOLUSD", title: "Solana" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: resolvedTheme === "light" ? "light" : "dark",
      locale: "en",
    });

    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="w-full border-y glass-border py-2">
      <div ref={container} className="tradingview-widget-container" />
    </div>
  );
}
