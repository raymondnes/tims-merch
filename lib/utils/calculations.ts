import { CartItem } from '../types';

/**
 * Calculate subtotal from cart items
 */
export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

/**
 * Calculate tax (10% for demo purposes)
 */
export const calculateTax = (subtotal: number, taxRate: number = 0.1): number => {
  return subtotal * taxRate;
};

/**
 * Calculate shipping cost
 * Free shipping over $100, otherwise $9.99
 */
export const calculateShippingCost = (subtotal: number): number => {
  const FREE_SHIPPING_THRESHOLD = 100;
  const STANDARD_SHIPPING_COST = 9.99;

  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
};

/**
 * Calculate total (subtotal + tax + shipping)
 */
export const calculateTotal = (
  subtotal: number,
  tax: number,
  shipping: number
): number => {
  return subtotal + tax + shipping;
};

/**
 * Calculate discount amount
 */
export const calculateDiscount = (
  subtotal: number,
  discountPercent: number
): number => {
  return subtotal * (discountPercent / 100);
};

/**
 * Round to 2 decimal places
 */
export const roundToTwo = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

/**
 * Calculate all cart totals at once
 */
export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = roundToTwo(calculateSubtotal(items));
  const tax = roundToTwo(calculateTax(subtotal));
  const shipping = roundToTwo(calculateShippingCost(subtotal));
  const total = roundToTwo(calculateTotal(subtotal, tax, shipping));

  return {
    subtotal,
    tax,
    shipping,
    total,
  };
};
