import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router.get('/me', auth('user', 'admin'), UserController.getMyProfile);
router.patch('/me', auth('user', 'admin'), UserController.updateMyProfile);

// Admin only routes
router.get('/', auth('admin'), UserController.getAllUsers);
router.patch('/:id/role', auth('admin'), UserController.updateUserRole);
router.delete('/:id', auth('admin'), UserController.deleteUser);

export const UserRoutes = router;
