import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Get all PIs' }));
router.get('/:id', (req, res) => res.json({ message: 'Get PI by id' }));
router.post('/', (req, res) => res.json({ message: 'Create PI' }));
router.put('/:id/approve', (req, res) => res.json({ message: 'Approve PI' }));

export default router;
