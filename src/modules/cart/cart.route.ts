import express from 'express';
import auth from '../../middlewares/auth.middleware';
import { CartController } from './cart.controller';

const router = express.Router();

router.get('/', auth('user', 'admin'), CartController.getCart);
router.post('/add', auth('user', 'admin'), CartController.addToCart);
router.patch('/:itemId', auth('user', 'admin'), CartController.updateCartItem);
router.delete('/:itemId', auth('user', 'admin'), CartController.removeFromCart);
router.delete('/', auth('user', 'admin'), CartController.clearCart);

export const CartRoutes = router;
