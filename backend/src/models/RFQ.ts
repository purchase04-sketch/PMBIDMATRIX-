import mongoose, { Schema, Document } from 'mongoose';

export interface IRFQ extends Document {
  rfqNumber: string;
  title: string;
  description: string;
  items: { name: string; description: string; quantity: number; unit: string; targetPrice: number; category: string }[];
  invitedSuppliers: mongoose.Types.ObjectId[];
  category: string;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'published' | 'evaluation' | 'awarded' | 'closed' | 'cancelled';
  evaluationCriteria: { criterion: string; weight: number }[];
  responses: { supplier: mongoose.Types.ObjectId; totalAmount: number; remarks: string; submittedAt: Date; items: { name: string; unitPrice: number; totalPrice: number }[] }[];
  awardedTo: mongoose.Types.ObjectId;
  attachments: { name: string; url: string }[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RFQSchema = new Schema<IRFQ>({
  rfqNumber: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  items: [{
    name: { type: String, required: true },
    description: { type: String, default: '' },
    quantity: { type: Number, required: true },
    unit: { type: String, default: 'Nos' },
    targetPrice: { type: Number, default: 0 },
    category: { type: String, default: '' },
  }],
  invitedSuppliers: [{ type: Schema.Types.ObjectId, ref: 'Supplier' }],
  category: { type: String, default: '' },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, enum: ['draft', 'published', 'evaluation', 'awarded', 'closed', 'cancelled'], default: 'draft' },
  evaluationCriteria: [{
    criterion: { type: String },
    weight: { type: Number },
  }],
  responses: [{
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    totalAmount: { type: Number, default: 0 },
    remarks: { type: String, default: '' },
    submittedAt: { type: Date },
    items: [{ name: String, unitPrice: Number, totalPrice: Number }],
  }],
  awardedTo: { type: Schema.Types.ObjectId, ref: 'Supplier' },
  attachments: [{ name: String, url: String }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

RFQSchema.pre('save', function (next) {
  if (!this.rfqNumber) { this.rfqNumber = `RFQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`; }
  next();
});

RFQSchema.index({ rfqNumber: 1 });
RFQSchema.index({ status: 1 });
RFQSchema.index({ category: 1 });

export default mongoose.model<IRFQ>('RFQ', RFQSchema);
