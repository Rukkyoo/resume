import Link from 'next/link';
import { footerNav } from '@/config/navigation';
import { siteConfig } from '@/config/site';

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--color-surface-container-low)',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div className="container-app py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-base"
              style={{ color: 'var(--color-on-surface)', fontFamily: 'var(--font-display)' }}
            >
              <span
                className="flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold"
                style={{ background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
              >
                R
              </span>
              ResumeAI
            </Link>
            <p className="text-body-md" style={{ color: 'var(--color-text-muted)', maxWidth: '200px' }}>
              AI-powered resume tailoring for modern professionals.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                  style={{
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-muted)',
                    background: 'var(--color-surface-container-lowest)',
                    fontSize: '13px',
                  }}
                >
                  {s.icon === 'twitter' ? '𝕏' : 'in'}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {(Object.keys(footerNav) as Array<keyof typeof footerNav>).map((group) => (
            <div key={group} className="flex flex-col gap-3">
              <span
                className="text-label-sm"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {group.charAt(0).toUpperCase() + group.slice(1)}
              </span>
              <ul className="flex flex-col gap-2" role="list">
                {footerNav[group].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body-md transition-colors"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-label-sm" style={{ color: 'var(--color-text-muted)' }}>
            © {year} ResumeAI. All rights reserved.
          </p>
          <p className="text-label-sm" style={{ color: 'var(--color-outline)' }}>
            {siteConfig.contact.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
