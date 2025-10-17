import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  threadId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  content?: string;
  audioUrl?: string;
  sentAt: Date;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    threadId: { type: Schema.Types.ObjectId, ref: 'MessageThread', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    audioUrl: { type: String },
    sentAt: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes
MessageSchema.index({ threadId: 1, sentAt: -1 });
MessageSchema.index({ senderId: 1, receiverId: 1 });
MessageSchema.index({ receiverId: 1, isRead: 1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
