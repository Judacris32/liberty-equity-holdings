"use client";

import * as React from "react";
import { useTheme } from "next-themes";

/**
 * Embeds TradingView's official free "Timeline" widget — a live news
 * feed of top market stories. Real, live content. Docs:
 * https://www.tradingview.com/widget-docs/widgets/news/timeline/
 */
export function TradingViewTimeline() {
  const container = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "all_symbols",
      // Turned off for dark mode: TradingView's Timeline widget renders
      // headline text in a low-contrast gray designed to sit on ITS OWN
      // solid dark background. With isTransparent on, that gray blends
      // into our page background and becomes nearly unreadable. Giving
      // the widget its own solid background fixes contrast at the cost
      // of a hard edge instead of blending into the page.
      isTransparent: resolvedTheme === "light",
      displayMode: "regular",
      width: "100%",
      height: 500,
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