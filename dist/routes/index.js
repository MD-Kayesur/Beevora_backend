"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const product_route_1 = require("../modules/product/product.route");
const user_route_1 = require("../modules/user/user.route");
const order_route_1 = require("../modules/order/order.route");
const admin_route_1 = require("../modules/admin/admin.route");
const coupon_route_1 = require("../modules/coupon/coupon.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/products',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    },
    {
        path: '/coupons',
        route: coupon_route_1.CouponRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
