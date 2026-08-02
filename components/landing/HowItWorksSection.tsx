const steps = [
  {
    number: '01',
    label: 'Upload & Analyze',
    description:
      'Upload your existing resume or paste your experience. Our AI reads every detail and understands your unique background.',
  },
  {
    number: '02',
    label: 'Smart Matching',
    description:
      'Paste any job description. Our AI instantly identifies the skills, keywords, and experience that match your profile.',
  },
  {
    number: '03',
    label: 'Download Ready',
    description:
      'Get a polished, ATS-optimized resume tailored for the specific role — ready to submit in seconds.',
  },
];


export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24"
      aria-labelledby="how-it-works-heading"
      style={{ background: 'var(--color-surface-container-low)' }}
    >
      <div className="container-app">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="badge badge-muted">How it works</span>
          <h2
            id="how-it-works-heading"
            className="text-headline-md"
            style={{ color: 'var(--color-on-surface)', maxWidth: '420px' }}
          >
            Precision Optimization in 3 Steps
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--color-text-muted)', maxWidth: '480px' }}>
            Our AI analyzes context, not patterns, to create a resume that genuinely reflects your
            strengths for each specific role.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="card-surface p-8 flex flex-col gap-4">
              <span
                className="text-label-sm"
                style={{ color: 'var(--color-primary)' }}
              >
                Step {step.number}
              </span>
              <h3 className="text-headline-md" style={{ color: 'var(--color-on-surface)' }}>
                {step.label}
              </h3>
              <p className="text-body-md" style={{ color: 'var(--color-text-muted)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
