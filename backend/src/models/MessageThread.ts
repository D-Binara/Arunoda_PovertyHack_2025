import mongoose, { Document, Schema } from 'mongoose';

export interface IMessageThread extends Document {
  participants: mongoose.Types.ObjectId[];
  lastMessage?: string;
  lastMessageAt: Date;
  unreadCount: Map<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

const MessageThreadSchema = new Schema<IMessageThread>(
  {
    participants: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }],
    lastMessage: { type: String },
    lastMessageAt: { type: Date, default: Date.now },
    unreadCount: {
      type: Map,
      of: Number,
      default: new Map(),
    },
  },
  { timestamps: true }
);

// Indexes
MessageThreadSchema.index({ participants: 1 });
MessageThreadSchema.index({ lastMessageAt: -1 });

// Ensure unique thread between two participants
MessageThreadSchema.index({ participants: 1 }, { unique: true });

export default mongoose.model<IMessageThread>('MessageThread', MessageThreadSchema);
