import { AuthUser, LoginCredentials, RegisterData, AuthResponse } from '@shared/auth-types';

const AUTH_STORAGE_KEY = 'jobook_auth';

// Mock users for demonstration
const mockUsers: AuthUser[] = [
  {
    id: 'seeker-1',
    email: 'john.doe@email.com',
    name: 'John Doe',
    role: 'SEEKER',
    headline: 'Senior Full-Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'employer-1',
    email: 'hr@techcorp.com',
    name: 'Sarah Wilson',
    role: 'EMPLOYER',
    company: 'TechCorp Vietnam',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
    isVerified: true
  },
  {
    id: 'seeker-2',
    email: 'jane.smith@email.com',
    name: 'Jane Smith',
    role: 'SEEKER',
    headline: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Register new user
  async register(data: RegisterData): Promise<AuthResponse> {
    await delay(1000);

    // Check if email already exists
    const existingUser = mockUsers.find(user => user.email === data.email);
    if (existingUser) {
      return {
        success: false,
        message: 'Email already exists'
      };
    }

    // Create new user
    const newUser: AuthUser = {
      id: `${data.role.toLowerCase()}-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      company: data.company,
      headline: data.headline,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=2563eb&color=fff`,
      isVerified: false
    };

    // Add to mock database
    mockUsers.push(newUser);

    // Auto-login after registration
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

    return {
      success: true,
      user: newUser,
      message: 'Welcome to jobook!'
    };
  },

  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(1000);

    const user = mockUsers.find(
      u => u.email === credentials.email
    );

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password'
      };
    }

    // In a real app, you'd verify the password here
    // For demo purposes, we accept any password

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

    return {
      success: true,
      user,
      message: 'Login successful'
    };
  },

  // Logout user
  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  // Get current user from storage
  getCurrentUser(): AuthUser | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  // Check if user has specific role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  },

  // Update user profile
  async updateProfile(updates: Partial<AuthUser>): Promise<AuthResponse> {
    await delay(500);

    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: 'Not authenticated'
      };
    }

    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));

    // Update in mock database
    const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = updatedUser;
    }

    return {
      success: true,
      user: updatedUser,
      message: 'Profile updated successfully'
    };
  }
};
