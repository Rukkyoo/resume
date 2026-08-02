import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | ResumeAI Dashboard',
  },
};

/**
 * Dashboard route group layout.
 * Add DashboardSidebar + DashboardNavbar here when building the dashboard UI.
 * Never import landing components here.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh" style={{ background: 'var(--color-surface-container-low)' }}>
      {/* DashboardSidebar will go here */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* DashboardNavbar will go here */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
