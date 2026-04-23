import express from 'express';
import { ClothingController } from './clothing.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router.get('/', ClothingController.getAllClothing);
router.get('/:id', ClothingController.getClothingById);

router.post('/', auth('admin'), ClothingController.createClothing);
router.patch('/:id', auth('admin'), ClothingController.updateClothing);
router.delete('/:id', auth('admin'), ClothingController.deleteClothing);

export const ClothingRoutes = router;
