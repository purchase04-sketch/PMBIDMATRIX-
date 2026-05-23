import { Request, Response } from 'express';
import Auction from '../models/Auction';
import { getIO } from '../config/socket';

export const createAuction = async (req: any, res: Response) => {
  try {
    const { rfqReference, title, type, description, items, participants, startTime, endTime, rules } = req.body;
    
    const auction = await Auction.create({
      rfqReference, title, type, description, items, participants, startTime, endTime, rules,
      createdBy: req.user.id,
      status: 'scheduled'
    });

    res.status(201).json({ success: true, data: auction });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAuctions = async (req: any, res: Response) => {
  try {
    let query = {};
    if (req.user.role === 'supplier') {
      query = { participants: req.user.id, status: { $ne: 'scheduled' } };
    }
    const auctions = await Auction.find(query).sort('startTime');
    res.json({ success: true, count: auctions.length, data: auctions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const startAuction = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findById(id);
    
    if (!auction) return res.status(404).json({ success: false, message: 'Auction not found' });
    if (auction.status !== 'scheduled') return res.status(400).json({ success: false, message: 'Auction already started or completed' });

    auction.status = 'active';
    await auction.save();

    // Broadcast to connected clients
    const io = getIO();
    io.to(`auction_${id}`).emit('auction_started', { auctionId: id, startTime: new Date() });

    res.json({ success: true, data: auction });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
