import { Request, Response } from 'express';
import Contract from '../models/Contract';

export const getAllContracts = async (req: Request, res: Response) => {
  try {
    const { status, supplier, page = 1, limit = 20 } = req.query;
    const filter: any = {};
    if (status) filter.status = status;
    if (supplier) filter.supplier = supplier;

    const contracts = await Contract.find(filter)
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const total = await Contract.countDocuments(filter);
    res.json({ data: contracts, total, page: +page, totalPages: Math.ceil(total / +limit) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getContractById = async (req: Request, res: Response) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    res.json(contract);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createContract = async (req: Request, res: Response) => {
  try {
    const contract = await Contract.create(req.body);
    res.status(201).json(contract);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    res.json(contract);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
