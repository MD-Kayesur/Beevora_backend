"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const order_model_1 = require("../order/order.model");
const product_model_1 = require("../product/product.model");
const user_model_1 = require("../user/user.model");
const honey_model_1 = require("../honey/honey.model");
const clothing_model_1 = require("../clothing/clothing.model");
const getDashboardStats = async () => {
    const totalRevenue = await order_model_1.Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalOrders = await order_model_1.Order.countDocuments();
    const totalProducts = await product_model_1.Product.countDocuments();
    const totalCustomers = await user_model_1.User.countDocuments({ role: 'user' });
    const recentOrders = await order_model_1.Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name email');
    // Sales trend (last 7 days)
    const salesTrend = await order_model_1.Order.aggregate([
        {
            $match: {
                status: { $ne: 'cancelled' },
                createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 60)) }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                revenue: { $sum: "$totalAmount" },
                orders: { $sum: 1 }
            }
        },
        { $sort: { "_id": 1 } }
    ]);
    // Category distribution
    const categoryStats = await order_model_1.Order.aggregate([
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.productModel",
                value: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
            }
        },
        {
            $project: {
                name: "$_id",
                value: 1,
                _id: 0
            }
        }
    ]);
    // Top products
    const topProducts = await order_model_1.Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.product",
                name: { $first: "$items.productModel" }, // Temporary, will populate later
                sales: { $sum: "$items.quantity" },
                revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
            }
        },
        { $sort: { revenue: -1 } },
        { $limit: 5 }
    ]);
    // Try to populate names for top products
    const populatedTopProducts = await Promise.all(topProducts.map(async (p) => {
        const Model = p.name === 'Honey' ? honey_model_1.Honey : clothing_model_1.Clothing;
        const product = await Model.findById(p._id).select('name');
        return {
            ...p,
            name: product?.name || 'Unknown Product'
        };
    }));
    return {
        revenue: totalRevenue[0]?.total || 0,
        orders: totalOrders,
        products: totalProducts,
        customers: totalCustomers,
        recentOrders,
        salesTrend,
        categoryStats,
        topProducts: populatedTopProducts
    };
};
exports.AdminService = {
    getDashboardStats,
};
