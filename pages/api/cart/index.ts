import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getCart, setCart } from '../../../lib/data/cart';
import { products } from '../../../lib/data/products';
import { addToCartSchema, cartIdSchema } from '../../../lib/validations/cart';
import { Cart, CartItem, ApiError } from '../../../lib/types';
import { generateId } from '../../../lib/utils/generators';
import { calculateCartTotals } from '../../../lib/utils/calculations';

/**
 * GET /api/cart?cartId=xxx
 * Get cart by ID
 */
const handleGet = (
  req: NextApiRequest,
  res: NextApiResponse<{ cart: Cart } | ApiError>
) => {
  try {
    const { cartId } = req.query;

    if (!cartId) {
      return res.status(400).json({
        error: 'Cart ID is required',
        statusCode: 400,
      });
    }

    const validatedCartId = cartIdSchema.parse({ cartId });
    const cart = getCart(validatedCartId.cartId);

    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found',
        statusCode: 404,
      });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Get Cart Error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid cart ID',
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
 * POST /api/cart
 * Add item to cart or create new cart
 */
const handlePost = (
  req: NextApiRequest,
  res: NextApiResponse<{ cart: Cart } | ApiError>
) => {
  try {
    const body = req.body;
    const { cartId } = req.query;

    // Validate request body
    const validatedData = addToCartSchema.parse(body);

    // Find the product
    const product = products.find((p) => p.id === validatedData.productId);

    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        statusCode: 404,
      });
    }

    // Check stock availability
    if (!product.inStock || product.stockQuantity < validatedData.quantity) {
      return res.status(400).json({
        error: 'Product is out of stock or insufficient quantity available',
        statusCode: 400,
      });
    }

    // Get or create cart
    let cart: Cart;
    const existingCartId = cartId as string | undefined;

    if (existingCartId) {
      const existingCart = getCart(existingCartId);
      cart = existingCart || createNewCart();
    } else {
      cart = createNewCart();
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId === validatedData.productId &&
        item.size === validatedData.size &&
        item.color === validatedData.color
    );

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += validatedData.quantity;
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: generateId(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: validatedData.quantity,
        size: validatedData.size,
        color: validatedData.color,
        image: product.images[0],
      };
      cart.items.push(newItem);
    }

    // Recalculate totals
    const totals = calculateCartTotals(cart.items);
    cart.subtotal = totals.subtotal;
    cart.tax = totals.tax;
    cart.total = totals.total;
    cart.updatedAt = new Date().toISOString();

    // Save cart
    setCart(cart);

    return res.status(201).json({ cart });
  } catch (error) {
    console.error('Add to Cart Error:', error);

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
 * Helper function to create a new cart
 */
const createNewCart = (): Cart => {
  return {
    id: generateId(),
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Main handler
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ cart: Cart } | ApiError>
) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      return res.status(405).json({
        error: 'Method not allowed',
        statusCode: 405,
      });
  }
}
