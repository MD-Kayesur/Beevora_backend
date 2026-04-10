"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get('/me', (0, auth_middleware_1.default)('user', 'admin'), user_controller_1.UserController.getMyProfile);
router.patch('/me', (0, auth_middleware_1.default)('user', 'admin'), user_controller_1.UserController.updateMyProfile);
// Admin only routes
router.get('/', (0, auth_middleware_1.default)('admin'), user_controller_1.UserController.getAllUsers);
router.patch('/:id/role', (0, auth_middleware_1.default)('admin'), user_controller_1.UserController.updateUserRole);
router.delete('/:id', (0, auth_middleware_1.default)('admin'), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
