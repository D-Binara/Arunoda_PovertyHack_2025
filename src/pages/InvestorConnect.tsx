import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/lib/db';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bookmark, MessageCircle, TrendingUp, MapPin, Calendar, DollarSign } from 'lucide-react';
import type { InvestorRequest } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

export default function InvestorConnect() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<InvestorRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<InvestorRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [currentUserId] = useState('user_1'); // Mock user

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, statusFilter, districtFilter, categoryFilter, maxAmount]);

  const loadRequests = async () => {
    const data = await db.investorRequests.toArray();
    setRequests(data);
  };

  const filterRequests = () => {
    let filtered = [...requests];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }

    if (districtFilter !== 'all') {
      filtered = filtered.filter(r => r.district === districtFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(r => r.category === categoryFilter);
    }

    if (maxAmount) {
      const max = parseFloat(maxAmount);
      if (!isNaN(max)) {
        filtered = filtered.filter(r => r.amount <= max);
      }
    }

    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    setFilteredRequests(filtered);
  };

  const toggleBookmark = async (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (!request) return;

    const bookmarked = request.bookmarkedBy || [];
    const isBookmarked = bookmarked.includes(currentUserId);

    const updated = {
      ...request,
      bookmarkedBy: isBookmarked
        ? bookmarked.filter(id => id !== currentUserId)
        : [...bookmarked, currentUserId],
    };

    await db.investorRequests.put(updated);
    await loadRequests();
    toast({
      title: isBookmarked ? t('Bookmark removed') : t('Bookmarked'),
      description: isBookmarked ? t('Removed from your bookmarks') : t('Added to your bookmarks'),
    });
  };

  const handleMessage = (request: InvestorRequest) => {
    toast({
      title: t('Message'),
      description: `Starting conversation with ${request.userName}`,
    });
    // Navigate to messages would go here
  };

  const districts = Array.from(new Set(requests.map(r => r.district)));
  const categories = Array.from(new Set(requests.map(r => r.category)));

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground p-4 shadow-md">
        <h1 className="text-2xl font-bold">{t('Investor Connect')}</h1>
        <p className="text-sm opacity-90">{t('Fund local entrepreneurs')}</p>
      </header>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{t('Investment Opportunities')}</h2>
          <Button onClick={() => navigate('/investor-request/new')}>
            {t('Submit Request')}
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4 space-y-3">
          <h3 className="font-medium">{t('Filters')}</h3>
          
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">{t('All')}</TabsTrigger>
              <TabsTrigger value="active">{t('Active')}</TabsTrigger>
              <TabsTrigger value="funded">{t('Funded')}</TabsTrigger>
              <TabsTrigger value="closed">{t('Closed')}</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-2 gap-3">
            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('District')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Districts')}</SelectItem>
                {districts.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('Category')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Categories')}</SelectItem>
                {categories.map(c => (
                  <SelectItem key={c} value={c}>{t(c)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            type="number"
            placeholder={t('Max Amount (LKR)')}
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />
        </Card>

        {/* Results */}
        <div className="space-y-3">
          {filteredRequests.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>{t('No investment opportunities found')}</p>
            </Card>
          ) : (
            filteredRequests.map(request => {
              const isBookmarked = request.bookmarkedBy?.includes(currentUserId);
              return (
                <Card key={request.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{request.userName}</h3>
                        {request.featured && (
                          <Badge variant="default" className="text-xs">⭐ {t('Featured')}</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {request.village}, {request.district}
                        </span>
                        <Badge variant="secondary">{t(request.category)}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBookmark(request.id)}
                      className={isBookmarked ? 'text-primary' : ''}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-md space-y-2">
                    <div className="flex items-center gap-2 text-lg font-bold text-primary">
                      <DollarSign className="w-5 h-5" />
                      LKR {request.amount.toLocaleString()}
                    </div>
                    <p className="text-sm">{request.purpose}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{t('Returns')}:</span> {request.roiDescription}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{t('Timeline')}: {request.timeline}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => handleMessage(request)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t('Message')}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      {t('View Details')}
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
