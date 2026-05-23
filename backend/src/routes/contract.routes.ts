import { Router } from 'express';
import { getAllContracts, getContractById, createContract, updateContract } from '../controllers/contract.controller';

const router = Router();

router.get('/', getAllContracts);
router.post('/', createContract);
router.get('/:id', getContractById);
router.put('/:id', updateContract);

export default router;
