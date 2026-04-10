"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get('/dashboard-stats', (0, auth_middleware_1.default)('admin'), admin_controller_1.AdminController.getDashboardStats);
exports.AdminRoutes = router;
