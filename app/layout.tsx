import type { Metadata, Viewport } from 'next';
import { Providers } from '@/components/providers';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#006c49',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://resumeai.app'),
  title: {
    default: 'ResumeAI — Tailor Your Resume for Every Job in Seconds',
    template: '%s | ResumeAI',
  },
  description:
    'AI-powered resume optimization that analyzes job descriptions, highlights your relevant skills with surgical precision, and generates tailored resumes in seconds.',
  keywords: ['resume', 'AI', 'job application', 'ATS', 'resume builder', 'career'],
  authors: [{ name: 'ResumeAI' }],
  creator: 'ResumeAI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'ResumeAI',
    title: 'ResumeAI — Tailor Your Resume for Every Job in Seconds',
    description:
      'AI-powered resume optimization. Tailored resumes, ATS scoring, and precision editing in seconds.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'ResumeAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeAI — Tailor Your Resume for Every Job in Seconds',
    description: 'AI-powered resume optimization. Tailored resumes in seconds.',
    images: ['/og.png'],
    creator: '@resumeai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col antialiased bg-slate-100">
        <div className="flex-1 flex flex-col bg-[var(--color-surface-tint)] w-full lg:px-24 py-4 md:p-8 border border-slate-200 overflow-hidden">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
