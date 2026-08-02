import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export function CtaSection() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      aria-labelledby="cta-heading"
      style={{ background: 'var(--color-inverse-surface)' }}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container-app relative text-center flex flex-col items-center gap-6">
        <span className="badge" style={{ background: 'rgba(78, 222, 163, 0.15)', color: 'var(--color-primary-fixed-dim)' }}>
          Start free today
        </span>
        <h2
          id="cta-heading"
          className="text-display-lg"
          style={{ color: 'var(--color-inverse-on-surface)', maxWidth: '560px' }}
        >
          Stop Sending Generic Resumes
        </h2>
        <p
          className="text-body-lg"
          style={{ color: 'rgba(240, 241, 242, 0.7)', maxWidth: '460px' }}
        >
          Join 18,000+ professionals who have landed interviews at top-tier companies using ResumeAI.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Link
            href={ROUTES.signUp}
            className="btn btn-primary"
            style={{ padding: '0.875rem 2rem', background: 'var(--color-primary-container)', color: '#00422b', borderColor: 'var(--color-primary-container)' }}
          >
            Start for Free
          </Link>
          <Link
            href="#demo"
            className="btn btn-secondary"
            style={{ background: 'transparent', color: 'var(--color-inverse-on-surface)', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            View Sample Results
          </Link>
        </div>
      </div>
    </section>
  );
}
