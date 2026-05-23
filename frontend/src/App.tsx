import { Sidebar } from './components/Sidebar';
import { AuctionBoard } from './components/AuctionBoard';
import { SupplierRiskProfile } from './components/SupplierRiskProfile';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 flex font-sans text-gray-100 selection:bg-primary-500/30 selection:text-primary-200">
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-dark-800 bg-dark-950/80 backdrop-blur-md flex items-center px-8 justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white">Dashboard Overview</h1>
            <span className="px-3 py-1 bg-dark-800 border border-dark-700 rounded-full text-xs font-medium text-gray-400">
              Q3 2026 Active
            </span>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">Help</button>
            <button className="px-4 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-500 text-white rounded-md transition-colors shadow-[0_0_15px_rgba(20,184,166,0.2)]">
              + New Initiative
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Active RFQs', value: '24', trend: '+12%', color: 'text-white' },
              { label: 'Live Auctions', value: '4', trend: '+1', color: 'text-primary-400' },
              { label: 'High Risk Suppliers', value: '3', trend: '-2', color: 'text-red-400' },
              { label: 'Projected Savings', value: '$1.2M', trend: '+15%', color: 'text-green-400' }
            ].map((metric, i) => (
              <div key={i} className="glass-panel p-5">
                <h3 className="text-gray-400 text-sm font-medium mb-2">{metric.label}</h3>
                <div className="flex items-end gap-3">
                  <div className={`text-3xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-sm text-gray-500 mb-1">{metric.trend}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AuctionBoard auctionId="AUC-1920-44" />
            <SupplierRiskProfile />
          </div>

        </div>
      </main>
    </div>
  )
}

export default App;
