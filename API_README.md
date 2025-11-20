# Tim's Merch Backend API

Complete backend API infrastructure for the Tim's Merch e-commerce platform built with Next.js API routes.

## Project Structure

```
tims-merch/
├── pages/
│   └── api/
│       ├── products/
│       │   ├── index.ts              # GET /api/products - List products
│       │   ├── [id].ts               # GET /api/products/[id] - Get product by ID
│       │   ├── search.ts             # GET /api/products/search - Search products
│       │   └── categories.ts         # GET /api/products/categories - Get categories
│       ├── cart/
│       │   ├── index.ts              # GET/POST /api/cart - Get/Add to cart
│       │   └── [id].ts               # PUT/DELETE /api/cart/[id] - Update/Remove item
│       ├── checkout/
│       │   └── index.ts              # POST /api/checkout - Process checkout
│       └── orders/
│           ├── index.ts              # GET /api/orders - List orders
│           └── [id].ts               # GET /api/orders/[id] - Get order by ID
├── lib/
│   ├── types/
│   │   └── index.ts                  # TypeScript type definitions
│   ├── validations/
│   │   ├── product.ts                # Product validation schemas (Zod)
│   │   ├── cart.ts                   # Cart validation schemas (Zod)
│   │   └── order.ts                  # Order validation schemas (Zod)
│   ├── data/
│   │   ├── products.ts               # Mock product data (12 products)
│   │   ├── cart.ts                   # In-memory cart storage
│   │   └── orders.ts                 # In-memory order storage
│   └── utils/
│       ├── format.ts                 # Formatting utilities (currency, dates)
│       ├── calculations.ts           # Price calculations (tax, shipping, totals)
│       ├── generators.ts             # ID/number generators (UUID, order numbers)
│       └── validators.ts             # Custom validators (email, phone, postal)
└── API_DOCUMENTATION.md              # Complete API documentation
```

## Features

### Products API
- **List Products**: Filtering, sorting, pagination
- **Product Details**: Get single product by ID
- **Search**: Full-text search across name, description, category
- **Categories**: Get all unique categories

### Cart API
- **Get Cart**: Retrieve cart by ID
- **Add to Cart**: Add items with size/color options
- **Update Cart Item**: Modify quantity, size, color
- **Remove from Cart**: Delete cart items
- **Auto-calculation**: Subtotal, tax, total automatically calculated

### Checkout API
- **Process Checkout**: Create order from cart
- **Payment Simulation**: Mock payment processing
- **Order Creation**: Generate order number and tracking number
- **Shipping Calculation**: Free over $100, otherwise $9.99

### Orders API
- **List Orders**: Filter by status, pagination
- **Order Details**: Get single order by ID
- **Order Tracking**: Tracking numbers generated for paid orders

## Technology Stack

- **Framework**: Next.js 12 (Pages Router)
- **Language**: TypeScript
- **Validation**: Zod
- **Storage**: In-memory (easily replaceable with database)
- **IDs**: UUID v4

## Installation

The required dependencies have been installed:

```json
{
  "dependencies": {
    "zod": "^3.x.x",
    "uuid": "^9.x.x"
  }
}
```

## Quick Start

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the API**:
   ```
   http://localhost:3000/api
   ```

3. **Test an endpoint**:
   ```bash
   curl http://localhost:3000/api/products
   ```

## API Endpoints

### Products
- `GET /api/products` - List products with filters
- `GET /api/products/[id]` - Get product by ID
- `GET /api/products/search` - Search products
- `GET /api/products/categories` - Get all categories

### Cart
- `GET /api/cart?cartId={id}` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/[id]?cartId={id}` - Update cart item
- `DELETE /api/cart/[id]?cartId={id}` - Remove cart item

### Checkout
- `POST /api/checkout` - Process checkout and create order

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/[id]` - Get order by ID

For complete API documentation with examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Example Usage

### 1. Browse Products
```javascript
// Get all products
fetch('http://localhost:3000/api/products')
  .then(res => res.json())
  .then(data => console.log(data));

// Filter by category
fetch('http://localhost:3000/api/products?category=T-Shirts&sortBy=price_asc')
  .then(res => res.json())
  .then(data => console.log(data));
```

### 2. Add to Cart
```javascript
// Create new cart and add item
fetch('http://localhost:3000/api/cart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: '550e8400-e29b-41d4-a716-446655440001',
    quantity: 2,
    size: 'M',
    color: 'Black'
  })
})
  .then(res => res.json())
  .then(data => {
    console.log('Cart created:', data.cart.id);
    console.log('Total:', data.cart.total);
  });
```

### 3. Checkout
```javascript
// Process checkout
fetch('http://localhost:3000/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cartId: 'your-cart-uuid',
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '555-123-4567'
    },
    paymentMethod: 'credit_card'
  })
})
  .then(res => res.json())
  .then(data => {
    console.log('Order created:', data.orderNumber);
    console.log('Status:', data.status);
  });
```

## Mock Data

The API includes 12 pre-configured products:
- Tim's Classic Logo T-Shirt ($29.99)
- Premium Hoodie ($59.99)
- Athletic Performance Tank ($24.99)
- Snapback Cap ($34.99)
- Jogger Pants ($49.99)
- Long Sleeve Henley ($39.99)
- Zip-Up Track Jacket ($54.99)
- Cotton Crew Socks 3-Pack ($18.99)
- Graphic Print T-Shirt ($34.99)
- Crossbody Messenger Bag ($44.99) - Out of stock
- Performance Shorts ($32.99)
- Beanie ($19.99)

Categories: T-Shirts, Hoodies, Athletic Wear, Accessories, Bottoms, Jackets

## Validation

All inputs are validated using Zod schemas:

- **Product IDs**: Must be valid UUIDs
- **Quantities**: Integer between 1 and 99
- **Prices**: Positive numbers
- **Email**: Valid email format
- **Phone**: 10+ characters
- **Postal Code**: US/Canada formats

## Error Handling

All endpoints include comprehensive error handling:
- **400**: Invalid request data (with Zod validation details)
- **404**: Resource not found
- **405**: Method not allowed
- **500**: Internal server error

## Security Considerations

1. **Input Validation**: All inputs validated with Zod
2. **UUID Validation**: All IDs must be valid UUIDs
3. **Stock Checking**: Prevents over-ordering
4. **XSS Prevention**: Input sanitization utilities included
5. **Type Safety**: Full TypeScript coverage

## Calculations

### Tax
- 10% of subtotal (configurable)

### Shipping
- Free shipping on orders over $100
- $9.99 standard shipping otherwise

### Total
- Subtotal + Tax + Shipping

## Order Processing

1. Cart items validated for availability
2. Shipping cost calculated
3. Order created with unique order number (ORD-YYYYMMDD-XXXX)
4. Payment processed (simulated - 95% success rate)
5. If successful:
   - Payment status set to 'paid'
   - Order status set to 'processing'
   - Tracking number generated (TRK-XXXXXXXXXXXX)
   - Cart cleared
6. Order saved to storage

## Database Integration (Next Steps)

The current implementation uses in-memory storage for easy testing. To integrate a database:

### Option 1: Prisma + PostgreSQL
```bash
npm install @prisma/client
npm install -D prisma

npx prisma init
```

### Option 2: Mongoose + MongoDB
```bash
npm install mongoose
```

### Option 3: Drizzle ORM
```bash
npm install drizzle-orm
```

Replace imports in `lib/data/*.ts` with database queries.

## Testing

Test the API using:
- **cURL**: See examples in API_DOCUMENTATION.md
- **Postman**: Import the endpoints
- **Thunder Client**: VS Code extension
- **REST Client**: VS Code extension

## Production Considerations

Before deploying to production:

1. **Database**: Replace in-memory storage with PostgreSQL/MongoDB
2. **Authentication**: Implement JWT-based auth
3. **Payment Gateway**: Integrate Stripe/PayPal
4. **Rate Limiting**: Add rate limiting middleware
5. **CORS**: Configure CORS policies
6. **Environment Variables**: Move sensitive config to .env
7. **Logging**: Add comprehensive logging
8. **Monitoring**: Set up error tracking (Sentry)
9. **Caching**: Implement Redis for performance
10. **Testing**: Add unit and integration tests

## File Permissions

All API routes use proper HTTP methods:
- **GET**: Read operations
- **POST**: Create operations
- **PUT**: Update operations
- **DELETE**: Delete operations

## Contributing

When adding new endpoints:
1. Create TypeScript types in `lib/types/`
2. Create Zod schemas in `lib/validations/`
3. Implement API route in `pages/api/`
4. Add error handling
5. Update API_DOCUMENTATION.md
6. Test thoroughly

## License

This API is part of the Tim's Merch e-commerce project.

## Support

For issues or questions:
1. Check API_DOCUMENTATION.md
2. Review the code in `pages/api/`
3. Check validation schemas in `lib/validations/`

---

**Built with Next.js, TypeScript, and Zod**
