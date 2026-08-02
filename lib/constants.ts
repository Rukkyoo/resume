export const APP_NAME = 'ResumeAI';
export const APP_VERSION = '0.1.0';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://api.resumeai.app/v1';

export const PAGINATION_PAGE_SIZE = 20;
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const SUPPORTED_RESUME_FORMATS = ['.pdf', '.docx', '.txt'] as const;

export const ATS_SCORE_THRESHOLDS = {
  poor: 40,
  average: 65,
  good: 80,
  excellent: 90,
} as const;

export const ROUTES = {
  home: '/',
  pricing: '/pricing',
  features: '/features',
  contact: '/contact',
  dashboard: '/dashboard',
  analytics: '/dashboard/analytics',
  resumes: '/dashboard/resumes',
  profile: '/dashboard/profile',
  settings: '/dashboard/settings',
  billing: '/dashboard/billing',
  signIn: '/sign-in',
  signUp: '/sign-up',
} as const;
