import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-headline-md" style={{ color: 'var(--color-on-surface)' }}>
          Dashboard
        </h1>
        <p className="text-body-md mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Welcome back — here&apos;s your resume performance at a glance.
        </p>
      </div>
      {/* Dashboard stats, charts, and activity will be built here */}
      <div className="card-surface p-8 text-center">
        <span className="text-label-sm" style={{ color: 'var(--color-primary)' }}>
          Dashboard UI coming soon
        </span>
      </div>
    </div>
  );
}
