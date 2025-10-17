import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  pay: string;
  location: string;
  district: string;
  skills: string[];
  status: 'open' | 'filled';
  postedBy: mongoose.Types.ObjectId;
  postedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    pay: { type: String, required: true },
    location: { type: String, required: true },
    district: { type: String, required: true },
    skills: [{ type: String }],
    status: { 
      type: String, 
      default: 'open', 
      enum: ['open', 'filled'] 
    },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Indexes
JobSchema.index({ status: 1, district: 1 });
JobSchema.index({ postedBy: 1, status: 1 });
JobSchema.index({ createdAt: -1 });

export default mongoose.model<IJob>('Job', JobSchema);
