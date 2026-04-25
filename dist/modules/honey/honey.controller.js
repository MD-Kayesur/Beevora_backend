"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoneyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const honey_service_1 = require("./honey.service");
const createHoney = (0, catchAsync_1.default)(async (req, res) => {
    const result = await honey_service_1.HoneyService.createHoney(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Honey created successfully!',
        data: result,
    });
});
const getAllHoney = (0, catchAsync_1.default)(async (req, res) => {
    const result = await honey_service_1.HoneyService.getAllHoney(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Honey items fetched successfully!',
        meta: result.meta,
        data: result.products,
    });
});
const getHoneyById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await honey_service_1.HoneyService.getHoneyById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Honey item fetched successfully!',
        data: result,
    });
});
const updateHoney = (0, catchAsync_1.default)(async (req, res) => {
    const result = await honey_service_1.HoneyService.updateHoney(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Honey item updated successfully!',
        data: result,
    });
});
const deleteHoney = (0, catchAsync_1.default)(async (req, res) => {
    const result = await honey_service_1.HoneyService.deleteHoney(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Honey item deleted successfully!',
        data: result,
    });
});
exports.HoneyController = {
    createHoney,
    getAllHoney,
    getHoneyById,
    updateHoney,
    deleteHoney,
};
