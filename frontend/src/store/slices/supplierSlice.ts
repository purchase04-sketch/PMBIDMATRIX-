import { create } from 'zustand';

export interface PerformanceRecord {
  month: string;
  onTimeDelivery: number;
  qualityScore: number;
  responsiveness: number;
}

export interface RiskMetrics {
  financial: number;
  geopolitical: number;
  qualityHistory: number;
  deliveryKPI: number;
  esgScore: number;
  compositeScore: number;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  city: string;
  category: string[];
  contactEmail: string;
  contactPhone: string;
  status: 'active' | 'inactive' | 'blacklisted' | 'pending';
  riskLevel: 'low' | 'medium' | 'high';
  riskMetrics: RiskMetrics;
  performanceHistory: PerformanceRecord[];
  totalContracts: number;
  totalSpend: number;
  onTimeDeliveryRate: number;
  qualityRating: number;
  joinedDate: string;
  lastAuditDate: string;
  certifications: string[];
}

export interface SupplierStore {
  suppliers: Supplier[];
  selectedSupplier: Supplier | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filterRiskLevel: string;

  setSuppliers: (suppliers: Supplier[]) => void;
  selectSupplier: (supplier: Supplier | null) => void;
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  removeSupplier: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterRiskLevel: (level: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getFilteredSuppliers: () => Supplier[];
}

const mockPerformance: PerformanceRecord[] = [
  { month: 'Jan', onTimeDelivery: 92, qualityScore: 88, responsiveness: 85 },
  { month: 'Feb', onTimeDelivery: 95, qualityScore: 90, responsiveness: 88 },
  { month: 'Mar', onTimeDelivery: 88, qualityScore: 92, responsiveness: 90 },
  { month: 'Apr', onTimeDelivery: 94, qualityScore: 85, responsiveness: 87 },
  { month: 'May', onTimeDelivery: 91, qualityScore: 93, responsiveness: 92 },
];

export const useSupplierStore = create<SupplierStore>((set, get) => ({
  suppliers: [
    {
      id: 'SUP-001',
      name: 'Global Metals Ltd.',
      country: 'India',
      city: 'Mumbai',
      category: ['Raw Materials', 'Steel', 'Metals'],
      contactEmail: 'procurement@globalmetals.com',
      contactPhone: '+91 22 4567 8900',
      status: 'active',
      riskLevel: 'medium',
      riskMetrics: { financial: 85, geopolitical: 65, qualityHistory: 90, deliveryKPI: 78, esgScore: 60, compositeScore: 76 },
      performanceHistory: mockPerformance,
      totalContracts: 24,
      totalSpend: 2450000,
      onTimeDeliveryRate: 92,
      qualityRating: 4.2,
      joinedDate: '2022-03-15',
      lastAuditDate: '2026-01-20',
      certifications: ['ISO 9001', 'ISO 14001'],
    },
    {
      id: 'SUP-023',
      name: 'TechHub Distribution',
      country: 'USA',
      city: 'Austin',
      category: ['IT Equipment', 'Electronics'],
      contactEmail: 'sales@techhub.com',
      contactPhone: '+1 512 555 0199',
      status: 'active',
      riskLevel: 'low',
      riskMetrics: { financial: 92, geopolitical: 95, qualityHistory: 88, deliveryKPI: 94, esgScore: 85, compositeScore: 91 },
      performanceHistory: mockPerformance.map((p) => ({ ...p, onTimeDelivery: p.onTimeDelivery + 3, qualityScore: p.qualityScore + 2 })),
      totalContracts: 18,
      totalSpend: 1890000,
      onTimeDeliveryRate: 97,
      qualityRating: 4.7,
      joinedDate: '2021-06-01',
      lastAuditDate: '2026-03-10',
      certifications: ['ISO 9001', 'ISO 27001', 'SOC 2'],
    },
    {
      id: 'SUP-045',
      name: 'Pacific Iron Works',
      country: 'Japan',
      city: 'Osaka',
      category: ['Raw Materials', 'Steel'],
      contactEmail: 'b2b@pacificiron.jp',
      contactPhone: '+81 6 1234 5678',
      status: 'active',
      riskLevel: 'low',
      riskMetrics: { financial: 95, geopolitical: 88, qualityHistory: 96, deliveryKPI: 92, esgScore: 90, compositeScore: 92 },
      performanceHistory: mockPerformance.map((p) => ({ ...p, onTimeDelivery: p.onTimeDelivery + 5, qualityScore: p.qualityScore + 4 })),
      totalContracts: 32,
      totalSpend: 4200000,
      onTimeDeliveryRate: 98,
      qualityRating: 4.9,
      joinedDate: '2020-01-10',
      lastAuditDate: '2026-02-28',
      certifications: ['ISO 9001', 'ISO 14001', 'IATF 16949'],
    },
    {
      id: 'SUP-067',
      name: 'ChemTrade Industries',
      country: 'Germany',
      city: 'Frankfurt',
      category: ['Chemicals', 'Solvents'],
      contactEmail: 'orders@chemtrade.de',
      contactPhone: '+49 69 555 0200',
      status: 'active',
      riskLevel: 'medium',
      riskMetrics: { financial: 80, geopolitical: 72, qualityHistory: 85, deliveryKPI: 82, esgScore: 78, compositeScore: 79 },
      performanceHistory: mockPerformance,
      totalContracts: 15,
      totalSpend: 890000,
      onTimeDeliveryRate: 88,
      qualityRating: 4.0,
      joinedDate: '2023-05-20',
      lastAuditDate: '2025-11-15',
      certifications: ['ISO 9001', 'REACH', 'GMP'],
    },
    {
      id: 'SUP-089',
      name: 'SteelForge Inc.',
      country: 'China',
      city: 'Shanghai',
      category: ['Raw Materials', 'Steel', 'Metals'],
      contactEmail: 'export@steelforge.cn',
      contactPhone: '+86 21 6789 0123',
      status: 'active',
      riskLevel: 'high',
      riskMetrics: { financial: 70, geopolitical: 45, qualityHistory: 75, deliveryKPI: 68, esgScore: 42, compositeScore: 60 },
      performanceHistory: mockPerformance.map((p) => ({ ...p, onTimeDelivery: p.onTimeDelivery - 8, qualityScore: p.qualityScore - 5 })),
      totalContracts: 8,
      totalSpend: 1200000,
      onTimeDeliveryRate: 78,
      qualityRating: 3.4,
      joinedDate: '2024-02-14',
      lastAuditDate: '2025-08-30',
      certifications: ['ISO 9001'],
    },
    {
      id: 'SUP-102',
      name: 'NexGen Devices',
      country: 'Taiwan',
      city: 'Taipei',
      category: ['IT Equipment', 'Electronics', 'Components'],
      contactEmail: 'b2b@nexgendevices.tw',
      contactPhone: '+886 2 5555 1234',
      status: 'active',
      riskLevel: 'medium',
      riskMetrics: { financial: 82, geopolitical: 55, qualityHistory: 91, deliveryKPI: 86, esgScore: 72, compositeScore: 77 },
      performanceHistory: mockPerformance.map((p) => ({ ...p, onTimeDelivery: p.onTimeDelivery + 1 })),
      totalContracts: 12,
      totalSpend: 1560000,
      onTimeDeliveryRate: 91,
      qualityRating: 4.3,
      joinedDate: '2023-09-01',
      lastAuditDate: '2026-01-05',
      certifications: ['ISO 9001', 'ISO 14001', 'RoHS'],
    },
    {
      id: 'SUP-115',
      name: 'GreenPack Solutions',
      country: 'Netherlands',
      city: 'Rotterdam',
      category: ['Packaging', 'Sustainable Materials'],
      contactEmail: 'sales@greenpack.nl',
      contactPhone: '+31 10 555 0345',
      status: 'pending',
      riskLevel: 'low',
      riskMetrics: { financial: 88, geopolitical: 92, qualityHistory: 85, deliveryKPI: 90, esgScore: 96, compositeScore: 90 },
      performanceHistory: [],
      totalContracts: 0,
      totalSpend: 0,
      onTimeDeliveryRate: 0,
      qualityRating: 0,
      joinedDate: '2026-05-01',
      lastAuditDate: '',
      certifications: ['ISO 9001', 'ISO 14001', 'FSC', 'B-Corp'],
    },
    {
      id: 'SUP-122',
      name: 'RapidLogistics Co.',
      country: 'Singapore',
      city: 'Singapore',
      category: ['Logistics', 'Services'],
      contactEmail: 'corporate@rapidlog.sg',
      contactPhone: '+65 6789 0456',
      status: 'inactive',
      riskLevel: 'high',
      riskMetrics: { financial: 55, geopolitical: 80, qualityHistory: 62, deliveryKPI: 58, esgScore: 50, compositeScore: 61 },
      performanceHistory: mockPerformance.map((p) => ({ ...p, onTimeDelivery: p.onTimeDelivery - 15, qualityScore: p.qualityScore - 10 })),
      totalContracts: 5,
      totalSpend: 340000,
      onTimeDeliveryRate: 72,
      qualityRating: 2.8,
      joinedDate: '2024-07-01',
      lastAuditDate: '2025-12-01',
      certifications: ['ISO 9001'],
    },
  ],
  selectedSupplier: null,
  loading: false,
  error: null,
  searchQuery: '',
  filterRiskLevel: 'all',

  setSuppliers: (suppliers) => set({ suppliers }),
  selectSupplier: (supplier) => set({ selectedSupplier: supplier }),

  addSupplier: (supplier) =>
    set((state) => ({ suppliers: [supplier, ...state.suppliers] })),

  updateSupplier: (id, updates) =>
    set((state) => ({
      suppliers: state.suppliers.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),

  removeSupplier: (id) =>
    set((state) => ({ suppliers: state.suppliers.filter((s) => s.id !== id) })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterRiskLevel: (level) => set({ filterRiskLevel: level }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  getFilteredSuppliers: () => {
    const { suppliers, searchQuery, filterRiskLevel } = get();
    return suppliers.filter((s) => {
      if (filterRiskLevel !== 'all' && s.riskLevel !== filterRiskLevel) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q) ||
          s.category.some((c) => c.toLowerCase().includes(q))
        );
      }
      return true;
    });
  },
}));
