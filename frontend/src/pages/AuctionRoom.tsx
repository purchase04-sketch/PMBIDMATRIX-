import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const AuctionRoom = () => {
  const [bids, setBids] = useState([
    { id: 1, supplier: 'Supplier A', amount: 56000, time: '10:45:02' },
    { id: 2, supplier: 'Supplier B', amount: 55800, time: '10:45:15' },
    { id: 3, supplier: 'Supplier C', amount: 55500, time: '10:46:05' },
  ]);
  const [currentBid, setCurrentBid] = useState('');

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBid) return;
    const newBid = {
      id: bids.length + 1,
      supplier: 'You (Supplier D)',
      amount: parseInt(currentBid),
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };
    setBids([newBid, ...bids]);
    setCurrentBid('');
  };

  return (
    <div className="p-6 text-gray-100 bg-dark-950 min-h-screen">
      <header className="mb-8 flex justify-between items-center border-b border-dark-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-3 animate-pulse"></span>
            LIVE: Reverse Auction - Steel Coils Q3
          </h1>
          <p className="text-gray-400 mt-1">Auction ID: AUC-2026-000001</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Time Remaining</div>
          <div className="text-3xl font-mono font-bold text-red-500">00:14:59</div>
          <div className="text-xs text-yellow-500 mt-1">Anti-Sniping: Active</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bidding Panel */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-800 shadow-lg text-center"
          >
            <h2 className="text-lg text-gray-400 mb-2">Current Lowest Bid</h2>
            <div className="text-5xl font-bold text-green-400">
              ₹ {bids[0].amount.toLocaleString('en-IN')}
            </div>
            <p className="text-sm text-gray-500 mt-2">Target Price: ₹ 55,000</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-800 shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4">Place Your Bid</h3>
            <form onSubmit={handleBid} className="flex space-x-4">
              <div className="flex-grow relative">
                <span className="absolute left-4 top-3 text-gray-400">₹</span>
                <input
                  type="number"
                  value={currentBid}
                  onChange={(e) => setCurrentBid(e.target.value)}
                  className="w-full bg-dark-950 border border-dark-700 rounded-lg py-3 pl-10 pr-4 text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={`Max allowed bid: ${(bids[0].amount - 100).toLocaleString('en-IN')}`}
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold hover:from-blue-500 hover:to-purple-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                Submit Bid
              </button>
            </form>
            <div className="mt-4 flex space-x-4">
              <button className="px-4 py-2 border border-dark-700 rounded-lg text-sm hover:bg-dark-800 transition-colors">
                Auto-Bid Settings
              </button>
              <button className="px-4 py-2 border border-dark-700 rounded-lg text-sm hover:bg-dark-800 transition-colors">
                View Lot Details
              </button>
            </div>
          </motion.div>
        </div>

        {/* Live Feed Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-800 shadow-lg h-[600px] flex flex-col"
        >
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-dark-800">Live Bid Feed</h3>
          <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {bids.map((bid, idx) => (
              <motion.div
                key={bid.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-lg border ${
                  idx === 0
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-dark-700 bg-dark-800/50'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{bid.supplier}</span>
                  <span className="text-xs text-gray-500">{bid.time}</span>
                </div>
                <div className={`text-xl font-bold ${idx === 0 ? 'text-green-400' : 'text-gray-300'}`}>
                  ₹ {bid.amount.toLocaleString('en-IN')}
                </div>
                {idx === 0 && <span className="text-xs text-green-500 uppercase font-bold mt-1 inline-block">Current Rank 1</span>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
