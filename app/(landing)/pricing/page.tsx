import type { Metadata } from 'next';
import { PricingSection } from '@/components/landing/PricingSection';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing. Start free, upgrade when you need more.',
};

export default function PricingPage() {
  return (
    <div className="py-24">
      <PricingSection />
    </div>
  );
}
