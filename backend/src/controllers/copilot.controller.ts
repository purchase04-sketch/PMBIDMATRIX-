import { Request, Response } from 'express';

// Simulated AI Copilot with pattern-matched responses
const KNOWLEDGE_BASE: Record<string, string> = {
  'steel': 'Current HR Steel Coil price is ₹58,500/MT. Our AI models predict a 3-5% increase over the next 30 days due to rising iron ore costs and seasonal demand. Recommendation: Lock in forward contracts now.',
  'copper': 'LME Copper is trading at $8,420/MT. Volatility index is moderate (22%). Three approved suppliers have competitive pricing. Consider initiating a reverse auction for Q4 requirements.',
  'supplier': 'We have 1,248 registered suppliers. 14 are flagged as high-risk based on financial stability and delivery performance. Top performer: Tata Steel (score: 95/100).',
  'risk': 'Current supply chain risk score: 6.2/10 (Moderate). Primary risks: 1) Single-source dependency for rare earth metals, 2) Port congestion at Shanghai, 3) Currency fluctuation in EUR/INR.',
  'savings': 'YTD procurement savings: 14.2% (₹12.4 Cr). Reverse auctions contributed 62% of total savings. Top category: Metals (18.5% savings).',
  'rfq': 'There are currently 8 active RFQs. 3 are in evaluation phase, 2 are awaiting supplier responses, and 3 are in draft. The largest RFQ is IT Hardware Bulk (estimated ₹2.5 Cr).',
  'auction': 'We have 3 active auctions and 12 completed this quarter. Average participation: 6.2 suppliers per auction. Average savings from auctions: 15.8%.',
};

const findResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
    if (lowerQuery.includes(key)) return response;
  }
  return `Based on my analysis of your procurement data, I can help you with supplier evaluations, commodity price forecasting, RFQ optimization, and risk assessment. Could you provide more specific details about what you'd like to explore?`;
};

export const processQuery = (req: Request, res: Response) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  const response = findResponse(query);
  res.json({
    query,
    response,
    confidence: 0.87,
    sources: ['Internal Procurement DB', 'LME Market Feed', 'Supplier Risk Engine'],
    timestamp: new Date().toISOString()
  });
};

export const getSuggestions = (req: Request, res: Response) => {
  res.json([
    'Analyze steel price trends for next quarter',
    'Show me high-risk suppliers in Metals category',
    'Compare savings from last 5 reverse auctions',
    'Generate RFQ for IT hardware procurement',
    'Predict copper price movement for 30 days',
    'Summarize Q2 spend vs budget by department',
    'Which suppliers have pending KYC verification?',
    'Recommend hedging strategy for aluminum exposure',
  ]);
};
