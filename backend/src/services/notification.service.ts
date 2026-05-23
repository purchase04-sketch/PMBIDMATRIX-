import Notification from '../models/Notification';

export interface SendNotificationProps {
  userId: string;
  type: 'rfq' | 'auction' | 'approval' | 'supplier' | 'system' | 'alert' | 'commodity';
  title: string;
  message: string;
  channel?: 'email' | 'sms' | 'push' | 'in-app' | 'whatsapp';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
}

export const sendNotification = async (props: SendNotificationProps) => {
  try {
    const { userId, type, title, message, channel = 'in-app', priority = 'medium' } = props;

    // 1. Save to Database for audit & in-app view
    const notification = await Notification.create({
      userId,
      type,
      title,
      message,
      channel,
      priority,
      status: 'pending'
    });

    // 2. Mock external channel dispatch (SendGrid, Twilio, Firebase)
    if (channel === 'email') {
      console.log(`Sending Email to User ${userId}: ${title}`);
    } else if (channel === 'sms' || channel === 'whatsapp') {
      console.log(`Sending ${channel.toUpperCase()} to User ${userId}: ${title}`);
    }

    notification.status = 'sent';
    await notification.save();

    return { success: true, notificationId: notification._id };
  } catch (error) {
    console.error('Failed to send notification:', error);
    return { success: false, error };
  }
};
