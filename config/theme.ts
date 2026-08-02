export const colors = {
  primary: '#006c49',
  primaryContainer: '#10b981',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#00422b',
  inversePrimary: '#4edea3',

  secondary: '#5f5e5e',
  onSecondary: '#ffffff',
  secondaryContainer: '#e5e2e1',

  tertiary: '#a43a3a',
  tertiaryContainer: '#fc7c78',

  error: '#ba1a1a',
  errorContainer: '#ffdad6',

  surface: '#f8f9fa',
  surfaceDim: '#d9dadb',
  surfaceBright: '#f8f9fa',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainer: '#edeeef',
  surfaceContainerHigh: '#e7e8e9',
  surfaceContainerHighest: '#e1e3e4',

  onSurface: '#191c1d',
  onSurfaceVariant: '#3c4a42',
  outline: '#6c7a71',
  outlineVariant: '#bbcabf',

  background: '#f8f9fa',
  onBackground: '#191c1d',

  borderSubtle: '#E5E7EB',
  textMuted: '#6B7280',
  surfaceGrid: '#F3F4F6',
} as const;

export const radius = {
  sm: '0.25rem',
  DEFAULT: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px',
} as const;

export const spacing = {
  unit: '4px',
  gutter: '24px',
  marginMobile: '16px',
  marginDesktop: '40px',
  maxWidth: '1280px',
} as const;

export const shadows = {
  card: '0 20px 40px rgba(0, 0, 0, 0.04)',
  cardHover: '0 24px 48px rgba(0, 0, 0, 0.08)',
  button: '0 4px 14px rgba(0, 108, 73, 0.25)',
} as const;

export type Colors = typeof colors;
export type Radius = typeof radius;
export type Spacing = typeof spacing;
export type Shadows = typeof shadows;
