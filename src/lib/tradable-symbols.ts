export type TradableSymbol = {
  /** TradingView symbol format */
  tvSymbol: string;
  /** Binance WebSocket stream symbol (lowercase, no separator) */
  binanceStream: string;
  label: string;
  display: string;
};

export const TRADABLE_SYMBOLS: TradableSymbol[] = [
  {
    tvSymbol: "BINANCE:BTCUSDT",
    binanceStream: "btcusdt",
    label: "BTC/USDT",
    display: "Bitcoin",
  },
  {
    tvSymbol: "BINANCE:ETHUSDT",
    binanceStream: "ethusdt",
    label: "ETH/USDT",
    display: "Ethereum",
  },
  {
    tvSymbol: "BINANCE:SOLUSDT",
    binanceStream: "solusdt",
    label: "SOL/USDT",
    display: "Solana",
  },
  {
    tvSymbol: "FX:EURUSD",
    binanceStream: "",
    label: "EUR/USD",
    display: "Euro / US Dollar",
  },
];
