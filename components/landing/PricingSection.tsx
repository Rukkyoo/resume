const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started with AI resume tailoring.',
    features: ['5 resume tailors / month', 'ATS score analysis', 'Basic templates', 'PDF export'],
    cta: 'Get Started Free',
    href: '/sign-up',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For active job seekers who need unlimited tailoring power.',
    features: [
      'Unlimited resume tailors',
      'Priority ATS scoring',
      'All premium templates',
      'Cover letter generator',
      'LinkedIn optimization',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    href: '/sign-up?plan=pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and organizations at scale.',
    features: [
      'Everything in Pro',
      'Team management',
      'SSO / SAML',
      'Custom integrations',
      'Dedicated CSM',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-24"
      aria-labelledby="pricing-heading"
      style={{ background: 'var(--color-surface-container-lowest)' }}
    >
      <div className="container-app">
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="badge badge-muted">Pricing</span>
          <h2
            id="pricing-heading"
            className="text-headline-md"
            style={{ color: 'var(--color-on-surface)' }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--color-text-muted)', maxWidth: '400px' }}>
            Start free. Upgrade when you need more power.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={plan.featured ? 'card-featured' : 'card-surface'}
              style={{ padding: '2rem' }}
            >
              {plan.featured && (
                <div className="badge badge-success mb-4">Most Popular</div>
              )}
              <div className="flex flex-col gap-1 mb-6">
                <h3
                  className="font-semibold"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-on-surface)' }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-body-md" style={{ color: 'var(--color-text-muted)' }}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-body-md" style={{ color: 'var(--color-text-muted)' }}>
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-2 mb-8" role="list">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
                    <span style={{ color: 'var(--color-primary)' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`btn w-full ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
                style={{ justifyContent: 'center' }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
