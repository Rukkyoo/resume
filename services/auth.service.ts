import type { ApiResponse } from '@/types';
import type { User } from '@/types/user';
import { api } from '@/lib/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    const res = await api.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      '/auth/login',
      credentials
    );
    return res.data;
  },

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    const res = await api.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      '/auth/register',
      data
    );
    return res.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout', {});
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const res = await api.post<ApiResponse<AuthTokens>>('/auth/refresh', { refreshToken });
    return res.data;
  },
};
