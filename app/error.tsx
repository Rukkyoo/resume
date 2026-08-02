'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="badge badge-muted mb-2">Something went wrong</div>
      <h1 className="text-headline-md" style={{ color: 'var(--color-on-surface)' }}>
        An unexpected error occurred
      </h1>
      <p className="text-body-md max-w-md" style={{ color: 'var(--color-text-muted)' }}>
        We&apos;re sorry for the inconvenience. Please try again or return to the home page.
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Go home
        </Link>
      </div>
    </div>
  );
}
