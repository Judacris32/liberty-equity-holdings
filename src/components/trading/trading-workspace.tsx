"use client";

import * as React from "react";
import { TRADABLE_SYMBOLS } from "@/lib/tradable-symbols";
import { SymbolSelector } from "./symbol-selector";
import { TradingViewAdvancedChart } from "./tradingview-advanced-chart";
import { LiveTickerFeed } from "./live-ticker-feed";
import { OrderPanel } from "./order-panel";

export function TradingWorkspace({ availableBalance }: { availableBalance: number }) {
  const [symbol, setSymbol] = React.useState(TRADABLE_SYMBOLS[0]);

  return (
    <div className="flex flex-col gap-5">
      <SymbolSelector active={symbol} onChange={setSymbol} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4">
          <LiveTickerFeed symbol={symbol} />
          <TradingViewAdvancedChart symbol={symbol.tvSymbol} />
        </div>

        <OrderPanel symbol={symbol} availableBalance={availableBalance} />
      </div>
    </div>
  );
}
