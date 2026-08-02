import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-headline-md" style={{ color: 'var(--color-on-surface)' }}>
        Settings
      </h1>
      <div className="card-surface p-8 text-center">
        <span className="text-label-sm" style={{ color: 'var(--color-primary)' }}>
          Settings UI coming soon
        </span>
      </div>
    </div>
  );
}
