"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const createProduct = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name is required'),
        description: zod_1.z.string().min(10, 'Description too short'),
        price: zod_1.z.number().positive('Price must be positive'),
        category: zod_1.z.string().min(2),
        brand: zod_1.z.string().min(2),
        thumbnail: zod_1.z.string().url('Invalid thumbnail URL'),
        stock: zod_1.z.number().int().min(0),
        sku: zod_1.z.string().min(3),
    }),
});
exports.ProductValidation = { createProduct };
