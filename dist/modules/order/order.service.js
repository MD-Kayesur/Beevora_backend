"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
const product_model_1 = require("../product/product.model");
const honey_model_1 = require("../honey/honey.model");
const clothing_model_1 = require("../clothing/clothing.model");
const spreadsheet_service_1 = require("./spreadsheet.service");
const createOrder = async (payload) => {
    // Check stock before creating order
    for (const item of payload.items) {
        const Model = item.productModel === 'Honey' ? honey_model_1.Honey : item.productModel === 'Clothing' ? clothing_model_1.Clothing : product_model_1.Product;
        const product = await Model.findById(item.product);
        if (!product) {
            throw new Error(`Product not found with ID: ${item.product} in collection ${item.productModel}.`);
        }
        if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for product: ${product.name}`);
        }
    }
    const result = await order_model_1.Order.create(payload);
    // Update stock after order creation
    for (const item of payload.items) {
        const Model = item.productModel === 'Honey' ? honey_model_1.Honey : item.productModel === 'Clothing' ? clothing_model_1.Clothing : product_model_1.Product;
        await Model.findByIdAndUpdate(item.product, {
            $inc: { stock: -item.quantity },
        });
    }
    // Save to Google Sheets (Async)
    result.populate('items.product').then((populatedOrder) => {
        spreadsheet_service_1.SpreadsheetService.saveToSheet(populatedOrder);
    });
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
