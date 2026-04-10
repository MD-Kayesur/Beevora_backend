"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const mongoose_1 = require("mongoose");
const couponSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    usageLimit: { type: Number, default: 0 }, // 0 for unlimited
    usageCount: { type: Number, default: 0 },
}, { timestamps: true });
exports.Coupon = (0, mongoose_1.model)('Coupon', couponSchema);
