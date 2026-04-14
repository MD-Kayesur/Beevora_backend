"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...requiredRoles) => (0, catchAsync_1.default)(async (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }
    if (!token) {
        throw new Error('You are not authorized');
    }
    const decodedUser = jsonwebtoken_1.default.verify(token, env_1.default.jwt_secret);
    if (requiredRoles.length > 0 && !requiredRoles.includes(decodedUser.role)) {
        throw new Error('You do not have permission');
    }
    req.user = decodedUser;
    next();
});
exports.default = auth;
