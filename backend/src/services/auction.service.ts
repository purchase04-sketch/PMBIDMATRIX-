import Auction from '../models/Auction';
import Bid from '../models/Bid';

export class AuctionService {
  /**
   * Validate a bid against auction rules
   */
  static validateBid(auction: any, amount: number): { valid: boolean; error?: string } {
    if (auction.status !== 'active') {
      return { valid: false, error: 'Auction is not active' };
    }

    const now = new Date();
    if (now > new Date(auction.endTime)) {
      return { valid: false, error: 'Auction has ended' };
    }

    if (auction.type === 'reverse') {
      if (auction.currentBestBid > 0 && (auction.currentBestBid - amount) < auction.rules.minDecrement) {
        return { valid: false, error: `Bid must be at least ${auction.rules.minDecrement} lower` };
      }
      if (auction.rules.reservePrice && amount < auction.rules.reservePrice) {
        return { valid: false, error: 'Bid is below reserve price' };
      }
    }

    if (auction.type === 'forward') {
      if (auction.currentBestBid > 0 && (amount - auction.currentBestBid) < auction.rules.minDecrement) {
        return { valid: false, error: `Bid must be at least ${auction.rules.minDecrement} higher` };
      }
    }

    return { valid: true };
  }

  /**
   * Check and apply anti-sniping extension
   */
  static checkAntiSniping(auction: any): { extended: boolean; newEndTime?: Date } {
    if (!auction.rules.autoExtend) return { extended: false };

    const timeRemaining = new Date(auction.endTime).getTime() - Date.now();
    const antiSnipingWindow = (auction.rules.antiSnipingMins || 2) * 60000;

    if (timeRemaining < antiSnipingWindow) {
      const extensionMs = (auction.rules.extensionMins || 2) * 60000;
      const newEndTime = new Date(new Date(auction.endTime).getTime() + extensionMs);
      return { extended: true, newEndTime };
    }

    return { extended: false };
  }

  /**
   * Recalculate rankings after a new bid
   */
  static async recalculateRankings(auctionId: string): Promise<void> {
    const bids = await Bid.find({ auctionId, isValid: true })
      .sort({ amount: 1 }) // lowest first for reverse auction
      .exec();

    for (let i = 0; i < bids.length; i++) {
      bids[i].rank = i + 1;
      await bids[i].save();
    }
  }

  /**
   * Determine auction winner when it ends
   */
  static async finalizeAuction(auctionId: string): Promise<any> {
    const auction = await Auction.findById(auctionId);
    if (!auction) throw new Error('Auction not found');

    const winningBid = await Bid.findOne({ auctionId })
      .sort({ amount: auction.type === 'reverse' ? 1 : -1 })
      .exec();

    if (winningBid) {
      auction.status = 'completed';
      auction.currentBestBid = winningBid.amount;
      await auction.save();
      return { winner: winningBid.supplierId, amount: winningBid.amount };
    }

    auction.status = 'completed';
    await auction.save();
    return { winner: null, amount: 0 };
  }
}
