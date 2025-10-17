import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/BottomNav';
import { mockCommunityStories } from '@/lib/mock-data';

export default function StoriesPage() {
  const [filter, setFilter] = useState('all');

  const filteredStories = filter === 'all'
    ? mockCommunityStories
    : mockCommunityStories.filter(s => s.category === filter);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Inspire Wall</h1>
            <p className="text-muted-foreground">Community success stories</p>
          </div>
          <Link to="/stories/new">
            <Button size="lg" className="btn-hero">
              <Plus className="h-5 w-5 mr-2" />
              Share Story
            </Button>
          </Link>
        </div>

        {/* Category Filter */}
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All Stories</TabsTrigger>
            <TabsTrigger value="Success Story">Success</TabsTrigger>
            <TabsTrigger value="Learning Journey">Learning</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredStories.map(story => (
            <Card key={story.id} className="card-elevated overflow-hidden group">
              {story.photo && (
                <img 
                  src={story.photo} 
                  alt={story.userName}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
              )}
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-1">
                    <h3 className="font-bold">{story.userName}</h3>
                    <p className="text-xs text-muted-foreground">
                      📍 {story.village}, {story.district}
                    </p>
                  </div>
                  {story.featured && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>

                {story.textContent && (
                  <p className="text-sm">{story.textContent}</p>
                )}

                {story.audioUrl && (
                  <Button variant="outline" size="sm" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Listen to Story (1 min)
                  </Button>
                )}

                <Badge variant="secondary">{story.category}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
