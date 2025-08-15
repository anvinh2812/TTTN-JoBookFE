import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import SkillTag from './SkillTag';
import { User } from '@shared/jobconnect-types';
import { UserPlus } from 'lucide-react';

interface UserSuggestionCardProps {
  user: User & { mutualConnections?: number };
}

export default function UserSuggestionCard({ user }: UserSuggestionCardProps) {
  return (
    <Card className="p-4">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-start space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-gray-900 truncate">
              {user.name}
            </h4>
            <p className="text-xs text-gray-600 truncate">{user.headline}</p>
            {user.mutualConnections && (
              <p className="text-xs text-gray-500 mt-1">
                {user.mutualConnections} mutual connections
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {user.skills.slice(0, 3).map((skill) => (
            <SkillTag key={skill} skill={skill} size="sm" variant="secondary" />
          ))}
        </div>

        <Button size="sm" variant="outline" className="w-full">
          <UserPlus className="h-4 w-4 mr-1" />
          Follow
        </Button>
      </CardContent>
    </Card>
  );
}
