import { Coupon } from '../modules/coupon/coupon.model';
import logger from '../config/logger';

export const seedCoupons = async () => {
  try {
    const existingCoupon = await Coupon.findOne({ code: 'BEEVORA50' });
    
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

    await Coupon.create(defaultCoupon);
    logger.info('🎟️ Default coupon BEEVORA50 seeded successfully');
  } catch (error) {
    logger.error('❌ Error seeding coupon:', error);
  }
};
