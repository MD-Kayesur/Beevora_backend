import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

// Public – anyone can read categories
router.get('/', CategoryController.getAllCategories);

// Admin only – CRUD
router.post('/', auth('admin'), CategoryController.createCategory);
router.patch('/:id', auth('admin'), CategoryController.updateCategory);
router.delete('/:id', auth('admin'), CategoryController.deleteCategory);

export const CategoryRoutes = router;
