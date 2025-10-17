import mongoose, { Document, Schema } from 'mongoose';

export interface ICommunityStory extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  village: string;
  district: string;
  category: string;
  photo?: string;
  audioUrl?: string;
  textContent?: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommunityStorySchema = new Schema<ICommunityStory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    village: { type: String, required: true },
    district: { type: String, required: true },
    category: { type: String, required: true },
    photo: { type: String },
    audioUrl: { type: String },
    textContent: { type: String },
    status: { 
      type: String, 
      default: 'pending', 
      enum: ['pending', 'approved', 'rejected'] 
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes
CommunityStorySchema.index({ status: 1, featured: -1, createdAt: -1 });
CommunityStorySchema.index({ userId: 1 });
CommunityStorySchema.index({ district: 1, category: 1 });

export default mongoose.model<ICommunityStory>('CommunityStory', CommunityStorySchema);
