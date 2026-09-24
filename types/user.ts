export type UserRole = 'farmer' | 'student' | 'visitor';

export interface UserProfile {
  id: string;
  role: UserRole;
  displayName: string;
  preferredCity?: string;
}
