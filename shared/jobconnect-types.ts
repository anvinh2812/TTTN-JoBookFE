export type PostType = 'seeking' | 'hiring';

export interface User {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  bio?: string;
  location?: string;
  skills: string[];
  experience?: string;
  followers: number;
  following: number;
  isVerified?: boolean;
}

export interface CV {
  id: string;
  userId: string;
  title: string;
  fileName: string;
  uploadDate: string;
  isDefault: boolean;
  url: string;
}

export interface JobPost {
  id: string;
  type: PostType;
  authorId: string;
  author: User;
  title: string;
  description: string;
  skills: string[];
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  deadline: string;
  createdAt: string;
  cvId?: string; // For seeking posts
  cv?: CV; // For seeking posts
  viewCount: number;
  applicantCount?: number; // For hiring posts
  isUrgent?: boolean;
}

export interface Application {
  id: string;
  postId: string;
  applicantId: string;
  applicant: User;
  cvId: string;
  cv: CV;
  status: 'received' | 'in_review' | 'interview' | 'offer' | 'rejected' | 'hired';
  appliedAt: string;
  notes?: string;
  aiMatchScore?: number;
  aiSummary?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

export interface ChatConversation {
  id: string;
  participants: [User, User];
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: string;
}

export interface SearchFilters {
  keyword?: string;
  location?: string;
  skills?: string[];
  postType?: PostType | 'all';
  salaryMin?: number;
  salaryMax?: number;
}
