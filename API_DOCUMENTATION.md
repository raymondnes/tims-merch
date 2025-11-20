# Tim's Merch API Documentation

Complete API documentation for the Tim's Merch e-commerce backend.

## Base URL
```
http://localhost:3000/api
```

---

## Products API

### Get All Products
**Endpoint:** `GET /api/products`

**Description:** Retrieve a list of products with optional filtering, sorting, and pagination.

**Query Parameters:**
- `category` (optional): Filter by category (e.g., "T-Shirts", "Hoodies")
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `inStock` (optional): Filter by stock availability (true/false)
- `search` (optional): Search query for product name, description, or category
- `sortBy` (optional): Sort order - `price_asc`, `price_desc`, `newest`, `popular`
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12, max: 100)

**Example Request:**
```bash
GET /api/products?category=T-Shirts&sortBy=price_asc&page=1&limit=12
```

**Example Response:**
```json
{
  "products": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Tim's Classic Logo T-Shirt",
      "description": "Premium quality cotton t-shirt...",
      "price": 29.99,
      "category": "T-Shirts",
      "images": ["https://..."],
      "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
      "colors": ["Black", "White", "Navy", "Gray"],
      "inStock": true,
      "stockQuantity": 150,
      "featured": true,
      "createdAt": "2024-01-15T00:00:00.000Z",
      "updatedAt": "2024-01-15T00:00:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 12,
  "totalPages": 5
}
```

---

### Get Product by ID
**Endpoint:** `GET /api/products/[id]`

**Description:** Retrieve a single product by its UUID.

**Path Parameters:**
- `id`: Product UUID

**Example Request:**
```bash
GET /api/products/550e8400-e29b-41d4-a716-446655440001
```

**Example Response:**
```json
{
  "product": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Tim's Classic Logo T-Shirt",
    "description": "Premium quality cotton t-shirt...",
    "price": 29.99,
    "category": "T-Shirts",
    "images": ["https://..."],
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "colors": ["Black", "White", "Navy", "Gray"],
    "inStock": true,
    "stockQuantity": 150,
    "featured": true,
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Product not found",
  "statusCode": 404
}
```

---

### Search Products
**Endpoint:** `GET /api/products/search`

**Description:** Search for products by query string.

**Query Parameters:**
- `q` (required): Search query
- `category` (optional): Filter by category
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Example Request:**
```bash
GET /api/products/search?q=hoodie&category=Hoodies
```

**Example Response:**
```json
{
  "products": [...],
  "total": 5
}
```

---

### Get Product Categories
**Endpoint:** `GET /api/products/categories`

**Description:** Get all unique product categories.

**Example Request:**
```bash
GET /api/products/categories
```

**Example Response:**
```json
{
  "categories": [
    "T-Shirts",
    "Hoodies",
    "Athletic Wear",
    "Accessories",
    "Bottoms",
    "Jackets"
  ]
}
```

---

## Cart API

### Get Cart
**Endpoint:** `GET /api/cart?cartId={cartId}`

**Description:** Retrieve a cart by its ID.

**Query Parameters:**
- `cartId` (required): Cart UUID

**Example Request:**
```bash
GET /api/cart?cartId=550e8400-e29b-41d4-a716-446655440099
```

**Example Response:**
```json
{
  "cart": {
    "id": "550e8400-e29b-41d4-a716-446655440099",
    "items": [
      {
        "id": "item-uuid-1",
        "productId": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Tim's Classic Logo T-Shirt",
        "price": 29.99,
        "quantity": 2,
        "size": "M",
        "color": "Black",
        "image": "https://..."
      }
    ],
    "subtotal": 59.98,
    "tax": 6.00,
    "total": 65.98,
    "createdAt": "2024-02-01T10:00:00.000Z",
    "updatedAt": "2024-02-01T10:30:00.000Z"
  }
}
```

---

### Add to Cart
**Endpoint:** `POST /api/cart?cartId={cartId}`

**Description:** Add an item to an existing cart or create a new cart if cartId is not provided.

**Query Parameters:**
- `cartId` (optional): Existing cart UUID

**Request Body:**
```json
{
  "productId": "550e8400-e29b-41d4-a716-446655440001",
  "quantity": 2,
  "size": "M",
  "color": "Black"
}
```

**Validation Rules:**
- `productId`: Must be a valid UUID
- `quantity`: Integer between 1 and 99
- `size`: Optional string
- `color`: Optional string

**Example Response (201):**
```json
{
  "cart": {
    "id": "new-cart-uuid",
    "items": [...],
    "subtotal": 59.98,
    "tax": 6.00,
    "total": 65.98,
    "createdAt": "2024-02-01T10:00:00.000Z",
    "updatedAt": "2024-02-01T10:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Product not found",
  "statusCode": 404
}
```

**Error Response (400):**
```json
{
  "error": "Product is out of stock or insufficient quantity available",
  "statusCode": 400
}
```

---

### Update Cart Item
**Endpoint:** `PUT /api/cart/[id]?cartId={cartId}`

**Description:** Update the quantity, size, or color of a cart item.

**Path Parameters:**
- `id`: Cart item UUID

**Query Parameters:**
- `cartId` (required): Cart UUID

**Request Body:**
```json
{
  "quantity": 3,
  "size": "L",
  "color": "Navy"
}
```

**Example Response (200):**
```json
{
  "cart": {
    "id": "cart-uuid",
    "items": [...],
    "subtotal": 89.97,
    "tax": 9.00,
    "total": 98.97,
    "createdAt": "2024-02-01T10:00:00.000Z",
    "updatedAt": "2024-02-01T10:45:00.000Z"
  }
}
```

---

### Remove from Cart
**Endpoint:** `DELETE /api/cart/[id]?cartId={cartId}`

**Description:** Remove an item from the cart.

**Path Parameters:**
- `id`: Cart item UUID

**Query Parameters:**
- `cartId` (required): Cart UUID

**Example Response (200):**
```json
{
  "cart": {
    "id": "cart-uuid",
    "items": [],
    "subtotal": 0,
    "tax": 0,
    "total": 0,
    "createdAt": "2024-02-01T10:00:00.000Z",
    "updatedAt": "2024-02-01T11:00:00.000Z"
  }
}
```

---

## Checkout API

### Process Checkout
**Endpoint:** `POST /api/checkout`

**Description:** Process checkout and create an order from a cart.

**Request Body:**
```json
{
  "cartId": "550e8400-e29b-41d4-a716-446655440099",
  "shippingAddress": {
    "fullName": "John Doe",
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA",
    "phone": "555-123-4567"
  },
  "paymentMethod": "credit_card",
  "paymentDetails": {
    "cardLast4": "4242"
  }
}
```

**Validation Rules:**
- `cartId`: Must be a valid UUID
- `shippingAddress`: All fields required except `addressLine2`
- `paymentMethod`: Must be one of: `credit_card`, `debit_card`, `paypal`, `stripe`
- `paymentDetails`: Optional object with payment-specific data

**Example Response (201):**
```json
{
  "orderId": "order-uuid",
  "orderNumber": "ORD-20240201-1234",
  "total": 75.97,
  "status": "processing",
  "paymentStatus": "paid"
}
```

**Error Response (404):**
```json
{
  "error": "Cart not found",
  "statusCode": 404
}
```

**Error Response (400):**
```json
{
  "error": "Cart is empty",
  "statusCode": 400
}
```

**Error Response (402):**
```json
{
  "orderId": "order-uuid",
  "orderNumber": "ORD-20240201-1234",
  "total": 75.97,
  "status": "cancelled",
  "paymentStatus": "failed"
}
```

---

## Orders API

### Get All Orders
**Endpoint:** `GET /api/orders`

**Description:** Retrieve all orders with optional filtering and pagination.

**Query Parameters:**
- `status` (optional): Filter by status - `pending`, `processing`, `shipped`, `delivered`, `cancelled`
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)

**Example Request:**
```bash
GET /api/orders?status=processing&page=1&limit=10
```

**Example Response:**
```json
{
  "orders": [
    {
      "id": "order-uuid",
      "orderNumber": "ORD-20240201-1234",
      "items": [
        {
          "productId": "550e8400-e29b-41d4-a716-446655440001",
          "name": "Tim's Classic Logo T-Shirt",
          "price": 29.99,
          "quantity": 2,
          "size": "M",
          "color": "Black",
          "image": "https://..."
        }
      ],
      "subtotal": 59.98,
      "tax": 6.00,
      "shippingCost": 9.99,
      "total": 75.97,
      "status": "processing",
      "paymentStatus": "paid",
      "paymentMethod": "credit_card",
      "shippingAddress": {
        "fullName": "John Doe",
        "addressLine1": "123 Main St",
        "city": "New York",
        "state": "NY",
        "postalCode": "10001",
        "country": "USA",
        "phone": "555-123-4567"
      },
      "trackingNumber": "TRK-ABC123456789",
      "createdAt": "2024-02-01T10:00:00.000Z",
      "updatedAt": "2024-02-01T10:30:00.000Z"
    }
  ],
  "total": 25
}
```

---

### Get Order by ID
**Endpoint:** `GET /api/orders/[id]`

**Description:** Retrieve a single order by its UUID.

**Path Parameters:**
- `id`: Order UUID

**Example Request:**
```bash
GET /api/orders/550e8400-e29b-41d4-a716-446655440199
```

**Example Response:**
```json
{
  "order": {
    "id": "order-uuid",
    "orderNumber": "ORD-20240201-1234",
    "items": [...],
    "subtotal": 59.98,
    "tax": 6.00,
    "shippingCost": 9.99,
    "total": 75.97,
    "status": "processing",
    "paymentStatus": "paid",
    "paymentMethod": "credit_card",
    "shippingAddress": {...},
    "trackingNumber": "TRK-ABC123456789",
    "createdAt": "2024-02-01T10:00:00.000Z",
    "updatedAt": "2024-02-01T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Order not found",
  "statusCode": 404
}
```

---

## Common HTTP Status Codes

- **200 OK**: Request succeeded
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data or validation error
- **402 Payment Required**: Payment failed during checkout
- **404 Not Found**: Resource not found
- **405 Method Not Allowed**: HTTP method not supported
- **500 Internal Server Error**: Server error

---

## Error Response Format

All error responses follow this format:
```json
{
  "error": "Error message",
  "details": {},
  "statusCode": 400
}
```

For validation errors (Zod), the `details` field contains an array of error objects:
```json
{
  "error": "Invalid request data",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["productId"],
      "message": "Required"
    }
  ],
  "statusCode": 400
}
```

---

## Shipping Cost Calculation

- **Free shipping** for orders over $100
- **Standard shipping** of $9.99 for orders under $100

---

## Tax Calculation

- Tax rate: **10%** of subtotal (for demo purposes)
- In production, this would be calculated based on shipping address

---

## Security Considerations

1. **Input Validation**: All inputs are validated using Zod schemas
2. **UUID Validation**: All IDs must be valid UUIDs
3. **Stock Validation**: Cart operations verify product availability
4. **Rate Limiting**: Recommended for production (not implemented in demo)
5. **CORS**: Configure appropriately for your frontend domain
6. **HTTPS**: Always use HTTPS in production
7. **Payment Security**: Never store raw credit card data; use PCI-compliant payment gateways

---

## Testing with cURL

### Get Products
```bash
curl http://localhost:3000/api/products
```

### Get Product by ID
```bash
curl http://localhost:3000/api/products/550e8400-e29b-41d4-a716-446655440001
```

### Add to Cart
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "550e8400-e29b-41d4-a716-446655440001",
    "quantity": 2,
    "size": "M",
    "color": "Black"
  }'
```

### Checkout
```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "cartId": "your-cart-uuid",
    "shippingAddress": {
      "fullName": "John Doe",
      "addressLine1": "123 Main St",
      "city": "New York",
      "state": "NY",
      "postalCode": "10001",
      "country": "USA",
      "phone": "555-123-4567"
    },
    "paymentMethod": "credit_card"
  }'
```

---

## Next Steps

1. **Database Integration**: Replace in-memory storage with PostgreSQL using Prisma
2. **Authentication**: Add JWT-based authentication for user-specific operations
3. **Payment Gateway**: Integrate Stripe or PayPal for real payment processing
4. **Email Notifications**: Send order confirmations and tracking updates
5. **Admin API**: Build admin endpoints for product/order management
6. **Rate Limiting**: Implement rate limiting for API protection
7. **Caching**: Add Redis for caching frequently accessed data
8. **Logging**: Implement comprehensive logging and monitoring
