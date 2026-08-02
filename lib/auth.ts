import type { User } from '@/types';


export async function getSession(): Promise<User | null> {
  // TODO: Implement with your auth provider
  // e.g., return await getServerSession(authOptions);
  return null;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

export async function getUserRole(): Promise<User['role']> {
  const session = await getSession();
  return session?.role ?? 'guest';
}
