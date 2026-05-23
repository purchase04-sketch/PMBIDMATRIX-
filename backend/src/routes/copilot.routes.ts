import { Router } from 'express';
import { processQuery, getSuggestions } from '../controllers/copilot.controller';

const router = Router();

router.post('/query', processQuery);
router.get('/suggestions', getSuggestions);

export default router;
