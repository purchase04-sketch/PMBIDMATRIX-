import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'buyer' | 'supplier' | 'executive';
  department: string;
  avatar?: string;
  permissions: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  notifications: Notification[];
  darkMode: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setToken: (token: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  clearNotifications: () => void;
  toggleDarkMode: () => void;
  getUnreadCount: () => number;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: {
    id: 'USR-001',
    name: 'John Doe',
    email: 'john.doe@pmbidmatrix.com',
    role: 'executive',
    department: 'Strategic Procurement',
    avatar: undefined,
    permissions: ['view_dashboard', 'manage_rfq', 'manage_auctions', 'manage_suppliers', 'view_analytics', 'ai_copilot', 'digital_twin'],
  },
  token: 'mock-jwt-token-xyz-123',
  isAuthenticated: true,

  notifications: [
    {
      id: 'N001',
      title: 'Auction Ending Soon',
      message: 'Steel Coils auction AUC-2026-001 ends in 30 minutes',
      type: 'warning',
      read: false,
      timestamp: '2026-05-23T13:30:00Z',
    },
    {
      id: 'N002',
      title: 'New Bid Received',
      message: 'Pacific Iron Works placed a bid of $15,050 on AUC-2026-001',
      type: 'info',
      read: false,
      timestamp: '2026-05-23T10:46:02Z',
    },
    {
      id: 'N003',
      title: 'RFQ Awarded',
      message: 'RFQ-2026-079 for Steel Coils 500MT has been awarded',
      type: 'success',
      read: false,
      timestamp: '2026-05-22T16:00:00Z',
    },
    {
      id: 'N004',
      title: 'Supplier Risk Alert',
      message: 'SteelForge Inc. risk score dropped below threshold',
      type: 'error',
      read: true,
      timestamp: '2026-05-21T09:15:00Z',
    },
    {
      id: 'N005',
      title: 'Price Alert',
      message: 'Steel HRC price surged 2.75% - hedging recommended',
      type: 'warning',
      read: true,
      timestamp: '2026-05-20T14:00:00Z',
    },
  ],

  darkMode: true,

  login: (user, token) =>
    set({ user, token, isAuthenticated: true }),

  logout: () =>
    set({ user: null, token: null, isAuthenticated: false }),

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  setToken: (token) => set({ token }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  clearNotifications: () => set({ notifications: [] }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.read).length;
  },
}));
