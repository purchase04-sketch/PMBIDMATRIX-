import express from 'express';
import { createRFQ, getRFQs, submitResponse } from '../controllers/rfq.controller';
import { auth, roleGuard } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, roleGuard('buyer', 'admin', 'manager'), createRFQ);
router.get('/', auth, getRFQs);
router.post('/:id/responses', auth, roleGuard('supplier'), submitResponse);

export default router;
