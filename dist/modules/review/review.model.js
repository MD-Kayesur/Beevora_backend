"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        refPath: 'productModel',
    },
    productModel: {
        type: String,
        required: true,
        enum: ['Honey', 'Clothing', 'Product'],
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        default: [],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.__v;
            return ret;
        },
    },
});
// Limit one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
