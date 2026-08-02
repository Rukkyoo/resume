export const siteConfig = {
  name: 'ResumeAI',
  tagline: 'Tailor Your Resume for Every Job in Seconds',
  description:
    'AI-powered resume optimization that analyzes job descriptions, highlights your relevant skills with surgical precision, and generates tailored resumes in seconds.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://resumeai.app',
  ogImage: '/og.png',
  links: {
    twitter: 'https://twitter.com/rukkyoo',
    linkedin: 'https://linkedin.com/in/michael-omonedo',
    github: 'https://github.com/rukkyoo',
  },
  socials: [
    { label: 'Twitter', href: 'https://twitter.com/rukkyoo', icon: 'twitter' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/michael-omonedo', icon: 'linkedin' },
  ],
  contact: {
    email: 'hello@resumeai.app',
  },
} as const;

export type SiteConfig = typeof siteConfig;
