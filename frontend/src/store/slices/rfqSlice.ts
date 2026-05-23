import { create } from 'zustand';

export interface RFQ {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'draft' | 'published' | 'evaluation' | 'awarded' | 'cancelled';
  bidsReceived: number;
  deadline: string;
  budget: number;
  createdBy: string;
  createdAt: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  suppliers: string[];
}

export interface RFQStore {
  rfqs: RFQ[];
  selectedRFQ: RFQ | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;

  setRFQs: (rfqs: RFQ[]) => void;
  selectRFQ: (rfq: RFQ | null) => void;
  addRFQ: (rfq: RFQ) => void;
  updateRFQ: (id: string, updates: Partial<RFQ>) => void;
  deleteRFQ: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getFilteredRFQs: () => RFQ[];
  getStats: () => { total: number; active: number; awarded: number; cancelled: number };
}

export const useRFQStore = create<RFQStore>((set, get) => ({
  rfqs: [
    {
      id: 'RFQ-2026-081',
      title: 'Industrial Grade Bearings',
      description: 'High-precision bearings for manufacturing line upgrade',
      category: 'Mechanical Parts',
      status: 'published',
      bidsReceived: 4,
      deadline: '2026-05-28',
      budget: 45000,
      createdBy: 'John Doe',
      createdAt: '2026-05-15',
      assignedTo: 'John Doe',
      priority: 'high',
      suppliers: ['SUP-001', 'SUP-023', 'SUP-045'],
    },
    {
      id: 'RFQ-2026-082',
      title: 'IT Hardware Refresh',
      description: 'Laptops, monitors and peripherals for Q3 refresh cycle',
      category: 'IT Equipment',
      status: 'evaluation',
      bidsReceived: 12,
      deadline: '2026-05-20',
      budget: 280000,
      createdBy: 'Jane Smith',
      createdAt: '2026-05-10',
      assignedTo: 'Jane Smith',
      priority: 'medium',
      suppliers: ['SUP-034', 'SUP-078', 'SUP-102'],
    },
    {
      id: 'RFQ-2026-083',
      title: 'Chemical Solvents Q3',
      description: 'Industrial chemical solvents for manufacturing processes',
      category: 'Chemicals',
      status: 'draft',
      bidsReceived: 0,
      deadline: '2026-06-15',
      budget: 85000,
      createdBy: 'John Doe',
      createdAt: '2026-05-22',
      assignedTo: 'John Doe',
      priority: 'low',
      suppliers: [],
    },
    {
      id: 'RFQ-2026-079',
      title: 'Steel Coils 500MT',
      description: 'Hot rolled steel coils for Q3 production requirements',
      category: 'Raw Materials',
      status: 'awarded',
      bidsReceived: 7,
      deadline: '2026-05-10',
      budget: 320000,
      createdBy: 'Jane Smith',
      createdAt: '2026-04-28',
      assignedTo: 'Jane Smith',
      priority: 'critical',
      suppliers: ['SUP-001', 'SUP-045', 'SUP-089'],
    },
    {
      id: 'RFQ-2026-084',
      title: 'PPE Safety Equipment',
      description: 'Personal protective equipment for site operations',
      category: 'Safety',
      status: 'published',
      bidsReceived: 3,
      deadline: '2026-06-01',
      budget: 52000,
      createdBy: 'John Doe',
      createdAt: '2026-05-18',
      assignedTo: 'John Doe',
      priority: 'medium',
      suppliers: ['SUP-012', 'SUP-067'],
    },
    {
      id: 'RFQ-2026-085',
      title: 'Logistics Fleet Maintenance',
      description: 'Annual maintenance contract for logistics fleet vehicles',
      category: 'Services',
      status: 'published',
      bidsReceived: 6,
      deadline: '2026-06-05',
      budget: 175000,
      createdBy: 'Jane Smith',
      createdAt: '2026-05-19',
      assignedTo: 'Jane Smith',
      priority: 'high',
      suppliers: ['SUP-090', 'SUP-115', 'SUP-122'],
    },
  ],
  selectedRFQ: null,
  loading: false,
  error: null,
  searchQuery: '',

  setRFQs: (rfqs) => set({ rfqs }),
  selectRFQ: (rfq) => set({ selectedRFQ: rfq }),
  addRFQ: (rfq) => set((state) => ({ rfqs: [rfq, ...state.rfqs] })),

  updateRFQ: (id, updates) =>
    set((state) => ({
      rfqs: state.rfqs.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),

  deleteRFQ: (id) =>
    set((state) => ({ rfqs: state.rfqs.filter((r) => r.id !== id) })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  getFilteredRFQs: () => {
    const { rfqs, searchQuery } = get();
    if (!searchQuery) return rfqs;
    const q = searchQuery.toLowerCase();
    return rfqs.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  },

  getStats: () => {
    const { rfqs } = get();
    return {
      total: rfqs.length,
      active: rfqs.filter((r) => ['published', 'evaluation'].includes(r.status)).length,
      awarded: rfqs.filter((r) => r.status === 'awarded').length,
      cancelled: rfqs.filter((r) => r.status === 'cancelled').length,
    };
  },
}));
