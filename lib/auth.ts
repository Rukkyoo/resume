import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const googleClientId =
  process.env.AUTH_GOOGLE_ID ||
  'placeholder_google_client_id';

const googleClientSecret =
  process.env.AUTH_GOOGLE_SECRET ||
  'placeholder_google_client_secret';

const secret =
  process.env.NEXTAUTH_SECRET ||
  process.env.AUTH_SECRET ||
  'resume_ai_production_fallback_auth_secret_32chars';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  secret: secret,
};
