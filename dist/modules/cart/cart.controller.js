"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const cart_service_1 = require("./cart.service");
const getCart = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const result = await cart_service_1.CartService.getCart(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cart fetched successfully',
        data: result,
    });
});
const addToCart = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const result = await cart_service_1.CartService.addToCart(userId, productId, quantity);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Item added to cart successfully',
        data: result,
    });
});
const updateCartItem = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity } = req.body;
    const result = await cart_service_1.CartService.updateCartItem(userId, itemId, quantity);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cart item updated successfully',
        data: result,
    });
});
const removeFromCart = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const { itemId } = req.params;
    const result = await cart_service_1.CartService.removeFromCart(userId, itemId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Item removed from cart successfully',
        data: result,
    });
});
const applyCoupon = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const { code } = req.body;
    const result = await cart_service_1.CartService.applyCoupon(userId, code);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Coupon applied successfully',
        data: result,
    });
});
const clearCart = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.user.id;
    const result = await cart_service_1.CartService.clearCart(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cart cleared successfully',
        data: result,
    });
});
exports.CartController = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    applyCoupon,
    clearCart,
};
