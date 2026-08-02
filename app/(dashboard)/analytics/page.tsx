import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytics' };

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-headline-md" style={{ color: 'var(--color-on-surface)' }}>
        Analytics
      </h1>
      <div className="card-surface p-8 text-center">
        <span className="text-label-sm" style={{ color: 'var(--color-primary)' }}>
          Analytics UI coming soon
        </span>
      </div>
    </div>
  );
}
