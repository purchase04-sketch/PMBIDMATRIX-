import { Request, Response } from 'express';
import RFQ from '../models/RFQ';

export const createRFQ = async (req: any, res: Response) => {
  try {
    const { title, description, items, invitedSuppliers, category, startDate, endDate, evaluationCriteria } = req.body;
    
    const rfq = await RFQ.create({
      title,
      description,
      items,
      invitedSuppliers,
      category,
      startDate,
      endDate,
      evaluationCriteria,
      createdBy: req.user.id,
      status: 'draft'
    });

    res.status(201).json({ success: true, data: rfq });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRFQs = async (req: any, res: Response) => {
  try {
    let query = {};
    if (req.user.role === 'supplier') {
      query = { invitedSuppliers: req.user.id, status: { $in: ['published', 'evaluation', 'awarded'] } };
    }
    
    const rfqs = await RFQ.find(query).populate('invitedSuppliers', 'name code').sort('-createdAt');
    res.json({ success: true, count: rfqs.length, data: rfqs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitResponse = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { items, remarks, totalAmount } = req.body;
    
    const rfq = await RFQ.findById(id);
    if (!rfq) return res.status(404).json({ success: false, message: 'RFQ not found' });
    
    // Check if supplier was invited
    if (!rfq.invitedSuppliers.includes(req.user.id)) {
      return res.status(403).json({ success: false, message: 'Not invited to this RFQ' });
    }

    const response = {
      supplier: req.user.id,
      items,
      totalAmount,
      remarks,
      submittedAt: new Date()
    };

    rfq.responses.push(response);
    await rfq.save();

    res.json({ success: true, message: 'Response submitted successfully', data: rfq });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
