"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
const product_model_1 = require("../product/product.model");
const createOrder = async (payload) => {
    // Check stock before creating order
    for (const item of payload.items) {
        const product = await product_model_1.Product.findById(item.product);
        if (!product || product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product: ${product?.name || 'Unknown'}`);
        }
    }
    const result = await order_model_1.Order.create(payload);
    // Update stock after order creation
    for (const item of payload.items) {
        await product_model_1.Product.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.quantity },
        });
    }
    return result;
};
const getMyOrders = async (userId) => {
    const result = await order_model_1.Order.find({ user: userId }).populate('items.product');
    return result;
};
const getAllOrders = async () => {
    const result = await order_model_1.Order.find().populate('user').populate('items.product');
    return result;
};
const updateOrderStatus = async (id, status) => {
    const result = await order_model_1.Order.findByIdAndUpdate(id, { status }, { new: true });
    return result;
};
const deleteOrder = async (id) => {
    const result = await order_model_1.Order.findByIdAndDelete(id);
    return result;
};
exports.OrderService = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
};
