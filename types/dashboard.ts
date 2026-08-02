export interface DashboardStats {
  resumesCreated: number;
  atsScore: number;
  applicationsTracked: number;
  interviewsScheduled: number;
}

export interface AnalyticsDataPoint {
  date: string;
  views: number;
  applications: number;
  responses: number;
}

export type AnalyticsData = AnalyticsDataPoint[];

export interface ResumeEntry {
  id: string;
  title: string;
  jobTitle: string;
  company: string;
  atsScore: number;
  lastModified: string;
  status: 'draft' | 'active' | 'archived';
}

export interface ActivityItem {
  id: string;
  type: 'resume_created' | 'resume_updated' | 'application_sent' | 'interview_scheduled';
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
