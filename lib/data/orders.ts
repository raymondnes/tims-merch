import { Order } from '../types';

// In-memory order storage (for demo purposes)
// In production, this would be stored in a database
const orders: Map<string, Order> = new Map();

export const getOrder = (orderId: string): Order | undefined => {
  return orders.get(orderId);
};

export const setOrder = (order: Order): void => {
  orders.set(order.id, order);
};

export const getAllOrders = (): Order[] => {
  return Array.from(orders.values());
};

export const getUserOrders = (userId: string): Order[] => {
  return Array.from(orders.values()).filter((order) => order.userId === userId);
};

export const deleteOrder = (orderId: string): boolean => {
  return orders.delete(orderId);
};

export const clearAllOrders = (): void => {
  orders.clear();
};
