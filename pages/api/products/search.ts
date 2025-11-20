import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { products } from '../../../lib/data/products';
import { searchQuerySchema } from '../../../lib/validations/product';
import { Product, ApiError } from '../../../lib/types';

/**
 * GET /api/products/search
 * Search products by query string
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ products: Product[]; total: number } | ApiError>
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
      q: req.query.q as string,
      category: req.query.category as string | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
    };

    // Validate query
    const validatedQuery = searchQuerySchema.parse(query);

    // Search products
    const searchLower = validatedQuery.q.toLowerCase();
    let results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
    );

    // Filter by category if provided
    if (validatedQuery.category) {
      results = results.filter(
        (p) => p.category.toLowerCase() === validatedQuery.category!.toLowerCase()
      );
    }

    // Pagination
    const page = validatedQuery.page || 1;
    const limit = validatedQuery.limit || 20;
    const total = results.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    return res.status(200).json({
      products: paginatedResults,
      total,
    });
  } catch (error) {
    console.error('Search API Error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid search parameters',
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
