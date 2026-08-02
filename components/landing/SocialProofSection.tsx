const stats = [
  { value: '18,000+', label: 'Professionals helped' },
  { value: '94%', label: 'ATS pass rate' },
  { value: '3×', label: 'More interview callbacks' },
  { value: '< 30s', label: 'Average tailoring time' },
];

export function SocialProofSection() {
  return (
    <section
      className="py-16"
      aria-label="Social proof statistics"
      style={{
        background: 'var(--color-primary)',
      }}
    >
      <div className="container-app">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: 'var(--color-on-primary)',
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-label-sm"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
