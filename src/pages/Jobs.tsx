import { useState } from 'react';
import { MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BottomNav } from '@/components/BottomNav';
import { mockJobs } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function JobsPage() {
  const [status, setStatus] = useState<'all' | 'open' | 'filled'>('all');
  const [search, setSearch] = useState('');

  const filteredJobs = mockJobs.filter(job => {
    if (status !== 'all' && job.status !== status) return false;
    if (search && !job.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleQuickApply = (jobId: string) => {
    toast.success('Application submitted! Will sync when online.');
    // In production: record audio, save to outbox, sync later
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">💼 Jobs & Collaboration</h1>
          <p className="text-muted-foreground">Find opportunities in your community</p>
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

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <Card key={job.id} className="card-elevated">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <Badge 
                        variant={job.status === 'open' ? 'default' : 'secondary'}
                        className={job.status === 'open' ? 'bg-secondary' : ''}
                      >
                        {job.status === 'open' ? 'Open' : 'Filled'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
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

                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {job.status === 'open' && (
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleQuickApply(job.id)}
                    >
                      Quick Apply
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No jobs found.
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
