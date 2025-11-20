import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { products } from '../../../lib/data/products';
import { productIdSchema } from '../../../lib/validations/product';
import { Product, ApiError } from '../../../lib/types';

/**
 * GET /api/products/[id]
 * Get a single product by ID
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ product: Product } | ApiError>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      statusCode: 405,
    });
  }

  try {
    const { id } = req.query;

    // Validate product ID
    const validatedId = productIdSchema.parse({ id });

    // Find product
    const product = products.find((p) => p.id === validatedId.id);

    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        statusCode: 404,
      });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error('Product API Error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid product ID',
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
