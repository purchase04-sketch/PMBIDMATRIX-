import React from 'react';

export const Navbar = () => {
  return (
    <nav className="h-16 border-b border-dark-800 bg-dark-950 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          PMBIDMATRIX
        </div>
      </div>
      
      <div className="flex-grow max-w-xl mx-8">
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text" 
            placeholder="Search suppliers, RFQs, auctions..." 
            className="w-full bg-dark-900 border border-dark-700 rounded-lg py-2 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-white relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </button>
        
        <div className="flex items-center space-x-3 border-l border-dark-800 pl-6 cursor-pointer">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-gray-200">Admin User</div>
            <div className="text-xs text-indigo-400">Chief Procurement Officer</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
            AU
          </div>
        </div>
      </div>
    </nav>
  );
};
