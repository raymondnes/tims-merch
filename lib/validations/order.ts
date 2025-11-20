import { z } from 'zod';

export const shippingAddressSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100),
  addressLine1: z.string().min(1, 'Address line 1 is required').max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State/Province is required').max(100),
  postalCode: z.string().min(1, 'Postal code is required').max(20),
  country: z.string().min(1, 'Country is required').max(100),
  phone: z.string().min(10, 'Valid phone number is required').max(20),
});

export const checkoutSchema = z.object({
  cartId: z.string().uuid('Invalid cart ID'),
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal', 'stripe']),
  paymentDetails: z.record(z.string(), z.any()).optional(),
});

export const orderIdSchema = z.object({
  id: z.string().uuid('Invalid order ID'),
});

export const orderFiltersSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});
