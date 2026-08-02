import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the ResumeAI team.',
};

export default function ContactPage() {
  return (
    <section className="container-app py-24">
      <div className="max-w-xl mx-auto text-center">
        <span className="badge badge-muted mb-6">Contact</span>
        <h1 className="text-display-lg mb-4" style={{ color: 'var(--color-on-surface)' }}>
          Get in touch
        </h1>
        <p className="text-body-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
          Have a question or need help? We&apos;d love to hear from you.
        </p>
        
        <div className="card-surface p-8 text-left">
          <p className="text-label-sm" style={{ color: 'var(--color-primary)' }}>
            Coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
