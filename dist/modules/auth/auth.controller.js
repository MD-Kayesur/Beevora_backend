"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const env_1 = __importDefault(require("../../config/env"));
const register = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.register(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'User registered successfully!',
        data: result,
    });
});
const login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.login(req.body);
    const { refreshToken, accessToken } = result;
    // Set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
        secure: env_1.default.env === 'production',
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully!',
        data: {
            accessToken,
            user: result.user,
        },
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.AuthService.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Access token retrieved successfully!',
        data: result,
    });
});
exports.AuthController = {
    register,
    login,
    refreshToken,
};
