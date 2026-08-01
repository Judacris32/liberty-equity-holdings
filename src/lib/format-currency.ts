/**
 * Formats a numeric amount as USD currency using Intl.NumberFormat.
 * Values are expected to come from Postgres `numeric` columns (via
 * Supabase), which preserves exact decimal precision — formatting only
 * happens here at display time, so no floating-point arithmetic is ever
 * performed on money values in the client.
 */
export function formatCurrency(amount: number | string): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;

  if (Number.isNaN(value)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
