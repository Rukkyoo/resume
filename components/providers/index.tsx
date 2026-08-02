'use client';

import { ThemeProvider } from './ThemeProvider';

/**
 * Combines all client-side providers.
 * Add additional providers here (e.g., QueryClientProvider, Toaster) as needed.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
