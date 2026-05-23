import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'rfq' | 'auction' | 'approval' | 'supplier' | 'system' | 'alert' | 'commodity';
  title: string;
  message: string;
  channel: 'email' | 'sms' | 'push' | 'in-app' | 'whatsapp';
  status: 'pending' | 'sent' | 'read' | 'failed';
  relatedEntity: { entityType: string; entityId: mongoose.Types.ObjectId };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['rfq', 'auction', 'approval', 'supplier', 'system', 'alert', 'commodity'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  channel: { type: String, enum: ['email', 'sms', 'push', 'in-app', 'whatsapp'], default: 'in-app' },
  status: { type: String, enum: ['pending', 'sent', 'read', 'failed'], default: 'pending' },
  relatedEntity: {
    entityType: { type: String },
    entityId: { type: Schema.Types.ObjectId },
  },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
}, { timestamps: true });

NotificationSchema.index({ userId: 1, status: 1 });
NotificationSchema.index({ createdAt: -1 });

export default mongoose.model<INotification>('Notification', NotificationSchema);
