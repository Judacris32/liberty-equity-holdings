/**
 * All money math happens in integer cents to avoid classic JS
 * floating-point drift (e.g. 0.1 + 0.2 !== 0.3). Values only become
 * decimal dollars again at the display/DB boundary.
 */

export function toCents(amount: number | string): number {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return Math.round(value * 100);
}

export function fromCents(cents: number): number {
  return Math.round(cents) / 100;
}

export function addCurrency(a: number | string, b: number | string): number {
  return fromCents(toCents(a) + toCents(b));
}

export function subtractCurrency(a: number | string, b: number | string): number {
  return fromCents(toCents(a) - toCents(b));
}
