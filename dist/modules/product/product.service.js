"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const createProduct = async (payload) => {
    const result = await product_model_1.Product.create(payload);
    return result;
};
const getAllProducts = async (query) => {
    // Basic filtering for now
    const { searchTerm, category, minPrice, maxPrice, isFeatured, sort, page = 1, limit = 10 } = query;
    const anyQuery = { isActive: true };
    if (searchTerm) {
        anyQuery.$or = [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
        ];
    }
    if (category)
        anyQuery.category = category;
    if (isFeatured)
        anyQuery.isFeatured = isFeatured === 'true';
    if (minPrice || maxPrice) {
        anyQuery.price = {};
        if (minPrice)
            anyQuery.price.$gte = Number(minPrice);
        if (maxPrice)
            anyQuery.price.$lte = Number(maxPrice);
    }
    const skip = (Number(page) - 1) * Number(limit);
    const products = await product_model_1.Product.find(anyQuery)
        .sort(sort || '-createdAt')
        .skip(skip)
        .limit(Number(limit));
    const total = await product_model_1.Product.countDocuments(anyQuery);
    const totalPages = Math.ceil(total / Number(limit));
    return {
        products,
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages,
        },
    };
};
const getProductById = async (id) => {
    const result = await product_model_1.Product.findById(id);
    return result;
};
const updateProduct = async (id, payload) => {
    const result = await product_model_1.Product.findByIdAndUpdate(id, payload, { new: true });
    return result;
};
const deleteProduct = async (id) => {
    const result = await product_model_1.Product.findByIdAndDelete(id);
    return result;
};
exports.ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
