import { Request, Response, NextFunction } from 'express';

/**
 * Role-based access control middleware
 * Usage: router.get('/admin-only', roleGuard('admin'), handler)
 */
export const roleGuard = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ 
        error: 'Forbidden: Insufficient role permissions',
        requiredRoles: allowedRoles,
        currentRole: user.role
      });
    }
    next();
  };
};
