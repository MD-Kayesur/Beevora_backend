"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClothingController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const clothing_service_1 = require("./clothing.service");
const createClothing = (0, catchAsync_1.default)(async (req, res) => {
    const result = await clothing_service_1.ClothingService.createClothing(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Clothing created successfully!',
        data: result,
    });
});
const getAllClothing = (0, catchAsync_1.default)(async (req, res) => {
    const result = await clothing_service_1.ClothingService.getAllClothing(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Clothing items fetched successfully!',
        meta: result.meta,
        data: result.products,
    });
});
const getClothingById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await clothing_service_1.ClothingService.getClothingById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Clothing item fetched successfully!',
        data: result,
    });
});
const updateClothing = (0, catchAsync_1.default)(async (req, res) => {
    const result = await clothing_service_1.ClothingService.updateClothing(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Clothing item updated successfully!',
        data: result,
    });
});
const deleteClothing = (0, catchAsync_1.default)(async (req, res) => {
    const result = await clothing_service_1.ClothingService.deleteClothing(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Clothing item deleted successfully!',
        data: result,
    });
});
exports.ClothingController = {
    createClothing,
    getAllClothing,
    getClothingById,
    updateClothing,
    deleteClothing,
};
