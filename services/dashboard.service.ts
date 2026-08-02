import type { ApiResponse } from '@/types';
import type { DashboardStats, ActivityItem, ResumeEntry } from '@/types/dashboard';
import { api } from '@/lib/api';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const res = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats', {
      revalidate: 300, // 5 minute cache
    });
    return res.data;
  },

  async getRecentActivity(limit = 10): Promise<ActivityItem[]> {
    const res = await api.get<ApiResponse<ActivityItem[]>>(
      `/dashboard/activity?limit=${limit}`
    );
    return res.data;
  },

  async getResumes(): Promise<ResumeEntry[]> {
    const res = await api.get<ApiResponse<ResumeEntry[]>>('/dashboard/resumes');
    return res.data;
  },
};
