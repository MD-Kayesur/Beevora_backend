"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const honey_model_1 = require("../honey/honey.model");
const clothing_model_1 = require("../clothing/clothing.model");
const createProduct = async (payload) => {
    console.log(payload);
    const result = await product_model_1.Product.create(payload);
    console.log(result);
    return result;
};
const getAllProducts = async (query) => {
    // Basic filtering for now
    const { searchTerm, category, minPrice, maxPrice, isFeatured, sort, page = 1, limit = 10, showInactive } = query;
    const anyQuery = {};
    if (showInactive !== 'true') {
        anyQuery.isActive = true;
    }
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
    let products = [];
    let total = 0;
    if (category === 'Honey') {
        products = await honey_model_1.Honey.find(anyQuery).sort(sort || '-createdAt').skip(skip).limit(Number(limit));
        total = await honey_model_1.Honey.countDocuments(anyQuery);
    }
    else if (category === 'Clothing') {
        products = await clothing_model_1.Clothing.find(anyQuery).sort(sort || '-createdAt').skip(skip).limit(Number(limit));
        total = await clothing_model_1.Clothing.countDocuments(anyQuery);
    }
    else if (!category || category === 'All') {
        // If no specific category, provide a mix as requested (6 each if possible)
        const [honeyProducts, clothingProducts, baseProducts] = await Promise.all([
            honey_model_1.Honey.find(anyQuery).sort(sort || '-createdAt').limit(6),
            clothing_model_1.Clothing.find(anyQuery).sort(sort || '-createdAt').limit(6),
            product_model_1.Product.find(anyQuery).sort(sort || '-createdAt').limit(6)
        ]);
        products = [...honeyProducts, ...clothingProducts, ...baseProducts].slice(0, Number(limit));
        const [honeyTotal, clothingTotal, baseTotal] = await Promise.all([
            honey_model_1.Honey.countDocuments(anyQuery),
            clothing_model_1.Clothing.countDocuments(anyQuery),
            product_model_1.Product.countDocuments(anyQuery)
        ]);
        total = honeyTotal + clothingTotal + baseTotal;
    }
    else {
        products = await product_model_1.Product.find(anyQuery).sort(sort || '-createdAt').skip(skip).limit(Number(limit));
        total = await product_model_1.Product.countDocuments(anyQuery);
    }
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
    let result = await product_model_1.Product.findById(id);
    if (!result)
        result = await honey_model_1.Honey.findById(id);
    if (!result)
        result = await clothing_model_1.Clothing.findById(id);
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
