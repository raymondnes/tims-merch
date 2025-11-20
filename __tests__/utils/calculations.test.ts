import {
  calculateSubtotal,
  calculateTax,
  calculateShippingCost,
  calculateTotal,
  calculateDiscount,
  roundToTwo,
  calculateCartTotals
} from '../../lib/utils/calculations';

describe('Calculations Utils', () => {
  describe('roundToTwo', () => {
    it('rounds numbers correctly', () => {
      expect(roundToTwo(10.123)).toBe(10.12);
      expect(roundToTwo(10.126)).toBe(10.13);
      expect(roundToTwo(10)).toBe(10);
    });
  });

  describe('calculateSubtotal', () => {
    it('calculates subtotal correctly', () => {
      const items = [
        { id: '1', name: 'Item 1', price: 10, quantity: 2, image: '' },
        { id: '2', name: 'Item 2', price: 20, quantity: 1, image: '' },
      ];
      // @ts-ignore
      expect(calculateSubtotal(items)).toBe(40);
    });
    
    it('returns 0 for empty cart', () => {
      expect(calculateSubtotal([])).toBe(0);
    });
  });

  describe('calculateTax', () => {
    it('calculates tax correctly', () => {
      expect(calculateTax(100, 0.1)).toBe(10);
    });
    
    it('uses default tax rate if not provided', () => {
      expect(calculateTax(100)).toBe(10); // Default is 0.1
    });
  });

  describe('calculateShippingCost', () => {
    it('is free shipping for subtotal >= 100', () => {
      expect(calculateShippingCost(100)).toBe(0);
      expect(calculateShippingCost(101)).toBe(0);
    });
    
    it('charges 9.99 for subtotal < 100', () => {
      expect(calculateShippingCost(99.99)).toBe(9.99);
      expect(calculateShippingCost(0)).toBe(9.99);
    });
  });

  describe('calculateTotal', () => {
    it('sums up subtotal, tax and shipping', () => {
      expect(calculateTotal(100, 10, 0)).toBe(110);
      expect(calculateTotal(50, 5, 9.99)).toBe(64.99);
    });
  });

  describe('calculateDiscount', () => {
    it('calculates discount amount correctly', () => {
      expect(calculateDiscount(100, 20)).toBe(20);
      expect(calculateDiscount(50, 10)).toBe(5);
    });
  });

  describe('calculateCartTotals', () => {
    it('calculates all totals correctly', () => {
      const items = [
        { id: '1', name: 'Item 1', price: 10, quantity: 2, image: '' }, // 20
      ];
      // Subtotal: 20
      // Tax: 2
      // Shipping: 9.99
      // Total: 31.99
      
      const totals = calculateCartTotals(items as any);
      
      expect(totals.subtotal).toBe(20);
      expect(totals.tax).toBe(2);
      expect(totals.shipping).toBe(9.99);
      expect(totals.total).toBe(31.99);
    });
  });
});
