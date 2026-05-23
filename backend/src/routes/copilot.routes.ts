import { Router } from 'express';

const router = Router();

router.post('/query', (req, res) => res.json({ message: 'Process natural language query' }));
router.get('/suggestions', (req, res) => res.json({ message: 'Get prompt suggestions' }));

export default router;
