/** Figures use Kenyan English grouping in both languages, so they match the sources exactly. */
const nf = new Intl.NumberFormat("en-KE");

export function formatNumber(n: number, decimals = 0): string {
  return decimals === 0
    ? nf.format(Math.round(n))
    : new Intl.NumberFormat("en-KE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
}

export function percent(part: number, whole: number, decimals = 1): number {
  const f = 10 ** decimals;
  return Math.round((part / whole) * 100 * f) / f;
}
