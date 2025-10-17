// Core types for EmpowerLearn Stories

export interface Profile {
  id: string;
  name: string;
  role: string;
  village: string;
  district: string;
  bio?: string;
  skills?: string[];
  photo?: string;
  contactPrefs: {
    whatsapp?: string;
    sms?: string;
    call?: string;
  };
  lankaQR?: string;
  createdAt: Date;
}

export interface StoryPack {
  id: string;
  title: string;
  description: string;
  category: string;
  downloadSize: number; // in MB
  thumbnail: string;
  stories: Story[];
  badges: string[];
  progress: number; // 0-100
  isDownloaded: boolean;
  featured?: boolean;
}

export interface Story {
  id: string;
  packId: string;
  title: string;
  character: string;
  characterImage: string;
  scenes: StoryScene[];
  quizQuestions: QuizQuestion[];
  badge?: string;
  completed: boolean;
}

export interface StoryScene {
  id: string;
  text: string;
  audioUrl?: string;
  imageUrl?: string;
  choices?: StoryChoice[];
  outcome?: string;
  outcomeAudio?: string;
}

export interface StoryChoice {
  id: string;
  text: string;
  isCorrect?: boolean;
  feedback: string;
  feedbackAudio?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  audioUrl?: string;
  options: string[];
  correctIndex: number;
}

export interface Product {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number | "negotiable";
  category: "food" | "crafts" | "services";
  village: string;
  district: string;
  images: string[];
  audioDescription?: string;
  status: "active" | "sold" | "pending";
  createdAt: Date;
  syncStatus?: "synced" | "pending" | "error";
}

export interface Job {
  id: string;
  title: string;
  description: string;
  pay: string;
  location: string;
  district: string;
  skills: string[];
  status: "open" | "filled";
  postedBy: string;
  postedAt: Date;
  applications?: JobApplication[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  applicantName: string;
  message?: string;
  audioMessage?: string;
  appliedAt: Date;
  status: "pending" | "accepted" | "rejected";
}

export interface CommunityStory {
  id: string;
  userId: string;
  userName: string;
  village: string;
  district: string;
  category: string;
  photo?: string;
  audioUrl?: string;
  textContent?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  featured?: boolean;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  receiverId: string;
  content?: string;
  audioBlob?: Blob;
  audioUrl?: string;
  sentAt: Date;
  syncStatus: "synced" | "pending" | "error";
}

export interface MessageThread {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageAt: Date;
  unreadCount: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: Date;
}

export interface UserProgress {
  userId: string;
  totalStories: number;
  completedStories: number;
  badges: Badge[];
  currentStreak: number;
  level: number;
}

export interface DailyTip {
  id: string;
  text: string;
  audioUrl?: string;
  category: string;
}

export interface InvestorRequest {
  id: string;
  userId: string;
  userName: string;
  village: string;
  district: string;
  category: string;
  amount: number;
  purpose: string;
  roiDescription: string;
  timeline: string;
  status: "active" | "funded" | "closed";
  featured?: boolean;
  createdAt: Date;
  bookmarkedBy?: string[];
  syncStatus?: "synced" | "pending" | "error";
}

export interface Settings {
  userId: string;
  language: "en" | "si" | "ta";
  ttsEnabled: boolean;
  autoDownload: boolean;
  dataUsageLimit: number; // MB per month
}

export type SyncStatus = "synced" | "pending" | "error";

export interface OutboxItem {
  id: string;
  type: "product" | "story" | "message" | "application";
  data: any;
  createdAt: Date;
  retryCount: number;
}
