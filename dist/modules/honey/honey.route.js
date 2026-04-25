"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoneyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const honey_controller_1 = require("./honey.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get('/', honey_controller_1.HoneyController.getAllHoney);
router.get('/:id', honey_controller_1.HoneyController.getHoneyById);
router.post('/', (0, auth_middleware_1.default)('admin'), honey_controller_1.HoneyController.createHoney);
router.patch('/:id', (0, auth_middleware_1.default)('admin'), honey_controller_1.HoneyController.updateHoney);
router.delete('/:id', (0, auth_middleware_1.default)('admin'), honey_controller_1.HoneyController.deleteHoney);
exports.HoneyRoutes = router;
