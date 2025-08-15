import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import SkillTag from './SkillTag';
import { JobPost } from '@shared/jobconnect-types';
import { 
  MapPin, 
  Calendar, 
  Eye, 
  Users, 
  FileText, 
  Send,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  post: JobPost;
}

const formatSalary = (min?: number, max?: number) => {
  if (!min && !max) return null;
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (min && max) {
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  }
  return formatNumber(min || max || 0);
};

export default function JobCard({ post }: JobCardProps) {
  const salary = formatSalary(post.salaryMin, post.salaryMax);
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  const daysUntilDeadline = Math.ceil(
    (new Date(post.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 truncate">
                  {post.author.name}
                </h3>
                {post.author.isVerified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
                <Badge 
                  variant={post.type === 'hiring' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {post.type === 'hiring' ? 'Hiring' : 'Seeking Job'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 truncate">{post.author.headline}</p>
              <p className="text-xs text-gray-500">{timeAgo}</p>
            </div>
          </div>
          {post.isUrgent && (
            <Badge variant="destructive" className="text-xs">
              Urgent
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Link 
            to={`/post/${post.id}`}
            className="block hover:text-primary transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {post.description}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {post.skills.slice(0, 5).map((skill) => (
            <SkillTag key={skill} skill={skill} size="sm" />
          ))}
          {post.skills.length > 5 && (
            <span className="text-xs text-gray-500">
              +{post.skills.length - 5} more
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{post.location}</span>
          </div>
          {salary && (
            <div className="flex items-center space-x-1 font-medium text-green-600">
              <span>{salary}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>
              {daysUntilDeadline > 0 
                ? `${daysUntilDeadline} days left`
                : 'Expired'
              }
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{post.viewCount} views</span>
            </div>
            {post.type === 'hiring' && post.applicantCount !== undefined && (
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{post.applicantCount} applicants</span>
              </div>
            )}
            {post.type === 'seeking' && (
              <div className="flex items-center space-x-1">
                <FileText className="h-4 w-4" />
                <span>CV attached</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex space-x-2">
            {post.type === 'hiring' ? (
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-1" />
                Apply Now
              </Button>
            ) : (
              <Button size="sm" variant="outline">
                <FileText className="h-4 w-4 mr-1" />
                View CV
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
