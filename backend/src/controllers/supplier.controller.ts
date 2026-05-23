import { Request, Response } from 'express';
import Supplier, { ISupplier } from '../models/Supplier';
import PurchaseOrder from '../models/PurchaseOrder';
import Bid from '../models/Bid';

// ─── List Suppliers with filters & pagination ────────────────────────────────
export const getSuppliers = async (req: any, res: Response) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      category,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      minRating,
    } = req.query;

    const filter: Record<string, any> = {};

    if (status) filter.status = status;
    if (category) filter.categories = { $in: Array.isArray(category) ? category : [category] };
    if (minRating) filter.rating = { $gte: Number(minRating) };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { contactPerson: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;
    const sort: Record<string, 1 | -1> = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 };

    const [suppliers, total] = await Promise.all([
      Supplier.find(filter).sort(sort).skip(skip).limit(limitNum),
      Supplier.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: suppliers.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: suppliers,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Single Supplier ─────────────────────────────────────────────────────
export const getSupplierById = async (req: any, res: Response) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    res.json({ success: true, data: supplier });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Create Supplier ─────────────────────────────────────────────────────────
export const createSupplier = async (req: any, res: Response) => {
  try {
    const {
      name, code, email, contactPerson, phone, address, city, state, country,
      gstNumber, panNumber, categories, bankDetails, kycDocuments,
    } = req.body;

    // Check duplicate code/email
    const existing = await Supplier.findOne({ $or: [{ code }, { email }] });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: existing.code === code ? 'Supplier code already exists' : 'Email already registered',
      });
    }

    const supplier = await Supplier.create({
      name, code, email, contactPerson, phone, address, city, state,
      country: country || 'India', gstNumber, panNumber, categories,
      bankDetails, kycDocuments, status: 'pending',
    });

    res.status(201).json({ success: true, data: supplier });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Supplier ─────────────────────────────────────────────────────────
export const updateSupplier = async (req: any, res: Response) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    // Fields allowed to update
    const allowedFields: (keyof ISupplier)[] = [
      'name', 'contactPerson', 'phone', 'address', 'city', 'state', 'country',
      'gstNumber', 'panNumber', 'categories', 'status', 'bankDetails', 'kycDocuments',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        (supplier as any)[field] = req.body[field];
      }
    });

    await supplier.save();
    res.json({ success: true, data: supplier });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Delete (Soft-delete → status=inactive) ─────────────────────────────────
export const deleteSupplier = async (req: any, res: Response) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    // Soft-delete: set status to inactive rather than destroying the record
    supplier.status = 'inactive';
    await supplier.save();

    res.json({ success: true, message: 'Supplier deactivated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Risk Assessment ─────────────────────────────────────────────────────────
export const getRiskAssessment = async (req: any, res: Response) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    const { performanceMetrics: pm } = supplier;
    const completionRate = pm.totalOrders > 0
      ? (pm.completedOrders / pm.totalOrders) * 100
      : 0;

    // Weighted risk calculation
    const qualityRisk    = Math.max(0, 100 - pm.qualityScore);
    const deliveryRisk   = Math.max(0, 100 - pm.deliveryScore);
    const financialRisk  = supplier.kycDocuments.every((d) => d.verified) ? 10 : 40;
    const complianceRisk = supplier.gstNumber && supplier.panNumber ? 10 : 50;

    const overallRisk = Math.round(
      qualityRisk * 0.3 +
      deliveryRisk * 0.25 +
      financialRisk * 0.25 +
      complianceRisk * 0.2
    );

    const riskLevel: string =
      overallRisk <= 25 ? 'low' :
      overallRisk <= 50 ? 'medium' :
      overallRisk <= 75 ? 'high' : 'critical';

    const recommendations: string[] = [];
    if (qualityRisk > 40)   recommendations.push('Conduct quality audit — quality score below threshold');
    if (deliveryRisk > 40)  recommendations.push('Review delivery SLA compliance — repeated delays detected');
    if (financialRisk > 20) recommendations.push('Request updated KYC documentation');
    if (complianceRisk > 20) recommendations.push('Verify GST/PAN registration details');
    if (completionRate < 80) recommendations.push('Investigate low order completion rate');

    // Persist calculated risk score
    supplier.riskScore = overallRisk;
    await supplier.save();

    res.json({
      success: true,
      data: {
        supplierId: supplier._id,
        supplierName: supplier.name,
        overallRiskScore: overallRisk,
        riskLevel,
        breakdown: {
          qualityRisk: Math.round(qualityRisk),
          deliveryRisk: Math.round(deliveryRisk),
          financialRisk: Math.round(financialRisk),
          complianceRisk: Math.round(complianceRisk),
        },
        completionRate: Math.round(completionRate * 100) / 100,
        kycStatus: supplier.kycDocuments.every((d) => d.verified) ? 'verified' : 'pending',
        recommendations,
        assessedAt: new Date(),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Performance Metrics ─────────────────────────────────────────────────────
export const getPerformanceMetrics = async (req: any, res: Response) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    // Aggregate PO data for this supplier
    const poStats = await PurchaseOrder.aggregate([
      { $match: { supplier: supplier._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$grandTotal' },
        },
      },
    ]);

    // Aggregate bid data for this supplier
    const bidStats = await Bid.aggregate([
      { $match: { supplierId: supplier._id, isValid: true } },
      {
        $group: {
          _id: null,
          totalBids: { $sum: 1 },
          avgBidAmount: { $avg: '$amount' },
          minBidAmount: { $min: '$amount' },
          maxBidAmount: { $max: '$amount' },
        },
      },
    ]);

    const poSummary: Record<string, { count: number; totalValue: number }> = {};
    poStats.forEach((s) => { poSummary[s._id] = { count: s.count, totalValue: s.totalValue }; });

    const { performanceMetrics: pm } = supplier;
    const completionRate = pm.totalOrders > 0
      ? Math.round((pm.completedOrders / pm.totalOrders) * 10000) / 100
      : 0;

    const overallScore = Math.round(
      (pm.qualityScore * 0.3 +
       pm.deliveryScore * 0.3 +
       pm.priceCompetitiveness * 0.25 +
       (100 - pm.responseTime) * 0.15) * 100
    ) / 100;

    res.json({
      success: true,
      data: {
        supplierId: supplier._id,
        supplierName: supplier.name,
        rating: supplier.rating,
        overallScore,
        performanceMetrics: pm,
        completionRate,
        purchaseOrderSummary: poSummary,
        bidActivity: bidStats[0] || { totalBids: 0, avgBidAmount: 0, minBidAmount: 0, maxBidAmount: 0 },
        status: supplier.status,
        memberSince: supplier.registrationDate,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
