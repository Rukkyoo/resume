'use client';

import Link from 'next/link';
import { landingNavItems } from '@/config/navigation';
import { ROUTES } from '@/lib/constants';

export function LandingNavbar() {
  return (
    <header
      className="w-full relative z-50 transition-colors"
      style={{
        background: '#c2e3e5',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '2px solid #1d3557',
      }}
    >
      <div className="container-app">
        <nav
          className="flex items-center justify-between"
          style={{ height: '64px' }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-base tracking-tight"
            style={{ color: '#1d3557', fontFamily: 'var(--font-display)' }}
          >
            {/* <span
              className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black border border-[#1d3557] shadow-[2px_2px_0px_#1d3557]"
              style={{
                background: '#e63946',
                color: '#ffffff',
              }}
            >
              Rez
            </span> */}
            ResumeAI
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {landingNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                  style={{ color: '#1d3557' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(241, 250, 238, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.signIn}
              className="hidden md:inline-flex px-4 py-2 text-sm font-semibold rounded-lg text-[#1d3557] hover:bg-[#f1faee]/40 transition-colors"
            >
              Login
            </Link>
            <Link
              href={ROUTES.signUp}
              className="btn btn-primary bg-[#e63946] hover:bg-[#d32f3c] text-white border border-[#1d3557] shadow-[2.5px_2.5px_0px_#1d3557] active:translate-x-[1px] active:translate-y-[1px]"
              style={{ padding: '0.45rem 1.15rem', fontSize: '14px', fontWeight: 700 }}
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
