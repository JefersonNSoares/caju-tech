export type UserRole = 'farmer' | 'student' | 'visitor';

export interface UserProfile {
  id: string;
  role: UserRole;
  displayName: string;
  preferredCity: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  activeProfile: UserProfile | null;
  lastActiveAt: string;
}

export interface CreateProfileDTO {
  role: UserRole;
  displayName?: string;
  preferredCity?: string;
}
