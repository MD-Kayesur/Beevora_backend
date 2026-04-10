"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        avatar: zod_1.z.string().url().optional(),
    }),
});
exports.UserValidation = { updateUser };
