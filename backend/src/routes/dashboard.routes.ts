import { Router } from 'express';

const router = Router();

router.get('/stats', (req, res) => res.json({ message: 'Get aggregated dashboard stats' }));
router.get('/savings', (req, res) => res.json({ message: 'Get savings trend' }));
router.get('/efficiency', (req, res) => res.json({ message: 'Get auction efficiency' }));

export default router;
