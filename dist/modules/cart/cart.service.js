"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const product_model_1 = require("../product/product.model");
const cart_model_1 = require("./cart.model");
const getCart = async (userId) => {
    let cart = await cart_model_1.Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
        cart = await cart_model_1.Cart.create({ user: userId, items: [] });
    }
    return cart;
};
const addToCart = async (userId, productId, quantity) => {
    const product = await product_model_1.Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    let cart = await cart_model_1.Cart.findOne({ user: userId });
    if (!cart) {
        cart = await cart_model_1.Cart.create({ user: userId, items: [] });
    }
    const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
    }
    else {
        cart.items.push({ product: productId, quantity });
    }
    // Recalculate totals (simplified for now)
    await cart.populate('items.product');
    let subtotal = 0;
    cart.items.forEach((item) => {
        subtotal += item.product.price * item.quantity;
    });
    cart.subtotal = subtotal;
    cart.total = subtotal - cart.discount;
    await cart.save();
    return cart;
};
const updateCartItem = async (userId, itemId, quantity) => {
    const cart = await cart_model_1.Cart.findOne({ user: userId });
    if (!cart)
        throw new Error('Cart not found');
    const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
    if (itemIndex === -1)
        throw new Error('Item not found in cart');
    cart.items[itemIndex].quantity = quantity;
    await cart.populate('items.product');
    let subtotal = 0;
    cart.items.forEach((item) => {
        subtotal += item.product.price * item.quantity;
    });
    cart.subtotal = subtotal;
    cart.total = subtotal - cart.discount;
    await cart.save();
    return cart;
};
const removeFromCart = async (userId, itemId) => {
    const cart = await cart_model_1.Cart.findOne({ user: userId });
    if (!cart)
        throw new Error('Cart not found');
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.populate('items.product');
    let subtotal = 0;
    cart.items.forEach((item) => {
        subtotal += item.product.price * item.quantity;
    });
    cart.subtotal = subtotal;
    cart.total = subtotal - cart.discount;
    await cart.save();
    return cart;
};
const clearCart = async (userId) => {
    const cart = await cart_model_1.Cart.findOne({ user: userId });
    if (!cart)
        throw new Error('Cart not found');
    cart.items = [];
    cart.subtotal = 0;
    cart.discount = 0;
    cart.total = 0;
    await cart.save();
    return cart;
};
const applyCoupon = async (userId, code) => {
    const cart = await cart_model_1.Cart.findOne({ user: userId });
    if (!cart)
        throw new Error('Cart not found');
    const Coupon = require('../coupon/coupon.model').Coupon;
    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon)
        throw new Error('Invalid or inactive coupon');
    if (coupon.expiryDate < new Date())
        throw new Error('Coupon expired');
    if (coupon.usageLimit > 0 && coupon.usageCount >= coupon.usageLimit) {
        throw new Error('Coupon usage limit reached');
    }
    let discount = 0;
    if (coupon.discountType === 'percentage') {
        discount = (cart.subtotal * coupon.discountValue) / 100;
    }
    else {
        discount = coupon.discountValue;
    }
    cart.discount = discount;
    cart.total = cart.subtotal - discount;
    // Store applied coupon code (optional, but good for UI)
    cart.coupon = code;
    await cart.save();
    return cart;
};
exports.CartService = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    applyCoupon,
    clearCart,
};
