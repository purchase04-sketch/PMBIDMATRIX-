import { Request, Response, NextFunction } from 'express';

/**
 * Request Validation Middleware
 * Validates incoming request bodies against defined schemas
 */

interface ValidationRule {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'email' | 'date';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  enum?: string[];
  message?: string;
}

interface ValidationError {
  field: string;
  message: string;
}

const validateField = (value: any, rule: ValidationRule): string | null => {
  if (rule.required && (value === undefined || value === null || value === '')) {
    return rule.message || `${rule.field} is required`;
  }

  if (value === undefined || value === null) return null;

  if (rule.type) {
    switch (rule.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return `${rule.field} must be a valid email`;
        break;
      case 'date':
        if (isNaN(Date.parse(value))) return `${rule.field} must be a valid date`;
        break;
      case 'array':
        if (!Array.isArray(value)) return `${rule.field} must be an array`;
        break;
      case 'number':
        if (typeof value !== 'number' && isNaN(Number(value))) return `${rule.field} must be a number`;
        break;
      case 'string':
        if (typeof value !== 'string') return `${rule.field} must be a string`;
        break;
      case 'boolean':
        if (typeof value !== 'boolean') return `${rule.field} must be a boolean`;
        break;
    }
  }

  if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
    return `${rule.field} must be at least ${rule.minLength} characters`;
  }

  if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
    return `${rule.field} must be at most ${rule.maxLength} characters`;
  }

  if (rule.min !== undefined && Number(value) < rule.min) {
    return `${rule.field} must be at least ${rule.min}`;
  }

  if (rule.max !== undefined && Number(value) > rule.max) {
    return `${rule.field} must be at most ${rule.max}`;
  }

  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.message || `${rule.field} format is invalid`;
  }

  if (rule.enum && !rule.enum.includes(value)) {
    return `${rule.field} must be one of: ${rule.enum.join(', ')}`;
  }

  return null;
};

/**
 * Create validation middleware from rules
 */
export const validate = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: ValidationError[] = [];

    for (const rule of rules) {
      const value = req.body[rule.field];
      const error = validateField(value, rule);
      if (error) {
        errors.push({ field: rule.field, message: error });
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
      return;
    }

    next();
  };
};

// ─── Pre-defined Validation Schemas ───────────────

export const auctionValidation = validate([
  { field: 'title', required: true, type: 'string', minLength: 5, maxLength: 200 },
  { field: 'type', required: true, type: 'string', enum: ['reverse', 'forward', 'multi-lot'] },
  { field: 'items', required: true, type: 'array' },
  { field: 'startTime', required: true, type: 'date' },
  { field: 'endTime', required: true, type: 'date' },
]);

export const rfqValidation = validate([
  { field: 'title', required: true, type: 'string', minLength: 5, maxLength: 200 },
  { field: 'items', required: true, type: 'array' },
  { field: 'category', required: true, type: 'string' },
  { field: 'endDate', required: true, type: 'date' },
]);

export const supplierValidation = validate([
  { field: 'name', required: true, type: 'string', minLength: 2, maxLength: 200 },
  { field: 'email', required: true, type: 'email' },
  { field: 'contactPerson', required: true, type: 'string' },
  { field: 'phone', required: true, type: 'string', pattern: /^\+?[\d\s-]{10,15}$/, message: 'Phone must be valid' },
  { field: 'categories', required: true, type: 'array' },
  { field: 'gstNumber', type: 'string', pattern: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z]{1}\d{1}$/, message: 'Invalid GST format' },
]);

export const bidValidation = validate([
  { field: 'amount', required: true, type: 'number', min: 0.01 },
  { field: 'auctionId', required: true, type: 'string' },
]);

export const loginValidation = validate([
  { field: 'email', required: true, type: 'email' },
  { field: 'password', required: true, type: 'string', minLength: 6 },
]);

export const registerValidation = validate([
  { field: 'name', required: true, type: 'string', minLength: 2 },
  { field: 'email', required: true, type: 'email' },
  { field: 'password', required: true, type: 'string', minLength: 8 },
  { field: 'role', required: true, type: 'string', enum: ['admin', 'buyer', 'supplier', 'manager'] },
]);
