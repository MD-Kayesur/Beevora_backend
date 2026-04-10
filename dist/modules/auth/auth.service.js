"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../user/user.model");
const env_1 = __importDefault(require("../../config/env"));
const createToken = (payload, secret, expireIn) => {
    const options = {
        expiresIn: expireIn,
    };
    return jwt.sign(payload, secret, options);
};
const register = async (userData) => {
    // Force admin role for specific user
    if (userData.email === 'rmdkayesur@gmail.com') {
        userData.role = 'admin';
    }
    const user = await user_model_1.User.create(userData);
    const result = user.toObject();
    delete result.password;
    return result;
};
const login = async (payload) => {
    const user = await user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordMatch = await bcryptjs_1.default.compare(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid password');
    }
    const accessToken = createToken({ email: user.email, role: user.role, id: user._id }, env_1.default.jwt_secret, env_1.default.jwt_expires_in);
    const refreshToken = createToken({ email: user.email, role: user.role, id: user._id }, env_1.default.jwt_refresh_secret, env_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        },
    };
};
exports.AuthService = {
    register,
    login,
    createToken,
};
