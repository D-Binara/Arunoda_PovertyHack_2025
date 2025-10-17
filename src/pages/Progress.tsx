import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/BottomNav';
import { mockBadges } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function ProgressPage() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Learning Journey',
        text: 'Check out my progress on EmpowerLearn Stories! 🎓',
      });
    } else {
      toast.success('Share feature coming soon!');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">🏅 My Learning Journey</h1>
          <p className="text-muted-foreground">Track your growth and achievements</p>
        </div>

        {/* Overall Progress */}
        <Card className="card-elevated bg-gradient-to-br from-primary-light to-secondary-light border-0">
          <CardContent className="p-8 text-center space-y-6">
            <div className="relative inline-block">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-muted opacity-30"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.6)}`}
                  className="text-secondary"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">60%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Great Progress!</h2>
              <p className="text-muted-foreground">
                You've completed 3 out of 5 stories
              </p>
            </div>

            <Button size="lg" className="btn-hero" onClick={handleShare}>
              <Share2 className="h-5 w-5 mr-2" />
              Share My Progress
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="card-elevated">
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-3xl font-bold text-primary">3</div>
              <p className="text-sm text-muted-foreground">Stories Completed</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-3xl font-bold text-secondary">2</div>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-3xl font-bold text-accent">7</div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-3xl font-bold text-primary">2</div>
              <p className="text-sm text-muted-foreground">Current Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <Card className="card-elevated">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">My Badges</h3>
              <Badge variant="secondary">2/4 Unlocked</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {mockBadges.map((badge) => {
                const unlocked = ['badge_saver', 'badge_builder'].includes(badge.id);
                
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-xl border-2 text-center space-y-2 transition-all ${
                      unlocked
                        ? 'bg-gradient-to-br from-primary-light to-secondary-light border-primary'
                        : 'bg-muted/30 border-border opacity-50'
                    }`}
                  >
                    <div className="text-4xl">{badge.icon}</div>
                    <div className="space-y-1">
                      <p className="font-bold text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>
                    {!unlocked && (
                      <Badge variant="outline" className="text-xs">
                        Locked
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-elevated">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            
            <div className="space-y-3">
              {[
                { action: 'Completed "Smart Saving" story', time: '2 days ago', icon: '✅' },
                { action: 'Earned "Smart Saver" badge', time: '2 days ago', icon: '💰' },
                { action: 'Started "Business Basics" pack', time: '3 days ago', icon: '🎓' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Goal */}
        <Card className="card-elevated bg-accent-light border-accent">
          <CardContent className="p-6 space-y-3">
            <h3 className="font-bold">🎯 Next Goal</h3>
            <p className="text-sm">
              Complete 2 more stories to earn the "Quick Learner" badge!
            </p>
            <Progress value={60} className="h-2" />
            <p className="text-xs text-muted-foreground">3/5 stories complete</p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
