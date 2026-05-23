import express from 'express';
import { createAuction, getAuctions, startAuction } from '../controllers/auction.controller';
import { auth, roleGuard } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, roleGuard('buyer', 'admin', 'manager'), createAuction);
router.get('/', auth, getAuctions);
router.put('/:id/start', auth, roleGuard('buyer', 'admin'), startAuction);

export default router;
