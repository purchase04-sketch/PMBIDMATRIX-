import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';

const riskData = [
  { subject: 'Financial', A: 85, fullMark: 100 },
  { subject: 'Geo-Political', A: 65, fullMark: 100 },
  { subject: 'Quality History', A: 90, fullMark: 100 },
  { subject: 'Delivery KPI', A: 78, fullMark: 100 },
  { subject: 'ESG Score', A: 60, fullMark: 100 },
];

export const SupplierRiskProfile: React.FC = () => {
  return (
    <div className="glass-panel p-6 w-full max-w-2xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">AI Risk Assessment</h2>
          <p className="text-gray-400 text-sm">Supplier: Global Metals Ltd.</p>
        </div>
        <div className="bg-dark-900 border border-dark-800 rounded-lg p-3 text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Composite Score</div>
          <div className="text-3xl font-bold text-yellow-500">76/100</div>
        </div>
      </div>

      <div className="h-64 w-full bg-dark-950 rounded-lg border border-dark-800 flex items-center justify-center p-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <Radar
              name="Risk Metrics"
              dataKey="A"
              stroke="#14b8a6"
              fill="#14b8a6"
              fillOpacity={0.3}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
              itemStyle={{ color: '#14b8a6' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-medium text-white">AI Copilot Insights</h3>
        <div className="bg-dark-900 border-l-4 border-yellow-500 p-3 rounded-r-md">
          <p className="text-sm text-gray-300">
            <span className="text-white font-semibold block mb-1">Attention Required</span>
            Recent geopolitical events in the supplier's primary manufacturing region have increased supply chain disruption risk by 15% over the next quarter. Consider hedging 20% of required volume.
          </p>
        </div>
      </div>
    </div>
  );
};
