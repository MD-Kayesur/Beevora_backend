import express from 'express';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

router.post('/', auth('admin'), ProductController.createProduct);
router.patch('/:id', auth('admin'), ProductController.updateProduct);
router.delete('/:id', auth('admin'), ProductController.deleteProduct);

export const ProductRoutes = router;
