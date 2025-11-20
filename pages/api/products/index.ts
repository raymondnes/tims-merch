import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { products } from '../../../lib/data/products';
import { productFiltersSchema } from '../../../lib/validations/product';
import { Product, ProductListResponse, ApiError } from '../../../lib/types';

/**
 * GET /api/products
 * List all products with optional filtering, sorting, and pagination
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductListResponse | ApiError>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      statusCode: 405,
    });
  }

  try {
    // Parse and validate query parameters
    const query = {
      category: req.query.category as string | undefined,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
      inStock: req.query.inStock === 'true' ? true : req.query.inStock === 'false' ? false : undefined,
      search: req.query.search as string | undefined,
      sortBy: req.query.sortBy as 'price_asc' | 'price_desc' | 'newest' | 'popular' | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 12,
    };

    // Validate query parameters
    const validatedQuery = productFiltersSchema.parse(query);

    // Filter products
    let filteredProducts = [...products];

    // Filter by category
    if (validatedQuery.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === validatedQuery.category!.toLowerCase()
      );
    }

    // Filter by price range
    if (validatedQuery.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.price >= validatedQuery.minPrice!);
    }
    if (validatedQuery.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.price <= validatedQuery.maxPrice!);
    }

    // Filter by stock availability
    if (validatedQuery.inStock !== undefined) {
      filteredProducts = filteredProducts.filter((p) => p.inStock === validatedQuery.inStock);
    }

    // Filter by search query
    if (validatedQuery.search) {
      const searchLower = validatedQuery.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
      );
    }

    // Sort products
    switch (validatedQuery.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popular':
        // For demo, featured products are considered popular
        filteredProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
      default:
        // Default: newest first
        filteredProducts.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    // Pagination
    const page = validatedQuery.page || 1;
    const limit = validatedQuery.limit || 12;
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Return response
    return res.status(200).json({
      products: paginatedProducts,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error('Products API Error:', error);

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
