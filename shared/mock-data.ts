import { User, JobPost, CV, Application } from './jobconnect-types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Nguyen Minh An',
    headline: 'Senior Full-Stack Developer | React, Node.js',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: '5+ years experience building scalable web applications. Passionate about clean code and user experience.',
    location: 'Ho Chi Minh City',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker'],
    experience: '5+ years',
    followers: 243,
    following: 89,
    isVerified: true
  },
  {
    id: '2',
    name: 'Tran Thu Ha',
    headline: 'UI/UX Designer | Product Design Lead',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
    bio: 'Creating beautiful and intuitive digital experiences. 8 years in product design.',
    location: 'Hanoi',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
    experience: '8+ years',
    followers: 892,
    following: 156,
    isVerified: true
  },
  {
    id: '3',
    name: 'Le Quang Duc',
    headline: 'DevOps Engineer | AWS Certified',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Specializing in cloud infrastructure and CI/CD automation.',
    location: 'Da Nang',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
    experience: '6+ years',
    followers: 156,
    following: 234,
    isVerified: false
  }
];

export const mockCVs: CV[] = [
  {
    id: 'cv1',
    userId: '1',
    title: 'Senior Developer CV 2024',
    fileName: 'nguyen-minh-an-cv.pdf',
    uploadDate: '2024-01-15',
    isDefault: true,
    url: '#'
  },
  {
    id: 'cv2',
    userId: '2',
    title: 'UX Designer Portfolio',
    fileName: 'tran-thu-ha-portfolio.pdf',
    uploadDate: '2024-01-20',
    isDefault: true,
    url: '#'
  }
];

export const mockJobPosts: JobPost[] = [
  {
    id: 'post1',
    type: 'hiring',
    authorId: '2',
    author: mockUsers[1],
    title: 'Senior React Developer - Fintech Startup',
    description: 'We are looking for an experienced React developer to join our fintech team. You will work on building the next generation of financial products that serve millions of users.',
    skills: ['React', 'TypeScript', 'GraphQL', 'AWS', 'Docker'],
    location: 'Ho Chi Minh City',
    salaryMin: 25000000,
    salaryMax: 40000000,
    deadline: '2024-02-28',
    createdAt: '2024-01-10',
    viewCount: 156,
    applicantCount: 23,
    isUrgent: true
  },
  {
    id: 'post2',
    type: 'seeking',
    authorId: '1',
    author: mockUsers[0],
    title: 'Experienced Full-Stack Developer Seeking New Opportunities',
    description: 'Passionate full-stack developer with 5+ years of experience looking for exciting challenges. Strong background in React, Node.js, and cloud technologies.',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    location: 'Ho Chi Minh City',
    salaryMin: 30000000,
    salaryMax: 50000000,
    deadline: '2024-03-15',
    createdAt: '2024-01-12',
    cvId: 'cv1',
    cv: mockCVs[0],
    viewCount: 89
  },
  {
    id: 'post3',
    type: 'hiring',
    authorId: '3',
    author: mockUsers[2],
    title: 'UI/UX Designer - E-commerce Platform',
    description: 'Join our design team to create amazing user experiences for our e-commerce platform. We value creativity, user-centered design, and collaboration.',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    location: 'Hanoi',
    salaryMin: 18000000,
    salaryMax: 28000000,
    deadline: '2024-03-01',
    createdAt: '2024-01-08',
    viewCount: 234,
    applicantCount: 45,
    isUrgent: false
  },
  {
    id: 'post4',
    type: 'seeking',
    authorId: '2',
    author: mockUsers[1],
    title: 'Creative UX Designer Looking for Product Design Role',
    description: 'Seeking a challenging role where I can contribute to meaningful products. Experienced in user research, design systems, and cross-functional collaboration.',
    skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
    location: 'Hanoi',
    salaryMin: 20000000,
    salaryMax: 35000000,
    deadline: '2024-04-01',
    createdAt: '2024-01-14',
    cvId: 'cv2',
    cv: mockCVs[1],
    viewCount: 67
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app1',
    postId: 'post1',
    applicantId: '1',
    applicant: mockUsers[0],
    cvId: 'cv1',
    cv: mockCVs[0],
    status: 'in_review',
    appliedAt: '2024-01-11',
    notes: 'Strong technical background, good cultural fit.',
    aiMatchScore: 92,
    aiSummary: 'Excellent match with 5+ years React experience and strong technical skills.'
  }
];

export const mockSuggestedUsers = [
  {
    ...mockUsers[0],
    mutualConnections: 12
  },
  {
    ...mockUsers[2],
    mutualConnections: 8
  }
];

export const mockAiJobSuggestions = [
  {
    title: 'React Developer at Tech Corp',
    company: 'Tech Corp',
    location: 'Ho Chi Minh City',
    match: 95
  },
  {
    title: 'Full-Stack Engineer at StartupXYZ',
    company: 'StartupXYZ',
    location: 'Hanoi',
    match: 88
  }
];
