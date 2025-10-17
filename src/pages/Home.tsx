import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight, Star, TrendingUp, DollarSign, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/BottomNav';
import { OfflineBadge } from '@/components/OfflineBadge';
import { db } from '@/lib/db';
import { t } from '@/lib/i18n';
import type { InvestorRequest } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [featuredPitches, setFeaturedPitches] = useState<InvestorRequest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();

  const storyTitle = "Sunitha's Food Stall Success";
  const storyText = `
    Sunitha, a small-town entrepreneur, started her food stall with just Rs. 5,000.
    Every morning, she prepared home-cooked meals with love and care, serving her neighbors and passersby.
    Through dedication, friendly service, and word-of-mouth, her customer base grew from just a handful to over 50 daily customers.
    Today, Sunitha’s stall not only supports her family but also inspires others in her community to start their own small businesses.
    Her journey shows how passion and persistence can turn small beginnings into remarkable success.
  `;

  useEffect(() => {
    loadFeaturedPitches();
    return () => {
      window.speechSynthesis.cancel(); // stop any ongoing speech on unmount
    };
  }, []);

  const loadFeaturedPitches = async () => {
    const pitches = await db.investorRequests
      .where('featured')
      .equals(1)
      .limit(2)
      .toArray();
    setFeaturedPitches(pitches);
  };

  const speakStory = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(storyText);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-secondary py-16 px-4 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-screen-lg mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            EmpowerLearn Stories
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
            Grow Your Skills, Share Your Story
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/learn">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto btn-success">
                <Play className="h-5 w-5 mr-2" />
                Start a Story
              </Button>
            </Link>
            <Link to="/products/new">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20">
                <TrendingUp className="h-5 w-5 mr-2" />
                Show My Skill
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-screen-lg mx-auto px-4 space-y-8 py-8">
        {/* Story of the Week */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              ⭐ Story of the Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <img
                src="https://images.stockcake.com/public/a/d/e/ade4a3ff-194c-4f13-912b-49c45972fec3_large/vibrant-food-stall-stockcake.jpg"
                alt="Featured story"
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">{storyTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  From Rs. 5,000 to 50+ daily customers
                </p>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="default" onClick={speakStory}>
                    <Play className="h-4 w-4 mr-1" />
                    {isSpeaking ? 'Stop' : 'Listen'}
                  </Button>
                  <Button
                   size="sm"
                   variant="outline"
                   onClick={() => navigate('/stories/sunitha')}
                  >
                   View Story
                  </Button>

                  <OfflineBadge />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Story Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 relative shadow-lg">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-3">{storyTitle}</h2>
              <p className="text-sm text-gray-700 whitespace-pre-line">{storyText}</p>
              <div className="flex justify-end mt-4 gap-3">
                <Button variant="outline" onClick={speakStory}>
                  <Play className="h-4 w-4 mr-1" />
                  {isSpeaking ? 'Stop' : 'Listen'}
                </Button>
                <Button variant="default" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Learn & Grow */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">🎓 Learn & Grow</h2>
            <Link to="/learn" className="text-sm text-primary hover:underline flex items-center">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Smart Saving', progress: 60, image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop', downloaded: true },
              { title: 'Start Business', progress: 30, image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop', downloaded: false },
            ].map((pack, i) => (
              <Card key={i} className="card-elevated overflow-hidden">
                <img src={pack.image} alt={pack.title} className="w-full h-32 object-cover" />
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-semibold">{pack.title}</h3>
                  <Progress value={pack.progress} className="h-2" />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{pack.progress}% Complete</span>
                    {pack.downloaded && <OfflineBadge />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Local Products */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">🛍️ Local Products</h2>
                    <Link to="/products" className="text-sm text-primary hover:underline flex items-center">
                      View All <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { title: 'Fresh Vegetables', price: 500, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop' },
                      { title: 'Handmade Baskets', price: 'Negotiable', image: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=400&h=300&fit=crop' },
                      { title: 'Mobile Repair', price: 1500, image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop' },
                    ].map((product, i) => (
                      <Card key={i} className="card-elevated overflow-hidden">
                        <img src={product.image} alt={product.title} className="w-full h-32 object-cover" />
                        <CardContent className="p-3 space-y-1">
                          <h3 className="font-semibold text-sm">{product.title}</h3>
                          <p className="text-primary font-bold text-sm">
                            {typeof product.price === 'number' ? `Rs. ${product.price}` : product.price}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
        
                {/* Investor Pitches */}
                {featuredPitches.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">{t('💼 Investor Pitches')}</h2>
                      <Link to="/investor-connect" className="text-sm text-primary hover:underline flex items-center">
                        View All <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                    
                    <div className="space-y-3">
                      {featuredPitches.map((pitch) => (
                        <Card key={pitch.id} className="card-elevated">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold">{pitch.userName}</h3>
                                  <Badge variant="default" className="text-xs">⭐ {t('Featured')}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{pitch.village}, {pitch.district}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                                  <DollarSign className="w-4 h-4" />
                                  {(pitch.amount / 1000).toFixed(0)}K
                                </div>
                                <Badge variant="secondary" className="text-xs mt-1">{t(pitch.category)}</Badge>
                              </div>
                            </div>
                            <p className="text-sm line-clamp-2">{pitch.purpose}</p>
                            <Link to="/investor-connect">
                              <Button variant="default" size="sm" className="w-full">
                                {t('View Details')}
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}
        
                {/* Jobs */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">💼 Jobs & Collaboration</h2>
                    <Link to="/jobs" className="text-sm text-primary hover:underline flex items-center">
                      View All <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { title: 'Farm Helper', pay: 'Rs. 1,500/day', location: 'Kurunegala' },
                      { title: 'Social Media Helper', pay: 'Rs. 2,000/week', location: 'Colombo' },
                      { title: 'Delivery Partner', pay: 'Rs. 500/delivery', location: 'Gampaha' },
                    ].map((job, i) => (
                      <Card key={i} className="card-elevated">
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.location} • {job.pay}</p>
                          </div>
                          <Button variant="default" size="sm">Apply</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
        
                {/* My Progress */}
                <Card className="card-elevated bg-gradient-to-br from-secondary-light to-accent-light border-0">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold">🏅 My Progress</h2>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-muted"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.6)}`}
                            className="text-secondary"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                          60%
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-sm text-muted-foreground">3 stories completed</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">💰 Smart Saver</Badge>
                          <Badge variant="secondary">🔨 Skill Builder</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
        
                {/* Daily Tip */}
                <Card className="card-elevated bg-accent-light border-accent">
                  <CardContent className="p-6 space-y-3">
                    <h2 className="text-lg font-bold">💡 Daily Tip</h2>
                    <p className="text-foreground">
                      Save 10% of every income before spending. Small savings grow big!
                    </p>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Listen to Tip
                    </Button>
                  </CardContent>
                </Card>
              </div>
      <BottomNav />
    </div>
  );
}
