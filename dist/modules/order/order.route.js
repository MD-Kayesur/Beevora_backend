"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.post('/', (0, auth_middleware_1.default)('user', 'admin'), order_controller_1.OrderController.createOrder);
router.get('/my', (0, auth_middleware_1.default)('user', 'admin'), order_controller_1.OrderController.getMyOrders);
// Admin only routes
router.get('/', (0, auth_middleware_1.default)('admin'), order_controller_1.OrderController.getAllOrders);
router.patch('/:id/status', (0, auth_middleware_1.default)('admin'), order_controller_1.OrderController.updateOrderStatus);
router.delete('/:id', (0, auth_middleware_1.default)('admin'), order_controller_1.OrderController.deleteOrder);
exports.OrderRoutes = router;
