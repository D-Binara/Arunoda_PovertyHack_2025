import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AudioRecorder } from '@/components/AudioRecorder';
import { db, addToOutbox } from '@/lib/db';
import { toast } from 'sonner';

export default function StoriesNewPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const story = {
        id: `story_${Date.now()}`,
        userId: 'user_1',
        userName: formData.get('name') as string,
        village: formData.get('village') as string,
        district: formData.get('district') as string,
        category: formData.get('category') as string,
        photo: undefined,
        audioUrl: audioBlob ? URL.createObjectURL(audioBlob) : undefined,
        textContent: formData.get('content') as string || undefined,
        status: 'pending' as const,
        createdAt: new Date(),
      };

      await db.communityStories.add(story);
      await addToOutbox('story', story);

      toast.success('Story submitted for review!');
      navigate('/stories');
    } catch (error) {
      toast.error('Failed to submit story');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Share Your Story</h1>
          <p className="text-muted-foreground">Inspire others with your journey</p>
        </div>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Or use a nickname"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="village">Village *</Label>
                  <Input 
                    id="village" 
                    name="village" 
                    placeholder="Your village"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Input 
                    id="district" 
                    name="district" 
                    placeholder="Your district"
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Story Type *</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Success Story">Success Story</SelectItem>
                    <SelectItem value="Learning Journey">Learning Journey</SelectItem>
                    <SelectItem value="Community Impact">Community Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Your Story (optional)</Label>
                <Textarea 
                  id="content" 
                  name="content" 
                  placeholder="Share your journey in text..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Photo (optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Photo upload coming soon
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Audio Story (optional)</Label>
                <p className="text-xs text-muted-foreground mb-3">
                  Record up to 60 seconds telling your story
                </p>
                <AudioRecorder
                  maxDuration={60}
                  onRecordingComplete={setAudioBlob}
                />
                {audioBlob && (
                  <p className="text-sm text-secondary">✓ Audio recorded</p>
                )}
              </div>

              <div className="bg-accent-light p-4 rounded-lg text-sm">
                <p className="font-medium mb-1">📝 Note</p>
                <p className="text-muted-foreground">
                  Your story will be reviewed before appearing on the Inspire Wall.
                </p>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 btn-hero">
                  {loading ? 'Submitting...' : 'Share Story'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
