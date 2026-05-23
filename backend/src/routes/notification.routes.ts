import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ message: 'Get notifications' }));
router.put('/:id/read', (req, res) => res.json({ message: 'Mark notification as read' }));
router.get('/unread-count', (req, res) => res.json({ message: 'Get unread notifications count' }));

export default router;
