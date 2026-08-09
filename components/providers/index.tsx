'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './ThemeProvider';
import { useLenis } from '@/lib/useLenis';

export function Providers({ children }: { children: React.ReactNode }) {
  useLenis();
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
