import { Router } from 'express';
import { submitBid, getBidsForAuction, getBidHistory } from '../controllers/bid.controller';

const router = Router();

router.get('/auction/:auctionId', getBidsForAuction);
router.post('/', submitBid);
router.get('/history/:supplierId', getBidHistory);

export default router;
