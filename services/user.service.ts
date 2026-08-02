import type { ApiResponse } from '@/types';
import type { User, UserProfile } from '@/types/user';
import { api } from '@/lib/api';

export const userService = {
 
  async getMe(): Promise<User> {
    const res = await api.get<ApiResponse<User>>('/users/me');
    return res.data;
  },


  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const res = await api.patch<ApiResponse<UserProfile>>('/users/me', data);
    return res.data;
  },

  async deleteAccount(): Promise<void> {
    await api.delete('/users/me');
  },
};
