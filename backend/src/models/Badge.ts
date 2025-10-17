import mongoose, { Document, Schema } from 'mongoose';

export interface IBadge extends Document {
  name: string;
  icon: string;
  description: string;
  category: string;
  criteria: string;
  createdAt: Date;
  updatedAt: Date;
}

const BadgeSchema = new Schema<IBadge>(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    criteria: { type: String, required: true },
  },
  { timestamps: true }
);

// Indexes
BadgeSchema.index({ category: 1 });

export default mongoose.model<IBadge>('Badge', BadgeSchema);
