export type ApplicationStatus = 'received' | 'in_review' | 'interview' | 'offer' | 'rejected' | 'hired';

export interface MyCv {
  id: string;
  title: string;
  fileUrl: string;
  fileName: string;
  uploadDate: string;
  isDefault: boolean;
  size: string;
}

export interface MyApplication {
  id: string;
  appliedAt: string;
  cv: MyCv;
  status: ApplicationStatus;
  matchScore: number;
  aiSummary: string[];
  note: string;
}

export interface PostWithApplications {
  post: {
    id: string;
    title: string;
    type: 'hiring' | 'seeking';
    companyOrAuthor: string;
    location: string;
    deadline: string;
    postedAt: string;
  };
  applications: MyApplication[];
}

export const myCvs: MyCv[] = [
  {
    id: 'cv-1',
    title: 'Senior Developer CV 2024',
    fileName: 'nguyen-minh-an-senior-dev.pdf',
    fileUrl: '#mock-cv-1',
    uploadDate: '2024-01-15',
    isDefault: true,
    size: '2.3 MB'
  },
  {
    id: 'cv-2',
    title: 'Full-Stack Engineer Resume',
    fileName: 'nguyen-minh-an-fullstack.pdf',
    fileUrl: '#mock-cv-2',
    uploadDate: '2024-02-10',
    isDefault: false,
    size: '1.8 MB'
  },
  {
    id: 'cv-3',
    title: 'Technical Lead CV',
    fileName: 'nguyen-minh-an-tech-lead.pdf',
    fileUrl: '#mock-cv-3',
    uploadDate: '2024-03-05',
    isDefault: false,
    size: '2.1 MB'
  }
];

export const myApplicationsGroupedByPost: PostWithApplications[] = [
  {
    post: {
      id: 'post-1',
      title: 'Senior React Developer - Fintech Startup',
      type: 'hiring',
      companyOrAuthor: 'TechCorp Vietnam',
      location: 'Ho Chi Minh City',
      deadline: '2024-02-28',
      postedAt: '2024-01-10'
    },
    applications: [
      {
        id: 'app-1',
        appliedAt: '2024-01-15',
        cv: myCvs[0],
        status: 'in_review',
        matchScore: 92,
        aiSummary: [
          '5+ years React experience perfectly matches requirements',
          'Strong TypeScript and Node.js background',
          'Previous fintech experience at similar company',
          'Leadership experience aligns with senior role expectations'
        ],
        note: 'Đã gọi điện với HR vào ngày 20/1. Họ nói sẽ phản hồi trong tuần này.'
      }
    ]
  },
  {
    post: {
      id: 'post-2',
      title: 'Full-Stack Engineer at AI Startup',
      type: 'hiring',
      companyOrAuthor: 'VietAI Technologies',
      location: 'Hanoi',
      deadline: '2024-03-15',
      postedAt: '2024-01-20'
    },
    applications: [
      {
        id: 'app-2',
        appliedAt: '2024-01-25',
        cv: myCvs[1],
        status: 'interview',
        matchScore: 88,
        aiSummary: [
          'Full-stack experience with React + Node.js',
          'AI/ML project experience is a strong plus',
          'Startup environment experience',
          'Strong problem-solving skills demonstrated'
        ],
        note: 'Phỏng vấn technical round đã pass. Đang chờ phỏng vấn với founder.'
      }
    ]
  },
  {
    post: {
      id: 'post-3',
      title: 'Technical Lead - E-commerce Platform',
      type: 'hiring',
      companyOrAuthor: 'ShopViet JSC',
      location: 'Ho Chi Minh City',
      deadline: '2024-04-01',
      postedAt: '2024-02-01'
    },
    applications: [
      {
        id: 'app-3',
        appliedAt: '2024-02-05',
        cv: myCvs[2],
        status: 'offer',
        matchScore: 95,
        aiSummary: [
          'Perfect match for leadership role requirements',
          'E-commerce platform experience',
          'Team management and mentoring background',
          'Technical architecture skills',
          'Strong communication abilities'
        ],
        note: 'Nhận được offer 45M VND + bonus. Đang negotiation về start date và benefits.'
      }
    ]
  },
  {
    post: {
      id: 'post-4',
      title: 'Frontend Developer - Mobile App',
      type: 'hiring',
      companyOrAuthor: 'MobileFirst Studio',
      location: 'Da Nang',
      deadline: '2024-01-31',
      postedAt: '2024-01-05'
    },
    applications: [
      {
        id: 'app-4',
        appliedAt: '2024-01-12',
        cv: myCvs[0],
        status: 'rejected',
        matchScore: 72,
        aiSummary: [
          'Strong React skills',
          'Limited React Native experience',
          'Good UI/UX understanding',
          'Mobile optimization knowledge gaps'
        ],
        note: 'Feedback: Cần thêm kinh nghiệm React Native. Có thể apply lại sau 6 tháng.'
      }
    ]
  },
  {
    post: {
      id: 'post-5',
      title: 'Backend Developer - Banking System',
      type: 'hiring',
      companyOrAuthor: 'VietBank Technology',
      location: 'Ho Chi Minh City',
      deadline: '2024-03-30',
      postedAt: '2024-02-15'
    },
    applications: [
      {
        id: 'app-5',
        appliedAt: '2024-02-20',
        cv: myCvs[1],
        status: 'received',
        matchScore: 85,
        aiSummary: [
          'Strong Node.js and database skills',
          'Financial services experience',
          'Security best practices knowledge',
          'Microservices architecture experience'
        ],
        note: ''
      }
    ]
  },
  {
    post: {
      id: 'post-6',
      title: 'DevOps Engineer - Cloud Infrastructure',
      type: 'hiring',
      companyOrAuthor: 'CloudViet Solutions',
      location: 'Remote',
      deadline: '2024-04-15',
      postedAt: '2024-03-01'
    },
    applications: [
      {
        id: 'app-6',
        appliedAt: '2024-03-10',
        cv: myCvs[0],
        status: 'hired',
        matchScore: 78,
        aiSummary: [
          'AWS and Docker experience',
          'CI/CD pipeline knowledge',
          'Infrastructure as Code skills',
          'Limited Kubernetes experience'
        ],
        note: 'Đã được nhận vào làm! Start date: 1/4/2024. Salary: 35M VND.'
      }
    ]
  }
];

export const getStatusColor = (status: ApplicationStatus): string => {
  switch (status) {
    case 'received':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'in_review':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'interview':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'offer':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'hired':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusText = (status: ApplicationStatus): string => {
  switch (status) {
    case 'received':
      return 'Đã nhận';
    case 'in_review':
      return 'Đang xem xét';
    case 'interview':
      return 'Phỏng vấn';
    case 'offer':
      return 'Có offer';
    case 'rejected':
      return 'Từ chối';
    case 'hired':
      return 'Đã tuyển';
    default:
      return 'Không xác định';
  }
};
