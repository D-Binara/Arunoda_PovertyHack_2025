// IndexedDB via Dexie for offline-first storage
import Dexie, { Table } from 'dexie';
import type {
  Profile,
  StoryPack,
  Story,
  Product,
  Job,
  CommunityStory,
  Message,
  MessageThread,
  UserProgress,
  Settings,
  OutboxItem,
  DailyTip,
  InvestorRequest,
} from './types';

export class EmpowerLearnDB extends Dexie {
  profiles!: Table<Profile, string>;
  storyPacks!: Table<StoryPack, string>;
  stories!: Table<Story, string>;
  products!: Table<Product, string>;
  jobs!: Table<Job, string>;
  communityStories!: Table<CommunityStory, string>;
  messages!: Table<Message, string>;
  messageThreads!: Table<MessageThread, string>;
  userProgress!: Table<UserProgress, string>;
  settings!: Table<Settings, string>;
  outbox!: Table<OutboxItem, string>;
  dailyTips!: Table<DailyTip, string>;
  investorRequests!: Table<InvestorRequest, string>;

  constructor() {
    super('EmpowerLearnDB');
    
    this.version(1).stores({
      profiles: 'id, name, district, village',
      storyPacks: 'id, category, featured, isDownloaded',
      stories: 'id, packId, completed',
      products: 'id, userId, category, district, status, syncStatus',
      jobs: 'id, district, status',
      communityStories: 'id, userId, district, status, featured',
      messages: 'id, threadId, senderId, receiverId, syncStatus',
      messageThreads: 'id, lastMessageAt',
      userProgress: 'userId',
      settings: 'userId',
      outbox: 'id, type, createdAt',
      dailyTips: 'id, category',
      investorRequests: 'id, userId, district, category, status, featured, syncStatus',
    });
  }
}

export const db = new EmpowerLearnDB();

// Helper functions
export async function getCurrentProfile(): Promise<Profile | undefined> {
  const profiles = await db.profiles.toArray();
  return profiles[0]; // For demo, return first profile
}

export async function getOrCreateSettings(userId: string): Promise<Settings> {
  let settings = await db.settings.get(userId);
  if (!settings) {
    settings = {
      userId,
      language: 'en',
      ttsEnabled: true,
      autoDownload: false,
      dataUsageLimit: 500, // 500 MB default
    };
    await db.settings.add(settings);
  }
  return settings;
}

export async function addToOutbox(type: OutboxItem['type'], data: any) {
  const item: OutboxItem = {
    id: `outbox_${Date.now()}_${Math.random()}`,
    type,
    data,
    createdAt: new Date(),
    retryCount: 0,
  };
  await db.outbox.add(item);
  return item;
}

export async function getOutboxItems(): Promise<OutboxItem[]> {
  return db.outbox.orderBy('createdAt').toArray();
}

export async function removeOutboxItem(id: string) {
  await db.outbox.delete(id);
}

// Sync helper (would connect to backend in production)
export async function syncOutbox() {
  const items = await getOutboxItems();
  console.log('Syncing outbox:', items.length, 'items');
  
  // In production, this would POST to backend API
  // For demo, just clear after delay
  for (const item of items) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    await removeOutboxItem(item.id);
    console.log('Synced:', item.type, item.id);
  }
}
