import { Cart } from '../types';

// In-memory cart storage (for demo purposes)
// In production, this would be stored in a database or Redis
const carts: Map<string, Cart> = new Map();

export const getCart = (cartId: string): Cart | undefined => {
  return carts.get(cartId);
};

export const setCart = (cart: Cart): void => {
  carts.set(cart.id, cart);
};

export const deleteCart = (cartId: string): boolean => {
  return carts.delete(cartId);
};

export const getAllCarts = (): Cart[] => {
  return Array.from(carts.values());
};

export const clearAllCarts = (): void => {
  carts.clear();
};
