import { 
  EmployerPost, 
  EmployerApplication,
  mockEmployerPosts,
  mockEmployerApplications,
  getPostApplications,
  getApplicationById,
  getPostById
} from '@shared/employer-data';
import { ApplicationStatus } from '@shared/cv-management-data';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const employerService = {
  // Get all posts for current employer
  async getMyPosts(): Promise<EmployerPost[]> {
    await delay(500);
    return [...mockEmployerPosts];
  },

  // Get single post by ID
  async getPost(postId: string): Promise<EmployerPost | null> {
    await delay(300);
    return getPostById(postId) || null;
  },

  // Create new post
  async createPost(postData: Omit<EmployerPost, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'applicantCount'>): Promise<EmployerPost> {
    await delay(1000);
    
    const newPost: EmployerPost = {
      ...postData,
      id: `emp-post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0,
      applicantCount: 0
    };

    mockEmployerPosts.unshift(newPost);
    return newPost;
  },

  // Update post
  async updatePost(postId: string, updates: Partial<EmployerPost>): Promise<EmployerPost | null> {
    await delay(800);
    
    const postIndex = mockEmployerPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return null;
    }

    const updatedPost = {
      ...mockEmployerPosts[postIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    mockEmployerPosts[postIndex] = updatedPost;
    return updatedPost;
  },

  // Delete post
  async deletePost(postId: string): Promise<boolean> {
    await delay(500);
    
    const postIndex = mockEmployerPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      return false;
    }

    mockEmployerPosts.splice(postIndex, 1);
    return true;
  },

  // Get applications for a specific post
  async getPostApplications(postId: string): Promise<EmployerApplication[]> {
    await delay(500);
    return getPostApplications(postId);
  },

  // Get single application
  async getApplication(applicationId: string): Promise<EmployerApplication | null> {
    await delay(300);
    return getApplicationById(applicationId) || null;
  },

  // Update application status
  async updateApplicationStatus(
    applicationId: string, 
    status: ApplicationStatus, 
    notes?: string
  ): Promise<EmployerApplication | null> {
    await delay(800);
    
    const appIndex = mockEmployerApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) {
      return null;
    }

    const updatedApplication = {
      ...mockEmployerApplications[appIndex],
      status,
      notes: notes || mockEmployerApplications[appIndex].notes,
      lastUpdated: new Date().toISOString()
    };

    mockEmployerApplications[appIndex] = updatedApplication;
    return updatedApplication;
  },

  // Add notes to application
  async updateApplicationNotes(applicationId: string, notes: string): Promise<EmployerApplication | null> {
    await delay(500);
    
    const appIndex = mockEmployerApplications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) {
      return null;
    }

    const updatedApplication = {
      ...mockEmployerApplications[appIndex],
      notes,
      lastUpdated: new Date().toISOString()
    };

    mockEmployerApplications[appIndex] = updatedApplication;
    return updatedApplication;
  },

  // Get dashboard statistics
  async getDashboardStats(): Promise<{
    totalPosts: number;
    activePosts: number;
    totalApplications: number;
    pendingApplications: number;
    avgMatchScore: number;
  }> {
    await delay(300);
    
    const activePosts = mockEmployerPosts.filter(p => p.status === 'active');
    const allApplications = mockEmployerApplications;
    const pendingApplications = allApplications.filter(app => 
      ['received', 'in_review', 'interview'].includes(app.status)
    );
    
    const avgMatchScore = allApplications.length > 0
      ? Math.round(allApplications.reduce((sum, app) => sum + app.aiMatchScore, 0) / allApplications.length)
      : 0;

    return {
      totalPosts: mockEmployerPosts.length,
      activePosts: activePosts.length,
      totalApplications: allApplications.length,
      pendingApplications: pendingApplications.length,
      avgMatchScore
    };
  },

  // Search and filter applications
  async searchApplications(filters: {
    postId?: string;
    status?: ApplicationStatus;
    searchTerm?: string;
  }): Promise<EmployerApplication[]> {
    await delay(400);
    
    let filtered = [...mockEmployerApplications];

    if (filters.postId) {
      filtered = filtered.filter(app => app.postId === filters.postId);
    }

    if (filters.status) {
      filtered = filtered.filter(app => app.status === filters.status);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.applicant.name.toLowerCase().includes(term) ||
        app.applicant.headline?.toLowerCase().includes(term) ||
        app.cv.title.toLowerCase().includes(term)
      );
    }

    return filtered;
  }
};
