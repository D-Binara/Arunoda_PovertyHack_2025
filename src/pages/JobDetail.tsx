import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, MapPin, DollarSign, Briefcase, Calendar, User, Mic, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { jobsAPI, handleApiError } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { AudioRecorder } from '@/components/AudioRecorder';
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
  postedBy: {
    _id: string;
    name: string;
    village?: string;
    district?: string;
    contactPrefs?: {
      whatsapp?: string;
      sms?: string;
      call?: string;
    };
  };
  postedAt: string;
  createdAt: string;
}

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJobDetails();
      checkIfApplied();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await jobsAPI.getById(id!);
      const jobData = response.data.data || response.data;
      setJob(jobData);
    } catch (error) {
      handleApiError(error, 'Failed to load job details');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const checkIfApplied = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await jobsAPI.getMyApplications();
      const applications = response.data.data || response.data;
      const applied = applications.some((app: any) => 
        app.jobId?._id === id || app.jobId === id
      );
      setHasApplied(applied);
    } catch (error) {
      // Silently fail - not critical
      console.error('Failed to check application status:', error);
    }
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }

    if (hasApplied) {
      toast.info('You have already applied for this job');
      return;
    }

    setShowApplyDialog(true);
  };

  const handleSubmitApplication = async () => {
    if (!applicationMessage.trim() && !audioBlob) {
      toast.error('Please provide a message or record an audio message');
      return;
    }

    setApplying(true);
    try {
      const applicationData: any = {
        message: applicationMessage.trim(),
      };

      // If audio is recorded, you would upload it here
      // For now, we'll just send the text message
      if (audioBlob) {
        // TODO: Upload audio to cloud storage and get URL
        // applicationData.audioMessage = audioUrl;
        toast.info('Audio upload coming soon. Text application submitted.');
      }

      await jobsAPI.apply(id!, applicationData);
      toast.success('Application submitted successfully!');
      setShowApplyDialog(false);
      setHasApplied(true);
      setApplicationMessage('');
      setAudioBlob(null);
    } catch (error) {
      handleApiError(error, 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  const handleAudioRecorded = (blob: Blob) => {
    setAudioBlob(blob);
    toast.success('Audio recorded! You can also add a text message.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">Job not found</p>
          <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
        </div>
      </div>
    );
  }

  const isOwnJob = user?._id === job.postedBy._id || user?.id === job.postedBy._id;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/jobs')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                </div>
                <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                  {job.status === 'open' ? 'Open Position' : 'Position Filled'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Compensation</p>
                  <p className="font-semibold text-secondary">{job.pay}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{job.location}, {job.district}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Posted</p>
                  <p className="font-semibold">
                    {new Date(job.postedAt || job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Posted by</p>
                  <p className="font-semibold">{job.postedBy.name}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Job Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
            </div>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Contact Info */}
            {job.postedBy.contactPrefs && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-1 text-sm">
                    {job.postedBy.contactPrefs.whatsapp && (
                      <p>WhatsApp: {job.postedBy.contactPrefs.whatsapp}</p>
                    )}
                    {job.postedBy.contactPrefs.call && (
                      <p>Phone: {job.postedBy.contactPrefs.call}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Apply Button */}
            {!isOwnJob && job.status === 'open' && (
              <Button
                onClick={handleApply}
                className="w-full"
                size="lg"
                disabled={hasApplied}
              >
                {hasApplied ? 'Already Applied' : 'Apply for this Job'}
              </Button>
            )}

            {isOwnJob && (
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">This is your job posting</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Application Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription>
              Send your application to the employer. You can include a text message and/or record an audio message.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Text Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Tell the employer why you're a good fit for this job..."
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                rows={4}
              />
            </div>

            {/* Audio Recorder */}
            <div className="space-y-2">
              <Label>Audio Message (Optional)</Label>
              <AudioRecorder onRecordingComplete={handleAudioRecorded} />
              {audioBlob && (
                <p className="text-sm text-green-600">✓ Audio recorded</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleSubmitApplication}
                className="flex-1"
                disabled={applying}
              >
                {applying ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowApplyDialog(false)}
                disabled={applying}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
