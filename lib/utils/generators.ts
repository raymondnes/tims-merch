import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a unique ID using UUID v4
 */
export const generateId = (): string => {
  return uuidv4();
};

/**
 * Generate a random order number
 * Format: ORD-YYYYMMDD-XXXX
 */
export const generateOrderNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `ORD-${year}${month}${day}-${random}`;
};

/**
 * Generate a tracking number
 * Format: TRK-XXXXXXXXXXXX (12 alphanumeric characters)
 */
export const generateTrackingNumber = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'TRK-';

  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
