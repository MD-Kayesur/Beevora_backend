"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const getMyProfile = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.getMyProfile(req.user.email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User profile fetched successfully!',
        data: result,
    });
});
const updateMyProfile = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.updateMyProfile(req.user.email, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User profile updated successfully!',
        data: result,
    });
});
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users fetched successfully!',
        data: result,
    });
});
const updateUserRole = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.updateUserRole(req.params.id, req.body.role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User role updated successfully!',
        data: result,
    });
});
const deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.deleteUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted successfully!',
        data: result,
    });
});
exports.UserController = {
    getMyProfile,
    updateMyProfile,
    getAllUsers,
    updateUserRole,
    deleteUser,
};
