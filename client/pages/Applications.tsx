import PlaceholderPage from '@/components/PlaceholderPage';
import { Users } from 'lucide-react';

export default function Applications() {
  return (
    <PlaceholderPage
      title="Application Management"
      description="Manage job applications, review candidate profiles, track application status, and use AI-powered matching and insights."
      icon={<Users className="h-8 w-8 text-gray-600" />}
    />
  );
}
