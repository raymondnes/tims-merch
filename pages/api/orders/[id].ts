import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getOrder } from '../../../lib/data/orders';
import { orderIdSchema } from '../../../lib/validations/order';
import { Order, ApiError } from '../../../lib/types';

/**
 * GET /api/orders/[id]
 * Get a single order by ID
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ order: Order } | ApiError>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      statusCode: 405,
    });
  }

  try {
    const { id } = req.query;

    // Validate order ID
    const validatedId = orderIdSchema.parse({ id });

    // Find order
    const order = getOrder(validatedId.id);

    if (!order) {
      return res.status(404).json({
        error: 'Order not found',
        statusCode: 404,
      });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error('Order API Error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid order ID',
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
