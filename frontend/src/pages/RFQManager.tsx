import React from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export const RFQManager: React.FC = () => {
  const rfqs = [
    { id: 'RFQ-2026-081', title: 'Industrial Grade Bearings', status: 'published', bids: 4, deadline: '2026-05-28' },
    { id: 'RFQ-2026-082', title: 'IT Hardware Refresh', status: 'evaluation', bids: 12, deadline: '2026-05-20' },
    { id: 'RFQ-2026-083', title: 'Chemical Solvents Q3', status: 'draft', bids: 0, deadline: '2026-06-15' },
    { id: 'RFQ-2026-079', title: 'Steel Coils 500MT', status: 'awarded', bids: 7, deadline: '2026-05-10' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published': return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium border border-blue-500/30">Published</span>;
      case 'evaluation': return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium border border-yellow-500/30">Evaluating</span>;
      case 'draft': return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs font-medium border border-gray-500/30">Draft</span>;
      case 'awarded': return <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium border border-green-500/30">Awarded</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">RFQ Management</h2>
          <p className="text-gray-400 text-sm mt-1">Manage and evaluate your Requests for Quotation</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(20,184,166,0.2)]">
          Create New RFQ
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: FileText, label: 'Total RFQs', value: '156', color: 'text-gray-300' },
          { icon: Clock, label: 'Active', value: '24', color: 'text-blue-400' },
          { icon: CheckCircle, label: 'Awarded (YTD)', value: '112', color: 'text-green-400' },
          { icon: XCircle, label: 'Cancelled', value: '4', color: 'text-red-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-dark-800 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* RFQ List Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-5 border-b border-dark-800 bg-dark-900/50 flex justify-between items-center">
          <h3 className="font-semibold text-white">Recent RFQs</h3>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search RFQs..." 
              className="bg-dark-950 border border-dark-700 rounded-md py-1.5 px-3 text-sm text-white focus:outline-none focus:border-primary-500 w-64"
            />
          </div>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-dark-950/50 text-gray-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">RFQ ID</th>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Bids Received</th>
              <th className="p-4 font-medium">Deadline</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-800">
            {rfqs.map((rfq) => (
              <tr key={rfq.id} className="hover:bg-dark-800/50 transition-colors">
                <td className="p-4 text-sm font-medium text-white">{rfq.id}</td>
                <td className="p-4 text-sm text-gray-300">{rfq.title}</td>
                <td className="p-4 text-sm">{getStatusBadge(rfq.status)}</td>
                <td className="p-4 text-sm text-gray-300 text-center">
                  <span className={`px-2 py-0.5 rounded-full ${rfq.bids > 0 ? 'bg-dark-700 text-white' : 'text-gray-500'}`}>
                    {rfq.bids}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-400">{rfq.deadline}</td>
                <td className="p-4 text-right">
                  <button className="text-primary-400 hover:text-primary-300 text-sm font-medium mr-3">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
