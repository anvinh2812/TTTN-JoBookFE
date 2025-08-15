import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { RequireAuth } from '@/components/guards/RouteGuard';
import SkillTag from '@/components/SkillTag';
import {
  PlusCircle,
  X,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Eye,
  Briefcase,
  Users,
  Upload,
  Loader2
} from 'lucide-react';
import { mockCVs } from '@shared/mock-data';
import { PostType } from '@shared/jobconnect-types';

function CreatePostContent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Set initial post type based on user role
  const [postType, setPostType] = useState<PostType>(
    user?.role === 'EMPLOYER' ? 'hiring' : 'seeking'
  );
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    deadline: '',
    skills: [] as string[],
    selectedCvId: '',
    isUrgent: false
  });
  const [newSkill, setNewSkill] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const popularSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 
    'Figma', 'UI/UX Design', 'MongoDB', 'PostgreSQL', 'GraphQL', 
    'Vue.js', 'Angular', 'Java', 'C#', 'DevOps'
  ];

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Description is required",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.location.trim()) {
      toast({
        title: "Validation Error",
        description: "Location is required",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.deadline) {
      toast({
        title: "Validation Error",
        description: "Deadline is required",
        variant: "destructive"
      });
      return false;
    }

    if (formData.skills.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one skill is required",
        variant: "destructive"
      });
      return false;
    }

    // For seekers, CV is required
    if (postType === 'seeking' && !formData.selectedCvId) {
      toast({
        title: "Validation Error",
        description: "CV selection is required for job seekers",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock submission delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // TODO: Replace with actual API call
      console.log('Submitting post:', {
        type: postType,
        ...formData,
        authorId: user?.id,
        authorRole: user?.role
      });

      toast({
        title: "Post created successfully!",
        description: `Your ${postType === 'seeking' ? 'job seeking' : 'hiring'} post has been published.`,
      });

      // Redirect based on user role
      if (user?.role === 'EMPLOYER') {
        navigate('/me/posts');
      } else {
        navigate('/');
      }

    } catch (error) {
      toast({
        title: "Error creating post",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
          <p className="text-gray-600">Share your opportunity or showcase your talents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Post Details</CardTitle>
                  {/* Post Type Toggle - Only show if user can access both modes */}
                  {user?.role ? (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-sm">
                        {user.role === 'SEEKER' ? (
                          <>
                            <Users className="h-4 w-4 mr-1" />
                            Job Seeker Post
                          </>
                        ) : (
                          <>
                            <Briefcase className="h-4 w-4 mr-1" />
                            Hiring Post
                          </>
                        )}
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4 bg-gray-100 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setPostType('seeking')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          postType === 'seeking'
                            ? 'bg-white text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Users className="h-4 w-4 inline mr-2" />
                        Seeking Job
                      </button>
                      <button
                        type="button"
                        onClick={() => setPostType('hiring')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          postType === 'hiring'
                            ? 'bg-white text-green-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <Briefcase className="h-4 w-4 inline mr-2" />
                        Hiring
                      </button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title">
                      {postType === 'seeking' ? 'Professional Summary / Role Seeking' : 'Job Title'}
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder={
                        postType === 'seeking' 
                          ? 'e.g., Senior Full-Stack Developer Seeking New Opportunities'
                          : 'e.g., Senior React Developer - Fintech Startup'
                      }
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">
                      {postType === 'seeking' ? 'About You' : 'Job Description'}
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={
                        postType === 'seeking'
                          ? 'Tell employers about your experience, skills, and what you\'re looking for...'
                          : 'Describe the role, responsibilities, requirements, and what makes your company great...'
                      }
                      className="mt-1 h-32"
                      required
                    />
                  </div>

                  {/* CV Selection (Only for seeking posts) */}
                  {postType === 'seeking' && (
                    <div>
                      <Label>Select CV</Label>
                      <Select
                        value={formData.selectedCvId}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, selectedCvId: value }))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Choose a CV to attach" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCVs.map((cv) => (
                            <SelectItem key={cv.id} value={cv.id}>
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4" />
                                <span>{cv.title}</span>
                                {cv.isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500 mt-1">
                        Don't have a CV uploaded? <button type="button" className="text-blue-600 hover:underline">Upload one here</button>
                      </p>
                    </div>
                  )}

                  {/* Location */}
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., Ho Chi Minh City, Vietnam"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <Label>Salary Range (VND)</Label>
                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="number"
                          value={formData.salaryMin}
                          onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: e.target.value }))}
                          placeholder="Minimum"
                          className="pl-10"
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="number"
                          value={formData.salaryMax}
                          onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: e.target.value }))}
                          placeholder="Maximum"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div>
                    <Label htmlFor="deadline">
                      {postType === 'seeking' ? 'Available Until' : 'Application Deadline'}
                    </Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <Label>Skills & Technologies</Label>
                    
                    {/* Add Skills */}
                    <div className="flex mt-1 mb-3">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        className="flex-1 mr-2"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill(newSkill);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => addSkill(newSkill)}
                        variant="outline"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Popular Skills */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {popularSkills.filter(skill => !formData.skills.includes(skill)).slice(0, 8).map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => addSkill(skill)}
                            className="px-2 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                          >
                            + {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Skills */}
                    {formData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <div key={skill} className="relative">
                            <SkillTag skill={skill} />
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Urgent Toggle */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="urgent"
                      checked={formData.isUrgent}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isUrgent: checked }))}
                    />
                    <Label htmlFor="urgent">Mark as urgent</Label>
                    <Badge variant="destructive" className="text-xs">
                      Premium Feature
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {showPreview ? 'Hide Preview' : 'Preview'}
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 brand-gradient"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Create Post
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {postType === 'seeking' ? 'Tips for Job Seekers' : 'Tips for Employers'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {postType === 'seeking' ? (
                  <>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p>Upload a professional, up-to-date CV</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p>Highlight your key achievements and impact</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p>Be specific about the type of role you want</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p>Include your most relevant skills and technologies</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p>Write a clear, engaging job description</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p>List specific skills and requirements</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p>Include salary range to attract quality candidates</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <p>Highlight your company culture and benefits</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Job Seekers</span>
                  <span className="font-semibold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Open Positions</span>
                  <span className="font-semibold">3,924</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Successful Matches</span>
                  <span className="font-semibold">2,156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Response Time</span>
                  <span className="font-semibold">2.3 days</span>
                </div>
              </CardContent>
            </Card>

            {/* CV Upload (for seeking posts) */}
            {postType === 'seeking' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick CV Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">
                      Drag & drop your CV here, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatePost() {
  return (
    <RequireAuth>
      <CreatePostContent />
    </RequireAuth>
  );
}
