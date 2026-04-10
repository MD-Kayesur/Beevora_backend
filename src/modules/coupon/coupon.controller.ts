import { Request, Response } from 'express';
import { CouponService } from './coupon.service';

const createCoupon = async (req: Request, res: Response) => {
  try {
    const result = await CouponService.createCoupon(req.body);
    res.status(201).json({ success: true, message: 'Coupon created successfully', data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const result = await CouponService.getAllCoupons();
    res.status(200).json({ success: true, message: 'Coupons fetched successfully', data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const validateCoupon = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const result = await CouponService.getCouponByCode(code as string);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Invalid or expired coupon' });
    }
    res.status(200).json({ success: true, message: 'Coupon is valid', data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateCoupon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CouponService.updateCoupon(id as string, req.body);
    res.status(200).json({ success: true, message: 'Coupon updated successfully', data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await CouponService.deleteCoupon(id as string);
    res.status(200).json({ success: true, message: 'Coupon deleted successfully', data: null });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const CouponController = {
  createCoupon,
  getAllCoupons,
  validateCoupon,
  updateCoupon,
  deleteCoupon,
};
