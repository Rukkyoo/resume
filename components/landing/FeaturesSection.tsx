import { FiTarget } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { GiPadlock } from "react-icons/gi";

const features = [
  {
    icon: <FiTarget />,
    title: 'Job Targeting',
    description:
      'Automatically extract and map key requirements from any job description to your exact experience.',
  },
  /* {
    icon: '',
    title: 'Template Studio',
    description:
      'Choose from a curated library of ATS-friendly templates designed for top-tier roles.',
  }, */
  /* {
    icon: '',
    title: 'Live Score Analysis',
    description:
      'Get real-time feedback on your resume strength relative to the specific job and its competitors.',
  }, */
  {
    icon: <FaBoltLightning />,
    title: 'ATS Match Guarantee',
    description:
      'Our AI ensures every resume passes Applicant Tracking Systems with a score above 85%.',
  },
  {
    icon: <FaRobot />,
    title: 'AI Suggestions',
    description:
      'Receive line-by-line AI recommendations that show you exactly what to improve and why.',
  },
  {
    icon: <GiPadlock />,
    title: 'Privacy First',
    description:
      'Your resume data is encrypted and never shared. Full GDPR compliance, zero third-party access.',
  },
];


export function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24"
      aria-labelledby="features-heading"
      style={{ background: 'var(--color-surface-container-lowest)' }}
    >
      <div className="container-app">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="badge badge-muted">Features</span>
          <h2
            id="features-heading"
            className="text-headline-md"
            style={{ color: 'var(--color-on-surface)', maxWidth: '400px' }}
          >
            Everything You Need to Land the Role
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="card-surface p-6 flex flex-col gap-3">
              <span className="text-2xl" role="img" aria-hidden>
                {feature.icon}
              </span>
              <h3
                className="font-semibold"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '16px',
                  color: 'var(--color-on-surface)',
                }}
              >
                {feature.title}
              </h3>
              <p className="text-body-md" style={{ color: 'var(--color-text-muted)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
