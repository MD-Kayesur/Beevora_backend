import express from 'express';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router.get('/dashboard-stats', auth('admin'), AdminController.getDashboardStats);

export const AdminRoutes = router;
