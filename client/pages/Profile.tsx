import PlaceholderPage from '@/components/PlaceholderPage';
import { RequireAuth } from '@/components/guards/RouteGuard';
import { User } from 'lucide-react';

function ProfileContent() {
  return (
    <PlaceholderPage
      title="Profile Page"
      description="View and edit your professional profile, manage your CVs, and track your posts and connections."
      icon={<User className="h-8 w-8 text-gray-600" />}
    />
  );
}

export default function Profile() {
  return (
    <RequireAuth>
      <ProfileContent />
    </RequireAuth>
  );
}
