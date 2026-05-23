import { Router } from 'express';
import { getDashboardStats, getSavingsTrend, getAuctionEfficiency } from '../controllers/dashboard.controller';

const router = Router();

router.get('/stats', getDashboardStats);
router.get('/savings', getSavingsTrend);
router.get('/efficiency', getAuctionEfficiency);

export default router;
