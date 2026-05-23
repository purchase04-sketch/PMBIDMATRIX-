import { Request, Response } from 'express';
import Auction from '../models/Auction';
import Bid from '../models/Bid';
import PurchaseOrder from '../models/PurchaseOrder';
import Supplier from '../models/Supplier';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalSuppliers,
      activeAuctions,
      totalPOs,
      totalBids
    ] = await Promise.all([
      Supplier.countDocuments(),
      Auction.countDocuments({ status: 'active' }),
      PurchaseOrder.countDocuments(),
      Bid.countDocuments()
    ]);

    // Calculate total spend from completed POs
    const spendAgg = await PurchaseOrder.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalSpend: { $sum: '$grandTotal' } } }
    ]);
    const totalSpend = spendAgg.length > 0 ? spendAgg[0].totalSpend : 0;

    // Calculate savings from auction savings
    const savingsAgg = await Auction.aggregate([
      { $match: { status: 'completed' } },
      { $group: {
        _id: null,
        estimatedTotal: { $sum: '$rules.reservePrice' },
        actualTotal: { $sum: '$currentBestBid' }
      }}
    ]);
    const estimated = savingsAgg.length > 0 ? savingsAgg[0].estimatedTotal : 0;
    const actual = savingsAgg.length > 0 ? savingsAgg[0].actualTotal : 0;
    const savingsPercent = estimated > 0 ? ((estimated - actual) / estimated * 100).toFixed(1) : '0';

    res.json({
      totalSuppliers,
      activeAuctions,
      totalPOs,
      totalBids,
      totalSpend,
      savingsPercent: +savingsPercent,
      recentActivity: []
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getSavingsTrend = async (req: Request, res: Response) => {
  try {
    // Mock monthly savings trend data
    const trend = [
      { month: 'Jan', savings: 8.2 }, { month: 'Feb', savings: 9.1 },
      { month: 'Mar', savings: 11.4 }, { month: 'Apr', savings: 10.8 },
      { month: 'May', savings: 13.2 }, { month: 'Jun', savings: 14.1 },
    ];
    res.json(trend);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAuctionEfficiency = async (req: Request, res: Response) => {
  try {
    const total = await Auction.countDocuments({ status: 'completed' });
    const awarded = await Auction.countDocuments({ status: 'completed', currentBestBid: { $gt: 0 } });
    const efficiency = total > 0 ? ((awarded / total) * 100).toFixed(1) : '0';
    res.json({ totalCompleted: total, awarded, efficiencyPercent: +efficiency });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
