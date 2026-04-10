"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get('/', product_controller_1.ProductController.getAllProducts);
router.get('/:id', product_controller_1.ProductController.getProductById);
router.post('/', (0, auth_middleware_1.default)('admin'), product_controller_1.ProductController.createProduct);
router.patch('/:id', (0, auth_middleware_1.default)('admin'), product_controller_1.ProductController.updateProduct);
router.delete('/:id', (0, auth_middleware_1.default)('admin'), product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
