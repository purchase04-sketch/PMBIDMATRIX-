import { Router } from 'express';
import { getAllPIs, getPIById, createPI, approvePI } from '../controllers/pi.controller';

const router = Router();

router.get('/', getAllPIs);
router.get('/:id', getPIById);
router.post('/', createPI);
router.put('/:id/approve', approvePI);

export default router;
