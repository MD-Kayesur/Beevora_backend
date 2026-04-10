"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const coupon_service_1 = require("./coupon.service");
const createCoupon = async (req, res) => {
    try {
        const result = await coupon_service_1.CouponService.createCoupon(req.body);
        res.status(201).json({ success: true, message: 'Coupon created successfully', data: result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const getAllCoupons = async (req, res) => {
    try {
        const result = await coupon_service_1.CouponService.getAllCoupons();
        res.status(200).json({ success: true, message: 'Coupons fetched successfully', data: result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const validateCoupon = async (req, res) => {
    try {
        const { code } = req.params;
        const result = await coupon_service_1.CouponService.getCouponByCode(code);
        if (!result) {
            return res.status(404).json({ success: false, message: 'Invalid or expired coupon' });
        }
        res.status(200).json({ success: true, message: 'Coupon is valid', data: result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await coupon_service_1.CouponService.updateCoupon(id, req.body);
        res.status(200).json({ success: true, message: 'Coupon updated successfully', data: result });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        await coupon_service_1.CouponService.deleteCoupon(id);
        res.status(200).json({ success: true, message: 'Coupon deleted successfully', data: null });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.CouponController = {
    createCoupon,
    getAllCoupons,
    validateCoupon,
    updateCoupon,
    deleteCoupon,
};
