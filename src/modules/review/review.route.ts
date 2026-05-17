import express from 'express';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/', auth('user', 'admin'), ReviewController.createReview);
router.get('/:productId', ReviewController.getProductReviews);

export const ReviewRoutes = router;
