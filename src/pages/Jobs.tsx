import { useState, useEffect } from 'react';
import { MapPin, DollarSign, Plus, Loader2, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/BottomNav';
import { jobsAPI, handleApiError } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Job {
  _id: string;
  title: string;
  description: string;
  pay: string;
  location: string;
  district: string;
  skills: string[];
  status: 'open' | 'filled';
  postedBy: any;
  postedAt: string;
}

export default function JobsPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [status, setStatus] = useState<'all' | 'open' | 'filled'>('all');
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchJobs = async () => {
    try {
      const params: any = {};
      if (status !== 'all') params.status = status;
      if (search) params.search = search;

      const response = await jobsAPI.getAll(params);
      const fetchedJobs = response.data.data || response.data;
      setJobs(fetchedJobs);
    } catch (error) {
      handleApiError(error, 'Failed to load jobs');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [status, search]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchJobs();
  };

  const handleCreateJob = () => {
    if (!isAuthenticated) {
      toast.error('Please login to create a job post');
      navigate('/login');
      return;
    }
    navigate('/jobs/new');
  };

  const handleViewDetails = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">💼 Jobs & Collaboration</h1>
            <p className="text-muted-foreground">Find opportunities in your community</p>
          </div>
          <Button onClick={handleCreateJob} className="gap-2">
            <Plus className="h-4 w-4" />
            Post Job
          </Button>
        </div>

        {/* Search */}
        <Input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status Filter */}
        <Tabs value={status} onValueChange={(v) => setStatus(v as any)}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="filled">Filled</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Refresh Button */}
        <Button 
          variant="outline" 
          onClick={handleRefresh} 
          disabled={refreshing}
          className="w-full"
        >
          {refreshing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Refreshing...
            </>
          ) : (
            'Refresh Jobs'
          )}
        </Button>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        )}

        {/* Jobs List */}
        {!loading && (
          <div className="space-y-4">
            {jobs.map(job => (
              <Card key={job._id} className="card-elevated">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <Badge 
                          variant={job.status === 'open' ? 'default' : 'secondary'}
                          className={job.status === 'open' ? 'bg-secondary' : ''}
                        >
                          {job.status === 'open' ? 'Open' : 'Filled'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-secondary font-semibold">
                          <DollarSign className="h-4 w-4" />
                          {job.pay}
                        </span>
                      </div>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {job.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {job.postedBy && (
                        <p className="text-xs text-muted-foreground">
                          Posted by: {job.postedBy.name || 'Unknown'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewDetails(job._id)}
                    >
                      {job.status === 'open' ? 'Apply Now' : 'View Details'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <Briefcase className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
            <div>
              <p className="text-lg font-semibold text-muted-foreground">No jobs found</p>
              <p className="text-sm text-muted-foreground">
                {search ? 'Try adjusting your search' : 'Be the first to post a job!'}
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
