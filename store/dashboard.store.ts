import { create } from 'zustand';

type TimeRange = '7d' | '30d' | '90d' | '1y';

interface DashboardStore {
  timeRange: TimeRange;
  searchQuery: string;
  selectedResumeId: string | null;

  setTimeRange: (range: TimeRange) => void;
  setSearchQuery: (query: string) => void;
  setSelectedResumeId: (id: string | null) => void;
  reset: () => void;
}

const initialState = {
  timeRange: '30d' as TimeRange,
  searchQuery: '',
  selectedResumeId: null,
};

export const useDashboardStore = create<DashboardStore>()((set) => ({
  ...initialState,

  setTimeRange: (timeRange) => set({ timeRange }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedResumeId: (selectedResumeId) => set({ selectedResumeId }),
  reset: () => set(initialState),
}));
