import React from 'react';
import { motion } from 'framer-motion';

export const Analytics = () => {
  return (
    <div className="p-6 text-gray-100 bg-dark-950 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Analytics & Insights
        </h1>
        <p className="text-gray-400 mt-1">Deep dive into procurement performance metrics</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 p-6 shadow-lg">
          <h3 className="text-sm text-gray-400 mb-1">Total Savings (YTD)</h3>
          <div className="text-3xl font-bold text-green-400">14.2%</div>
          <p className="text-xs text-gray-500 mt-2">vs 11.5% industry average</p>
          <div className="h-2 w-full bg-dark-800 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-green-500 w-[70%]"></div>
          </div>
        </motion.div>

        {/* Metric 2 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 p-6 shadow-lg">
          <h3 className="text-sm text-gray-400 mb-1">Auction Efficiency</h3>
          <div className="text-3xl font-bold text-blue-400">92%</div>
          <p className="text-xs text-gray-500 mt-2">Lots awarded successfully via reverse auction</p>
          <div className="h-2 w-full bg-dark-800 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-blue-500 w-[92%]"></div>
          </div>
        </motion.div>

        {/* Metric 3 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 p-6 shadow-lg">
          <h3 className="text-sm text-gray-400 mb-1">Supplier ESG Compliance</h3>
          <div className="text-3xl font-bold text-teal-400">86%</div>
          <p className="text-xs text-gray-500 mt-2">Tier-1 suppliers meeting ESG goals</p>
          <div className="h-2 w-full bg-dark-800 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-teal-500 w-[86%]"></div>
          </div>
        </motion.div>

        <div className="lg:col-span-3 bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 p-6 shadow-lg min-h-[400px] flex items-center justify-center">
          <p className="text-gray-500 italic">Advanced charting visualizations loading (D3/Recharts modules initializing...)</p>
        </div>
      </div>
    </div>
  );
};
