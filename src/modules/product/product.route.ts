import express from 'express';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth.middleware';

import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.validation';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

router.post('/', auth('admin'), validateRequest(ProductValidation.createProduct), ProductController.createProduct);
router.patch('/:id', auth('admin'), ProductController.updateProduct);
router.delete('/:id', auth('admin'), ProductController.deleteProduct);

export const ProductRoutes = router;
