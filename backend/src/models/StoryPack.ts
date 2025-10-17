import mongoose, { Document, Schema } from 'mongoose';

export interface IStoryPack extends Document {
  title: string;
  description: string;
  category: string;
  downloadSize: number; // in MB
  thumbnail: string;
  badges: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StoryPackSchema = new Schema<IStoryPack>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    downloadSize: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    badges: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes
StoryPackSchema.index({ category: 1 });
StoryPackSchema.index({ featured: -1, createdAt: -1 });

export default mongoose.model<IStoryPack>('StoryPack', StoryPackSchema);
