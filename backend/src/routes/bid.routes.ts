import { Router } from 'express';

const router = Router();

router.get('/auction/:auctionId', (req, res) => res.json({ message: 'Get bids for auction' }));
router.post('/', (req, res) => res.json({ message: 'Submit a new bid' }));
router.get('/history/:supplierId', (req, res) => res.json({ message: 'Get bid history for supplier' }));

export default router;
