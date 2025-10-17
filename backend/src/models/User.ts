import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  village: string;
  district: string;
  bio?: string;
  skills?: string[];
  photo?: string;
  contactPrefs: {
    whatsapp?: string;
    sms?: string;
    call?: string;
  };
  lankaQR?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, trim: true },
    role: { type: String, default: 'user', enum: ['user', 'admin', 'moderator', 'entrepreneur'] },
    village: { type: String, required: true },
    district: { type: String, required: true },
    bio: { type: String, maxlength: 500 },
    skills: [{ type: String }],
    photo: { type: String },
    contactPrefs: {
      whatsapp: String,
      sms: String,
      call: String,
    },
    lankaQR: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ district: 1, village: 1 });
UserSchema.index({ role: 1, isActive: 1, district: 1 });
UserSchema.index({ name: 'text', bio: 'text', village: 'text', district: 'text', skills: 'text' });

export default mongoose.model<IUser>('User', UserSchema);
