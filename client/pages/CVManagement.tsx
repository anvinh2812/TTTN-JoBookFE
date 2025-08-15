import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { RequireSeeker } from '@/components/guards/RouteGuard';
import ApplicationGroup from '@/components/cv-management/ApplicationGroup';
import CvViewerModal from '@/components/cv-management/CvViewerModal';
import SwapCvModal from '@/components/cv-management/SwapCvModal';
import NoteModal from '@/components/cv-management/NoteModal';
import AISummaryPopover from '@/components/cv-management/AISummaryPopover';
import {
  myApplicationsGroupedByPost,
  myCvs,
  ApplicationStatus,
  getStatusText,
  MyCv,
  PostWithApplications
} from '@shared/cv-management-data';
import {
  Search,
  Filter,
  FileText,
  Upload,
  Star,
  Eye,
  Settings,
  Brain,
  Calendar,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';

type TabType = 'all' | 'active' | 'completed';

function CVManagementContent() {
  const { toast } = useToast();
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [activeTab, setActiveTab] = useState<TabType>('all');
  
  // Modal states
  const [cvViewerModal, setCvViewerModal] = useState<{
    isOpen: boolean;
    cvId: string;
    cvTitle: string;
  }>({ isOpen: false, cvId: '', cvTitle: '' });
  
  const [swapCvModal, setSwapCvModal] = useState<{
    isOpen: boolean;
    applicationId: string;
    currentCvId: string;
  }>({ isOpen: false, applicationId: '', currentCvId: '' });
  
  const [noteModal, setNoteModal] = useState<{
    isOpen: boolean;
    applicationId: string;
    currentNote: string;
  }>({ isOpen: false, applicationId: '', currentNote: '' });

  // Data state (in real app, this would come from API)
  const [applicationsData, setApplicationsData] = useState(myApplicationsGroupedByPost);
  const [userCvs, setUserCvs] = useState(myCvs);

  // Filter applications based on search and filters
  const filteredApplications = useMemo(() => {
    let filtered = applicationsData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.post.companyOrAuthor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item =>
        item.applications.some(app => app.status === statusFilter)
      );
    }

    // Tab filter
    if (activeTab === 'active') {
      filtered = filtered.filter(item =>
        item.applications.some(app => 
          ['received', 'in_review', 'interview'].includes(app.status)
        )
      );
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(item =>
        item.applications.some(app => 
          ['offer', 'rejected', 'hired'].includes(app.status)
        )
      );
    }

    return filtered;
  }, [applicationsData, searchTerm, statusFilter, activeTab]);

  // Statistics
  const stats = useMemo(() => {
    const allApps = applicationsData.flatMap(item => item.applications);
    return {
      total: allApps.length,
      active: allApps.filter(app => ['received', 'in_review', 'interview'].includes(app.status)).length,
      offers: allApps.filter(app => app.status === 'offer').length,
      hired: allApps.filter(app => app.status === 'hired').length,
      avgMatchScore: Math.round(allApps.reduce((sum, app) => sum + app.matchScore, 0) / allApps.length)
    };
  }, [applicationsData]);

  // Handlers
  const handleViewCV = (cvId: string, cvTitle: string) => {
    const cv = userCvs.find(c => c.id === cvId);
    if (cv) {
      setCvViewerModal({
        isOpen: true,
        cvId,
        cvTitle: cv.title
      });
    }
  };

  const handleSwapCV = (applicationId: string, currentCvId: string) => {
    setSwapCvModal({
      isOpen: true,
      applicationId,
      currentCvId
    });
  };

  const handleConfirmSwapCV = (newCvId: string) => {
    const newCv = userCvs.find(cv => cv.id === newCvId);
    if (newCv) {
      setApplicationsData(prev =>
        prev.map(item => ({
          ...item,
          applications: item.applications.map(app =>
            app.id === swapCvModal.applicationId
              ? { ...app, cv: newCv }
              : app
          )
        }))
      );
      
      toast({
        title: "CV đã được thay đổi",
        description: `Đã cập nhật CV thành "${newCv.title}"`,
      });
    }
  };

  const handleWithdraw = (applicationId: string, postTitle: string) => {
    setApplicationsData(prev =>
      prev.map(item => ({
        ...item,
        applications: item.applications.filter(app => app.id !== applicationId)
      })).filter(item => item.applications.length > 0)
    );
    
    toast({
      title: "Đã rút đơn ứng tuyển",
      description: `Đã rút đơn ứng tuyển cho vị trí "${postTitle}"`,
      variant: "destructive"
    });
  };

  const handleEditNote = (applicationId: string, currentNote: string) => {
    setNoteModal({
      isOpen: true,
      applicationId,
      currentNote
    });
  };

  const handleSaveNote = (note: string) => {
    setApplicationsData(prev =>
      prev.map(item => ({
        ...item,
        applications: item.applications.map(app =>
          app.id === noteModal.applicationId
            ? { ...app, note }
            : app
        )
      }))
    );
    
    toast({
      title: "Ghi chú đã được lưu",
      description: note ? "Đã cập nhật ghi chú cá nhân" : "Đã xóa ghi chú",
    });
  };

  const handleViewAISummary = (summary: string[], matchScore: number) => {
    // This is handled by the AISummaryPopover component
    console.log('Viewing AI Summary:', { summary, matchScore });
  };

  const handleSetDefaultCV = (cvId: string) => {
    setUserCvs(prev =>
      prev.map(cv => ({
        ...cv,
        isDefault: cv.id === cvId
      }))
    );
    
    toast({
      title: "CV mặc định đã được cập nhật",
      description: "CV này sẽ được sử dụng cho các ứng tuyển mới",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý CV đã nộp</h1>
          <p className="text-gray-600">Theo dõi tiến trình ứng tuyển và quản lý CV của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Tổng đơn</p>
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
                  <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Có offer</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.offers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Đã tuyển</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.hired}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-indigo-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Điểm TB</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgMatchScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Tìm theo tiêu đề bài đăng hoặc công ty..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Lọc theo trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trạng thái</SelectItem>
                      <SelectItem value="received">Đã nhận</SelectItem>
                      <SelectItem value="in_review">Đang xem xét</SelectItem>
                      <SelectItem value="interview">Phỏng vấn</SelectItem>
                      <SelectItem value="offer">Có offer</SelectItem>
                      <SelectItem value="rejected">Từ chối</SelectItem>
                      <SelectItem value="hired">Đã tuyển</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Tất cả ({stats.total})</TabsTrigger>
                <TabsTrigger value="active">Đang xử lý ({stats.active})</TabsTrigger>
                <TabsTrigger value="completed">Đã kết thúc ({stats.total - stats.active})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {filteredApplications.map((postData) => (
                  <ApplicationGroup
                    key={postData.post.id}
                    postData={postData}
                    onViewCV={handleViewCV}
                    onSwapCV={handleSwapCV}
                    onWithdraw={handleWithdraw}
                    onViewAISummary={handleViewAISummary}
                    onEditNote={handleEditNote}
                  />
                ))}
              </TabsContent>

              <TabsContent value="active" className="space-y-4 mt-6">
                {filteredApplications.map((postData) => (
                  <ApplicationGroup
                    key={postData.post.id}
                    postData={postData}
                    onViewCV={handleViewCV}
                    onSwapCV={handleSwapCV}
                    onWithdraw={handleWithdraw}
                    onViewAISummary={handleViewAISummary}
                    onEditNote={handleEditNote}
                  />
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                {filteredApplications.map((postData) => (
                  <ApplicationGroup
                    key={postData.post.id}
                    postData={postData}
                    onViewCV={handleViewCV}
                    onSwapCV={handleSwapCV}
                    onWithdraw={handleWithdraw}
                    onViewAISummary={handleViewAISummary}
                    onEditNote={handleEditNote}
                  />
                ))}
              </TabsContent>
            </Tabs>

            {filteredApplications.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy ứng tuyển</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Thử thay đổi bộ lọc để xem thêm kết quả.'
                      : 'Bạn chưa có ứng tuyển nào. Hãy bắt đầu tìm việc ngay!'
                    }
                  </p>
                  <Button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>
                    Xóa bộ lọc
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CV Library */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Thư viện CV của tôi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userCvs.map((cv) => (
                  <div key={cv.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {cv.title}
                        </h4>
                        <p className="text-xs text-gray-600 truncate">{cv.fileName}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{cv.uploadDate}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{cv.size}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewCV(cv.id, cv.title)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {cv.isDefault ? (
                        <Badge variant="default" className="text-xs">
                          Mặc định
                        </Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-6"
                          onClick={() => handleSetDefaultCV(cv.id)}
                        >
                          Đặt mặc định
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                <Button className="w-full" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Tải CV mới
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Tạo bài tìm việc mới
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Xem bài đăng của tôi
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Cài đặt thông báo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CvViewerModal
        isOpen={cvViewerModal.isOpen}
        onClose={() => setCvViewerModal({ isOpen: false, cvId: '', cvTitle: '' })}
        cvTitle={cvViewerModal.cvTitle}
        cvUrl={userCvs.find(cv => cv.id === cvViewerModal.cvId)?.fileUrl || ''}
        fileName={userCvs.find(cv => cv.id === cvViewerModal.cvId)?.fileName || ''}
        uploadDate={userCvs.find(cv => cv.id === cvViewerModal.cvId)?.uploadDate || ''}
        fileSize={userCvs.find(cv => cv.id === cvViewerModal.cvId)?.size || ''}
      />

      <SwapCvModal
        isOpen={swapCvModal.isOpen}
        onClose={() => setSwapCvModal({ isOpen: false, applicationId: '', currentCvId: '' })}
        onConfirm={handleConfirmSwapCV}
        currentCvId={swapCvModal.currentCvId}
        availableCvs={userCvs}
      />

      <NoteModal
        isOpen={noteModal.isOpen}
        onClose={() => setNoteModal({ isOpen: false, applicationId: '', currentNote: '' })}
        onSave={handleSaveNote}
        currentNote={noteModal.currentNote}
        applicationId={noteModal.applicationId}
      />
    </div>
  );
}

export default function CVManagement() {
  return (
    <RequireSeeker>
      <CVManagementContent />
    </RequireSeeker>
  );
}
