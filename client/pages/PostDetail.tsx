import PlaceholderPage from '@/components/PlaceholderPage';
import { FileText } from 'lucide-react';

export default function PostDetail() {
  return (
    <PlaceholderPage
      title="Post Details"
      description="View detailed information about job posts, apply for positions, or view candidate CVs with commenting and interaction features."
      icon={<FileText className="h-8 w-8 text-gray-600" />}
    />
  );
}
