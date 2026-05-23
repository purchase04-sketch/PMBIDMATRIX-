import crypto from 'crypto';

/**
 * Generate a unique ID with a prefix
 */
export const generateId = (prefix: string): string => {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
};

/**
 * Generate sequential numbers for PO, PR, RFQ, PI
 */
export const generateSequentialNumber = (prefix: string, sequence: number): string => {
  return `${prefix}-${new Date().getFullYear()}-${String(sequence).padStart(6, '0')}`;
};

/**
 * Format currency values
 */
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Calculate supplier risk score (0-100)
 */
export const calculateRiskScore = (metrics: {
  financialHealth: number;    // 0-100
  deliveryReliability: number; // 0-100
  qualityScore: number;       // 0-100
  complianceScore: number;    // 0-100
  geoPoliticalRisk: number;   // 0-100
}): number => {
  const weights = {
    financialHealth: 0.25,
    deliveryReliability: 0.25,
    qualityScore: 0.20,
    complianceScore: 0.15,
    geoPoliticalRisk: 0.15,
  };

  return Math.round(
    metrics.financialHealth * weights.financialHealth +
    metrics.deliveryReliability * weights.deliveryReliability +
    metrics.qualityScore * weights.qualityScore +
    metrics.complianceScore * weights.complianceScore +
    (100 - metrics.geoPoliticalRisk) * weights.geoPoliticalRisk
  );
};

/**
 * Calculate savings percentage
 */
export const calculateSavings = (estimatedCost: number, finalCost: number): number => {
  if (estimatedCost === 0) return 0;
  return Math.round(((estimatedCost - finalCost) / estimatedCost) * 100 * 100) / 100;
};

/**
 * Parse pagination query params
 */
export const parsePagination = (query: { page?: string; limit?: string }) => {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '20', 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

/**
 * Build filter query from request params
 */
export const buildFilterQuery = (filters: Record<string, any>, allowedFields: string[]): Record<string, any> => {
  const query: Record<string, any> = {};
  
  for (const field of allowedFields) {
    if (filters[field] !== undefined && filters[field] !== '') {
      if (typeof filters[field] === 'string' && !field.includes('Date') && !field.includes('Id')) {
        query[field] = { $regex: filters[field], $options: 'i' };
      } else {
        query[field] = filters[field];
      }
    }
  }

  return query;
};

/**
 * Validate anti-sniping rules for auctions
 */
export const checkAntiSniping = (
  auctionEndTime: Date,
  currentTime: Date = new Date(),
  antiSnipingWindowMinutes: number = 2,
  extensionMinutes: number = 2
): { shouldExtend: boolean; newEndTime: Date } => {
  const timeRemaining = auctionEndTime.getTime() - currentTime.getTime();
  const windowMs = antiSnipingWindowMinutes * 60 * 1000;

  if (timeRemaining > 0 && timeRemaining <= windowMs) {
    const newEndTime = new Date(auctionEndTime.getTime() + extensionMinutes * 60 * 1000);
    return { shouldExtend: true, newEndTime };
  }

  return { shouldExtend: false, newEndTime: auctionEndTime };
};

/**
 * Validate bid amount against auction rules
 */
export const validateBidAmount = (
  bidAmount: number,
  currentBestBid: number,
  minDecrement: number,
  reservePrice?: number
): { valid: boolean; message: string } => {
  if (bidAmount <= 0) {
    return { valid: false, message: 'Bid amount must be positive' };
  }

  if (reservePrice && bidAmount < reservePrice) {
    return { valid: false, message: `Bid cannot be below reserve price of ${formatCurrency(reservePrice)}` };
  }

  if (currentBestBid > 0) {
    const maxAllowedBid = currentBestBid - minDecrement;
    if (bidAmount > maxAllowedBid) {
      return {
        valid: false,
        message: `Bid must be at least ${formatCurrency(minDecrement)} less than current best bid of ${formatCurrency(currentBestBid)}`
      };
    }
  }

  return { valid: true, message: 'Valid bid' };
};

/**
 * Calculate commodity price volatility
 */
export const calculateVolatility = (priceHistory: number[]): number => {
  if (priceHistory.length < 2) return 0;
  
  const returns = [];
  for (let i = 1; i < priceHistory.length; i++) {
    returns.push(Math.log(priceHistory[i] / priceHistory[i - 1]));
  }

  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
  
  return Math.round(Math.sqrt(variance * 252) * 100 * 100) / 100; // Annualized volatility %
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};
