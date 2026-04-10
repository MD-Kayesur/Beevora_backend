"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrder = zod_1.z.object({
    body: zod_1.z.object({
        items: zod_1.z.array(zod_1.z.object({
            product: zod_1.z.string(),
            quantity: zod_1.z.number().int().positive(),
            price: zod_1.z.number().positive(),
        })),
        totalAmount: zod_1.z.number().positive(),
        shippingAddress: zod_1.z.string().min(5),
    }),
});
exports.OrderValidation = { createOrder };
