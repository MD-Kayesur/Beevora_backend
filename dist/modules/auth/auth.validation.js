"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const register = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name is required'),
        email: zod_1.z.string().email('Invalid email'),
        password: zod_1.z.string().min(6, 'Password should be at least 6 chars'),
    }),
});
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email'),
        password: zod_1.z.string().min(1, 'Password is required'),
    }),
});
exports.AuthValidation = {
    register,
    login,
};
