import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Get all contracts' }));
router.post('/', (req, res) => res.json({ message: 'Create contract' }));
router.get('/:id', (req, res) => res.json({ message: 'Get contract by id' }));
router.put('/:id', (req, res) => res.json({ message: 'Update contract' }));

export default router;
