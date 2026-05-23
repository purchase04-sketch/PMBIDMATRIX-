import React from 'react';
import { Home, ShoppingCart, Users, Activity, FileText, Settings, ShieldAlert, Cpu } from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Cpu, label: 'AI Copilot' },
    { icon: Activity, label: 'Live Auctions' },
    { icon: ShoppingCart, label: 'PR & RFQ' },
    { icon: Users, label: 'Suppliers' },
    { icon: ShieldAlert, label: 'Risk Intelligence' },
    { icon: FileText, label: 'Contracts' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 h-screen border-r border-dark-800 bg-dark-900/50 backdrop-blur-md flex flex-col sticky top-0 hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-dark-800 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(20,184,166,0.4)] mr-3">
          PM
        </div>
        <span className="text-xl font-bold tracking-tight text-white">BIDMATRIX</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-1">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                item.active 
                  ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20' 
                  : 'text-gray-400 hover:bg-dark-800 hover:text-white border border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-primary-400' : 'text-gray-500'}`} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-dark-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-gray-300">
            JD
          </div>
          <div className="text-left flex-1">
            <div className="text-sm font-medium text-white">John Doe</div>
            <div className="text-xs text-gray-500">Procurement Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
};
