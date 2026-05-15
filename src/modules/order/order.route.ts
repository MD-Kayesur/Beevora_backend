import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/', auth('user', 'admin'), OrderController.createOrder);
router.post('/create-payment-intent', auth('user', 'admin'), OrderController.createPaymentIntent);
router.get('/my', auth('user', 'admin'), OrderController.getMyOrders);
router.get('/:id/invoice', auth('user', 'admin'), OrderController.downloadInvoice);

// Admin only routes
router.get('/', auth('admin'), OrderController.getAllOrders);
router.patch('/:id/status', auth('admin'), OrderController.updateOrderStatus);
router.delete('/:id', auth('admin'), OrderController.deleteOrder);

export const OrderRoutes = router;
