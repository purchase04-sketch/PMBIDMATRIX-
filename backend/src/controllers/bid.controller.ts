import { Request, Response } from 'express';
import Bid from '../models/Bid';
import Auction from '../models/Auction';

export const submitBid = async (req: Request, res: Response) => {
  try {
    const { auctionId, supplierId, amount } = req.body;
    const auction = await Auction.findById(auctionId);
    if (!auction || auction.status !== 'active') {
      return res.status(400).json({ error: 'Auction is not active' });
    }

    // Reverse auction: new bid must be lower
    if (auction.type === 'reverse' && auction.currentBestBid > 0) {
      if (auction.currentBestBid - amount < auction.rules.minDecrement) {
        return res.status(400).json({
          error: `Bid must be at least ₹${auction.rules.minDecrement} lower than current best bid of ₹${auction.currentBestBid}`
        });
      }
    }

    const bid = await Bid.create({
      auctionId,
      supplierId,
      amount,
      previousAmount: auction.currentBestBid,
      rank: 1,
      timestamp: new Date()
    });

    auction.currentBestBid = amount;
    auction.totalBids += 1;
    await auction.save();

    res.status(201).json({ message: 'Bid placed successfully', data: bid });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getBidsForAuction = async (req: Request, res: Response) => {
  try {
    const bids = await Bid.find({ auctionId: req.params.auctionId })
      .sort({ timestamp: -1 });
    res.json(bids);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getBidHistory = async (req: Request, res: Response) => {
  try {
    const bids = await Bid.find({ supplierId: req.params.supplierId })
      .sort({ timestamp: -1 });
    res.json(bids);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
