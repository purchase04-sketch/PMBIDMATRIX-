import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Get all PRs' }));
router.get('/:id', (req, res) => res.json({ message: 'Get PR by id' }));
router.post('/', (req, res) => res.json({ message: 'Create PR' }));
router.put('/:id/approve', (req, res) => res.json({ message: 'Approve PR' }));
router.put('/:id/reject', (req, res) => res.json({ message: 'Reject PR' }));

export default router;
