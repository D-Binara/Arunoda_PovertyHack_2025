import mongoose, { Document, Schema } from 'mongoose';

export interface IInvestorRequest extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  village: string;
  district: string;
  category: 'food' | 'crafts' | 'services';
  amount: number;
  purpose: string;
  roiDescription: string;
  timeline: string;
  status: 'active' | 'funded' | 'closed';
  featured: boolean;
  bookmarkedBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const InvestorRequestSchema = new Schema<IInvestorRequest>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    village: { type: String, required: true },
    district: { type: String, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['food', 'crafts', 'services'] 
    },
    amount: { type: Number, required: true, min: 0 },
    purpose: { type: String, required: true },
    roiDescription: { type: String, required: true },
    timeline: { type: String, required: true },
    status: { 
      type: String, 
      default: 'active', 
      enum: ['active', 'funded', 'closed'] 
    },
    featured: { type: Boolean, default: false },
    bookmarkedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

// Indexes
InvestorRequestSchema.index({ status: 1, featured: -1, createdAt: -1 });
InvestorRequestSchema.index({ userId: 1, status: 1 });
InvestorRequestSchema.index({ district: 1, category: 1 });

export default mongoose.model<IInvestorRequest>('InvestorRequest', InvestorRequestSchema);
