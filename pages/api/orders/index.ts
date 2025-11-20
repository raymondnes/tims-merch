import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getAllOrders } from '../../../lib/data/orders';
import { orderFiltersSchema } from '../../../lib/validations/order';
import { Order, ApiError } from '../../../lib/types';

/**
 * GET /api/orders
 * Get all orders with optional filtering and pagination
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ orders: Order[]; total: number } | ApiError>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      statusCode: 405,
    });
  }

  try {
    // Parse query parameters
    const query = {
      status: req.query.status as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
    };

    // Validate query parameters
    const validatedQuery = orderFiltersSchema.parse(query);

    // Get all orders
    let orders = getAllOrders();

    // Filter by status if provided
    if (validatedQuery.status) {
      orders = orders.filter((order) => order.status === validatedQuery.status);
    }

    // Sort by creation date (newest first)
    orders.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Pagination
    const page = validatedQuery.page || 1;
    const limit = validatedQuery.limit || 10;
    const total = orders.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = orders.slice(startIndex, endIndex);

    return res.status(200).json({
      orders: paginatedOrders,
      total,
    });
  } catch (error) {
    console.error('Orders API Error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid query parameters',
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
