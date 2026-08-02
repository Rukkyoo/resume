function getEnvVar(key: string, required = false): string {
  const value = process.env[key];
  if (required && !value && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value ?? '';
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',

  appUrl: getEnvVar('NEXT_PUBLIC_APP_URL') || 'http://localhost:3000',
  apiUrl: getEnvVar('NEXT_PUBLIC_API_URL') || 'http://localhost:3001/api',

} as const;

export type Env = typeof env;
