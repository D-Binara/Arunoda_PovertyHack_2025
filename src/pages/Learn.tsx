import { useState } from 'react';
import { Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/BottomNav';
import { OfflineBadge } from '@/components/OfflineBadge';
import { mockStoryPacks } from '@/lib/mock-data';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation hook

export default function LearnPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigate

  const filteredPacks = mockStoryPacks.filter(pack => {
    if (search && !pack.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter !== 'all' && pack.category !== filter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <section
  className="relative flex items-center justify-center text-center text-white py-20 px-4 overflow-hidden"
  style={{
    backgroundImage:
      "url('/img/Learn/top.png')", // 🔁 Replace with your image
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 max-w-2xl mx-auto space-y-3">
    <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
       Learn & Grow
    </h1>
    <p className="text-lg md:text-xl text-gray-100 opacity-90">
      Story-driven learning for real-life skills and lifelong growth.
    </p>
  </div>

  {/* Optional decorative glow (subtle aesthetic) */}
  <div className="absolute inset-0 pointer-events-none opacity-20">
    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
    <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
  </div>
</section>
      <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
       

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search story packs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Money Management">Money</TabsTrigger>
            <TabsTrigger value="Entrepreneurship">Business</TabsTrigger>
            <TabsTrigger value="Digital Skills">Digital</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Story Packs */}
        <div className="space-y-4">
          {filteredPacks.map(pack => (
            <Card key={pack.id} className="card-elevated overflow-hidden">
              <div className="flex gap-4">
                <img
                  src={pack.thumbnail}
                  alt={pack.title}
                  className="w-32 h-auto object-cover cursor-pointer"
                  onClick={() => navigate(`/learn/${pack.id}`)} // ✅ Clickable image
                />
                <CardContent className="flex-1 p-4 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="font-bold text-lg cursor-pointer hover:underline"
                        onClick={() => navigate(`/learn/${pack.id}`)} // ✅ Clickable title
                      >
                        {pack.title}
                      </h3>
                      {pack.featured && (
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{pack.description}</p>
                  </div>

                  <div className="space-y-2">
                    <Progress value={pack.progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{pack.progress}% Complete</span>
                      <span>{pack.downloadSize} MB</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {pack.isDownloaded ? (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="flex-1"
                          onClick={() => navigate(`/learn/${pack.id}`)} // ✅ Continue button
                        >
                          Continue Learning
                        </Button>
                        <OfflineBadge />
                      </>
                    ) : (
                      <Button size="sm" variant="default" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download for Offline
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {pack.badges.map((badge, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredPacks.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No story packs found. Try a different search or filter.
          </div>
        )}
      </div>

     
    </div>
  );
}
