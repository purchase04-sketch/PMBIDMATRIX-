import { Request, Response } from 'express';
import PurchaseOrder from '../models/PurchaseOrder';
import Auction from '../models/Auction';
import Supplier from '../models/Supplier';
import Bid from '../models/Bid';
import { syncPurchaseOrdersToOracle } from '../services/erpSync.service';
import { sendNotification } from '../services/notification.service';

// ─── Create PO from Auction Winner ───────────────────────────────────────────
export const createPOFromAuction = async (req: any, res: Response) => {
  try {
    const {
      auctionId,
      paymentTerms,
      deliveryTerms,
      deliveryDate,
      remarks,
    } = req.body;

    // Validate auction
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ success: false, message: 'Auction not found' });
    }
    if (auction.status !== 'completed') {
      return res.status(400).json({ success: false, message: 'Auction is not completed yet' });
    }
    if (!auction.winner) {
      return res.status(400).json({ success: false, message: 'Auction has no declared winner' });
    }

    // Check for existing PO from this auction
    const existingPO = await PurchaseOrder.findOne({ auctionRef: auctionId });
    if (existingPO) {
      return res.status(400).json({
        success: false,
        message: `PO already exists for this auction: ${existingPO.poNumber}`,
      });
    }

    // Get the winning bid details
    const winningBid = await Bid.findOne({
      auctionId,
      supplierId: auction.winner,
      isValid: true,
    }).sort({ amount: 1 });

    // Build PO items from auction items with winning bid price
    const items = auction.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: winningBid
        ? Math.round((winningBid.amount / auction.items.length) * 100) / 100
        : item.startingPrice,
      totalPrice: winningBid
        ? Math.round((winningBid.amount / auction.items.length) * item.quantity * 100) / 100
        : item.startingPrice * item.quantity,
      category: item.category,
    }));

    const poNumber = `PO-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const purchaseOrder = await PurchaseOrder.create({
      poNumber,
      auctionRef: auctionId,
      rfqRef: auction.rfqReference || undefined,
      supplier: auction.winner,
      items,
      paymentTerms: paymentTerms || 'Net 30',
      deliveryTerms: deliveryTerms || 'FOB',
      deliveryDate: deliveryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'draft',
      createdBy: req.user.id,
      approvalChain: [
        {
          approver: req.user.id,
          status: 'pending',
          remarks: remarks || '',
          date: new Date(),
        },
      ],
    });

    // Notify supplier
    await sendNotification({
      userId: auction.winner.toString(),
      type: 'approval',
      title: 'New Purchase Order Created',
      message: `Purchase Order ${poNumber} has been generated from auction ${auction.auctionNumber}`,
      priority: 'high',
    });

    res.status(201).json({ success: true, data: purchaseOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Create PO Manually ─────────────────────────────────────────────────────
export const createPO = async (req: any, res: Response) => {
  try {
    const {
      supplier,
      items,
      paymentTerms,
      deliveryTerms,
      deliveryDate,
    } = req.body;

    // Validate supplier exists
    const supplierDoc = await Supplier.findById(supplier);
    if (!supplierDoc) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }
    if (supplierDoc.status !== 'approved') {
      return res.status(400).json({ success: false, message: 'Supplier is not in approved status' });
    }

    const poNumber = `PO-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const purchaseOrder = await PurchaseOrder.create({
      poNumber,
      supplier,
      items,
      paymentTerms: paymentTerms || 'Net 30',
      deliveryTerms: deliveryTerms || 'FOB',
      deliveryDate: deliveryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'draft',
      createdBy: req.user.id,
      approvalChain: [
        {
          approver: req.user.id,
          status: 'pending',
          remarks: '',
          date: new Date(),
        },
      ],
    });

    res.status(201).json({ success: true, data: purchaseOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── List Purchase Orders with Filters ───────────────────────────────────────
export const getPurchaseOrders = async (req: any, res: Response) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      supplier,
      search,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const filter: Record<string, any> = {};
    if (status) filter.status = status;
    if (supplier) filter.supplier = supplier;
    if (search) {
      filter.$or = [
        { poNumber: { $regex: search, $options: 'i' } },
      ];
    }
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate as string);
      if (endDate) filter.createdAt.$lte = new Date(endDate as string);
    }

    // Suppliers can only see their own POs
    if (req.user.role === 'supplier') {
      const supplierDoc = await Supplier.findOne({ email: req.user.email });
      if (supplierDoc) {
        filter.supplier = supplierDoc._id;
      }
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;
    const sort: Record<string, 1 | -1> = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 };

    const [purchaseOrders, total] = await Promise.all([
      PurchaseOrder.find(filter)
        .populate('supplier', 'name code email')
        .populate('createdBy', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(limitNum),
      PurchaseOrder.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: purchaseOrders.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: purchaseOrders,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get PO Details ──────────────────────────────────────────────────────────
export const getPurchaseOrderById = async (req: any, res: Response) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id)
      .populate('supplier', 'name code email phone contactPerson address city state')
      .populate('auctionRef', 'auctionNumber title type status')
      .populate('rfqRef', 'rfqNumber title status')
      .populate('createdBy', 'name email role')
      .populate('approvalChain.approver', 'name email role');

    if (!po) {
      return res.status(404).json({ success: false, message: 'Purchase Order not found' });
    }

    res.json({ success: true, data: po });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Approve PO ──────────────────────────────────────────────────────────────
export const approvePO = async (req: any, res: Response) => {
  try {
    const { remarks } = req.body;
    const po = await PurchaseOrder.findById(req.params.id);

    if (!po) {
      return res.status(404).json({ success: false, message: 'Purchase Order not found' });
    }
    if (po.status !== 'draft') {
      return res.status(400).json({ success: false, message: `Cannot approve PO in '${po.status}' status` });
    }

    // Update approval chain entry for this approver, or add new one
    const existingApproval = po.approvalChain.find(
      (a) => a.approver.toString() === req.user.id
    );

    if (existingApproval) {
      existingApproval.status = 'approved';
      existingApproval.remarks = remarks || '';
      existingApproval.date = new Date();
    } else {
      po.approvalChain.push({
        approver: req.user.id,
        status: 'approved',
        remarks: remarks || '',
        date: new Date(),
      });
    }

    po.status = 'approved';
    await po.save();

    // Notify creator
    await sendNotification({
      userId: po.createdBy.toString(),
      type: 'approval',
      title: 'Purchase Order Approved',
      message: `PO ${po.poNumber} has been approved by ${req.user.name}`,
      priority: 'high',
    });

    res.json({ success: true, data: po });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Reject PO ───────────────────────────────────────────────────────────────
export const rejectPO = async (req: any, res: Response) => {
  try {
    const { remarks } = req.body;
    const po = await PurchaseOrder.findById(req.params.id);

    if (!po) {
      return res.status(404).json({ success: false, message: 'Purchase Order not found' });
    }
    if (po.status !== 'draft') {
      return res.status(400).json({ success: false, message: `Cannot reject PO in '${po.status}' status` });
    }
    if (!remarks) {
      return res.status(400).json({ success: false, message: 'Remarks are required when rejecting a PO' });
    }

    const existingApproval = po.approvalChain.find(
      (a) => a.approver.toString() === req.user.id
    );

    if (existingApproval) {
      existingApproval.status = 'rejected';
      existingApproval.remarks = remarks;
      existingApproval.date = new Date();
    } else {
      po.approvalChain.push({
        approver: req.user.id,
        status: 'rejected',
        remarks,
        date: new Date(),
      });
    }

    po.status = 'cancelled';
    await po.save();

    await sendNotification({
      userId: po.createdBy.toString(),
      type: 'approval',
      title: 'Purchase Order Rejected',
      message: `PO ${po.poNumber} has been rejected. Reason: ${remarks}`,
      priority: 'urgent',
    });

    res.json({ success: true, data: po });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Sync PO to Oracle ERP ───────────────────────────────────────────────────
export const syncToERP = async (req: any, res: Response) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id)
      .populate('supplier', 'name code email');

    if (!po) {
      return res.status(404).json({ success: false, message: 'Purchase Order not found' });
    }
    if (po.status !== 'approved') {
      return res.status(400).json({ success: false, message: 'Only approved POs can be synced to ERP' });
    }

    const syncResult = await syncPurchaseOrdersToOracle({
      poNumber: po.poNumber,
      supplier: po.supplier,
      items: po.items,
      totalAmount: po.totalAmount,
      taxAmount: po.taxAmount,
      grandTotal: po.grandTotal,
      paymentTerms: po.paymentTerms,
      deliveryTerms: po.deliveryTerms,
      deliveryDate: po.deliveryDate,
    });

    // Update PO status to sent after ERP sync
    po.status = 'sent';
    await po.save();

    res.json({
      success: true,
      message: 'PO synced to Oracle ERP successfully',
      data: {
        poNumber: po.poNumber,
        erpReference: syncResult.oracleReferenceId,
        syncDate: syncResult.syncDate,
        status: po.status,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `ERP sync failed: ${error.message}`,
    });
  }
};
