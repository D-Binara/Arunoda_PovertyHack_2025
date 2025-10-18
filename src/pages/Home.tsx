import { useState, useEffect } from 'react';
import { Play, ChevronRight, Star, TrendingUp, DollarSign, X, Bot, MapPin } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BottomNav } from '@/components/BottomNav';
import { OfflineBadge } from '@/components/OfflineBadge';
import { db } from '@/lib/db';
import { useI18n } from '@/lib/i18n';
import type { InvestorRequest } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { TopNav } from '@/components/Navbar/TopNav';
import StoryCard from './components/home/storycard';
import ProductPreview from '@/pages/Products';

import LearnGrowSection from './components/home/learnGrowSection';

import BizAdvisorChat from '@/components/BizAdvisorChat';

import JobsPreviewSection from './components/home/JobsPreviewSection';

import ProductList from "@/pages/components/home/productList.tsx";
import ProgressCard from "@/pages/components/home/ProgressCard.tsx";
import DailyTipCard from "@/pages/components/home/DailyTipCard.tsx";

export default function HomePage() {
    const { user, isAuthenticated } = useAuth();
    const [featuredPitches, setFeaturedPitches] = useState<InvestorRequest[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isBizAdvisorOpen, setIsBizAdvisorOpen] = useState(false);
    const navigate = useNavigate();

    const handlePlayTip = () => {
        console.log('Playing daily tip audio...');
    };

    const storyTitle = "Arun's Legacy: Rebirth of Traditional Hand-Carved Masks";
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
            window.speechSynthesis.cancel();
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

    const { t } = useI18n();
    const roleLabel = user?.role === 'admin' ? t('role_admin') : t('role_member');

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <section></section>
            <section
                className="relative overflow-hidden text-white py-16 px-4"
                style={{
                    backgroundImage: "url('/img/Home/top.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-screen-lg mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        {user ? `Welcome back, ${user.name}! 👋` : 'Welcome to EmpowerLearn! 🎓'}
                    </h1>

                    <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
                        {t('tagline')}
                    </p>
                    {user && (
                        <p className="text-sm opacity-80"> 📍 {user.district} • {user.role === 'admin' ? '👑 Admin' : '👤 Member'} </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto bg-orange-500/90 border-orange-400 text-white hover:bg-orange-600 font-semibold"
                            onClick={() => setIsBizAdvisorOpen(true)}
                        >
                            <Bot className="h-5 w-5 mr-2"/>
                            {t('bizAdvisor')}
                        </Button>
                    </div>
                </div>
            </section>

            <div className="max-w-screen-lg mx-auto px-4 space-y-8 py-8">
                {/* Story of the Week */}
                <h1 className="not-italic font-serif text-black text-center text-4xl md:text-5xl lg:text-6xl">
                    {t('storyOfTheWeek')}
                </h1>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-12 py-4">
                    {/* LEFT — Image */}
                    <div className="w-full max-w-sm md:max-w-xs flex-shrink-0">
                        <img
                            src="/img/Home/image12w.png"
                            alt={t('storyOfTheWeek')}
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    </div>

                    {/* RIGHT — Content */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <h3 className="text-3xl sm:text-4xl font-semibold text-neutral-900 leading-snug">
                            {storyTitle}
                        </h3>

                        <p className="text-base text-neutral-600 max-w-xl mx-auto md:mx-0">
                            {t('fromToCustomers', {
                                amount: t('rsAmount', { amount: '5,000' }),
                                customers: t('dailyCustomers', { count: '50' }),
                            })}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 pt-2">
                            <Button
                                size="sm"
                                variant="default"
                                onClick={speakStory}
                                className="w-full sm:w-auto bg-[#F57C00] hover:bg-[#EF6C00] text-white"
                            >
                                <Play className="h-4 w-4 mr-1" />
                                {isSpeaking ? t('stop') : t('listen')}
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate('/stories/sunitha')}
                                className="w-full sm:w-auto border-[#F57C00]/40 text-[#F57C00] hover:bg-orange-50 hover:text-black"
                            >
                                {t('viewStory')}
                            </Button>

                            <div className="flex items-center gap-2 pt-2 sm:pt-0">
                                <OfflineBadge />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Learn & Grow */}
                <LearnGrowSection />

                {/* Local Products */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 dark:text-white">
                            {t('localProducts')}
                        </h1>
                        <Link to="/products" className="text-sm text-primary hover:underline flex items-center">
                            {t('viewAll')}
                        </Link>
                    </div>
                    <ProductList limit={3} />
                </section>

                {/* Investor Pitches */}
                {featuredPitches.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">{t('💼 Investor Pitches')}</h2>
                            <Link to="/investor-connect" className="text-sm text-primary hover:underline flex items-center">
                                {t('viewAll')} <ChevronRight className="h-4 w-4" />
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
                                                    <Badge variant="default" className="text-xs"> {t('Featured')}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{pitch.village}, {pitch.district}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                                                    <DollarSign className="w-4 h-4" />
                                                    {t('rsAmount', { amount: (pitch.amount / 1000).toFixed(0) + 'K' })}
                                                </div>
                                                <Badge variant="secondary" className="text-xs mt-1">{t(pitch.category as any)}</Badge>
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

                <JobsPreviewSection />

                <div className="space-y-3">
                    {[
                        { titleKey: 'farmHelper', pay: t('rsAmount', { amount: '1,500' }) + '/' + t('perDay'), location: 'Kurunegala' },
                        { titleKey: 'socialMediaHelper', pay: t('rsAmount', { amount: '2,000' }) + '/' + t('perWeek'), location: 'Colombo' },
                        { titleKey: 'deliveryPartner', pay: t('rsAmount', { amount: '500' }) + '/' + t('perDelivery'), location: 'Gampaha' },
                    ].map((job, i) => (
                        <Card key={i} className="card-elevated">
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{t(job.titleKey as any)}</h3>
                                    <p className="text-sm text-muted-foreground">{job.location} • {job.pay}</p>
                                </div>
                                <Button variant="default" size="sm">{t('apply')}</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <ProgressCard
                    percentage={60}
                    completedStories={3}
                    badges={[
                        { label: 'Smart Saver', icon: 'money' },
                        { label: 'Skill Builder', icon: 'skill' }
                    ]}
                />

                <DailyTipCard
                    tip={t('dailyTip') + ': ' + 'Save 10% of every income before spending. Small savings grow big!'}
                    onPlayTip={handlePlayTip}
                    ctaLabel={t('listenToTip')}
                />
            </div>

            {/* BiZ Advisor Chat */}
            <BizAdvisorChat
                isOpen={isBizAdvisorOpen}
                onClose={() => setIsBizAdvisorOpen(false)}
            />
        </div>
    );
}