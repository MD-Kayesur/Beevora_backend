"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    images: { type: [String], default: [] },
    thumbnail: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, required: true, unique: true },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
