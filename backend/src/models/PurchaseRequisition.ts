import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchaseRequisition extends Document {
  prNumber: string;
  requestedBy: mongoose.Types.ObjectId;
  department: string;
  items: {
    name: string;
    description: string;
    quantity: number;
    unit: string;
    estimatedPrice: number;
    category: string;
  }[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'converted';
  approvalChain: {
    approver: mongoose.Types.ObjectId;
    status: string;
    remarks: string;
    date: Date;
  }[];
  totalEstimatedValue: number;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
}

const PRSchema = new Schema<IPurchaseRequisition>({
  prNumber: { type: String, required: true, unique: true },
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String, required: true },
  items: [{
    name: { type: String, required: true },
    description: { type: String, default: '' },
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String, default: 'Nos' },
    estimatedPrice: { type: Number, default: 0 },
    category: { type: String, default: '' },
  }],
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  status: { type: String, enum: ['draft', 'submitted', 'approved', 'rejected', 'converted'], default: 'draft' },
  approvalChain: [{
    approver: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'pending' },
    remarks: { type: String, default: '' },
    date: { type: Date },
  }],
  totalEstimatedValue: { type: Number, default: 0 },
  remarks: { type: String, default: '' },
}, { timestamps: true });

PRSchema.pre('save', function (next) {
  if (!this.prNumber) {
    this.prNumber = `PR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  this.totalEstimatedValue = this.items.reduce((sum, item) => sum + (item.estimatedPrice * item.quantity), 0);
  next();
});

PRSchema.index({ prNumber: 1 });
PRSchema.index({ status: 1 });
PRSchema.index({ department: 1 });

export default mongoose.model<IPurchaseRequisition>('PurchaseRequisition', PRSchema);
