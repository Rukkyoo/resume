'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Sparkles,
  LogOut,
  Loader2,
  ChevronRight,
  BarChart3,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { ResumeDetailModal, ResumeDetail } from '@/components/dashboard/ResumeDetailModal';
import { TailorResumeCard } from '@/components/dashboard/TailorResumeCard';

/* Detailed mock data */
const INITIAL_MOCK_RESUMES: ResumeDetail[] = [
  {
    id: '1',
    title: 'Frontend Engineer — Google',
    date: 'Aug 5, 2026',
    score: 92,
    fileName: 'Michael_Frontend_Engineer_CV.pdf',
    resumeContent: `MICHAEL OKAFOR
Senior Frontend Engineer | London, UK | michael@example.com

SUMMARY
Passionate Frontend Engineer with 5+ years of experience building high-performance web applications using React, Next.js, and TypeScript. Proven track record in optimizing Core Web Vitals and scaling UI component libraries.

EXPERIENCE
Frontend Developer — TechCorp (2023 - Present)
- Architected design system using Tailwind CSS and React Server Components, reducing bundle size by 35%.
- Implemented real-time analytics dashboard servicing 100k+ daily active users.
- Led migration from Pages Router to Next.js App Router, boosting page load speeds by 40%.

SKILLS
React, Next.js, TypeScript, Tailwind CSS, GraphQL, Web Vitals, Jest, CI/CD`,
    jobDescription: `Google is seeking a Senior Frontend Engineer to join the Web Infrastructure team.

Key Responsibilities:
- Build accessible, resilient, and blazing-fast web interfaces using React, Next.js, and modern CSS.
- Collaborate with UX designers and backend engineers to define API contracts and design specs.
- Optimize web application performance, accessibility (a11y), and internationalization (i18n).

Qualifications:
- 4+ years of professional experience with modern JavaScript/TypeScript frameworks.
- Deep understanding of Web Vitals, state management, and SSR/SSG patterns.
- Passion for crafting polished micro-interactions and high-quality UI components.`,
    aiRecommendations: [
      {
        id: 'r1',
        category: 'Strong Match',
        text: 'Extremely strong alignment with React, Next.js, and TypeScript requirements.',
        type: 'strength',
      },
      {
        id: 'r2',
        category: 'Improvement',
        text: 'Mention Accessibility (a11y) standards and i18n experience directly in your summary.',
        type: 'improvement',
      },
      {
        id: 'r3',
        category: 'Missing Keyword',
        text: 'Add keywords: "Internationalization (i18n)", "WCAG 2.1", "Micro-frontends".',
        type: 'keyword',
      },
    ],
  },
  {
    id: '2',
    title: 'Full-Stack Dev — Stripe',
    date: 'Aug 2, 2026',
    score: 87,
    fileName: 'Michael_Fullstack_Dev.pdf',
    resumeContent: `MICHAEL OKAFOR
Full-Stack Software Engineer | London, UK

SUMMARY
Full-Stack Engineer specialized in TypeScript, Node.js, Next.js, and PostgreSQL. Experienced in API design, webhooks integration, and payment infrastructure.

EXPERIENCE
Software Engineer — PayFlow (2022 - 2024)
- Integrated payment gateway handling over $2M monthly transactions securely.
- Built scalable REST and GraphQL APIs backed by Node.js and PostgreSQL.

SKILLS
TypeScript, Node.js, Express, PostgreSQL, Prisma, Next.js, Docker, AWS`,
    jobDescription: `Stripe is hiring a Full-Stack Engineer to scale payment APIs and merchant dashboard tools.

Requirements:
- Deep expertise in TypeScript, Node.js backend services, and PostgreSQL databases.
- Experience building financial or high-reliability transaction processing systems.
- Familiarity with Next.js, Webhooks, and Idempotency patterns in REST APIs.`,
    aiRecommendations: [
      {
        id: 'r4',
        category: 'Strong Match',
        text: 'Direct experience with payment handling ($2M monthly throughput) is a major highlight.',
        type: 'strength',
      },
      {
        id: 'r5',
        category: 'Improvement',
        text: 'Elaborate on database indexing and transaction idempotency techniques in your bullets.',
        type: 'improvement',
      },
      {
        id: 'r6',
        category: 'Missing Keyword',
        text: 'Add keywords: "Idempotency", "PCI-DSS Compliance", "Distributed Locks".',
        type: 'keyword',
      },
    ],
  },
  {
    id: '3',
    title: 'React Developer — Vercel',
    date: 'Jul 28, 2026',
    score: 78,
    fileName: 'Michael_React_Developer.pdf',
    resumeContent: `MICHAEL OKAFOR
Frontend React Specialist

SUMMARY
Frontend Developer focused on modern React ecosystems, Framer Motion animations, and web performance optimization.

EXPERIENCE
Frontend Developer — AgencyX (2021 - 2023)
- Crafted responsive marketing sites and web apps using React and Tailwind CSS.
- Engineered sleek UI transitions and dark mode themes across 15+ client projects.`,
    jobDescription: `Vercel is looking for a React Developer to join the Developer Experience team.

Responsibilities:
- Craft world-class UI components for Vercel Dashboard and DX tools.
- Drive adoption of modern React 19 features, Server Components, and Turbopack.`,
    aiRecommendations: [
      {
        id: 'r7',
        category: 'Strong Match',
        text: 'Solid Framer Motion and modern styling experience matches Vercel design standards.',
        type: 'strength',
      },
      {
        id: 'r8',
        category: 'Improvement',
        text: 'Quantify your performance gains (e.g., LCP reduction, Lighthouse 100 scores).',
        type: 'improvement',
      },
      {
        id: 'r9',
        category: 'Missing Keyword',
        text: 'Add keywords: "React 19", "Server Actions", "Edge Runtime", "Turbopack".',
        type: 'keyword',
      },
    ],
  },
];

type Tab = 'resumes' | 'tailor';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('resumes');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [resumes, setResumes] = useState<ResumeDetail[]>(INITIAL_MOCK_RESUMES);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  /* redirect unauthenticated users */
  if (status === 'unauthenticated') {
    router.replace(ROUTES.signIn);
    return null;
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-primary)' }} />
      </div>
    );
  }

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: ROUTES.signIn });
  };

  const handleSaveJobDescription = (resumeId: string, updatedJd: string) => {
    setResumes((prev) =>
      prev.map((r) => (r.id === resumeId ? { ...r, jobDescription: updatedJd } : r))
    );
  };

  const firstName = session?.user?.name?.split(' ')[0] ?? 'there';
  const resumeCount = resumes.length;
  const selectedResume = resumes.find((r) => r.id === selectedResumeId) ?? null;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'resumes',
      label: 'My Resumes',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      key: 'tailor',
      label: 'Tailor Resume',
      icon: <Sparkles className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full py-4 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-headline-md"
            style={{ color: 'var(--color-on-surface)' }}
          >
            Hey, {firstName}!
          </h1>
          <p
            className="text-body-md mt-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Here&apos;s your resume command centre.
          </p>
        </div>

        {/* Avatar + logout */}
        <div className="flex items-center gap-3 justify-between">
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name ?? 'User avatar'}
              className="w-9 h-9 rounded-full border-2"
              style={{ borderColor: 'var(--color-outline)' }}
            />
          )}
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="btn btn-ghost text-sm gap-2"
            id="dashboard-logout-btn"
            style={{ fontSize: '14px', padding: '0.5rem 1rem' }}
          >
            {isSigningOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            {isSigningOut ? 'Signing out…' : 'Log out'}
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="flex rounded-xl  gap-1"
        style={{ backgroundColor: 'var(--color-surface-container)' }}
        role="tablist"
        id="dashboard-tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            id={`tab-${tab.key}`}
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="relative flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
            style={{
              color:
                activeTab === tab.key
                  ? 'var(--color-on-surface)'
                  : 'var(--color-text-muted)',
            }}
          >
            {activeTab === tab.key && (
              <motion.div
                layoutId="active-tab-pill"
                className="absolute inset-0 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-outline)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'resumes' && (
          <motion.div
            key="resumes"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Stats card */}
            <div className="card-surface p-6">
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    border: '1px solid var(--color-outline)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p
                    className="text-label-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Tailored Resumes
                  </p>
                  <p
                    className="text-headline-md"
                    style={{ color: 'var(--color-on-surface)' }}
                  >
                    {resumeCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Resume list */}
            <div className="flex flex-col gap-3">
              {resumes.map((resume, i) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelectedResumeId(resume.id)}
                  className="card-surface p-4 flex items-center justify-between hover:cursor-pointer group hover:translate-y-[-1px] transition-all"
                  id={`resume-card-${resume.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-[#dceedd] border border-[#1d3557] text-[#1d3557] group-hover:bg-[#a8dadc] transition-colors">
                      <FileText className="w-5 h-5 shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="font-semibold text-sm truncate"
                        style={{ color: 'var(--color-on-surface)' }}
                      >
                        {resume.title}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {resume.date} • {resume.fileName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                   {/*  <span
                      className="badge text-xs"
                      style={{
                        backgroundColor:
                          resume.score >= 90
                            ? 'var(--color-tertiary)'
                            : resume.score >= 80
                              ? 'var(--color-secondary)'
                              : 'var(--color-surface-container)',
                        color:
                          resume.score >= 80
                            ? resume.score >= 90
                              ? 'var(--color-on-tertiary)'
                              : '#ffffff'
                            : 'var(--color-on-surface)',
                      }}
                    >
                      ATS {resume.score}%
                    </span> */}
                    <ChevronRight
                      className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                      style={{ color: 'var(--color-text-muted)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {resumeCount === 0 && (
              <div className="card-surface p-10 text-center">
                <FileText
                  className="w-10 h-10 mx-auto mb-3"
                  style={{ color: 'var(--color-text-muted)' }}
                />
                <p
                  className="font-semibold"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  No resumes yet
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Switch to the &quot;Tailor Resume&quot; tab to create your first one.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'tailor' && (
          <motion.div
            key="tailor"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <TailorResumeCard
              onTailorSuccess={({ fileName }) => {
                // Add newly tailored resume to user's list
                const newResume: ResumeDetail = {
                  id: String(Date.now()),
                  title: `Tailored Resume (${fileName})`,
                  date: 'Just now',
                  score: 95,
                  fileName: fileName,
                  resumeContent: 'Tailored Resume Content generated by AI...',
                  jobDescription: 'User provided job description...',
                  aiRecommendations: [
                    {
                      id: 'new-1',
                      category: 'High Compatibility',
                      text: 'Extremely strong keyword match generated for this role.',
                      type: 'strength',
                    },
                  ],
                };
                setResumes((prev) => [newResume, ...prev]);
              }}
            />

            {/* Quick stats footer */}
            <div
              className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full"
              style={{
                backgroundColor: 'var(--color-surface-container)',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-outline-variant)',
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              You&apos;ve created {resumeCount} tailored{' '}
              {resumeCount === 1 ? 'resume' : 'resumes'} so far
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Detail Modal */}
      <ResumeDetailModal
        resume={selectedResume}
        isOpen={!!selectedResume}
        onClose={() => setSelectedResumeId(null)}
        onSaveJobDescription={handleSaveJobDescription}
      />
    </div>
  );
}
