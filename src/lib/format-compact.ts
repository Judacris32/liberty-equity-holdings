/**
 * Formats large numbers in compact form (e.g. $2.24T, $134.06B, $569.54)
 * for market cap / volume display. Uses Intl's built-in compact notation.
 */
export function formatCompactCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPrice(value: number): string {
  // Coins under $1 need more decimal precision to be meaningful.
  const maximumFractionDigits = value < 1 ? 4 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(value);
}

export function formatPercent(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}
