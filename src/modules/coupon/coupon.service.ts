import { ICoupon } from './coupon.interface';
import { Coupon } from './coupon.model';

const createCoupon = async (payload: ICoupon) => {
  const result = await Coupon.create(payload);
  return result;
};

const getAllCoupons = async () => {
  const result = await Coupon.find().sort('-createdAt');
  return result;
};

const getCouponByCode = async (code: string) => {
  const result = await Coupon.findOne({ code, isActive: true, expiryDate: { $gt: new Date() } });
  return result;
};

const updateCoupon = async (id: string, payload: Partial<ICoupon>) => {
  const result = await Coupon.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCoupon = async (id: string) => {
  const result = await Coupon.findByIdAndDelete(id);
  return result;
};

export const CouponService = {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
};
