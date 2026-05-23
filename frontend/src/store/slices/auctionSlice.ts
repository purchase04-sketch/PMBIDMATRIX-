import { create } from 'zustand';

export interface Bid {
  id: string;
  auctionId: string;
  supplierId: string;
  supplierName: string;
  amount: number;
  timestamp: string;
  rank: number;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  startTime: string;
  endTime: string;
  targetPrice: number;
  currentLowestBid: number;
  totalBids: number;
  participantCount: number;
  bids: Bid[];
  createdBy: string;
  antiSnipingEnabled: boolean;
  minDecrement: number;
}

export interface AuctionFilters {
  status: string;
  category: string;
  search: string;
}

export interface AuctionStore {
  auctions: Auction[];
  activeAuction: Auction | null;
  filters: AuctionFilters;
  loading: boolean;
  error: string | null;

  setAuctions: (auctions: Auction[]) => void;
  setActiveAuction: (auction: Auction | null) => void;
  addBid: (auctionId: string, bid: Bid) => void;
  updateFilters: (filters: Partial<AuctionFilters>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getFilteredAuctions: () => Auction[];
  createAuction: (auction: Auction) => void;
  updateAuctionStatus: (id: string, status: Auction['status']) => void;
}

export const useAuctionStore = create<AuctionStore>((set, get) => ({
  auctions: [
    {
      id: 'AUC-2026-001',
      title: 'Steel Coils 500MT - Reverse Auction',
      description: 'Reverse auction for procurement of 500 metric tons of hot rolled steel coils',
      category: 'Raw Materials',
      status: 'live',
      startTime: '2026-05-23T10:00:00Z',
      endTime: '2026-05-23T14:00:00Z',
      targetPrice: 16000,
      currentLowestBid: 15050,
      totalBids: 12,
      participantCount: 5,
      bids: [
        { id: 'B001', auctionId: 'AUC-2026-001', supplierId: 'SUP-001', supplierName: 'Global Metals Ltd.', amount: 15400, timestamp: '2026-05-23T10:45:01Z', rank: 3 },
        { id: 'B002', auctionId: 'AUC-2026-001', supplierId: 'SUP-089', supplierName: 'SteelForge Inc.', amount: 15200, timestamp: '2026-05-23T10:45:15Z', rank: 2 },
        { id: 'B003', auctionId: 'AUC-2026-001', supplierId: 'SUP-045', supplierName: 'Pacific Iron Works', amount: 15050, timestamp: '2026-05-23T10:46:02Z', rank: 1 },
      ],
      createdBy: 'John Doe',
      antiSnipingEnabled: true,
      minDecrement: 50,
    },
    {
      id: 'AUC-2026-002',
      title: 'IT Equipment Bulk Purchase',
      description: 'Laptops, monitors, and peripherals for Q3 refresh cycle',
      category: 'IT Hardware',
      status: 'live',
      startTime: '2026-05-23T09:00:00Z',
      endTime: '2026-05-23T17:00:00Z',
      targetPrice: 250000,
      currentLowestBid: 228500,
      totalBids: 8,
      participantCount: 4,
      bids: [
        { id: 'B010', auctionId: 'AUC-2026-002', supplierId: 'SUP-102', supplierName: 'TechHub Distribution', amount: 245000, timestamp: '2026-05-23T09:30:00Z', rank: 3 },
        { id: 'B011', auctionId: 'AUC-2026-002', supplierId: 'SUP-078', supplierName: 'DigiSupply Corp.', amount: 235000, timestamp: '2026-05-23T10:15:00Z', rank: 2 },
        { id: 'B012', auctionId: 'AUC-2026-002', supplierId: 'SUP-034', supplierName: 'NexGen Devices', amount: 228500, timestamp: '2026-05-23T11:00:00Z', rank: 1 },
      ],
      createdBy: 'Jane Smith',
      antiSnipingEnabled: true,
      minDecrement: 500,
    },
    {
      id: 'AUC-2026-003',
      title: 'Chemical Solvents - Annual Contract',
      description: 'Annual supply contract for industrial-grade chemical solvents',
      category: 'Chemicals',
      status: 'scheduled',
      startTime: '2026-05-25T10:00:00Z',
      endTime: '2026-05-25T16:00:00Z',
      targetPrice: 85000,
      currentLowestBid: 0,
      totalBids: 0,
      participantCount: 6,
      bids: [],
      createdBy: 'John Doe',
      antiSnipingEnabled: false,
      minDecrement: 100,
    },
    {
      id: 'AUC-2026-004',
      title: 'Office Furniture Procurement',
      description: 'Ergonomic office furniture for new headquarters expansion',
      category: 'Office Supplies',
      status: 'completed',
      startTime: '2026-05-20T09:00:00Z',
      endTime: '2026-05-20T15:00:00Z',
      targetPrice: 120000,
      currentLowestBid: 98500,
      totalBids: 15,
      participantCount: 7,
      bids: [
        { id: 'B020', auctionId: 'AUC-2026-004', supplierId: 'SUP-056', supplierName: 'ErgoSpace Solutions', amount: 98500, timestamp: '2026-05-20T14:55:00Z', rank: 1 },
      ],
      createdBy: 'Jane Smith',
      antiSnipingEnabled: true,
      minDecrement: 200,
    },
  ],
  activeAuction: null,
  filters: { status: 'all', category: 'all', search: '' },
  loading: false,
  error: null,

  setAuctions: (auctions) => set({ auctions }),
  setActiveAuction: (auction) => set({ activeAuction: auction }),

  addBid: (auctionId, bid) =>
    set((state) => ({
      auctions: state.auctions.map((a) =>
        a.id === auctionId
          ? {
              ...a,
              bids: [...a.bids, bid],
              totalBids: a.totalBids + 1,
              currentLowestBid: Math.min(a.currentLowestBid || Infinity, bid.amount),
            }
          : a
      ),
      activeAuction:
        state.activeAuction?.id === auctionId
          ? {
              ...state.activeAuction,
              bids: [...state.activeAuction.bids, bid],
              totalBids: state.activeAuction.totalBids + 1,
              currentLowestBid: Math.min(state.activeAuction.currentLowestBid || Infinity, bid.amount),
            }
          : state.activeAuction,
    })),

  updateFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  getFilteredAuctions: () => {
    const { auctions, filters } = get();
    return auctions.filter((a) => {
      if (filters.status !== 'all' && a.status !== filters.status) return false;
      if (filters.category !== 'all' && a.category !== filters.category) return false;
      if (filters.search && !a.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  },

  createAuction: (auction) =>
    set((state) => ({ auctions: [auction, ...state.auctions] })),

  updateAuctionStatus: (id, status) =>
    set((state) => ({
      auctions: state.auctions.map((a) => (a.id === id ? { ...a, status } : a)),
    })),
}));
