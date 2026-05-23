import { Request, Response } from 'express';

// Simulated scenarios for Digital Twin
const SCENARIOS = [
  { id: 'supplier_failure', name: 'Critical Supplier Failure', description: 'Simulates primary supplier going offline' },
  { id: 'price_spike', name: 'Commodity Price Spike (30%)', description: 'Sudden 30% increase in raw material prices' },
  { id: 'demand_surge', name: 'Demand Surge (300%)', description: 'Unexpected 3x increase in demand' },
  { id: 'port_closure', name: 'Port / Route Disruption', description: 'Major shipping route becomes unavailable' },
  { id: 'geopolitical', name: 'Geopolitical Sanctions', description: 'Trade sanctions affecting key supplier regions' },
];

export const getScenarios = (req: Request, res: Response) => {
  res.json(SCENARIOS);
};

export const runSimulation = (req: Request, res: Response) => {
  const { scenarioId, targetNode, durationMonths = 3 } = req.body;
  const scenario = SCENARIOS.find(s => s.id === scenarioId);
  if (!scenario) return res.status(400).json({ error: 'Invalid scenario' });

  // Simulate AI-driven impact analysis
  const baseImpact = Math.random() * 500000 + 100000;
  const delayDays = Math.floor(Math.random() * 30) + 7;
  const affectedCategories = ['Semiconductors', 'Auto Parts', 'Rare Earth Metals', 'Chemicals']
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 1);

  const result = {
    scenario: scenario.name,
    targetNode: targetNode || 'Primary Supply Chain Node',
    durationMonths,
    impactLevel: baseImpact > 350000 ? 'Critical' : baseImpact > 200000 ? 'High' : 'Medium',
    financialImpact: `$${(baseImpact / 1000).toFixed(0)}K`,
    delayImpact: `${delayDays} Days`,
    affectedCategories,
    alternativeSuppliers: Math.floor(Math.random() * 5) + 1,
    recommendations: [
      'Activate backup supplier contracts immediately',
      'Reroute logistics to alternative ports',
      'Increase safety stock for critical components',
      'Initiate forward hedging contracts for volatile commodities',
    ],
    riskCascade: {
      tier1Impact: 'Direct supply disruption',
      tier2Impact: 'Production line delays',
      tier3Impact: 'Customer delivery timeline extension'
    }
  };

  res.json(result);
};
