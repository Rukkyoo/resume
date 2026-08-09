import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | ResumeAI Dashboard',
  },
};

/**
 * Dashboard route group layout.
 * Protects all /dashboard routes — unauthenticated users are
 * redirected to the sign-in page.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(ROUTES.signIn);
  }

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
