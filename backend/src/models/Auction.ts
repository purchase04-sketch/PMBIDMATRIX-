import mongoose, { Schema, Document } from 'mongoose';

export interface IAuction extends Document {
  auctionNumber: string;
  rfqReference: mongoose.Types.ObjectId;
  type: 'reverse' | 'forward' | 'multi-lot' | 'sealed';
  title: string;
  description: string;
  items: { name: string; quantity: number; unit: string; startingPrice: number; category: string }[];
  participants: mongoose.Types.ObjectId[];
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
  rules: {
    minDecrement: number;
    maxDecrement: number;
    antiSnipingMins: number;
    reservePrice: number;
    autoExtend: boolean;
    extensionMins: number;
  };
  currentBestBid: number;
  currentBestBidder: mongoose.Types.ObjectId;
  totalBids: number;
  winner: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AuctionSchema = new Schema<IAuction>({
  auctionNumber: { type: String, required: true, unique: true },
  rfqReference: { type: Schema.Types.ObjectId, ref: 'RFQ' },
  type: { type: String, enum: ['reverse', 'forward', 'multi-lot', 'sealed'], default: 'reverse' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, default: 'Nos' },
    startingPrice: { type: Number, required: true },
    category: { type: String, default: '' },
  }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'Supplier' }],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'active', 'paused', 'completed', 'cancelled'], default: 'scheduled' },
  rules: {
    minDecrement: { type: Number, default: 100 },
    maxDecrement: { type: Number, default: 10000 },
    antiSnipingMins: { type: Number, default: 2 },
    reservePrice: { type: Number, default: 0 },
    autoExtend: { type: Boolean, default: true },
    extensionMins: { type: Number, default: 2 },
  },
  currentBestBid: { type: Number, default: 0 },
  currentBestBidder: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  totalBids: { type: Number, default: 0 },
  winner: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

AuctionSchema.pre('save', function (next) {
  if (!this.auctionNumber) { this.auctionNumber = `AUC-${Date.now()}-${Math.floor(Math.random() * 1000)}`; }
  next();
});

AuctionSchema.index({ status: 1 });
AuctionSchema.index({ startTime: 1 });
AuctionSchema.index({ endTime: 1 });

export default mongoose.model<IAuction>('Auction', AuctionSchema);
