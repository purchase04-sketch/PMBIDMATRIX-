import mongoose, { Schema, Document } from 'mongoose';

export interface IBid extends Document {
  auctionId: mongoose.Types.ObjectId;
  supplierId: mongoose.Types.ObjectId;
  amount: number;
  previousAmount: number;
  rank: number;
  timestamp: Date;
  isAutoBid: boolean;
  notes: string;
  isValid: boolean;
  bidHistory: { amount: number; timestamp: Date }[];
}

const BidSchema = new Schema<IBid>({
  auctionId: { type: Schema.Types.ObjectId, ref: 'Auction', required: true },
  supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  amount: { type: Number, required: true },
  previousAmount: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  isAutoBid: { type: Boolean, default: false },
  notes: { type: String, default: '' },
  isValid: { type: Boolean, default: true },
  bidHistory: [{ amount: Number, timestamp: { type: Date, default: Date.now } }],
}, { timestamps: true });

BidSchema.index({ auctionId: 1, supplierId: 1 });
BidSchema.index({ auctionId: 1, amount: 1 });

export default mongoose.model<IBid>('Bid', BidSchema);
