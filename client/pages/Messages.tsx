import PlaceholderPage from '@/components/PlaceholderPage';
import { RequireAuth } from '@/components/guards/RouteGuard';
import { MessageCircle } from 'lucide-react';

function MessagesContent() {
  return (
    <PlaceholderPage
      title="Messages"
      description="Connect with employers and candidates through 1-on-1 messaging. Discuss opportunities and share additional information."
      icon={<MessageCircle className="h-8 w-8 text-gray-600" />}
    />
  );
}

export default function Messages() {
  return (
    <RequireAuth>
      <MessagesContent />
    </RequireAuth>
  );
}
