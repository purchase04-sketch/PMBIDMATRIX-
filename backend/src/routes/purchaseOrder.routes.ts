import { Router } from 'express';

const router = Router();

router.post('/from-auction/:auctionId', (req, res) => res.json({ message: 'Create PO from auction' }));
router.get('/', (req, res) => res.json({ message: 'List POs' }));
router.get('/:id', (req, res) => res.json({ message: 'Get PO details' }));
router.put('/:id/approve', (req, res) => res.json({ message: 'Approve PO' }));
router.put('/:id/reject', (req, res) => res.json({ message: 'Reject PO' }));
router.post('/:id/sync-erp', (req, res) => res.json({ message: 'Sync PO to ERP' }));

export default router;
