import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { ROUTES } from '@/lib/constants';
import { GoogleAuthCard } from '@/components/auth/GoogleAuthCard';

export const metadata: Metadata = {
  title: 'Sign In — ResumeAI',
  description: 'Sign in to ResumeAI using your Google account.',
};

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(ROUTES.dashboard);
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6">
      <GoogleAuthCard mode="sign-in" />
    </div>
  );
}
