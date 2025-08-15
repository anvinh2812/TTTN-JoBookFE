import { Badge } from '@/components/ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import ApplicationRow from './ApplicationRow';
import { PostWithApplications } from '@shared/cv-management-data';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Clock,
  Users,
  Briefcase
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ApplicationGroupProps {
  postData: PostWithApplications;
  onViewCV: (cvId: string, cvTitle: string) => void;
  onSwapCV: (applicationId: string, currentCvId: string) => void;
  onWithdraw: (applicationId: string, postTitle: string) => void;
  onViewAISummary: (summary: string[], matchScore: number) => void;
  onEditNote: (applicationId: string, currentNote: string) => void;
}

export default function ApplicationGroup({
  postData,
  onViewCV,
  onSwapCV,
  onWithdraw,
  onViewAISummary,
  onEditNote
}: ApplicationGroupProps) {
  const { post, applications } = postData;
  
  const timeAgo = formatDistanceToNow(new Date(post.postedAt), {
    addSuffix: true
  });
  
  const daysUntilDeadline = Math.ceil(
    (new Date(post.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const isExpired = daysUntilDeadline < 0;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={post.id} className="border rounded-lg">
        <AccordionTrigger className="hover:no-underline px-6 py-4">
          <div className="flex items-start justify-between w-full text-left">
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-lg text-gray-900 truncate">
                  {post.title}
                </h3>
                <Badge 
                  variant={post.type === 'hiring' ? 'default' : 'secondary'}
                  className="flex-shrink-0"
                >
                  {post.type === 'hiring' ? (
                    <>
                      <Briefcase className="w-3 h-3 mr-1" />
                      Tuyển người
                    </>
                  ) : (
                    <>
                      <Users className="w-3 h-3 mr-1" />
                      Tìm việc
                    </>
                  )}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="flex-shrink-0 text-xs"
                >
                  {applications.length} ứng tuyển
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Building className="w-4 h-4" />
                  <span>{post.companyOrAuthor}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{post.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{timeAgo}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className={isExpired ? 'text-red-600 font-medium' : ''}>
                    {isExpired 
                      ? 'Đã hết hạn' 
                      : `Còn ${daysUntilDeadline} ngày`
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        
        <AccordionContent className="px-6 pb-4">
          <Card className="border-0 shadow-none bg-gray-50">
            <div className="p-4">
              <div className="space-y-4">
                {applications.map((application) => (
                  <ApplicationRow
                    key={application.id}
                    application={application}
                    onViewCV={onViewCV}
                    onSwapCV={onSwapCV}
                    onWithdraw={onWithdraw}
                    onViewAISummary={onViewAISummary}
                    onEditNote={onEditNote}
                  />
                ))}
              </div>
            </div>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
