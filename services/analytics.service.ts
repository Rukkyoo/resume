import type { ApiResponse } from '@/types';
import type { AnalyticsData } from '@/types/dashboard';
import { api } from '@/lib/api';

export const analyticsService = {
  async getAnalyticsData(timeRange: '7d' | '30d' | '90d' | '1y'): Promise<AnalyticsData> {
    const res = await api.get<ApiResponse<AnalyticsData>>(
      `/analytics?range=${timeRange}`,
      { revalidate: 600 }
    );
    return res.data;
  },

  async getResumePerformance(resumeId: string): Promise<{ atsScore: number; views: number }> {
    const res = await api.get<ApiResponse<{ atsScore: number; views: number }>>(
      `/analytics/resumes/${resumeId}`
    );
    return res.data;
  },
};
