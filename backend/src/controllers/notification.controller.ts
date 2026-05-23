import { Request, Response } from 'express';
import Notification from '../models/Notification';

// ─── Get Notifications for Current User ──────────────────────────────────────
export const getNotifications = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const {
      page = 1,
      limit = 25,
      type,
      status,
      priority,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const filter: Record<string, any> = { userId };
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;
    const sort: Record<string, 1 | -1> = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 };

    const [notifications, total] = await Promise.all([
      Notification.find(filter).sort(sort).skip(skip).limit(limitNum),
      Notification.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: notifications.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: notifications,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Unread Count ────────────────────────────────────────────────────────
export const getUnreadCount = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const [total, byType] = await Promise.all([
      Notification.countDocuments({ userId, status: { $in: ['pending', 'sent'] } }),
      Notification.aggregate([
        { $match: { userId: req.user._id, status: { $in: ['pending', 'sent'] } } },
        { $group: { _id: '$type', count: { $sum: 1 } } },
      ]),
    ]);

    const breakdown: Record<string, number> = {};
    byType.forEach((t) => { breakdown[t._id] = t.count; });

    res.json({
      success: true,
      data: { unreadCount: total, breakdown },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Mark Single Notification as Read ────────────────────────────────────────
export const markAsRead = async (req: any, res: Response) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    notification.status = 'read';
    await notification.save();

    res.json({ success: true, data: notification });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Mark All / Batch Notifications as Read ──────────────────────────────────
export const markAllAsRead = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { ids } = req.body; // Optional array of specific notification ids

    const filter: Record<string, any> = {
      userId,
      status: { $in: ['pending', 'sent'] },
    };

    // If specific IDs provided, scope to those
    if (ids && Array.isArray(ids) && ids.length > 0) {
      filter._id = { $in: ids };
    }

    const result = await Notification.updateMany(filter, { $set: { status: 'read' } });

    res.json({
      success: true,
      message: `${result.modifiedCount} notification(s) marked as read`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Delete Notification ─────────────────────────────────────────────────────
export const deleteNotification = async (req: any, res: Response) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.json({ success: true, message: 'Notification deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
