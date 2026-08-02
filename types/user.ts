export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  website?: string;
  jobTitle?: string;
  linkedinUrl?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  marketingEmails: boolean;
  language: string;
}
