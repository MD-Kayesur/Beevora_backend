"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClothingService = void 0;
const clothing_model_1 = require("./clothing.model");
const createClothing = async (payload) => {
    const result = await clothing_model_1.Clothing.create(payload);
    return result;
};
const getAllClothing = async (query) => {
    const { searchTerm, minPrice, maxPrice, isFeatured, sort, page = 1, limit = 10 } = query;
    const anyQuery = { isActive: true };
    if (searchTerm) {
        anyQuery.$or = [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
        ];
    }
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
    const products = await clothing_model_1.Clothing.find(anyQuery)
        .sort(sort || '-createdAt')
        .skip(skip)
        .limit(Number(limit));
    const total = await clothing_model_1.Clothing.countDocuments(anyQuery);
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
const getClothingById = async (id) => {
    return await clothing_model_1.Clothing.findById(id);
};
const updateClothing = async (id, payload) => {
    return await clothing_model_1.Clothing.findByIdAndUpdate(id, payload, { new: true });
};
const deleteClothing = async (id) => {
    return await clothing_model_1.Clothing.findByIdAndDelete(id);
};
exports.ClothingService = {
    createClothing,
    getAllClothing,
    getClothingById,
    updateClothing,
    deleteClothing,
};
