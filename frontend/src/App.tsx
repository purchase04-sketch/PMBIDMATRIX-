import React, { useState } from 'react';

// Pages
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { SupplierManagement } from './pages/SupplierManagement';
import { AuctionRoom } from './pages/AuctionRoom';
import { AICopilot } from './pages/AICopilot';
import { DigitalTwin } from './pages/DigitalTwin';
import { Analytics } from './pages/Analytics';
import { CommodityHedging } from './pages/CommodityHedging';
import { RFQManager } from './pages/RFQManager';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

type Page = 'executive' | 'buyer' | 'supplier' | 'rfq' | 'auction' | 'commodity' | 'copilot' | 'twin' | 'analytics' | 'login' | 'register';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('executive');
  const [isAuthenticated] = useState(true); // mock auth state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'executive': return <ExecutiveDashboard />;
      case 'buyer': return <BuyerDashboard />;
      case 'supplier': return <SupplierManagement />;
      case 'rfq': return <RFQManager />;
      case 'auction': return <AuctionRoom />;
      case 'commodity': return <CommodityHedging />;
      case 'copilot': return <AICopilot />;
      case 'twin': return <DigitalTwin />;
      case 'analytics': return <Analytics />;
      case 'login': return <Login />;
      case 'register': return <Register />;
      default: return <ExecutiveDashboard />;
    }
  };

  const navItems = [
    { id: 'executive', label: 'Executive Dashboard', icon: '📊' },
    { id: 'buyer', label: 'Buyer Workspace', icon: '🛒' },
    { id: 'supplier', label: 'Suppliers', icon: '🏭' },
    { id: 'rfq', label: 'RFQ Manager', icon: '📋' },
    { id: 'auction', label: 'Auction Room', icon: '🔴' },
    { id: 'commodity', label: 'Commodity & Hedging', icon: '📈' },
    { id: 'copilot', label: 'AI Copilot', icon: '🤖' },
    { id: 'twin', label: 'Digital Twin', icon: '🔬' },
    { id: 'analytics', label: 'Analytics', icon: '📉' },
  ];

  return (
    <div className="flex h-screen bg-dark-950 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-dark-900 border-r border-dark-800 flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="p-4 border-b border-dark-800 flex items-center justify-between">
          {!sidebarCollapsed && (
            <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              PMBIDMATRIX
            </h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-dark-800 text-gray-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        <nav className="flex-grow p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as Page)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                currentPage === item.id
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-gray-400 hover:bg-dark-800 hover:text-gray-200'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-dark-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm shadow-lg">
              AU
            </div>
            {!sidebarCollapsed && (
              <div>
                <div className="text-sm font-medium text-gray-200">Admin User</div>
                <div className="text-xs text-gray-500">CPO</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <Navbar />
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
