"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRoutes = void 0;
const express_1 = __importDefault(require("express"));
const coupon_controller_1 = require("./coupon.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get('/', coupon_controller_1.CouponController.getAllCoupons);
router.get('/validate/:code', coupon_controller_1.CouponController.validateCoupon);
router.post('/', (0, auth_middleware_1.default)('admin'), coupon_controller_1.CouponController.createCoupon);
router.patch('/:id', (0, auth_middleware_1.default)('admin'), coupon_controller_1.CouponController.updateCoupon);
router.delete('/:id', (0, auth_middleware_1.default)('admin'), coupon_controller_1.CouponController.deleteCoupon);
exports.CouponRoutes = router;
