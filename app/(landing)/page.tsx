import type { Metadata } from 'next';
import { LandingHero } from '@/components/landing/LandingHero';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { SocialProofSection } from '@/components/landing/SocialProofSection';
import { DemoSection } from '@/components/landing/DemoSection';
import { WhyChooseSection } from '@/components/landing/WhyChooseSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { CtaSection } from '@/components/landing/CtaSection';

export const metadata: Metadata = {
  title: 'ResumeAI — Tailor Your Resume for Every Job in Seconds',
  description:
    'AI-powered resume optimization. Match any job description in seconds, beat ATS filters, and land more interviews.',
};

export default function LandingPage() {
  return (
    <>
      <LandingHero />
      <HowItWorksSection />
      <FeaturesSection />
      <SocialProofSection />
      <DemoSection />
      <WhyChooseSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
