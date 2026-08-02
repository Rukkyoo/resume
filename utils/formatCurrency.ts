export function formatCurrency(
  amount: number,
  currency = 'USD',
  options?: Omit<Intl.NumberFormatOptions, 'style' | 'currency'>
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    ...options,
  }).format(amount);
}


export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
}
