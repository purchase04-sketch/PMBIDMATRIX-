import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AuctionBoardProps {
  auctionId: string;
}

export const AuctionBoard: React.FC<AuctionBoardProps> = ({ auctionId }) => {
  const [bids, setBids] = useState<{ amount: number; supplier: string; time: string }[]>([
    { amount: 15400, supplier: 'SUP-001', time: '10:45:01' },
    { amount: 15200, supplier: 'SUP-089', time: '10:45:15' },
    { amount: 15050, supplier: 'SUP-045', time: '10:46:02' },
  ]);

  const currentBest = bids[bids.length - 1]?.amount || 0;

  return (
    <div className="glass-panel p-6 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-dark-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Reverse Auction</h2>
          <p className="text-primary-500">ID: {auctionId}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Time Remaining</div>
          <div className="text-3xl font-mono text-white animate-pulse">04:12</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bidding Area */}
        <div>
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-1">Current Lowest Bid</h3>
            <div className="text-5xl font-bold text-green-400">
              ${currentBest.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-2">Target Price: $16,000</p>
          </div>

          <div className="bg-dark-950 p-4 rounded-lg border border-dark-800">
            <label className="block text-sm text-gray-400 mb-2">Place Your Bid (Min decrement: $50)</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input 
                  type="number" 
                  className="w-full bg-dark-900 border border-dark-800 rounded-md py-2 pl-8 pr-4 text-white focus:outline-none focus:border-primary-500"
                  placeholder="15000"
                />
              </div>
              <button className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2 rounded-md font-semibold transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Live Bid Stream */}
        <div className="bg-dark-950 rounded-lg border border-dark-800 p-4 h-64 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-400 mb-4 sticky top-0 bg-dark-950 pb-2">Live Activity Stream</h3>
          <div className="flex flex-col gap-3">
            {[...bids].reverse().map((bid, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={i} 
                className={`p-3 rounded-md border ${i === 0 ? 'bg-primary-900/20 border-primary-500/50' : 'bg-dark-900 border-dark-800'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">${bid.amount.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">{bid.time}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">Supplier: {bid.supplier}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
