/**
 * API Client for Tim's Merch
 * Provides type-safe API calls to backend endpoints
 */

import { Product } from '../types'

// Get the base URL for API calls
// In server-side context, we need absolute URL
// In client-side context, relative URLs work fine
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URLs
    return ''
  }
  // Server-side: construct absolute URL
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }
  // Default to localhost:3000 for development
  return 'http://localhost:3000'
}

/**
 * Fetch products from the API
 */
export async function getProducts(params?: {
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular'
  page?: number
  limit?: number
}): Promise<{ products: Product[]; total: number; page: number; limit: number }> {
  const searchParams = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value))
      }
    })
  }

  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/products${searchParams.toString() ? `?${searchParams}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch a single product by ID
 */
export async function getProduct(id: string): Promise<Product> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/products/${id}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`)
  }

  const data = await response.json()
  return data.product
}

/**
 * Search products
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/products/search?q=${encodeURIComponent(query)}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to search products: ${response.statusText}`)
  }

  const data = await response.json()
  return data.products
}

/**
 * Get product categories
 */
export async function getCategories(): Promise<string[]> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/products/categories`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`)
  }

  const data = await response.json()
  return data.categories
}

/**
 * Add item to cart
 */
export async function addToCart(data: {
  productId: string
  quantity: number
  size?: string
  color?: string
  cartId?: string
}): Promise<any> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/cart`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Failed to add to cart: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Get cart by ID
 */
export async function getCart(cartId: string): Promise<any> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/cart?cartId=${cartId}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch cart: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Update cart item
 */
export async function updateCartItem(
  itemId: string,
  cartId: string,
  updates: {
    quantity?: number
    size?: string
    color?: string
  }
): Promise<any> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/cart/${itemId}?cartId=${cartId}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error(`Failed to update cart item: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Remove item from cart
 */
export async function removeFromCart(itemId: string, cartId: string): Promise<any> {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}/api/cart/${itemId}?cartId=${cartId}`
  const response = await fetch(url, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Failed to remove from cart: ${response.statusText}`)
  }

  return response.json()
}
