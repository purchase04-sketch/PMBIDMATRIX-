import mongoose, { Schema, Document } from 'mongoose';

export interface ICommodityRisk extends Document {
  name: string;
  category: 'steel' | 'copper' | 'aluminum' | 'chemicals' | 'paints' | 'rubber' | 'bearings' | 'fasteners' | 'oil_seals' | 'electrical';
  currentPrice: number;
  previousPrice: number;
  priceHistory: { price: number; date: Date }[];
  volatilityPercent: number;
  riskScore: number;
  trendDirection: 'up' | 'down' | 'stable';
  hedgingRecommendation: 'buy_now' | 'wait' | 'partial_buy' | 'price_lock' | 'volume_lock';
  marketIntelligence: string;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CommodityRiskSchema = new Schema<ICommodityRisk>({
  name: { type: String, required: true, unique: true },
  category: { type: String, enum: ['steel', 'copper', 'aluminum', 'chemicals', 'paints', 'rubber', 'bearings', 'fasteners', 'oil_seals', 'electrical'], required: true },
  currentPrice: { type: Number, required: true },
  previousPrice: { type: Number, default: 0 },
  priceHistory: [{ price: Number, date: { type: Date, default: Date.now } }],
  volatilityPercent: { type: Number, default: 0 },
  riskScore: { type: Number, default: 50, min: 0, max: 100 },
  trendDirection: { type: String, enum: ['up', 'down', 'stable'], default: 'stable' },
  hedgingRecommendation: { type: String, enum: ['buy_now', 'wait', 'partial_buy', 'price_lock', 'volume_lock'], default: 'wait' },
  marketIntelligence: { type: String, default: '' },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

CommodityRiskSchema.index({ category: 1 });
CommodityRiskSchema.index({ riskScore: -1 });

export default mongoose.model<ICommodityRisk>('CommodityRisk', CommodityRiskSchema);
