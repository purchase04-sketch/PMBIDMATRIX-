import { Router } from 'express';
import { getAllPRs, getPRById, createPR, approvePR, rejectPR } from '../controllers/pr.controller';

const router = Router();

router.get('/', getAllPRs);
router.get('/:id', getPRById);
router.post('/', createPR);
router.put('/:id/approve', approvePR);
router.put('/:id/reject', rejectPR);

export default router;
