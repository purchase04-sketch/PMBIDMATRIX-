import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const mockPriceData = [
  { date: 'Jan', price: 4200, forecast: 4200 },
  { date: 'Feb', price: 4350, forecast: 4350 },
  { date: 'Mar', price: 4100, forecast: 4100 },
  { date: 'Apr', price: 4600, forecast: 4600 },
  { date: 'May', price: 4850, forecast: 4850 },
  { date: 'Jun', price: null, forecast: 5100 },
  { date: 'Jul', price: null, forecast: 5350 },
  { date: 'Aug', price: null, forecast: 5200 },
];

export const CommodityHedging: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Commodity Intelligence</h2>
          <p className="text-gray-400 text-sm mt-1">AI-driven price forecasting and hedging recommendations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Global Steel Index (HRC)</h3>
            <select className="bg-dark-900 border border-dark-800 rounded-md py-1 px-3 text-sm text-gray-300 focus:outline-none focus:border-primary-500">
              <option>Hot Rolled Coil (Steel)</option>
              <option>Copper Grade A</option>
              <option>Aluminum Alloy</option>
            </select>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPriceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} domain={['dataMin - 200', 'dataMax + 200']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="price" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                <Area type="monotone" dataKey="forecast" stroke="#eab308" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-500"></div><span className="text-gray-400">Historical Price</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span className="text-gray-400">AI Forecast (90% Confidence)</span></div>
          </div>
        </div>

        {/* AI Recommendation Panel */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 border-t-4 border-yellow-500">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="text-yellow-500 w-5 h-5" />
              <h3 className="font-semibold text-white">AI Hedging Alert</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Our predictive models indicate a <strong className="text-red-400">12% price surge</strong> in Steel HRC over the next 3 months due to constrained supply chains in Asia.
            </p>
            <div className="bg-dark-900 rounded-lg p-4 border border-dark-800">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Recommendation</div>
              <div className="text-lg font-bold text-white mb-3">Lock Volume Contract (6 Months)</div>
              <button className="w-full bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-500 border border-yellow-500/50 py-2 rounded-md font-medium transition-colors text-sm">
                Execute Forward Contract
              </button>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-semibold text-white mb-4">Market Indicators</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <TrendingUp className="text-red-400 w-4 h-4" /> 30-Day Volatility
                </div>
                <div className="font-semibold text-white">High (18%)</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <DollarSign className="text-green-400 w-4 h-4" /> Currency Impact
                </div>
                <div className="font-semibold text-white text-green-400">Favorable</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <AlertTriangle className="text-yellow-500 w-4 h-4" /> Geopolitical Risk
                </div>
                <div className="font-semibold text-white">Elevated</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
