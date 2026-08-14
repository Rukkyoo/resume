'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { TailorResumeCard } from '@/components/dashboard/TailorResumeCard';

export function LandingHero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = [
    "a Moment",
    "an Instant",
    "a Flash",
    "a Second",
    "no Time",
    "a Jiffy"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="hero-headline"
      style={{ background: '#f1faee' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-[#a8dadc] opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none" />

      <div className="container-app relative">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-10 md:gap-12 items-center py-12 md:py-28">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6">
            {/* Label chip */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span
                className="badge badge-success bg-[#a8dadc] text-[#1d3557] border border-[#1d3557]"
                style={{ padding: '0.35rem 0.85rem' }}
              >
                AI-powered
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-headline"
              className="text-display-lg text-center md:text-left mx-auto md:mx-0 font-bold"
              style={{ color: '#1d3557', maxWidth: '520px' }}
            >
              Tailor Your Resume for Every Job in{' '}
              <span style={{ color: '#e63946' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[currentWordIndex]}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.7 }}
                  >
                    {words[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="text-body-lg text-center md:text-left mx-auto md:mx-0 font-medium"
              style={{ color: '#457b9d', maxWidth: '440px' }}
            >
              Our AI{' '}
              <motion.span
                initial={{
                  backgroundSize: '0% 100%',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'linear-gradient(to right, #e63946 0%, #e63946 100%)',
                  color: '#1d3557',
                  padding: '4px',
                  fontWeight: 'bold',
                }}
                animate={{
                  backgroundSize: '100% 100%',
                  color: 'white',
                }}
                transition={{ duration: 0.8 }}
              >
                analyzes
              </motion.span>{' '}
              job descriptions,{' '}
              <motion.span
                initial={{
                  backgroundSize: '0% 100%',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'linear-gradient(to right, #e63946 0%, #e63946 100%)',
                  color: '#1d3557',
                  padding: '4px',
                  fontWeight: 'bold',
                }}
                animate={{
                  backgroundSize: '100% 100%',
                  color: 'white',
                }}
                transition={{ duration: 1.0 }}
              >
                highlights
              </motion.span>{' '}
              your relevant skills with surgical precision, and{' '}
              <motion.span
                initial={{
                  backgroundSize: '0% 100%',
                  backgroundPosition: 'left',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'linear-gradient(to right, #e63946 0%, #e63946 100%)',
                  color: '#1d3557',
                  padding: '4px',
                  fontWeight: 'bold',
                }}
                animate={{
                  backgroundSize: '100% 100%',
                  color: 'white',
                }}
                transition={{ duration: 1.2 }}
              >
                generates
              </motion.span>{' '}
              a tailored resume in seconds.
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start w-full sm:w-auto">
              <Link
                href={ROUTES.signUp}
                className="btn btn-primary bg-[#e63946] hover:bg-[#d32f3c] text-white border border-[#1d3557] shadow-[3px_3px_0px_#1d3557] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1d3557] w-full sm:w-auto"
                style={{ padding: '0.75rem 1.75rem' }}
              >
                Try for Free
              </Link>
              <Link
                href="#demo"
                className="btn btn-secondary bg-[#457b9d] hover:bg-[#3a6a89] text-white border border-[#1d3557] shadow-[3px_3px_0px_#1d3557] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#1d3557] w-full sm:w-auto"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                See it in Action →
              </Link>
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:max-w-none">
            <TailorResumeCard />
          </div>
        </div>
      </div>
    </section>
  );
}
