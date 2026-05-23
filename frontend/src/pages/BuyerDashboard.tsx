import React from 'react';
import { motion } from 'framer-motion';

export const BuyerDashboard = () => {
  return (
    <div className="p-6 text-gray-100 bg-dark-950 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
          Buyer Workspace
        </h1>
        <p className="text-gray-400 mt-1">Manage your active sourcing events</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="flex space-x-4">
            <button className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg flex flex-col items-center justify-center">
              <svg className="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Create New RFQ
            </button>
            <button className="flex-1 py-4 bg-dark-800 border border-dark-700 hover:bg-dark-700 rounded-xl font-medium transition-all shadow-lg flex flex-col items-center justify-center">
              <svg className="w-6 h-6 mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Schedule Auction
            </button>
            <button className="flex-1 py-4 bg-dark-800 border border-dark-700 hover:bg-dark-700 rounded-xl font-medium transition-all shadow-lg flex flex-col items-center justify-center">
              <svg className="w-6 h-6 mb-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Review Indents
            </button>
          </div>

          {/* Active Events Table */}
          <div className="bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">My Active Events</h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-400 border-b border-dark-800">
                  <th className="pb-3 font-medium">Event ID</th>
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">End Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dark-800/50 hover:bg-dark-800/30">
                  <td className="py-3 font-mono text-blue-400 cursor-pointer">RFQ-26-001</td>
                  <td className="py-3">IT Hardware Bulk</td>
                  <td className="py-3">RFQ</td>
                  <td className="py-3"><span className="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded text-xs border border-yellow-400/20">Evaluation</span></td>
                  <td className="py-3 text-gray-400">Oct 12, 2026</td>
                </tr>
                <tr className="border-b border-dark-800/50 hover:bg-dark-800/30">
                  <td className="py-3 font-mono text-blue-400 cursor-pointer">AUC-26-042</td>
                  <td className="py-3">HR Steel Coils</td>
                  <td className="py-3">Reverse Auction</td>
                  <td className="py-3"><span className="text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs border border-green-400/20">Active</span></td>
                  <td className="py-3 text-gray-400">Today, 14:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 shadow-lg p-6">
            <h3 className="font-semibold mb-4 text-gray-300">Pending Approvals</h3>
            <div className="space-y-3">
              <div className="p-3 bg-dark-800 rounded-lg border border-dark-700">
                <div className="flex justify-between">
                  <span className="font-medium text-sm">PO-2026-992</span>
                  <span className="text-xs text-gray-500">2 hrs ago</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Chemicals lot awarded to Asian Paints. Pending Final GM Approval.</p>
                <div className="mt-2 flex space-x-2">
                  <button className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded">Review</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 shadow-lg p-6">
            <h3 className="font-semibold mb-4 text-gray-300">Commodity Ticker</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Steel (HR Coil)</span>
                <span className="text-sm font-mono text-red-400">₹58.5k <span className="text-xs">↑ 1.2%</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Copper (LME)</span>
                <span className="text-sm font-mono text-green-400">$8,420 <span className="text-xs">↓ 0.5%</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Aluminum</span>
                <span className="text-sm font-mono text-red-400">$2,150 <span className="text-xs">↑ 0.8%</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
