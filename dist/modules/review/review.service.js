"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const mongoose_1 = require("mongoose");
const review_model_1 = require("./review.model");
const honey_model_1 = require("../honey/honey.model");
const clothing_model_1 = require("../clothing/clothing.model");
const product_model_1 = require("../product/product.model");
const order_model_1 = require("../order/order.model");
const createReview = async (userId, productId, payload) => {
    // 1. Identify which collection this product belongs to
    let productModel = null;
    let product = await honey_model_1.Honey.findById(productId);
    if (product) {
        productModel = 'Honey';
    }
    else {
        product = await clothing_model_1.Clothing.findById(productId);
        if (product) {
            productModel = 'Clothing';
        }
        else {
            product = await product_model_1.Product.findById(productId);
            if (product) {
                productModel = 'Product';
            }
        }
    }
    if (!product || !productModel) {
        throw new Error('Product not found');
    }
    // 2. Check if the user has already reviewed this product
    const existingReview = await review_model_1.Review.findOne({ user: userId, product: productId });
    if (existingReview) {
        throw new Error('You have already reviewed this product');
    }
    // 3. Verify if user bought the product (Verified Purchase)
    // Check for any delivered order by this user containing this product
    const orders = await order_model_1.Order.find({
        user: userId,
        status: 'delivered',
        'items.product': productId,
    });
    const isVerified = orders.length > 0;
    // 4. Create the review
    const review = await review_model_1.Review.create({
        user: userId,
        product: productId,
        productModel,
        rating: payload.rating,
        comment: payload.comment,
        images: payload.images || [],
        isVerified,
    });
    // 5. Aggregate and recalculate the average rating and reviewCount for this product
    const stats = await review_model_1.Review.aggregate([
        { $match: { product: new mongoose_1.Types.ObjectId(productId) } },
        {
            $group: {
                _id: '$product',
                avgRating: { $avg: '$rating' },
                count: { $sum: 1 },
            },
        },
    ]);
    if (stats.length > 0) {
        const avgRating = Number(stats[0].avgRating.toFixed(1));
        const count = stats[0].count;
        const Model = productModel === 'Honey' ? honey_model_1.Honey : productModel === 'Clothing' ? clothing_model_1.Clothing : product_model_1.Product;
        await Model.findByIdAndUpdate(productId, {
            rating: avgRating,
            reviewCount: count,
        });
    }
    return review;
};
const getProductReviews = async (productId) => {
    const reviews = await review_model_1.Review.find({ product: productId })
        .populate('user', 'name email')
        .sort({ createdAt: -1 });
    return reviews;
};
exports.ReviewService = {
    createReview,
    getProductReviews,
};
