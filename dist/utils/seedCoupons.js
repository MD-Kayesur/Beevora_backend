"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCoupons = void 0;
const coupon_model_1 = require("../modules/coupon/coupon.model");
const logger_1 = __importDefault(require("../config/logger"));
const seedCoupons = async () => {
    try {
        const existingCoupon = await coupon_model_1.Coupon.findOne({ code: 'BEEVORA50' });
        if (existingCoupon) {
            return;
        }
        const defaultCoupon = {
            code: 'BEEVORA50',
            discountType: 'percentage',
            discountValue: 50,
            expiryDate: new Date('2026-12-31'),
            isActive: true,
            usageLimit: 0
        };
        await coupon_model_1.Coupon.create(defaultCoupon);
        logger_1.default.info('🎟️ Default coupon BEEVORA50 seeded successfully');
    }
    catch (error) {
        logger_1.default.error('❌ Error seeding coupon:', error);
    }
};
exports.seedCoupons = seedCoupons;
