import { Schema, model } from 'mongoose';

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  usageLimit: { type: Number, default: 0 }, // 0 for unlimited
  usageCount: { type: Number, default: 0 },
}, { timestamps: true });

export const Coupon = model('Coupon', couponSchema);
