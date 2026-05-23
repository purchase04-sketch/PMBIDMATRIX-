import { create } from 'zustand';

export interface PricePoint {
  date: string;
  price: number;
  forecast?: number;
}

export interface Commodity {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  unit: string;
  priceHistory: PricePoint[];
  volatility: 'low' | 'medium' | 'high';
  aiPrediction: 'bullish' | 'bearish' | 'neutral';
  forecastConfidence: number;
}

export interface HedgingPosition {
  id: string;
  commodityId: string;
  commodityName: string;
  type: 'forward' | 'option' | 'swap';
  volume: number;
  unit: string;
  strikePrice: number;
  currentPrice: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'exercised';
  pnl: number;
}

export interface CommodityStore {
  commodities: Commodity[];
  hedgingPositions: HedgingPosition[];
  selectedCommodity: Commodity | null;
  loading: boolean;
  error: string | null;

  setCommodities: (commodities: Commodity[]) => void;
  selectCommodity: (commodity: Commodity | null) => void;
  updatePrice: (id: string, newPrice: number) => void;
  addHedgingPosition: (position: HedgingPosition) => void;
  removeHedgingPosition: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getTotalHedgingValue: () => number;
  getTotalPnL: () => number;
}

export const useCommodityStore = create<CommodityStore>((set, get) => ({
  commodities: [
    {
      id: 'COM-001',
      name: 'Hot Rolled Steel Coil',
      symbol: 'HRC',
      currentPrice: 4850,
      previousPrice: 4720,
      change: 130,
      changePercent: 2.75,
      unit: '$/MT',
      volatility: 'high',
      aiPrediction: 'bullish',
      forecastConfidence: 87,
      priceHistory: [
        { date: 'Jan', price: 4200, forecast: 4200 },
        { date: 'Feb', price: 4350, forecast: 4350 },
        { date: 'Mar', price: 4100, forecast: 4100 },
        { date: 'Apr', price: 4600, forecast: 4600 },
        { date: 'May', price: 4850, forecast: 4850 },
        { date: 'Jun', price: undefined as unknown as number, forecast: 5100 },
        { date: 'Jul', price: undefined as unknown as number, forecast: 5350 },
        { date: 'Aug', price: undefined as unknown as number, forecast: 5200 },
      ],
    },
    {
      id: 'COM-002',
      name: 'Copper Grade A',
      symbol: 'CU',
      currentPrice: 9245,
      previousPrice: 9380,
      change: -135,
      changePercent: -1.44,
      unit: '$/MT',
      volatility: 'medium',
      aiPrediction: 'bearish',
      forecastConfidence: 72,
      priceHistory: [
        { date: 'Jan', price: 8900 },
        { date: 'Feb', price: 9100 },
        { date: 'Mar', price: 9350 },
        { date: 'Apr', price: 9200 },
        { date: 'May', price: 9245 },
      ],
    },
    {
      id: 'COM-003',
      name: 'Aluminum Alloy',
      symbol: 'AL',
      currentPrice: 2540,
      previousPrice: 2510,
      change: 30,
      changePercent: 1.20,
      unit: '$/MT',
      volatility: 'low',
      aiPrediction: 'neutral',
      forecastConfidence: 65,
      priceHistory: [
        { date: 'Jan', price: 2400 },
        { date: 'Feb', price: 2450 },
        { date: 'Mar', price: 2480 },
        { date: 'Apr', price: 2510 },
        { date: 'May', price: 2540 },
      ],
    },
    {
      id: 'COM-004',
      name: 'Crude Oil (Brent)',
      symbol: 'BRENT',
      currentPrice: 82.5,
      previousPrice: 84.2,
      change: -1.7,
      changePercent: -2.02,
      unit: '$/bbl',
      volatility: 'high',
      aiPrediction: 'bearish',
      forecastConfidence: 68,
      priceHistory: [
        { date: 'Jan', price: 78 },
        { date: 'Feb', price: 80 },
        { date: 'Mar', price: 85 },
        { date: 'Apr', price: 84 },
        { date: 'May', price: 82.5 },
      ],
    },
    {
      id: 'COM-005',
      name: 'Natural Rubber',
      symbol: 'NR',
      currentPrice: 1.72,
      previousPrice: 1.68,
      change: 0.04,
      changePercent: 2.38,
      unit: '$/kg',
      volatility: 'medium',
      aiPrediction: 'bullish',
      forecastConfidence: 74,
      priceHistory: [
        { date: 'Jan', price: 1.55 },
        { date: 'Feb', price: 1.60 },
        { date: 'Mar', price: 1.58 },
        { date: 'Apr', price: 1.68 },
        { date: 'May', price: 1.72 },
      ],
    },
  ],

  hedgingPositions: [
    {
      id: 'HED-001',
      commodityId: 'COM-001',
      commodityName: 'Hot Rolled Steel Coil',
      type: 'forward',
      volume: 200,
      unit: 'MT',
      strikePrice: 4500,
      currentPrice: 4850,
      expiryDate: '2026-09-30',
      status: 'active',
      pnl: 70000,
    },
    {
      id: 'HED-002',
      commodityId: 'COM-002',
      commodityName: 'Copper Grade A',
      type: 'option',
      volume: 50,
      unit: 'MT',
      strikePrice: 9400,
      currentPrice: 9245,
      expiryDate: '2026-08-15',
      status: 'active',
      pnl: -7750,
    },
    {
      id: 'HED-003',
      commodityId: 'COM-004',
      commodityName: 'Crude Oil (Brent)',
      type: 'swap',
      volume: 10000,
      unit: 'bbl',
      strikePrice: 80,
      currentPrice: 82.5,
      expiryDate: '2026-12-31',
      status: 'active',
      pnl: 25000,
    },
  ],

  selectedCommodity: null,
  loading: false,
  error: null,

  setCommodities: (commodities) => set({ commodities }),
  selectCommodity: (commodity) => set({ selectedCommodity: commodity }),

  updatePrice: (id, newPrice) =>
    set((state) => ({
      commodities: state.commodities.map((c) =>
        c.id === id
          ? {
              ...c,
              previousPrice: c.currentPrice,
              currentPrice: newPrice,
              change: newPrice - c.currentPrice,
              changePercent: ((newPrice - c.currentPrice) / c.currentPrice) * 100,
            }
          : c
      ),
    })),

  addHedgingPosition: (position) =>
    set((state) => ({ hedgingPositions: [...state.hedgingPositions, position] })),

  removeHedgingPosition: (id) =>
    set((state) => ({
      hedgingPositions: state.hedgingPositions.filter((p) => p.id !== id),
    })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  getTotalHedgingValue: () => {
    const { hedgingPositions } = get();
    return hedgingPositions
      .filter((p) => p.status === 'active')
      .reduce((total, p) => total + p.strikePrice * p.volume, 0);
  },

  getTotalPnL: () => {
    const { hedgingPositions } = get();
    return hedgingPositions
      .filter((p) => p.status === 'active')
      .reduce((total, p) => total + p.pnl, 0);
  },
}));
