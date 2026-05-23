import { Request, Response } from 'express';
import PurchaseRequisition from '../models/PurchaseRequisition';

export const getAllPRs = async (req: Request, res: Response) => {
  try {
    const { status, department, priority, page = 1, limit = 20 } = req.query;
    const filter: any = {};
    if (status) filter.status = status;
    if (department) filter.department = department;
    if (priority) filter.priority = priority;

    const prs = await PurchaseRequisition.find(filter)
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const total = await PurchaseRequisition.countDocuments(filter);
    res.json({ data: prs, total, page: +page, totalPages: Math.ceil(total / +limit) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getPRById = async (req: Request, res: Response) => {
  try {
    const pr = await PurchaseRequisition.findById(req.params.id);
    if (!pr) return res.status(404).json({ error: 'PR not found' });
    res.json(pr);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createPR = async (req: Request, res: Response) => {
  try {
    const pr = await PurchaseRequisition.create(req.body);
    res.status(201).json(pr);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const approvePR = async (req: Request, res: Response) => {
  try {
    const pr = await PurchaseRequisition.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', approvedBy: req.body.approvedBy, approvedAt: new Date() },
      { new: true }
    );
    if (!pr) return res.status(404).json({ error: 'PR not found' });
    res.json({ message: 'PR approved', data: pr });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const rejectPR = async (req: Request, res: Response) => {
  try {
    const pr = await PurchaseRequisition.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', rejectionReason: req.body.reason },
      { new: true }
    );
    if (!pr) return res.status(404).json({ error: 'PR not found' });
    res.json({ message: 'PR rejected', data: pr });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
