"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_service_1 = require("./product.service");
const logger_1 = __importDefault(require("../../config/logger"));
const createProduct = (0, catchAsync_1.default)(async (req, res) => {
    logger_1.default.info('Creating product with body:', req.body);
    const result = await product_service_1.ProductService.createProduct(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Product created successfully!',
        data: result,
    });
});
const getAllProducts = (0, catchAsync_1.default)(async (req, res) => {
    const result = await product_service_1.ProductService.getAllProducts(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Products fetched successfully!',
        meta: result.meta,
        data: result.products,
    });
});
const getProductById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await product_service_1.ProductService.getProductById(req.params.id);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'Product not found!',
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product fetched successfully!',
        data: result,
    });
});
const updateProduct = (0, catchAsync_1.default)(async (req, res) => {
    const result = await product_service_1.ProductService.updateProduct(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product updated successfully!',
        data: result,
    });
});
const deleteProduct = (0, catchAsync_1.default)(async (req, res) => {
    const result = await product_service_1.ProductService.deleteProduct(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product deleted successfully!',
        data: result,
    });
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
