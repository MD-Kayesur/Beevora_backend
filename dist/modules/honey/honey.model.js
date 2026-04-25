"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Honey = void 0;
const mongoose_1 = require("mongoose");
const honeySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true, default: 'Honey' },
    brand: { type: String, required: true },
    images: [{ type: String, required: true }],
    thumbnail: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    mgo: { type: String },
    origin: { type: String },
    volume: { type: String },
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
exports.Honey = (0, mongoose_1.model)('Honey', honeySchema);
