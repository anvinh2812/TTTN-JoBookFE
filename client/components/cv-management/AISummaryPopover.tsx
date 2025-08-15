import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Star,
  Check,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface AISummaryPopoverProps {
  children: React.ReactNode;
  summary: string[];
  matchScore: number;
}

export default function AISummaryPopover({ 
  children, 
  summary, 
  matchScore 
}: AISummaryPopoverProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Check className="w-4 h-4" />;
    if (score >= 75) return <TrendingUp className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Rất phù hợp';
    if (score >= 75) return 'Phù hợp tốt';
    if (score >= 60) return 'Phù hợp vừa';
    return 'Ít phù hợp';
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold">Phân tích AI</h4>
            </div>
            <Badge className={`${getScoreColor(matchScore)} flex items-center space-x-1`}>
              {getScoreIcon(matchScore)}
              <span>{matchScore}%</span>
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Độ phù hợp:</span>
              <span className={`font-medium ${getScoreColor(matchScore).split(' ')[0]}`}>
                {getScoreText(matchScore)}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  matchScore >= 90 ? 'bg-green-500' :
                  matchScore >= 75 ? 'bg-blue-500' :
                  matchScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${matchScore}%` }}
              />
            </div>
          </div>

          <div>
            <h5 className="font-medium text-sm text-gray-900 mb-2">Điểm mạnh:</h5>
            <ul className="space-y-1">
              {summary.map((point, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500">
              Phân tích được tạo bởi AI dựa trên CV và yêu cầu công việc
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
