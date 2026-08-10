export type CopyableField = {
  label: string;
  value: string;
};

export type CryptoDepositOption = {
  id: string;
  symbol: string;
  network: string;
  address: string;
};

// Demo addresses and account details for display purposes only. This
// platform simulates deposits via the form on this page — nothing sent
// to these addresses would actually be credited, since no real wallet
// or bank account sits behind them.
export const CRYPTO_DEPOSIT_OPTIONS: CryptoDepositOption[] = [
  {
    id: "btc",
    symbol: "BTC",
    network: "Bitcoin",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  },
  {
    id: "eth",
    symbol: "ETH",
    network: "Ethereum (ERC-20)",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976",
  },
  {
    id: "usdt",
    symbol: "USDT",
    network: "Tron (TRC-20)",
    address: "TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf",
  },
];

export const BANK_TRANSFER_DETAILS: CopyableField[] = [
  { label: "Account Name", value: "Liberty Equity Holdings Ltd" },
  { label: "Account Number", value: "0123456789" },
  { label: "Bank Name", value: "First Atlantic Bank" },
  { label: "SWIFT / BIC", value: "FABKUS33XXX" },
  { label: "Routing Number", value: "021000021" },
];
