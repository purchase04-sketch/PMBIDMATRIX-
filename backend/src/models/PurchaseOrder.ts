import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchaseOrder extends Document {
  poNumber: string;
  auctionRef: mongoose.Types.ObjectId;
  rfqRef: mongoose.Types.ObjectId;
  supplier: mongoose.Types.ObjectId;
  items: { name: string; quantity: number; unit: string; unitPrice: number; totalPrice: number; category: string }[];
  totalAmount: number;
  taxAmount: number;
  grandTotal: number;
  paymentTerms: string;
  deliveryTerms: string;
  deliveryDate: Date;
  status: 'draft' | 'approved' | 'sent' | 'acknowledged' | 'completed' | 'cancelled';
  approvalChain: { approver: mongoose.Types.ObjectId; status: string; remarks: string; date: Date }[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const POSchema = new Schema<IPurchaseOrder>({
  poNumber: { type: String, required: true, unique: true },
  auctionRef: { type: Schema.Types.ObjectId, ref: 'Auction' },
  rfqRef: { type: Schema.Types.ObjectId, ref: 'RFQ' },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, default: 'Nos' },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    category: { type: String, default: '' },
  }],
  totalAmount: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  grandTotal: { type: Number, default: 0 },
  paymentTerms: { type: String, default: 'Net 30' },
  deliveryTerms: { type: String, default: 'FOB' },
  deliveryDate: { type: Date },
  status: { type: String, enum: ['draft', 'approved', 'sent', 'acknowledged', 'completed', 'cancelled'], default: 'draft' },
  approvalChain: [{
    approver: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'pending' },
    remarks: { type: String, default: '' },
    date: { type: Date },
  }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

POSchema.pre('save', function (next) {
  if (!this.poNumber) { this.poNumber = `PO-${Date.now()}-${Math.floor(Math.random() * 1000)}`; }
  this.totalAmount = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  this.taxAmount = this.totalAmount * 0.18;
  this.grandTotal = this.totalAmount + this.taxAmount;
  next();
});

export default mongoose.model<IPurchaseOrder>('PurchaseOrder', POSchema);
