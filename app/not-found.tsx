import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-6 p-8 text-center">
      <span
        className="text-label-sm"
        style={{ color: 'var(--color-primary)' }}
      >
        404
      </span>
      <h1 className="text-display-lg" style={{ color: 'var(--color-on-surface)' }}>
        Page not found
      </h1>
      <p className="text-body-lg max-w-md" style={{ color: 'var(--color-text-muted)' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary mt-2">
        Back to home
      </Link>
    </div>
  );
}
