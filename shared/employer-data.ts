import { ApplicationStatus } from './cv-management-data';
import { User } from './jobconnect-types';

export interface EmployerPost {
  id: string;
  title: string;
  description: string;
  skills: string[];
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'paused' | 'closed';
  viewCount: number;
  applicantCount: number;
  isUrgent?: boolean;
}

export interface EmployerApplication {
  id: string;
  postId: string;
  applicant: User;
  cv: {
    id: string;
    title: string;
    fileName: string;
    fileUrl: string;
    uploadDate: string;
  };
  appliedAt: string;
  status: ApplicationStatus;
  notes: string;
  aiMatchScore: number;
  aiSummary: string[];
  lastUpdated: string;
}

// Mock employer posts
export const mockEmployerPosts: EmployerPost[] = [
  {
    id: 'emp-post-1',
    title: 'Senior React Developer - Fintech Startup',
    description: 'We are looking for an experienced React developer to join our fintech team. You will work on building the next generation of financial products that serve millions of users. Key responsibilities include developing scalable web applications, collaborating with product teams, and mentoring junior developers.',
    skills: ['React', 'TypeScript', 'GraphQL', 'AWS', 'Docker', 'Node.js'],
    location: 'Ho Chi Minh City',
    salaryMin: 25000000,
    salaryMax: 40000000,
    deadline: '2024-03-15',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    status: 'active',
    viewCount: 247,
    applicantCount: 12,
    isUrgent: true
  },
  {
    id: 'emp-post-2',
    title: 'Full-Stack Developer - E-commerce Platform',
    description: 'Join our e-commerce team to build innovative shopping experiences. Work with modern technologies and help scale our platform to serve millions of customers across Southeast Asia.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Kubernetes'],
    location: 'Hanoi',
    salaryMin: 20000000,
    salaryMax: 35000000,
    deadline: '2024-04-01',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    status: 'active',
    viewCount: 189,
    applicantCount: 8,
    isUrgent: false
  },
  {
    id: 'emp-post-3',
    title: 'DevOps Engineer - Cloud Infrastructure',
    description: 'We are seeking a DevOps engineer to help us scale our cloud infrastructure. You will work with cutting-edge technologies and help build resilient, scalable systems.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Python'],
    location: 'Da Nang',
    salaryMin: 22000000,
    salaryMax: 38000000,
    deadline: '2024-03-30',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-25',
    status: 'paused',
    viewCount: 156,
    applicantCount: 15,
    isUrgent: false
  },
  {
    id: 'emp-post-4',
    title: 'UI/UX Designer - Mobile App',
    description: 'Looking for a creative UI/UX designer to join our mobile team. You will design beautiful, intuitive interfaces for our mobile applications used by millions of users.',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    location: 'Ho Chi Minh City',
    salaryMin: 15000000,
    salaryMax: 28000000,
    deadline: '2024-02-28',
    createdAt: '2023-12-20',
    updatedAt: '2024-01-10',
    status: 'closed',
    viewCount: 98,
    applicantCount: 22,
    isUrgent: false
  }
];

// Mock applicants data
const mockApplicants: User[] = [
  {
    id: 'applicant-1',
    name: 'Nguyen Van An',
    headline: 'Senior React Developer with 5+ years experience',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'Ho Chi Minh City',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    experience: '5+ years',
    followers: 150,
    following: 89,
    isVerified: true
  },
  {
    id: 'applicant-2',
    name: 'Tran Thi Bich',
    headline: 'Full-Stack Developer | MERN Stack Expert',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
    location: 'Hanoi',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'Docker'],
    experience: '4+ years',
    followers: 89,
    following: 156,
    isVerified: false
  },
  {
    id: 'applicant-3',
    name: 'Le Quang Duc',
    headline: 'DevOps Engineer | AWS Certified Solutions Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'Da Nang',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Python'],
    experience: '6+ years',
    followers: 234,
    following: 78,
    isVerified: true
  }
];

// Mock applications for employer posts
export const mockEmployerApplications: EmployerApplication[] = [
  {
    id: 'emp-app-1',
    postId: 'emp-post-1',
    applicant: mockApplicants[0],
    cv: {
      id: 'cv-app-1',
      title: 'Senior React Developer CV',
      fileName: 'nguyen-van-an-react-dev.pdf',
      fileUrl: '#mock-cv-1',
      uploadDate: '2024-01-12'
    },
    appliedAt: '2024-01-12',
    status: 'in_review',
    notes: 'Strong React experience. Good cultural fit. Scheduled for technical interview.',
    aiMatchScore: 92,
    aiSummary: [
      '5+ years React experience perfectly matches requirements',
      'Strong TypeScript and GraphQL background',
      'Previous fintech experience at similar scale',
      'Leadership potential for senior role'
    ],
    lastUpdated: '2024-01-20'
  },
  {
    id: 'emp-app-2',
    postId: 'emp-post-1',
    applicant: mockApplicants[1],
    cv: {
      id: 'cv-app-2',
      title: 'Full-Stack Developer Portfolio',
      fileName: 'tran-thi-bich-fullstack.pdf',
      fileUrl: '#mock-cv-2',
      uploadDate: '2024-01-14'
    },
    appliedAt: '2024-01-14',
    status: 'interview',
    notes: 'Passed technical screening. Very enthusiastic candidate. Interview scheduled for next week.',
    aiMatchScore: 88,
    aiSummary: [
      'Solid full-stack experience with React and Node.js',
      'Strong problem-solving skills demonstrated',
      'Quick learner with passion for fintech',
      'Good team collaboration experience'
    ],
    lastUpdated: '2024-01-22'
  },
  {
    id: 'emp-app-3',
    postId: 'emp-post-2',
    applicant: mockApplicants[0],
    cv: {
      id: 'cv-app-3',
      title: 'Senior Developer CV 2024',
      fileName: 'nguyen-van-an-senior.pdf',
      fileUrl: '#mock-cv-3',
      uploadDate: '2024-01-16'
    },
    appliedAt: '2024-01-16',
    status: 'offer',
    notes: 'Excellent interview performance. Perfect fit for the role. Preparing offer package.',
    aiMatchScore: 95,
    aiSummary: [
      'Exceptional React and Node.js skills',
      'E-commerce platform experience',
      'Strong system design knowledge',
      'Excellent communication skills',
      'Leadership experience with scaling teams'
    ],
    lastUpdated: '2024-01-25'
  },
  {
    id: 'emp-app-4',
    postId: 'emp-post-3',
    applicant: mockApplicants[2],
    cv: {
      id: 'cv-app-4',
      title: 'DevOps Engineer Resume',
      fileName: 'le-quang-duc-devops.pdf',
      fileUrl: '#mock-cv-4',
      uploadDate: '2024-01-08'
    },
    appliedAt: '2024-01-08',
    status: 'hired',
    notes: 'Exceptional DevOps skills. Successfully completed all interview rounds. Start date confirmed.',
    aiMatchScore: 97,
    aiSummary: [
      'AWS Solutions Architect certification',
      'Extensive Kubernetes and Docker experience',
      'Infrastructure as Code expertise',
      'Strong automation and CI/CD background',
      'Proven track record with cloud migrations'
    ],
    lastUpdated: '2024-01-30'
  },
  {
    id: 'emp-app-5',
    postId: 'emp-post-1',
    applicant: mockApplicants[2],
    cv: {
      id: 'cv-app-5',
      title: 'Technical Lead CV',
      fileName: 'le-quang-duc-tech-lead.pdf',
      fileUrl: '#mock-cv-5',
      uploadDate: '2024-01-10'
    },
    appliedAt: '2024-01-10',
    status: 'rejected',
    notes: 'Strong technical skills but lacking React-specific experience for this senior role.',
    aiMatchScore: 72,
    aiSummary: [
      'Strong overall technical leadership',
      'Limited React/frontend experience',
      'Excellent DevOps and backend skills',
      'May be better fit for infrastructure roles'
    ],
    lastUpdated: '2024-01-18'
  }
];

export const getPostApplications = (postId: string): EmployerApplication[] => {
  return mockEmployerApplications.filter(app => app.postId === postId);
};

export const getApplicationById = (applicationId: string): EmployerApplication | undefined => {
  return mockEmployerApplications.find(app => app.id === applicationId);
};

export const getPostById = (postId: string): EmployerPost | undefined => {
  return mockEmployerPosts.find(post => post.id === postId);
};
