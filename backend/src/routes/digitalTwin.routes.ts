import { Router } from 'express';

const router = Router();

router.post('/simulate', (req, res) => res.json({ message: 'Run digital twin simulation' }));
router.get('/scenarios', (req, res) => res.json({ message: 'Get available scenarios' }));

export default router;
