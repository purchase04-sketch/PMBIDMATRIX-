import mongoose, { Schema, Document } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  code: string;
  email: string;
  contactPerson: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  gstNumber: string;
  panNumber: string;
  categories: string[];
  rating: number;
  riskScore: number;
  status: 'pending' | 'approved' | 'blacklisted' | 'inactive';
  kycDocuments: { name: string; url: string; verified: boolean }[];
  bankDetails: { bankName: string; accountNumber: string; ifscCode: string; branch: string };
  performanceMetrics: {
    qualityScore: number;
    deliveryScore: number;
    priceCompetitiveness: number;
    responseTime: number;
    totalOrders: number;
    completedOrders: number;
  };
  registrationDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SupplierSchema = new Schema<ISupplier>({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  country: { type: String, default: 'India' },
  gstNumber: { type: String, default: '' },
  panNumber: { type: String, default: '' },
  categories: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  riskScore: { type: Number, default: 50, min: 0, max: 100 },
  status: { type: String, enum: ['pending', 'approved', 'blacklisted', 'inactive'], default: 'pending' },
  kycDocuments: [{
    name: { type: String },
    url: { type: String },
    verified: { type: Boolean, default: false },
  }],
  bankDetails: {
    bankName: { type: String, default: '' },
    accountNumber: { type: String, default: '' },
    ifscCode: { type: String, default: '' },
    branch: { type: String, default: '' },
  },
  performanceMetrics: {
    qualityScore: { type: Number, default: 0 },
    deliveryScore: { type: Number, default: 0 },
    priceCompetitiveness: { type: Number, default: 0 },
    responseTime: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
  },
  registrationDate: { type: Date, default: Date.now },
}, { timestamps: true });

SupplierSchema.index({ code: 1 });
SupplierSchema.index({ categories: 1 });
SupplierSchema.index({ status: 1 });
SupplierSchema.index({ rating: -1 });

export default mongoose.model<ISupplier>('Supplier', SupplierSchema);
