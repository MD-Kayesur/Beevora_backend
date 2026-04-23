import express from 'express';
import { HoneyController } from './honey.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router.get('/', HoneyController.getAllHoney);
router.get('/:id', HoneyController.getHoneyById);

router.post('/', auth('admin'), HoneyController.createHoney);
router.patch('/:id', auth('admin'), HoneyController.updateHoney);
router.delete('/:id', auth('admin'), HoneyController.deleteHoney);

export const HoneyRoutes = router;
