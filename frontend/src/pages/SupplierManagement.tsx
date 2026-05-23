import React from 'react';
import { motion } from 'framer-motion';

export const SupplierManagement = () => {
  const suppliers = [
    { id: 'SUP-001', name: 'Tata Steel Limited', risk: 'Low', score: 92, category: 'Metals', status: 'Approved' },
    { id: 'SUP-002', name: 'Global Tech Components', risk: 'Medium', score: 78, category: 'Electronics', status: 'Approved' },
    { id: 'SUP-003', name: 'Apex Logistics Co.', risk: 'High', score: 45, category: 'Services', status: 'Under Review' },
    { id: 'SUP-004', name: 'Asian Paints', risk: 'Low', score: 95, category: 'Chemicals', status: 'Approved' },
  ];

  return (
    <div className="p-6 text-gray-100 bg-dark-950 min-h-screen">
      <header className="mb-8 flex justify-between items-end border-b border-dark-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Supplier Management
          </h1>
          <p className="text-gray-400 mt-1">Directory, Risk Profiles & Compliance</p>
        </div>
        <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg font-medium hover:from-green-500 hover:to-blue-500 transition-all shadow-lg text-white">
          + Onboard New Supplier
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-4 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-800 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Suppliers</div>
            <div className="text-2xl font-bold">1,248</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-800 flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <div className="text-sm text-gray-400">Approved</div>
            <div className="text-2xl font-bold">1,120</div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-dark-900/50 backdrop-blur border border-dark-800 flex items-center">
          <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <div className="text-sm text-gray-400">High Risk Alert</div>
            <div className="text-2xl font-bold">14</div>
          </div>
        </div>
      </div>

      <div className="bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-dark-800 flex justify-between items-center bg-dark-900">
          <input 
            type="text" 
            placeholder="Search suppliers by name, ID, or category..." 
            className="w-1/3 bg-dark-950 border border-dark-700 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-blue-500"
          />
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 border border-dark-700 rounded text-sm hover:bg-dark-800 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filter
            </button>
            <button className="px-3 py-1.5 border border-dark-700 rounded text-sm hover:bg-dark-800">Export CSV</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-950/50 text-gray-400 text-sm border-b border-dark-800">
                <th className="p-4 font-medium">Supplier ID</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">AI Risk Profile</th>
                <th className="p-4 font-medium">Performance Score</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {suppliers.map((sup, idx) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  key={sup.id} 
                  className="border-b border-dark-800/50 hover:bg-dark-800/30 transition-colors"
                >
                  <td className="p-4 font-mono text-gray-400">{sup.id}</td>
                  <td className="p-4 font-medium">{sup.name}</td>
                  <td className="p-4 text-gray-400">{sup.category}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      sup.risk === 'Low' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      sup.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {sup.risk}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="mr-2">{sup.score}/100</span>
                      <div className="w-16 h-2 bg-dark-700 rounded-full overflow-hidden">
                        <div className={`h-full ${sup.score > 80 ? 'bg-green-500' : sup.score > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${sup.score}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{sup.status}</td>
                  <td className="p-4 text-right">
                    <button className="text-blue-400 hover:text-blue-300 underline text-xs">View Profile</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
