import { Request, Response } from 'express';
import PurchaseIndent from '../models/PurchaseIndent';

export const getAllPIs = async (req: Request, res: Response) => {
  try {
    const { status, department, page = 1, limit = 20 } = req.query;
    const filter: any = {};
    if (status) filter.status = status;
    if (department) filter.department = department;

    const pis = await PurchaseIndent.find(filter)
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const total = await PurchaseIndent.countDocuments(filter);
    res.json({ data: pis, total, page: +page, totalPages: Math.ceil(total / +limit) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getPIById = async (req: Request, res: Response) => {
  try {
    const pi = await PurchaseIndent.findById(req.params.id);
    if (!pi) return res.status(404).json({ error: 'PI not found' });
    res.json(pi);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createPI = async (req: Request, res: Response) => {
  try {
    const pi = await PurchaseIndent.create(req.body);
    res.status(201).json(pi);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const approvePI = async (req: Request, res: Response) => {
  try {
    const pi = await PurchaseIndent.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', approvedBy: req.body.approvedBy },
      { new: true }
    );
    if (!pi) return res.status(404).json({ error: 'PI not found' });
    res.json({ message: 'PI approved', data: pi });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
