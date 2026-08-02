// Backward-compatibility shim.
// New code should import directly from '@/utils' or '@/utils/<module>'.
export { cn, formatDate, formatCurrency, debounce, throttle } from '@/utils';

// Keep legacy exports that haven't been migrated yet
import 'lightswind';

export function generateUniqueId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
