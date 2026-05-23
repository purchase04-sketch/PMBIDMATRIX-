// Central store configuration - Re-exports all Zustand stores
// Using Zustand for lightweight, hook-based state management

export { useAuctionStore } from './slices/auctionSlice';
export { useRFQStore } from './slices/rfqSlice';
export { useCommodityStore } from './slices/commoditySlice';
export { useSupplierStore } from './slices/supplierSlice';
export { useAuthStore } from './slices/authSlice';

// Type re-exports for convenience
export type { Auction, Bid, AuctionFilters, AuctionStore } from './slices/auctionSlice';
export type { RFQ, RFQStore } from './slices/rfqSlice';
export type { Commodity, HedgingPosition, CommodityStore } from './slices/commoditySlice';
export type { Supplier, SupplierStore } from './slices/supplierSlice';
export type { User, AuthStore } from './slices/authSlice';
