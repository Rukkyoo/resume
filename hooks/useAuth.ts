'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real session check
    // e.g., const session = await getSession();
    setIsLoading(false);
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: user !== null,
  };
}
