import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number | 'negotiable';
  category: 'food' | 'crafts' | 'services';
  village: string;
  district: string;
  images: string[];
  audioDescription?: string;
  status: 'active' | 'sold' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Schema.Types.Mixed, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['food', 'crafts', 'services'] 
    },
    village: { type: String, required: true },
    district: { type: String, required: true },
    images: [{ type: String }],
    audioDescription: String,
    status: { 
      type: String, 
      default: 'active', 
      enum: ['active', 'sold', 'pending'] 
    },
  },
  { timestamps: true }
);

// Indexes for efficient queries
ProductSchema.index({ userId: 1, status: 1 });
ProductSchema.index({ category: 1, district: 1 });
ProductSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
