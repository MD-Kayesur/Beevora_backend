"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoneyService = void 0;
const honey_model_1 = require("./honey.model");
const createHoney = async (payload) => {
    return await honey_model_1.Honey.create(payload);
};
const getAllHoney = async (query) => {
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
    const products = await honey_model_1.Honey.find(anyQuery)
        .sort(sort || '-createdAt')
        .skip(skip)
        .limit(Number(limit));
    const total = await honey_model_1.Honey.countDocuments(anyQuery);
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
const getHoneyById = async (id) => {
    return await honey_model_1.Honey.findById(id);
};
const updateHoney = async (id, payload) => {
    return await honey_model_1.Honey.findByIdAndUpdate(id, payload, { new: true });
};
const deleteHoney = async (id) => {
    return await honey_model_1.Honey.findByIdAndDelete(id);
};
exports.HoneyService = {
    createHoney,
    getAllHoney,
    getHoneyById,
    updateHoney,
    deleteHoney,
};
