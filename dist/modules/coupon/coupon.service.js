"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const coupon_model_1 = require("./coupon.model");
const createCoupon = async (payload) => {
    const result = await coupon_model_1.Coupon.create(payload);
    return result;
};
const getAllCoupons = async () => {
    const result = await coupon_model_1.Coupon.find().sort('-createdAt');
    return result;
};
const getCouponByCode = async (code) => {
    const result = await coupon_model_1.Coupon.findOne({ code, isActive: true, expiryDate: { $gt: new Date() } });
    return result;
};
const updateCoupon = async (id, payload) => {
    const result = await coupon_model_1.Coupon.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const deleteCoupon = async (id) => {
    const result = await coupon_model_1.Coupon.findByIdAndDelete(id);
    return result;
};
exports.CouponService = {
    createCoupon,
    getAllCoupons,
    getCouponByCode,
    updateCoupon,
    deleteCoupon,
};
