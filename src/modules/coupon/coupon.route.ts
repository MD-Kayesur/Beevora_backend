import express from 'express';
import { CouponController } from './coupon.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router.get('/', CouponController.getAllCoupons);
router.get('/validate/:code', CouponController.validateCoupon);
router.post('/', auth('admin'), CouponController.createCoupon);
router.patch('/:id', auth('admin'), CouponController.updateCoupon);
router.delete('/:id', auth('admin'), CouponController.deleteCoupon);

export const CouponRoutes = router;
