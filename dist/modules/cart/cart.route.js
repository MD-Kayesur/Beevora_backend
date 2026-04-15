"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_middleware_1.default)('user', 'admin'), cart_controller_1.CartController.getCart);
router.post('/add', (0, auth_middleware_1.default)('user', 'admin'), cart_controller_1.CartController.addToCart);
router.patch('/:itemId', (0, auth_middleware_1.default)('user', 'admin'), cart_controller_1.CartController.updateCartItem);
router.delete('/:itemId', (0, auth_middleware_1.default)('user', 'admin'), cart_controller_1.CartController.removeFromCart);
router.delete('/', (0, auth_middleware_1.default)('user', 'admin'), cart_controller_1.CartController.clearCart);
exports.CartRoutes = router;
