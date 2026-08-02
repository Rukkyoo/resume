import { FiTarget } from "react-icons/fi";
import { MdGppGood } from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";

const reasons = [
  {
    icon: <FaBoltLightning />,
    title: 'Speed',
    description: 'Generate a perfectly tailored resume in under 30 seconds — not 3 hours.',
  },
  {
    icon: <FiTarget />,
    title: 'Accuracy',
    description: 'Laser-focus on the skills and keywords each employer is actually screening for.',
  },
  {
    icon: <GiPadlock />,
    title: 'Security',
    description: 'Enterprise-grade encryption. Your data is yours and never used to train AI models.',
  },
  {
    icon: <MdGppGood />,
    title: 'Quality',
    description: "Our resumes don't just pass ATS filters — they impress the humans reading them.",
  },
];

export function WhyChooseSection() {
  return (
    <section
      className="py-24"
      aria-labelledby="why-choose-heading"
      style={{ background: 'var(--color-surface-container-lowest)' }}
    >
      <div className="container-app">
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <h2
            id="why-choose-heading"
            className="text-headline-md"
            style={{ color: 'var(--color-on-surface)' }}
          >
            Why Professionals Choose Us
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div key={r.title} className="card-surface p-6 flex flex-col gap-3 text-center items-center">
              <span className="text-3xl" role="img" aria-hidden>
                {r.icon}
              </span>
              <h3
                className="font-semibold"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  color: 'var(--color-on-surface)',
                }}
              >
                {r.title}
              </h3>
              <p className="text-body-md" style={{ color: 'var(--color-text-muted)' }}>
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
