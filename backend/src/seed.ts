import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Product from './models/Product';
import Job from './models/Job';
import InvestorRequest from './models/InvestorRequest';
import CommunityStory from './models/CommunityStory';
import StoryPack from './models/StoryPack';
import Story from './models/Story';
import Badge from './models/Badge';
import UserProgress from './models/UserProgress';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Sample Users
const users = [
  {
    name: 'Nimal Perera',
    email: 'nimal@example.com',
    password: 'password123',
    village: 'Horana',
    district: 'Kalutara',
    role: 'user',
    bio: 'Small business owner learning to grow',
    skills: ['Farming', 'Sales', 'Mobile Banking'],
    contactPrefs: { whatsapp: '+94771234567' },
  },
  {
    name: 'Sunitha Silva',
    email: 'sunitha@example.com',
    password: 'password123',
    village: 'Anuradhapura',
    district: 'Anuradhapura',
    role: 'user',
    bio: 'Food stall entrepreneur',
    skills: ['Cooking', 'Business Management'],
    contactPrefs: { whatsapp: '+94771234568' },
  },
  {
    name: 'Admin User',
    email: 'admin@empowerlearn.com',
    password: 'admin123',
    village: 'Colombo',
    district: 'Colombo',
    role: 'admin',
    bio: 'Platform administrator',
    skills: ['Platform Management'],
  },
];

// Sample Products
const createProducts = (userIds: any[]) => [
  {
    userId: userIds[0],
    title: 'Fresh Organic Vegetables',
    description: 'Farm fresh vegetables including tomatoes, beans, and carrots. Pesticide-free!',
    price: 500,
    category: 'food',
    village: 'Galle',
    district: 'Galle',
    images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'],
    status: 'active',
  },
  {
    userId: userIds[1],
    title: 'Handmade Woven Baskets',
    description: 'Beautiful traditional baskets for storage. Various sizes available.',
    price: 'negotiable',
    category: 'crafts',
    village: 'Matara',
    district: 'Matara',
    images: ['https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=400'],
    status: 'active',
  },
  {
    userId: userIds[0],
    title: 'Mobile Phone Repair Service',
    description: 'Quick and affordable mobile repairs. Same-day service available.',
    price: 1500,
    category: 'services',
    village: 'Kandy',
    district: 'Kandy',
    images: ['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400'],
    status: 'active',
  },
];

// Sample Jobs
const createJobs = (userIds: any[]) => [
  {
    title: 'Farm Helper Needed',
    description: 'Need help harvesting vegetables for 3 days. Physical work required.',
    pay: 'Rs. 1,500/day',
    location: 'Kurunegala',
    district: 'Kurunegala',
    skills: ['Farming', 'Physical Work'],
    status: 'open',
    postedBy: userIds[0],
  },
  {
    title: 'Social Media Assistant',
    description: 'Help manage Facebook page for local business. Part-time.',
    pay: 'Rs. 2,000/week',
    location: 'Colombo',
    district: 'Colombo',
    skills: ['Social Media', 'Photography'],
    status: 'open',
    postedBy: userIds[1],
  },
];

// Sample Investor Requests
const createInvestorRequests = (userIds: any[]) => [
  {
    userId: userIds[0],
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
  },
  {
    userId: userIds[1],
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
  },
];

// Sample Community Stories
const createCommunityStories = (userIds: any[]) => [
  {
    userId: userIds[1],
    userName: 'Sunitha Silva',
    village: 'Anuradhapura',
    district: 'Anuradhapura',
    category: 'Success Story',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
    textContent: 'Started my food stall with just Rs. 5,000. Now serving 50+ customers daily!',
    status: 'approved',
    featured: true,
  },
  {
    userId: userIds[0],
    userName: 'Ravi Kumar',
    village: 'Jaffna',
    district: 'Jaffna',
    category: 'Learning Journey',
    photo: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400',
    textContent: 'Learned mobile banking through EmpowerLearn. Now helping my neighbors too!',
    status: 'approved',
  },
];

// Sample Story Packs
const storyPacks = [
  {
    title: 'Smart Saving Stories',
    description: 'Learn to save money wisely through real-life stories',
    category: 'Money Management',
    downloadSize: 15,
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400',
    badges: ['Smart Saver', 'Money Master'],
    featured: true,
  },
  {
    title: 'Start Your Business',
    description: 'Step-by-step guide to starting a small business',
    category: 'Entrepreneurship',
    downloadSize: 22,
    thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400',
    badges: ['Business Builder', 'Entrepreneur'],
    featured: false,
  },
];

// Sample Badges
const badges = [
  {
    name: 'Smart Saver',
    icon: '💰',
    description: 'Completed all saving lessons',
    category: 'Money',
    criteria: 'Complete 5 saving stories',
  },
  {
    name: 'Skill Builder',
    icon: '🔨',
    description: 'Learned 5 new skills',
    category: 'Learning',
    criteria: 'Complete 10 stories',
  },
  {
    name: 'Quick Learner',
    icon: '⚡',
    description: 'Completed 10 stories in one week',
    category: 'Achievement',
    criteria: 'Complete 10 stories in 7 days',
  },
  {
    name: 'Story Star',
    icon: '⭐',
    description: 'Shared your success story',
    category: 'Community',
    criteria: 'Share 1 community story',
  },
];

// Sample Stories
const createStories = (packIds: any[]) => [
  {
    packId: packIds[0],
    title: 'The Saving Jar',
    character: 'Nimal',
    characterImage: 'https://ui-avatars.com/api/?name=Nimal&background=f59e0b',
    scenes: [
      {
        id: 'scene1',
        text: 'Nimal earns Rs. 10,000 this month. Should he spend it all or save some?',
        choices: [
          {
            id: 'choice1',
            text: 'Save 10% before spending',
            isCorrect: true,
            feedback: 'Great choice! Saving first helps build wealth.',
          },
          {
            id: 'choice2',
            text: 'Spend everything now',
            isCorrect: false,
            feedback: 'Try to save something first for emergencies.',
          },
        ],
      },
    ],
    quizQuestions: [
      {
        id: 'quiz1',
        question: 'How much should Nimal save from Rs. 10,000?',
        options: ['Rs. 500', 'Rs. 1,000', 'Rs. 2,000', 'Nothing'],
        correctIndex: 1,
      },
    ],
    badge: 'Smart Saver',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Job.deleteMany({});
    await InvestorRequest.deleteMany({});
    await CommunityStory.deleteMany({});
    await StoryPack.deleteMany({});
    await Story.deleteMany({});
    await Badge.deleteMany({});
    await UserProgress.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = await User.create(users);
    const userIds = createdUsers.map((user: any) => user._id);

    // Create products
    console.log('🛍️  Creating products...');
    await Product.create(createProducts(userIds));

    // Create jobs
    console.log('💼 Creating jobs...');
    await Job.create(createJobs(userIds));

    // Create investor requests
    console.log('💰 Creating investor requests...');
    await InvestorRequest.create(createInvestorRequests(userIds));

    // Create community stories
    console.log('📖 Creating community stories...');
    await CommunityStory.create(createCommunityStories(userIds));

    // Create story packs
    console.log('📚 Creating story packs...');
    const createdPacks = await StoryPack.create(storyPacks);
    const packIds = createdPacks.map((pack: any) => pack._id);

    // Create stories
    console.log('✍️  Creating stories...');
    await Story.create(createStories(packIds));

    // Create badges
    console.log('🏅 Creating badges...');
    await Badge.create(badges);

    // Create user progress for each user
    console.log('📊 Creating user progress...');
    for (const userId of userIds) {
      await UserProgress.create({ userId });
    }

    console.log(`
    ╔════════════════════════════════════════════╗
    ║   ✅ Database Seeded Successfully!         ║
    ╠════════════════════════════════════════════╣
    ║   👥 Users: ${createdUsers.length}                              ║
    ║   🛍️  Products: 3                          ║
    ║   💼 Jobs: 2                               ║
    ║   💰 Investor Requests: 2                  ║
    ║   📖 Community Stories: 2                  ║
    ║   📚 Story Packs: ${createdPacks.length}                          ║
    ║   🏅 Badges: ${badges.length}                              ║
    ╠════════════════════════════════════════════╣
    ║   Test Accounts:                           ║
    ║   📧 nimal@example.com / password123       ║
    ║   📧 sunitha@example.com / password123     ║
    ║   📧 admin@empowerlearn.com / admin123     ║
    ╚════════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
