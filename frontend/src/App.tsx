import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* Top Navbar */}
      <nav className="h-16 border-b border-dark-800 bg-dark-900/80 backdrop-blur-md flex items-center px-6 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(20,184,166,0.4)]">
            PM
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">PM<span className="text-primary-500">BID</span>MATRIX</span>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Notifications</button>
          <button className="px-4 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-md transition-colors shadow-lg shadow-primary-500/20">Profile</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Header section */}
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Smart Procurement Intelligence</h1>
            <p className="text-dark-300 text-lg">AI-Powered RFQ, Reverse Auction & Oracle ERP Integrated Platform</p>
          </div>
          <button className="px-6 py-3 bg-white text-dark-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-xl">
            + New RFQ
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-panel p-6 glow-primary">
            <h3 className="text-gray-400 text-sm font-medium mb-1">Active Auctions</h3>
            <div className="text-4xl font-bold text-white">12</div>
            <div className="mt-4 text-sm text-primary-400 flex items-center gap-1">
              <span>↑ 2.5% from last month</span>
            </div>
          </div>
          <div className="glass-panel p-6">
            <h3 className="text-gray-400 text-sm font-medium mb-1">Pending PRs</h3>
            <div className="text-4xl font-bold text-white">45</div>
            <div className="mt-4 text-sm text-yellow-500 flex items-center gap-1">
              <span>Needs approval</span>
            </div>
          </div>
          <div className="glass-panel p-6">
            <h3 className="text-gray-400 text-sm font-medium mb-1">AI Savings Identified</h3>
            <div className="text-4xl font-bold text-primary-500">$2.4M</div>
            <div className="mt-4 text-sm text-gray-400 flex items-center gap-1">
              <span>Commodity Hedging & Reverse Auctions</span>
            </div>
          </div>
        </div>

        {/* Active Modules Map */}
        <div className="glass-panel p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Platform Modules</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['AI Copilot', 'Commodity Intelligence', 'Reverse Auctions', 'Oracle ERP Sync', 'Digital Twin', 'Supplier Risk', 'Contract Lifecycle', 'PO Management'].map(module => (
              <div key={module} className="p-4 rounded-lg border border-dark-800 bg-dark-900/50 hover:bg-dark-800 hover:border-primary-500/50 cursor-pointer transition-all group">
                <div className="h-8 w-8 rounded-full bg-dark-800 group-hover:bg-primary-500/20 mb-3 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-primary-500 group-hover:animate-pulse" />
                </div>
                <h4 className="font-medium text-gray-200 group-hover:text-primary-400 transition-colors">{module}</h4>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}

export default App
