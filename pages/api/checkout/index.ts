import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getCart, deleteCart } from '../../../lib/data/cart';
import { setOrder } from '../../../lib/data/orders';
import { checkoutSchema } from '../../../lib/validations/order';
import { Order, CheckoutResponse, ApiError } from '../../../lib/types';
import { generateId, generateOrderNumber, generateTrackingNumber } from '../../../lib/utils/generators';
import { calculateShippingCost, roundToTwo } from '../../../lib/utils/calculations';

/**
 * POST /api/checkout
 * Process checkout and create an order
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutResponse | ApiError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      statusCode: 405,
    });
  }

  try {
    const body = req.body;

    // Validate request body
    const validatedData = checkoutSchema.parse(body);

    // Get cart
    const cart = getCart(validatedData.cartId);

    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found',
        statusCode: 404,
      });
    }

    // Check if cart has items
    if (cart.items.length === 0) {
      return res.status(400).json({
        error: 'Cart is empty',
        statusCode: 400,
      });
    }

    // Calculate shipping cost
    const shippingCost = roundToTwo(calculateShippingCost(cart.subtotal));

    // Calculate total (cart already has subtotal and tax)
    const total = roundToTwo(cart.subtotal + cart.tax + shippingCost);

    // Create order
    const order: Order = {
      id: generateId(),
      orderNumber: generateOrderNumber(),
      items: cart.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.image,
      })),
      subtotal: cart.subtotal,
      tax: cart.tax,
      shippingCost,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: validatedData.paymentMethod,
      shippingAddress: validatedData.shippingAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simulate payment processing
    // In production, this would integrate with a payment gateway like Stripe
    const paymentSuccessful = await simulatePaymentProcessing(
      validatedData.paymentMethod,
      total,
      validatedData.paymentDetails
    );

    if (paymentSuccessful) {
      order.paymentStatus = 'paid';
      order.status = 'processing';
      order.trackingNumber = generateTrackingNumber();
    } else {
      order.paymentStatus = 'failed';
      order.status = 'cancelled';
    }

    // Save order
    setOrder(order);

    // If payment successful, clear the cart
    if (paymentSuccessful) {
      deleteCart(validatedData.cartId);
    }

    // Return response
    const response: CheckoutResponse = {
      orderId: order.id,
      orderNumber: order.orderNumber,
      total: order.total,
      status: order.status,
      paymentStatus: order.paymentStatus,
    };

    return res.status(paymentSuccessful ? 201 : 402).json(response);
  } catch (error) {
    console.error('Checkout Error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid checkout data',
        details: error.issues,
        statusCode: 400,
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      statusCode: 500,
    });
  }
}

/**
 * Simulate payment processing
 * In production, this would integrate with Stripe, PayPal, etc.
 */
async function simulatePaymentProcessing(
  paymentMethod: string,
  amount: number,
  paymentDetails?: Record<string, any>
): Promise<boolean> {
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For demo purposes, always succeed
  // In production, this would actually process the payment
  console.log(`Processing payment: ${paymentMethod}, Amount: $${amount}`);

  // Simulate a 95% success rate (5% failure for testing)
  return Math.random() > 0.05;
}
