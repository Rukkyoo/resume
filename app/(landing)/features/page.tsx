import type { Metadata } from 'next';
import { FeaturesSection } from '@/components/landing/FeaturesSection';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Discover how ResumeAI helps you land more interviews with AI-powered resume tailoring.',
};

export default function FeaturesPage() {
  return (
    <div className="py-24">
      <FeaturesSection />
    </div>
  );
}
