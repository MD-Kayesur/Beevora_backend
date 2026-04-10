"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const order_model_1 = require("../order/order.model");
const product_model_1 = require("../product/product.model");
const user_model_1 = require("../user/user.model");
const getDashboardStats = async () => {
    const totalRevenue = await order_model_1.Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalOrders = await order_model_1.Order.countDocuments();
    const totalProducts = await product_model_1.Product.countDocuments();
    const totalCustomers = await user_model_1.User.countDocuments({ role: 'user' });
    const recentOrders = await order_model_1.Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name email');
    return {
        revenue: totalRevenue[0]?.total || 0,
        orders: totalOrders,
        products: totalProducts,
        customers: totalCustomers,
        recentOrders,
    };
};
exports.AdminService = {
    getDashboardStats,
};
