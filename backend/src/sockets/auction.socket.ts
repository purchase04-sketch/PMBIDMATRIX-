import { Server, Socket } from 'socket.io';
import Auction from '../models/Auction';
import Bid from '../models/Bid';

export const setupAuctionSockets = (io: Server) => {
  const auctionNamespace = io.of('/auction');

  auctionNamespace.on('connection', (socket: Socket) => {
    console.log(`🔌 Supplier connected to auction: ${socket.id}`);

    socket.on('join_auction', async ({ auctionId, supplierId }) => {
      socket.join(`auction_${auctionId}`);
      console.log(`Supplier ${supplierId} joined auction ${auctionId}`);
      
      const auction = await Auction.findById(auctionId);
      socket.emit('auction_sync', { currentBestBid: auction?.currentBestBid });
    });

    socket.on('place_bid', async (data) => {
      const { auctionId, supplierId, amount } = data;
      try {
        const auction = await Auction.findById(auctionId);
        if (!auction || auction.status !== 'active') {
          return socket.emit('bid_error', { message: 'Auction is not active' });
        }

        // Validate Bid rules (e.g., minimum decrement for reverse auction)
        if (auction.type === 'reverse') {
          if (auction.currentBestBid > 0 && (auction.currentBestBid - amount < auction.rules.minDecrement)) {
            return socket.emit('bid_error', { message: `Bid must be at least ${auction.rules.minDecrement} lower than current best` });
          }
        }

        const bid = await Bid.create({ auctionId, supplierId, amount, previousAmount: auction.currentBestBid });
        
        auction.currentBestBid = amount;
        auction.currentBestBidder = supplierId;
        auction.totalBids += 1;

        // Anti-sniping logic
        const timeRemaining = new Date(auction.endTime).getTime() - Date.now();
        if (auction.rules.autoExtend && timeRemaining < (auction.rules.antiSnipingMins * 60000)) {
           auction.endTime = new Date(auction.endTime.getTime() + (auction.rules.extensionMins * 60000));
           auctionNamespace.to(`auction_${auctionId}`).emit('time_extended', { newEndTime: auction.endTime });
        }

        await auction.save();

        // Broadcast new bid to all participants in this auction
        auctionNamespace.to(`auction_${auctionId}`).emit('new_bid', {
          amount,
          supplierId,
          timestamp: bid.timestamp,
          totalBids: auction.totalBids
        });

      } catch (error: any) {
        socket.emit('bid_error', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Supplier disconnected from auction: ${socket.id}`);
    });
  });
};
