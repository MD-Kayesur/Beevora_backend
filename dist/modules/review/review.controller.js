"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const review_service_1 = require("./review.service");
const createReview = (0, catchAsync_1.default)(async (req, res) => {
    const { productId, rating, comment, images } = req.body;
    const result = await review_service_1.ReviewService.createReview(req.user.id, productId, {
        rating: Number(rating),
        comment,
        images,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Review submitted successfully!',
        data: result,
    });
});
const getProductReviews = (0, catchAsync_1.default)(async (req, res) => {
    const result = await review_service_1.ReviewService.getProductReviews(req.params.productId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product reviews fetched successfully!',
        data: result,
    });
});
exports.ReviewController = {
    createReview,
    getProductReviews,
};
