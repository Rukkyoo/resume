import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Profile' };

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-headline-md" style={{ color: 'var(--color-on-surface)' }}>
        Profile
      </h1>
      <div className="card-surface p-8 text-center">
        <span className="text-label-sm" style={{ color: 'var(--color-primary)' }}>
          Profile UI coming soon
        </span>
      </div>
    </div>
  );
}
