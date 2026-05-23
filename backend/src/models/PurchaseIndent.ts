import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchaseIndent extends Document {
  piNumber: string;
  prReference: mongoose.Types.ObjectId;
  items: { name: string; description: string; quantity: number; unit: string; estimatedPrice: number; category: string }[];
  indentType: 'regular' | 'emergency' | 'capital';
  department: string;
  requestedDate: Date;
  requiredDate: Date;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  approvedBy: mongoose.Types.ObjectId;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
}

const PISchema = new Schema<IPurchaseIndent>({
  piNumber: { type: String, required: true, unique: true },
  prReference: { type: Schema.Types.ObjectId, ref: 'PurchaseRequisition' },
  items: [{
    name: { type: String, required: true },
    description: { type: String, default: '' },
    quantity: { type: Number, required: true },
    unit: { type: String, default: 'Nos' },
    estimatedPrice: { type: Number, default: 0 },
    category: { type: String, default: '' },
  }],
  indentType: { type: String, enum: ['regular', 'emergency', 'capital'], default: 'regular' },
  department: { type: String, required: true },
  requestedDate: { type: Date, default: Date.now },
  requiredDate: { type: Date, required: true },
  status: { type: String, enum: ['draft', 'submitted', 'approved', 'rejected'], default: 'draft' },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  remarks: { type: String, default: '' },
}, { timestamps: true });

PISchema.pre('save', function (next) {
  if (!this.piNumber) { this.piNumber = `PI-${Date.now()}-${Math.floor(Math.random() * 1000)}`; }
  next();
});

export default mongoose.model<IPurchaseIndent>('PurchaseIndent', PISchema);
