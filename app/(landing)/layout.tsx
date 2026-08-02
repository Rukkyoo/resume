import type { Metadata } from 'next';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';

export const metadata: Metadata = {
  title: {
    default: 'ResumeAI — Tailor Your Resume for Every Job in Seconds',
    template: '%s | ResumeAI',
  },
};


export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </>
  );
}
