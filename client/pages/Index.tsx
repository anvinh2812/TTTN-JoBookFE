import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import JobCard from '@/components/JobCard';
import UserSuggestionCard from '@/components/UserSuggestionCard';
import SkillTag from '@/components/SkillTag';
import {
  Search,
  MapPin,
  Filter,
  TrendingUp,
  Brain,
  Star,
  Users,
  Building,
  PlusCircle,
  LogIn
} from 'lucide-react';
import { mockJobPosts, mockSuggestedUsers, mockAiJobSuggestions } from '@shared/mock-data';
import { PostType } from '@shared/jobconnect-types';

export default function Index() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'hiring' | 'seeking'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const filteredPosts = mockJobPosts.filter(post => {
    if (activeTab === 'hiring') return post.type === 'hiring';
    if (activeTab === 'seeking') return post.type === 'seeking';
    return true;
  }).filter(post => {
    if (searchKeyword) {
      return post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
             post.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
             post.skills.some(skill => skill.toLowerCase().includes(searchKeyword.toLowerCase()));
    }
    return true;
  }).filter(post => {
    if (searchLocation) {
      return post.location.toLowerCase().includes(searchLocation.toLowerCase());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isAuthenticated
                ? `Welcome back, ${user?.name}!`
                : 'Welcome to jobook'
              }
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {isAuthenticated
                ? user?.role === 'EMPLOYER'
                  ? 'Discover talented candidates for your open positions.'
                  : 'Find your next opportunity and advance your career.'
                : 'Your intelligent career platform connecting talent with opportunity across Vietnam.'
              }
            </p>

            {/* CTA Buttons for non-authenticated users */}
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Get Started Free
                </Button>
              </div>
            )}

            {/* Quick Actions for authenticated users */}
            {isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold" asChild>
                  <Link to="/create">
                    <PlusCircle className="h-5 w-5 mr-2" />
                    {user?.role === 'EMPLOYER' ? 'Post a Job' : 'Create Job Seeking Post'}
                  </Link>
                </Button>
                {user?.role === 'SEEKER' && (
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold" asChild>
                    <Link to="/me/cv-management">
                      <Users className="h-5 w-5 mr-2" />
                      Manage Applications
                    </Link>
                  </Button>
                )}
                {user?.role === 'EMPLOYER' && (
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold" asChild>
                    <Link to="/me/posts">
                      <Building className="h-5 w-5 mr-2" />
                      Manage Posts
                    </Link>
                  </Button>
                )}
              </div>
            )}
            
            {/* Enhanced Search */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Job title, skills, company..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <Button size="lg" className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                    Search Jobs
                  </Button>
                </div>
              </div>
              
              {/* Popular Skills */}
              <div className="mt-4 text-center">
                <p className="text-blue-100 text-sm mb-2">Popular skills:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['React', 'Node.js', 'Python', 'AWS', 'UI/UX Design'].map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setSearchKeyword(skill)}
                      className="px-3 py-1 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-colors"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="hiring">Find Talent</TabsTrigger>
                  <TabsTrigger value="seeking">Find Jobs</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <TabsContent value="all" className="space-y-6">
                {filteredPosts.map((post) => (
                  <JobCard key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="hiring" className="space-y-6">
                {filteredPosts.filter(p => p.type === 'hiring').map((post) => (
                  <JobCard key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="seeking" className="space-y-6">
                {filteredPosts.filter(p => p.type === 'seeking').map((post) => (
                  <JobCard key={post.id} post={post} />
                ))}
              </TabsContent>
            </Tabs>

            {filteredPosts.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or browse all posts.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchKeyword('');
                      setSearchLocation('');
                      setActiveTab('all');
                    }}
                  >
                    Clear filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Today's Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">New Jobs</span>
                  <Badge variant="secondary">+24</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">New Candidates</span>
                  <Badge variant="secondary">+18</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Applications</span>
                  <Badge variant="secondary">+47</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Show different sidebar content based on auth and role */}
            {isAuthenticated ? (
              <>
                {/* People to Follow */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      People to Follow
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockSuggestedUsers.slice(0, 3).map((user) => (
                      <UserSuggestionCard key={user.id} user={user} />
                    ))}
                    <Button variant="outline" className="w-full">
                      See all suggestions
                    </Button>
                  </CardContent>
                </Card>

                {/* Role-specific widgets */}
                {user?.role === 'SEEKER' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-purple-600" />
                        AI Job Matches
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockAiJobSuggestions.map((job, index) => (
                        <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm text-gray-900">{job.title}</h4>
                              <p className="text-xs text-gray-600 flex items-center mt-1">
                                <Building className="h-3 w-3 mr-1" />
                                {job.company}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {job.location}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 text-green-600">
                              <Star className="h-3 w-3 fill-current" />
                              <span className="text-xs font-semibold">{job.match}%</span>
                            </div>
                          </div>
                          <Button size="sm" className="w-full text-xs">
                            View Details
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        See more matches
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {user?.role === 'EMPLOYER' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Building className="h-5 w-5 mr-2 text-green-600" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/create">
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Post New Job
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/me/posts">
                          <Building className="w-4 h-4 mr-2" />
                          Manage Posts
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              /* Guest user sidebar */
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Join JobConnect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Sign up to access personalized job recommendations, connect with professionals, and manage your career journey.
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full">
                      Sign Up Free
                    </Button>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trending Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'AWS', 'Python', 'Docker', 'Kubernetes', 'Figma', 'Node.js'].map((skill) => (
                    <SkillTag 
                      key={skill} 
                      skill={skill} 
                      size="sm" 
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setSearchKeyword(skill)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
