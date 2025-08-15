export type UserRole = 'SEEKER' | 'EMPLOYER';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  company?: string; // For employers
  headline?: string; // For seekers
  isVerified?: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  company?: string; // Required for employers
  headline?: string; // Optional for seekers
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  message?: string;
}
