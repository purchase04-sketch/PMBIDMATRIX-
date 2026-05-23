import { Router } from 'express';
import { getScenarios, runSimulation } from '../controllers/digitalTwin.controller';

const router = Router();

router.get('/scenarios', getScenarios);
router.post('/simulate', runSimulation);

export default router;
