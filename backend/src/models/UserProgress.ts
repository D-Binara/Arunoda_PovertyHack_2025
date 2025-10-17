import mongoose, { Document, Schema } from 'mongoose';

interface IUserBadge {
  badgeId: mongoose.Types.ObjectId;
  unlockedAt: Date;
}

interface ICompletedStory {
  storyId: mongoose.Types.ObjectId;
  completedAt: Date;
  score?: number;
}

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  totalStories: number;
  completedStories: ICompletedStory[];
  badges: IUserBadge[];
  currentStreak: number;
  lastActivityDate: Date;
  level: number;
  experiencePoints: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserBadgeSchema = new Schema({
  badgeId: { type: Schema.Types.ObjectId, ref: 'Badge', required: true },
  unlockedAt: { type: Date, default: Date.now },
}, { _id: false });

const CompletedStorySchema = new Schema({
  storyId: { type: Schema.Types.ObjectId, ref: 'Story', required: true },
  completedAt: { type: Date, default: Date.now },
  score: { type: Number },
}, { _id: false });

const UserProgressSchema = new Schema<IUserProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    totalStories: { type: Number, default: 0 },
    completedStories: [CompletedStorySchema],
    badges: [UserBadgeSchema],
    currentStreak: { type: Number, default: 0 },
    lastActivityDate: { type: Date, default: Date.now },
    level: { type: Number, default: 1 },
    experiencePoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes
UserProgressSchema.index({ userId: 1 });
UserProgressSchema.index({ level: -1, experiencePoints: -1 });

export default mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
