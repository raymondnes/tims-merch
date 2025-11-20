import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getCart, setCart } from '../../../lib/data/cart';
import { updateCartItemSchema, cartItemIdSchema } from '../../../lib/validations/cart';
import { Cart, ApiError } from '../../../lib/types';
import { calculateCartTotals } from '../../../lib/utils/calculations';

/**
 * PUT /api/cart/[id]
 * Update cart item quantity, size, or color
 */
const handlePut = (
  req: NextApiRequest,
  res: NextApiResponse<{ cart: Cart } | ApiError>
) => {
  try {
    const { id } = req.query;
    const { cartId } = req.query;
    const body = req.body;

    // Validate cart item ID
    const validatedId = cartItemIdSchema.parse({ id });

    // Validate request body
    const validatedData = updateCartItemSchema.parse(body);

    // Get cart
    if (!cartId) {
      return res.status(400).json({
        error: 'Cart ID is required',
        statusCode: 400,
      });
    }

    const cart = getCart(cartId as string);

    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found',
        statusCode: 404,
      });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex((item) => item.id === validatedId.id);

    if (itemIndex === -1) {
      return res.status(404).json({
        error: 'Cart item not found',
        statusCode: 404,
      });
    }

    // Update item
    cart.items[itemIndex].quantity = validatedData.quantity;
    if (validatedData.size !== undefined) {
      cart.items[itemIndex].size = validatedData.size;
    }
    if (validatedData.color !== undefined) {
      cart.items[itemIndex].color = validatedData.color;
    }

    // Recalculate totals
    const totals = calculateCartTotals(cart.items);
    cart.subtotal = totals.subtotal;
    cart.tax = totals.tax;
    cart.total = totals.total;
    cart.updatedAt = new Date().toISOString();

    // Save cart
    setCart(cart);

    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Update Cart Item Error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.issues,
        statusCode: 400,
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      statusCode: 500,
    });
  }
};

/**
 * DELETE /api/cart/[id]
 * Remove item from cart
 */
const handleDelete = (
  req: NextApiRequest,
  res: NextApiResponse<{ cart: Cart } | ApiError>
) => {
  try {
    const { id } = req.query;
    const { cartId } = req.query;

    // Validate cart item ID
    const validatedId = cartItemIdSchema.parse({ id });

    // Get cart
    if (!cartId) {
      return res.status(400).json({
        error: 'Cart ID is required',
        statusCode: 400,
      });
    }

    const cart = getCart(cartId as string);

    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found',
        statusCode: 404,
      });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex((item) => item.id === validatedId.id);

    if (itemIndex === -1) {
      return res.status(404).json({
        error: 'Cart item not found',
        statusCode: 404,
      });
    }

    // Remove item from cart
    cart.items.splice(itemIndex, 1);

    // Recalculate totals
    const totals = calculateCartTotals(cart.items);
    cart.subtotal = totals.subtotal;
    cart.tax = totals.tax;
    cart.total = totals.total;
    cart.updatedAt = new Date().toISOString();

    // Save cart
    setCart(cart);

    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Delete Cart Item Error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid cart item ID',
        details: error.issues,
        statusCode: 400,
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      statusCode: 500,
    });
  }
};

/**
 * Main handler
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ cart: Cart } | ApiError>
) {
  switch (req.method) {
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      return res.status(405).json({
        error: 'Method not allowed',
        statusCode: 405,
      });
  }
}
