import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const spendData = [
  { month: 'Jan', actual: 4000, budget: 4400 },
  { month: 'Feb', actual: 3000, budget: 3200 },
  { month: 'Mar', actual: 2000, budget: 2400 },
  { month: 'Apr', actual: 2780, budget: 2900 },
  { month: 'May', actual: 1890, budget: 2100 },
  { month: 'Jun', actual: 2390, budget: 2500 },
  { month: 'Jul', actual: 3490, budget: 3600 },
];

export const ExecutiveDashboard = () => {
  return (
    <div className="p-6 text-gray-100 bg-dark-950 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Executive Dashboard
        </h1>
        <p className="text-gray-400">AI-Powered Procurement Intelligence</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Spend (YTD)', value: '$24.5M', trend: '+5.2%' },
          { title: 'Active Auctions', value: '12', trend: '+2' },
          { title: 'AI Savings Identified', value: '$1.2M', trend: '+15%' },
          { title: 'Total Suppliers', value: '342', trend: 'Stable' },
        ].map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-800 shadow-lg"
          >
            <h3 className="text-gray-400 text-sm">{kpi.title}</h3>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-2xl font-bold">{kpi.value}</span>
              <span className="text-green-400 text-sm font-medium">{kpi.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-800 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4">Spend vs Budget Analysis</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6' }}
                />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="budget" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-800 shadow-lg flex flex-col"
        >
          <h3 className="text-lg font-semibold mb-4">AI Copilot Insights</h3>
          <div className="space-y-4 flex-grow">
            <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg">
              <p className="text-sm text-red-200"><strong>Alert:</strong> Steel prices projected to rise 8% next month. Recommend hedging contracts.</p>
            </div>
            <div className="p-3 bg-yellow-900/20 border border-yellow-900/50 rounded-lg">
              <p className="text-sm text-yellow-200"><strong>Warning:</strong> Supplier Tata Steel (SUP-001) shows increased delivery latency.</p>
            </div>
            <div className="p-3 bg-green-900/20 border border-green-900/50 rounded-lg">
              <p className="text-sm text-green-200"><strong>Opportunity:</strong> Reverse auction for IT Equipment can yield 12% savings.</p>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium hover:from-purple-500 hover:to-blue-500 transition-all">
            Open Full AI Copilot
          </button>
        </motion.div>
      </div>
    </div>
  );
};
