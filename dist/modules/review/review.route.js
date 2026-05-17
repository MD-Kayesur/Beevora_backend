"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post('/', (0, auth_middleware_1.default)('user', 'admin'), review_controller_1.ReviewController.createReview);
router.get('/:productId', review_controller_1.ReviewController.getProductReviews);
exports.ReviewRoutes = router;
