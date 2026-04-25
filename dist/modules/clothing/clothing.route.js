"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClothingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const clothing_controller_1 = require("./clothing.controller");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get('/', clothing_controller_1.ClothingController.getAllClothing);
router.get('/:id', clothing_controller_1.ClothingController.getClothingById);
router.post('/', (0, auth_middleware_1.default)('admin'), clothing_controller_1.ClothingController.createClothing);
router.patch('/:id', (0, auth_middleware_1.default)('admin'), clothing_controller_1.ClothingController.updateClothing);
router.delete('/:id', (0, auth_middleware_1.default)('admin'), clothing_controller_1.ClothingController.deleteClothing);
exports.ClothingRoutes = router;
