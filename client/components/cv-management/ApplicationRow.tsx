import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MyApplication, getStatusColor, getStatusText } from '@shared/cv-management-data';
import { 
  FileText, 
  Star, 
  Brain, 
  StickyNote, 
  RefreshCw, 
  X,
  MoreVertical,
  Calendar,
  Eye
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ApplicationRowProps {
  application: MyApplication;
  onViewCV: (cvId: string, cvTitle: string) => void;
  onSwapCV: (applicationId: string, currentCvId: string) => void;
  onWithdraw: (applicationId: string, postTitle: string) => void;
  onViewAISummary: (summary: string[], matchScore: number) => void;
  onEditNote: (applicationId: string, currentNote: string) => void;
}

export default function ApplicationRow({
  application,
  onViewCV,
  onSwapCV,
  onWithdraw,
  onViewAISummary,
  onEditNote
}: ApplicationRowProps) {
  const appliedTimeAgo = formatDistanceToNow(new Date(application.appliedAt), {
    addSuffix: true
  });

  const statusColor = getStatusColor(application.status);
  const statusText = getStatusText(application.status);

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <Card className="p-4 border border-gray-200 hover:shadow-sm transition-shadow">
      {/* Mobile Layout */}
      <div className="block md:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{appliedTimeAgo}</span>
          </div>
          <Badge className={`${statusColor} text-xs`}>
            {statusText}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-sm">{application.cv.title}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewCV(application.cv.id, application.cv.title)}
            >
              <Eye className="w-4 h-4 mr-1" />
              Xem
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className={`w-4 h-4 ${getMatchScoreColor(application.matchScore)}`} />
              <span className={`font-semibold text-sm ${getMatchScoreColor(application.matchScore)}`}>
                {application.matchScore}% phù hợp
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewAISummary(application.aiSummary, application.matchScore)}
            >
              <Brain className="w-4 h-4 mr-1" />
              AI
            </Button>
          </div>

          {application.note && (
            <div className="flex items-start space-x-2 p-2 bg-yellow-50 rounded-md">
              <StickyNote className="w-4 h-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-gray-700 flex-1">{application.note}</p>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onSwapCV(application.id, application.cv.id)}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Thay CV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditNote(application.id, application.note)}
            >
              <StickyNote className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onWithdraw(application.id, 'post title')}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-4 md:items-center">
        {/* Ngày nộp */}
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{appliedTimeAgo}</span>
          </div>
        </div>

        {/* CV đã nộp */}
        <div className="col-span-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-sm truncate">{application.cv.title}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewCV(application.cv.id, application.cv.title)}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Trạng thái */}
        <div className="col-span-2">
          <Badge className={`${statusColor} text-xs`}>
            {statusText}
          </Badge>
        </div>

        {/* AI Match Score */}
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className={`w-4 h-4 ${getMatchScoreColor(application.matchScore)}`} />
              <span className={`font-semibold text-sm ${getMatchScoreColor(application.matchScore)}`}>
                {application.matchScore}%
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewAISummary(application.aiSummary, application.matchScore)}
            >
              <Brain className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Ghi chú */}
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            {application.note ? (
              <div 
                className="flex items-center space-x-1 cursor-pointer p-1 rounded hover:bg-yellow-50"
                onClick={() => onEditNote(application.id, application.note)}
              >
                <StickyNote className="w-4 h-4 text-yellow-600" />
                <span className="text-xs text-gray-600 truncate max-w-[80px]">
                  {application.note}
                </span>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditNote(application.id, application.note)}
              >
                <StickyNote className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Hành động */}
        <div className="col-span-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => onSwapCV(application.id, application.cv.id)}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Thay CV
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => onWithdraw(application.id, 'post title')}
              >
                <X className="w-4 h-4 mr-2" />
                Rút đơn
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Note display for desktop when note exists */}
      {application.note && (
        <div className="hidden md:block mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-start space-x-2 p-2 bg-yellow-50 rounded-md">
            <StickyNote className="w-4 h-4 text-yellow-600 mt-0.5" />
            <p className="text-sm text-gray-700 flex-1">{application.note}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
