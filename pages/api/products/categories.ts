import type { NextApiRequest, NextApiResponse } from 'next';
import { getCategories } from '../../../lib/data/products';
import { ApiError } from '../../../lib/types';

/**
 * GET /api/products/categories
 * Get all unique product categories
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ categories: string[] } | ApiError>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      statusCode: 405,
    });
  }

  try {
    const categories = getCategories();

    return res.status(200).json({ categories });
  } catch (error) {
    console.error('Categories API Error:', error);

    return res.status(500).json({
      error: 'Internal server error',
      statusCode: 500,
    });
  }
}
