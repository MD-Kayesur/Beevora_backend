import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (this: any) {
  if (this.isModified('password') && this.password) {
    const bcrypt = require('bcryptjs');
    const config = require('../../config/env').default;
    this.password = await bcrypt.hash(this.password, config.bcrypt_salt_rounds);
  }
});

export const User = model<IUser>('User', userSchema);
