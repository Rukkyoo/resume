'use client';

import { ThemeProvider } from './ThemeProvider';
import { useLenis } from '@/lib/useLenis';

export function Providers({ children }: { children: React.ReactNode }) {
  useLenis();
  return <ThemeProvider>{children}</ThemeProvider>;
}
