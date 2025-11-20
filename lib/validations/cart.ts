import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity cannot exceed 99'),
  size: z.string().optional(),
  color: z.string().optional(),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99, 'Quantity cannot exceed 99'),
  size: z.string().optional(),
  color: z.string().optional(),
});

export const cartItemIdSchema = z.object({
  id: z.string().uuid('Invalid cart item ID'),
});

export const cartIdSchema = z.object({
  cartId: z.string().uuid('Invalid cart ID'),
});
