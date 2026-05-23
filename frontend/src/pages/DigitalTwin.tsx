import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const DigitalTwin = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runSimulation = () => {
    setIsRunning(true);
    setResults(null);
    setTimeout(() => {
      setIsRunning(false);
      setResults({
        impactLevel: 'High',
        costIncrease: '$450,000',
        delayImpact: '14 Days',
        alternativeSuppliers: 3,
        affectedCategories: ['Semiconductors', 'Auto Parts']
      });
    }, 2500);
  };

  return (
    <div className="p-6 text-gray-100 bg-dark-950 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
          Digital Twin Supply Chain Simulator
        </h1>
        <p className="text-gray-400 mt-1">Stress-test your supply chain with predictive "What-If" scenarios</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Scenario Configurator */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              Scenario Configurator
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Disruption Type</label>
                <select className="w-full bg-dark-950 border border-dark-700 rounded-lg py-3 px-4 text-gray-100 focus:ring-teal-500 focus:border-teal-500">
                  <option>Supplier Insolvency / Bankruptcy</option>
                  <option>Geopolitical Conflict (Trade Route)</option>
                  <option>Natural Disaster (Port Closure)</option>
                  <option>Sudden Commodity Price Spike</option>
                  <option>Demand Surge (300%)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Target Node</label>
                <select className="w-full bg-dark-950 border border-dark-700 rounded-lg py-3 px-4 text-gray-100 focus:ring-teal-500 focus:border-teal-500">
                  <option>Supplier: Taiwan Semiconductor Mfg</option>
                  <option>Port: Port of Shanghai</option>
                  <option>Commodity: Rare Earth Metals</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Duration of Disruption</label>
                <input type="range" min="1" max="12" defaultValue="3" className="w-full accent-teal-500" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 Month</span>
                  <span>12 Months</span>
                </div>
              </div>

              <button 
                onClick={runSimulation}
                disabled={isRunning}
                className="w-full mt-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg font-bold hover:from-teal-500 hover:to-emerald-500 transition-all flex justify-center items-center"
              >
                {isRunning ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Simulating AI Models...
                  </>
                ) : 'Run Simulation'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Dashboard */}
        <div className="lg:col-span-8">
          <div className="bg-dark-900/50 backdrop-blur rounded-xl border border-dark-800 p-6 shadow-lg min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Background wireframe grid effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {!isRunning && !results && (
              <div className="text-center z-10">
                <svg className="w-16 h-16 text-dark-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <h3 className="text-xl font-medium text-gray-500">Awaiting Simulation Parameters</h3>
                <p className="text-sm text-gray-600 mt-2">Configure scenario on the left and run simulation to visualize impact.</p>
              </div>
            )}

            {isRunning && (
              <div className="z-10 text-center">
                <div className="w-32 h-32 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-xl font-bold text-teal-400 animate-pulse">Computing Risk Cascades...</h3>
                <p className="text-sm text-gray-400 mt-2 font-mono">Calculating multi-tier supplier dependencies</p>
              </div>
            )}

            {results && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full z-10"
              >
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-8 text-center">
                  <h3 className="text-red-400 font-bold uppercase tracking-wider">Critical Impact Detected</h3>
                  <p className="text-gray-300 mt-1">Losing this node disrupts 4 major production lines.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-dark-950 border border-dark-700 p-4 rounded-xl text-center">
                    <div className="text-sm text-gray-400">Financial Impact</div>
                    <div className="text-2xl font-bold text-red-400 mt-1">{results.costIncrease}</div>
                  </div>
                  <div className="bg-dark-950 border border-dark-700 p-4 rounded-xl text-center">
                    <div className="text-sm text-gray-400">Delay Impact</div>
                    <div className="text-2xl font-bold text-yellow-400 mt-1">{results.delayImpact}</div>
                  </div>
                  <div className="bg-dark-950 border border-dark-700 p-4 rounded-xl text-center">
                    <div className="text-sm text-gray-400">Affected Categories</div>
                    <div className="text-2xl font-bold text-orange-400 mt-1">{results.affectedCategories.length}</div>
                  </div>
                  <div className="bg-dark-950 border border-dark-700 p-4 rounded-xl text-center">
                    <div className="text-sm text-gray-400">Alt. Suppliers</div>
                    <div className="text-2xl font-bold text-teal-400 mt-1">{results.alternativeSuppliers}</div>
                  </div>
                </div>

                <div className="bg-dark-800/50 p-4 rounded-xl border border-dark-700">
                  <h4 className="font-semibold mb-3">AI Recommendations</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start"><svg className="w-5 h-5 text-teal-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Activate backup supplier contract with Intel Corp immediately.</li>
                    <li className="flex items-start"><svg className="w-5 h-5 text-teal-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Reroute maritime logistics to Port of Busan to avoid congestion delays.</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
