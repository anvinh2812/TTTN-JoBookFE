import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { EmployerPost, EmployerApplication } from '@shared/employer-data';
import { ApplicationStatus, getStatusColor, getStatusText } from '@shared/cv-management-data';
import { employerService } from '@/services/employer';
import CvViewerModal from '@/components/cv-management/CvViewerModal';
import AISummaryPopover from '@/components/cv-management/AISummaryPopover';
import SkillTag from '@/components/SkillTag';
import { 
  ArrowLeft,
  Search, 
  Filter,
  Eye, 
  Star,
  Brain,
  FileText,
  MessageSquare,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

export default function EmployerApplications() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<EmployerPost | null>(null);
  const [applications, setApplications] = useState<EmployerApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<EmployerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  
  // CV Viewer Modal
  const [cvViewerModal, setCvViewerModal] = useState<{
    isOpen: boolean;
    cv: any;
  }>({ isOpen: false, cv: null });

  const { toast } = useToast();

  useEffect(() => {
    if (postId) {
      loadData();
    }
  }, [postId]);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [postData, applicationsData] = await Promise.all([
        employerService.getPost(postId!),
        employerService.getPostApplications(postId!)
      ]);
      
      setPost(postData);
      setApplications(applicationsData);
    } catch (error) {
      toast({
        title: "Error loading data",
        description: "Failed to load post and applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicant.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.cv.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const handleStatusChange = async (applicationId: string, newStatus: ApplicationStatus) => {
    try {
      const updatedApplication = await employerService.updateApplicationStatus(applicationId, newStatus);
      
      if (updatedApplication) {
        setApplications(prev => prev.map(app => 
          app.id === applicationId ? updatedApplication : app
        ));
        toast({
          title: "Status updated",
          description: `Application status changed to ${getStatusText(newStatus)}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      });
    }
  };

  const handleViewCV = (cv: any) => {
    setCvViewerModal({ isOpen: true, cv });
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => ['received', 'in_review', 'interview'].includes(app.status)).length,
    offers: applications.filter(app => app.status === 'offer').length,
    hired: applications.filter(app => app.status === 'hired').length,
    avgScore: applications.length > 0 
      ? Math.round(applications.reduce((sum, app) => sum + app.aiMatchScore, 0) / applications.length)
      : 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Post not found</h3>
              <p className="text-gray-600 mb-4">The job post you're looking for doesn't exist.</p>
              <Button asChild>
                <Link to="/me/posts">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Posts
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/me/posts">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to My Posts
            </Link>
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
              <p className="text-gray-600 mb-4">{post.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.skills.map((skill) => (
                  <SkillTag key={skill} skill={skill} size="sm" />
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{post.location}</span>
                <span>•</span>
                <span>{post.applicantCount} applications</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
            
            <Badge className={`${getStatusColor(post.status)} ml-4`}>
              {getStatusText(post.status)}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Offers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.offers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Avg Score</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search applicants by name, headline, or CV title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="in_review">In Review</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters.'
                    : 'No one has applied to this position yet.'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((application) => {
                  const appliedTimeAgo = formatDistanceToNow(new Date(application.appliedAt), {
                    addSuffix: true
                  });

                  return (
                    <Card key={application.id} className="p-4 hover:shadow-sm transition-shadow">
                      {/* Mobile Layout */}
                      <div className="block md:hidden space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={application.applicant.avatar} alt={application.applicant.name} />
                              <AvatarFallback>{application.applicant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-gray-900">{application.applicant.name}</h4>
                              <p className="text-sm text-gray-600">{application.applicant.headline}</p>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(application.status)} text-xs`}>
                            {getStatusText(application.status)}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium">{application.cv.title}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewCV(application.cv)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View CV
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className={`w-4 h-4 ${getMatchScoreColor(application.aiMatchScore)}`} />
                            <span className={`text-sm font-semibold ${getMatchScoreColor(application.aiMatchScore)}`}>
                              {application.aiMatchScore}% match
                            </span>
                          </div>
                          <AISummaryPopover summary={application.aiSummary} matchScore={application.aiMatchScore}>
                            <Button variant="ghost" size="sm">
                              <Brain className="w-4 h-4 mr-1" />
                              AI Insights
                            </Button>
                          </AISummaryPopover>
                        </div>

                        <div className="text-xs text-gray-500 flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>Applied {appliedTimeAgo}</span>
                        </div>

                        {application.notes && (
                          <div className="p-2 bg-gray-50 rounded text-sm text-gray-700">
                            <strong>Notes:</strong> {application.notes}
                          </div>
                        )}

                        <div>
                          <Select
                            value={application.status}
                            onValueChange={(value) => handleStatusChange(application.id, value as ApplicationStatus)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="received">Received</SelectItem>
                              <SelectItem value="in_review">In Review</SelectItem>
                              <SelectItem value="interview">Interview</SelectItem>
                              <SelectItem value="offer">Offer</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="hired">Hired</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid md:grid-cols-12 md:gap-4 md:items-center">
                        {/* Applicant */}
                        <div className="col-span-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={application.applicant.avatar} alt={application.applicant.name} />
                              <AvatarFallback>{application.applicant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-gray-900 truncate">{application.applicant.name}</h4>
                              <p className="text-sm text-gray-600 truncate">{application.applicant.headline}</p>
                              <p className="text-xs text-gray-500">{appliedTimeAgo}</p>
                            </div>
                          </div>
                        </div>

                        {/* CV */}
                        <div className="col-span-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 min-w-0 flex-1">
                              <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="text-sm font-medium truncate">{application.cv.title}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewCV(application.cv)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          <Badge className={`${getStatusColor(application.status)} text-xs`}>
                            {getStatusText(application.status)}
                          </Badge>
                        </div>

                        {/* Match Score */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className={`w-4 h-4 ${getMatchScoreColor(application.aiMatchScore)}`} />
                              <span className={`text-sm font-semibold ${getMatchScoreColor(application.aiMatchScore)}`}>
                                {application.aiMatchScore}%
                              </span>
                            </div>
                            <AISummaryPopover summary={application.aiSummary} matchScore={application.aiMatchScore}>
                              <Button variant="ghost" size="sm">
                                <Brain className="w-4 h-4" />
                              </Button>
                            </AISummaryPopover>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="col-span-3">
                          <div className="flex items-center space-x-2">
                            <Select
                              value={application.status}
                              onValueChange={(value) => handleStatusChange(application.id, value as ApplicationStatus)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="received">Received</SelectItem>
                                <SelectItem value="in_review">In Review</SelectItem>
                                <SelectItem value="interview">Interview</SelectItem>
                                <SelectItem value="offer">Offer</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="hired">Hired</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Notes display for desktop */}
                      {application.notes && (
                        <div className="hidden md:block mt-3 pt-3 border-t border-gray-100">
                          <div className="p-2 bg-gray-50 rounded text-sm text-gray-700">
                            <strong>Notes:</strong> {application.notes}
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CV Viewer Modal */}
      <CvViewerModal
        isOpen={cvViewerModal.isOpen}
        onClose={() => setCvViewerModal({ isOpen: false, cv: null })}
        cvTitle={cvViewerModal.cv?.title || ''}
        cvUrl={cvViewerModal.cv?.fileUrl || ''}
        fileName={cvViewerModal.cv?.fileName || ''}
        uploadDate={cvViewerModal.cv?.uploadDate || ''}
        fileSize="2.3 MB" // Mock size
      />
    </div>
  );
}
