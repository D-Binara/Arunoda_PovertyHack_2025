import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { mockStoryPacks } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { OfflineBadge } from '@/components/OfflineBadge';
import { Download, Play } from 'lucide-react';

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = mockStoryPacks.find(c => c.id === id);
  const [isDownloaded, setIsDownloaded] = useState(course?.isDownloaded || false);

  if (!course) {
    return <div className="p-6 text-center">Course not found.</div>;
  }

  const handleDownload = () => {
    setIsDownloaded(true);
    alert(`${course.title} downloaded for offline use.`);
  };

  return (
    <div className="min-h-screen bg-background p-6 max-w-3xl mx-auto space-y-8">
      <Button variant="outline" size="sm" onClick={() => navigate(-1)}>← Back</Button>
      <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover rounded-lg shadow-md" />

      <div className="space-y-4">
        <div className="flex justify-between items-center gap-3">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <Badge variant="secondary" className="text-sm">{course.category}</Badge>
        </div>

        <p className="text-muted-foreground whitespace-pre-line">{course.description}</p>

        <div className="space-y-2">
          <Progress value={course.progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{course.progress}% Complete</span>
            <span>{course.downloadSize} MB</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isDownloaded ? (
            <>
              <Button size="sm" className="flex-1"><Play className="h-4 w-4 mr-2" /> Continue Learning</Button>
              <OfflineBadge />
            </>
          ) : (
            <Button size="sm" variant="default" onClick={handleDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2" /> Download for Offline
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {course.badges.map((badge, i) => (
            <Badge key={i} variant="outline" className="text-xs">{badge}</Badge>
          ))}
        </div>

            <div>
            <h2 className="text-xl font-semibold mb-3">📚 Lessons</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {course.stories.map((lesson, i) => (
                <li key={i}>{lesson.title}</li> 
                ))}
            </ul>
            </div>
      </div>
    </div>
  );
}
