"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
    avatar: { type: String },
}, {
    timestamps: true,
});
userSchema.pre('save', async function () {
    if (this.isModified('password') && this.password) {
        const bcrypt = require('bcryptjs');
        const config = require('../../config/env').default;
        this.password = await bcrypt.hash(this.password, config.bcrypt_salt_rounds);
    }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
