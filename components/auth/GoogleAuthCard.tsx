'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { FcGoogle } from 'react-icons/fc';
import { Loader2, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

interface GoogleAuthCardProps {
  mode: 'sign-in' | 'sign-up';
}

export function GoogleAuthCard({ mode }: GoogleAuthCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl: ROUTES.dashboard });
    } catch (error) {
      console.error('Google sign in error:', error);
      setIsLoading(false);
    }
  };

  const isSignIn = mode === 'sign-in';

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-[#f1faee] border-2 border-[#1d3557] shadow-[6px_6px_0px_#1d3557] relative overflow-hidden">
      {/* Top back link */}
      <Link
        href={ROUTES.home}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1d3557] hover:text-[#e63946] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#e63946] border-2 border-[#1d3557] shadow-[3px_3px_0px_#1d3557] mb-4 text-white">
          <Sparkles className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d3557] tracking-tight">
          {isSignIn ? 'Welcome Back' : 'Create Your Account'}
        </h1>
        <p className="text-sm font-medium text-[#457b9d] mt-2">
          {isSignIn
            ? 'Sign in to access your tailored resumes and ATS scores.'
            : 'Get started with AI-powered resume optimization in seconds.'}
        </p>
      </div>

      {/* Google Auth Button */}
      <div className="space-y-4">
        <button
          onClick={handleGoogleAuth}
          disabled={isLoading}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl font-bold text-[#1d3557] bg-white border-2 border-[#1d3557] shadow-[4px_4px_0px_#1d3557] hover:bg-sky-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1d3557] transition-all disabled:opacity-60 disabled:cursor-not-allowed text-base cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#e63946]" />
          ) : (
            <FcGoogle className="w-6 h-6 shrink-0" />
          )}
          <span>{isLoading ? 'Connecting to Google...' : `Continue with Google`}</span>
        </button>
      </div>

      {/* Footer Switch Link */}
      <div className="mt-8 pt-6 border-t border-[#1d3557]/15 text-center text-sm font-medium text-[#1d3557]">
        {isSignIn ? (
          <p>
            Don't have an account?{' '}
            <Link
              href={ROUTES.signUp}
              className="font-bold text-[#e63946] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link
              href={ROUTES.signIn}
              className="font-bold text-[#e63946] hover:underline"
            >
              Sign In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
