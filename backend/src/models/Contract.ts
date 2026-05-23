import mongoose, { Schema, Document } from 'mongoose';

export interface IContract extends Document {
  contractNumber: string;
  supplier: mongoose.Types.ObjectId;
  poReference: mongoose.Types.ObjectId;
  title: string;
  terms: string;
  startDate: Date;
  endDate: Date;
  value: number;
  status: 'draft' | 'active' | 'expired' | 'terminated' | 'renewed';
  renewalDate: Date;
  documents: { name: string; url: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const ContractSchema = new Schema<IContract>({
  contractNumber: { type: String, required: true, unique: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  poReference: { type: Schema.Types.ObjectId, ref: 'PurchaseOrder' },
  title: { type: String, required: true },
  terms: { type: String, default: '' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  value: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'active', 'expired', 'terminated', 'renewed'], default: 'draft' },
  renewalDate: { type: Date },
  documents: [{ name: String, url: String }],
}, { timestamps: true });

ContractSchema.pre('save', function (next) {
  if (!this.contractNumber) { this.contractNumber = `CON-${Date.now()}-${Math.floor(Math.random() * 1000)}`; }
  next();
});

export default mongoose.model<IContract>('Contract', ContractSchema);
