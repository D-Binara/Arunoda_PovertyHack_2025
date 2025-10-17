import mongoose, { Document, Schema } from 'mongoose';

export interface IJobApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  applicantId: mongoose.Types.ObjectId;
  applicantName: string;
  message?: string;
  audioMessage?: string;
  appliedAt: Date;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    applicantId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    applicantName: { type: String, required: true },
    message: { type: String },
    audioMessage: { type: String },
    appliedAt: { type: Date, default: Date.now },
    status: { 
      type: String, 
      default: 'pending', 
      enum: ['pending', 'accepted', 'rejected'] 
    },
  },
  { timestamps: true }
);

// Indexes
JobApplicationSchema.index({ jobId: 1, status: 1 });
JobApplicationSchema.index({ applicantId: 1 });
JobApplicationSchema.index({ appliedAt: -1 });

// Ensure one application per user per job
JobApplicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

export default mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
