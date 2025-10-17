// Mock data for immediate app functionality
import type {
  Profile,
  StoryPack,
  Product,
  Job,
  CommunityStory,
  DailyTip,
  Badge,
  InvestorRequest,
} from './types';
import { db } from './db';

export const mockProfile: Profile = {
  id: 'user_1',
  name: 'Nimal Perera',
  role: 'Small Business Owner',
  village: 'Horana',
  district: 'Kalutara',
  bio: 'Learning to grow my business and help my community',
  skills: ['Farming', 'Sales', 'Mobile Banking'],
  photo: 'https://ui-avatars.com/api/?name=Nimal+Perera&background=f59e0b&color=fff&size=200',
  contactPrefs: {
    whatsapp: '+94771234567',
  },
  createdAt: new Date('2024-01-15'),
};

export const mockStoryPacks: StoryPack[] = [
  {
    id: 'pack_savings',
    title: 'Smart Saving Stories',
    description: 'Learn to save money wisely through real-life stories',
    category: 'Money Management',
    downloadSize: 15,
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
    stories: [],
    badges: ['Smart Saver', 'Money Master'],
    progress: 60,
    isDownloaded: true,
    featured: true,
  },
  {
    id: 'pack_business',
    title: 'Start Your Business',
    description: 'Step-by-step guide to starting a small business',
    category: 'Entrepreneurship',
    downloadSize: 22,
    thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    stories: [],
    badges: ['Business Builder', 'Entrepreneur'],
    progress: 30,
    isDownloaded: false,
  },
  {
    id: 'pack_digital',
    title: 'Digital Basics',
    description: 'Master mobile banking, online payments, and digital tools',
    category: 'Digital Skills',
    downloadSize: 18,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
    stories: [],
    badges: ['Digital Star', 'Tech Savvy'],
    progress: 0,
    isDownloaded: false,
  },
];

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    userId: 'user_2',
    title: 'Fresh Vegetables',
    description: 'Organic vegetables from my farm. Tomatoes, beans, carrots.',
    price: 500,
    category: 'food',
    village: 'Galle',
    district: 'Galle',
    images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop'],
    status: 'active',
    createdAt: new Date('2025-01-10'),
  },
  {
    id: 'prod_2',
    userId: 'user_3',
    title: 'Handmade Baskets',
    description: 'Beautiful woven baskets for storage. Various sizes available.',
    price: 'negotiable',
    category: 'crafts',
    village: 'Matara',
    district: 'Matara',
    images: ['https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=400&h=300&fit=crop'],
    status: 'active',
    createdAt: new Date('2025-01-12'),
  },
  {
    id: 'prod_3',
    userId: 'user_4',
    title: 'Mobile Repair Service',
    description: 'Quick and affordable mobile phone repairs in your area.',
    price: 1500,
    category: 'services',
    village: 'Kandy',
    district: 'Kandy',
    images: ['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop'],
    status: 'active',
    createdAt: new Date('2025-01-13'),
  },
];

export const mockJobs: Job[] = [
  {
    id: 'job_1',
    title: 'Farm Helper',
    description: 'Need help harvesting vegetables. 3 days work.',
    pay: 'Rs. 1,500/day',
    location: 'Kurunegala',
    district: 'Kurunegala',
    skills: ['Farming', 'Physical Work'],
    status: 'open',
    postedBy: 'user_5',
    postedAt: new Date('2025-01-14'),
  },
  {
    id: 'job_2',
    title: 'Social Media Helper',
    description: 'Help manage Facebook page for local business.',
    pay: 'Rs. 2,000/week',
    location: 'Colombo',
    district: 'Colombo',
    skills: ['Social Media', 'Photography'],
    status: 'open',
    postedBy: 'user_6',
    postedAt: new Date('2025-01-15'),
  },
  {
    id: 'job_3',
    title: 'Delivery Partner',
    description: 'Deliver products to nearby villages. Own vehicle needed.',
    pay: 'Rs. 500/delivery',
    location: 'Gampaha',
    district: 'Gampaha',
    skills: ['Driving', 'Communication'],
    status: 'filled',
    postedBy: 'user_7',
    postedAt: new Date('2025-01-08'),
  },
];

export const mockCommunityStories: CommunityStory[] = [
  {
    id: 'story_1',
    userId: 'user_8',
    userName: 'Sunitha Silva',
    village: 'Anuradhapura',
    district: 'Anuradhapura',
    category: 'Success Story',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop',
    textContent: 'Started my food stall with just Rs. 5,000. Now serving 50+ customers daily!',
    status: 'approved',
    createdAt: new Date('2025-01-10'),
    featured: true,
  },
  {
    id: 'story_2',
    userId: 'user_9',
    userName: 'Ravi Kumar',
    village: 'Jaffna',
    district: 'Jaffna',
    category: 'Learning Journey',
    photo: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&h=300&fit=crop',
    textContent: 'Learned mobile banking through EmpowerLearn. Now helping my neighbors too!',
    status: 'approved',
    createdAt: new Date('2025-01-12'),
  },
];

export const mockDailyTips: DailyTip[] = [
  {
    id: 'tip_1',
    text: 'Save 10% of every income before spending. Small savings grow big!',
    category: 'Money',
  },
  {
    id: 'tip_2',
    text: 'Take a photo of your product in good light. Clear photos sell faster!',
    category: 'Business',
  },
  {
    id: 'tip_3',
    text: 'Practice new skills daily. 15 minutes each day = big progress!',
    category: 'Learning',
  },
  {
    id: 'tip_4',
    text: 'Ask customers for feedback. Listen and improve your service.',
    category: 'Business',
  },
  {
    id: 'tip_5',
    text: 'Share your success story. Inspire others in your community!',
    category: 'Community',
  },
];

export const mockBadges: Badge[] = [
  {
    id: 'badge_saver',
    name: 'Smart Saver',
    icon: '💰',
    description: 'Completed all saving lessons',
  },
  {
    id: 'badge_builder',
    name: 'Skill Builder',
    icon: '🔨',
    description: 'Learned 5 new skills',
  },
  {
    id: 'badge_learner',
    name: 'Quick Learner',
    icon: '⚡',
    description: 'Completed 10 stories in one week',
  },
  {
    id: 'badge_star',
    name: 'Story Star',
    icon: '⭐',
    description: 'Shared your success story',
  },
];

export const mockInvestorRequests: InvestorRequest[] = [
  {
    id: 'inv_1',
    userId: 'user_1',
    userName: 'Amara Silva',
    village: 'Moratuwa',
    district: 'Colombo',
    category: 'food',
    amount: 250000,
    purpose: 'Expand my small bakery with a new oven and delivery motorbike',
    roiDescription: 'Will pay back in 18 months with 15% profit share from increased sales',
    timeline: '18 months',
    status: 'active',
    featured: true,
    createdAt: new Date('2025-01-10'),
    bookmarkedBy: [],
    syncStatus: 'synced',
  },
  {
    id: 'inv_2',
    userId: 'user_2',
    userName: 'Kasun Perera',
    village: 'Polonnaruwa Town',
    district: 'Polonnaruwa',
    category: 'crafts',
    amount: 150000,
    purpose: 'Purchase woodworking tools and materials for furniture business',
    roiDescription: '20% return in 12 months through furniture sales',
    timeline: '12 months',
    status: 'active',
    featured: true,
    createdAt: new Date('2025-01-12'),
    bookmarkedBy: [],
    syncStatus: 'synced',
  },
  {
    id: 'inv_3',
    userId: 'user_3',
    userName: 'Tharanga Fernando',
    village: 'Galle Fort',
    district: 'Galle',
    category: 'services',
    amount: 100000,
    purpose: 'Buy smartphone and equipment for photography service',
    roiDescription: '25% profit in 8 months from event photography',
    timeline: '8 months',
    status: 'active',
    createdAt: new Date('2025-01-15'),
    bookmarkedBy: [],
    syncStatus: 'synced',
  },
];

// Initialize database with mock data
export async function initializeMockData() {
  const count = await db.storyPacks.count();
  if (count > 0) return; // Already initialized

  await db.storyPacks.bulkAdd(mockStoryPacks);
  await db.products.bulkAdd(mockProducts);
  await db.jobs.bulkAdd(mockJobs);
  await db.communityStories.bulkAdd(mockCommunityStories);
  await db.dailyTips.bulkAdd(mockDailyTips);
  await db.investorRequests.bulkAdd(mockInvestorRequests);
  
  console.log('✅ Mock data loaded');
}
