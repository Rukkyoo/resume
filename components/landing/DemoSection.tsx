
export function DemoSection() {
  return (
    <section
      id="demo"
      className="py-24"
      aria-labelledby="demo-heading"
      style={{ background: 'var(--color-surface-container-low)' }}
    >
      <div className="container-app">
        <div className="text-center mb-12 flex flex-col items-center gap-3">
          <span className="badge badge-muted">Live demo</span>
          <h2
            id="demo-heading"
            className="text-headline-md"
            style={{ color: 'var(--color-on-surface)', maxWidth: '420px' }}
          >
            See the AI in Action
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--color-text-muted)', maxWidth: '480px' }}>
            Without the fluff, put the tool to the test. Experience the magic of AI resume tailoring
            live, in your browser. No sign-up needed.
          </p>
        </div>

        {/* Demo panel */}
        <div
          className="card-surface p-8 grid md:grid-cols-2 gap-8 items-start"
          style={{ maxWidth: '880px', margin: '0 auto' }}
        >
          {/* Left: Job description */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="demo-jd"
              className="text-label-sm"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              Job description
            </label>
            <textarea
              id="demo-jd"
              className="input-field"
              rows={8}
              placeholder="Paste a job description here to see tailored suggestions..."
              style={{ resize: 'none' }}
            />
          </div>

          {/* Right: AI output preview */}
          <div className="flex flex-col gap-3">
            <span
              className="text-label-sm"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              AI output preview
            </span>
            <div
              className="rounded-xl p-4 flex flex-col gap-3 min-h-[200px]"
              style={{
                background: 'var(--color-surface-container)',
                border: 'var(--border-ghost)',
              }}
            >
              {/* Skeleton lines */}
              {[100, 85, 92, 70].map((w, i) => (
                <div
                  key={i}
                  className="h-3 rounded-full animate-pulse"
                  style={{
                    width: `${w}%`,
                    background: 'var(--color-surface-container-high)',
                  }}
                />
              ))}
              <div className="mt-2 flex gap-2">
                <span className="badge badge-success">ATS: 91%</span>
                <span className="badge badge-muted">Keywords matched: 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
