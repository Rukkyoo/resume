export type SidebarItem = {
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
};

export type SidebarGroup = {
  title?: string;
  items: SidebarItem[];
};

export const sidebarGroups: SidebarGroup[] = [
  {
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: 'layout-dashboard' },
      { label: 'Analytics', href: '/dashboard/analytics', icon: 'bar-chart-2' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { label: 'My Resumes', href: '/dashboard/resumes', icon: 'file-text' },
      { label: 'Templates', href: '/dashboard/templates', icon: 'layout-template' },
      { label: 'Job Tracker', href: '/dashboard/jobs', icon: 'briefcase' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Profile', href: '/dashboard/profile', icon: 'user' },
      { label: 'Settings', href: '/dashboard/settings', icon: 'settings' },
      { label: 'Billing', href: '/dashboard/billing', icon: 'credit-card' },
    ],
  },
];
