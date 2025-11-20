# Tim's Merch Backend API - Installation & Setup Guide

## Prerequisites

- Node.js 14+ installed
- npm or yarn package manager
- A code editor (VS Code recommended)

## Installation Steps

### 1. Dependencies Already Installed

The following packages have been installed:

```json
{
  "dependencies": {
    "next": "^12.2.5",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "zod": "^3.x.x",
    "uuid": "^9.x.x"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.8",
    "eslint": "8.22.0",
    "eslint-config-next": "12.2.5",
    "postcss": "^8.4.16",
    "tailwindcss": "^3.1.8",
    "typescript": "^5.x.x",
    "@types/react": "^18.x.x",
    "@types/node": "^20.x.x"
  }
}
```

### 2. Start Development Server

```bash
npm run dev
```

The API will be available at: `http://localhost:3000/api`

### 3. Verify Installation

Test the API with a simple request:

```bash
# Get all products
curl http://localhost:3000/api/products

# Get product categories
curl http://localhost:3000/api/products/categories
```

You should see JSON responses with product data.

## Project Structure

```
tims-merch/
├── pages/
│   ├── api/                        # API Routes
│   │   ├── products/
│   │   │   ├── index.ts           # GET /api/products
│   │   │   ├── [id].ts            # GET /api/products/[id]
│   │   │   ├── search.ts          # GET /api/products/search
│   │   │   └── categories.ts      # GET /api/products/categories
│   │   ├── cart/
│   │   │   ├── index.ts           # GET/POST /api/cart
│   │   │   └── [id].ts            # PUT/DELETE /api/cart/[id]
│   │   ├── checkout/
│   │   │   └── index.ts           # POST /api/checkout
│   │   └── orders/
│   │       ├── index.ts           # GET /api/orders
│   │       └── [id].ts            # GET /api/orders/[id]
│   ├── _app.js
│   └── index.js
├── lib/
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── validations/
│   │   ├── product.ts             # Product validation schemas
│   │   ├── cart.ts                # Cart validation schemas
│   │   └── order.ts               # Order validation schemas
│   ├── data/
│   │   ├── products.ts            # Mock product data
│   │   ├── cart.ts                # In-memory cart storage
│   │   └── orders.ts              # In-memory order storage
│   └── utils/
│       ├── format.ts              # Formatting utilities
│       ├── calculations.ts        # Price calculations
│       ├── generators.ts          # ID generators
│       └── validators.ts          # Custom validators
├── API_DOCUMENTATION.md           # Complete API docs
├── API_README.md                  # Quick start guide
├── BACKEND_API_SUMMARY.md         # Implementation summary
├── INSTALLATION_GUIDE.md          # This file
├── tsconfig.json                  # TypeScript configuration
├── package.json
└── README.md

Total: 24 new files created
```

## API Endpoints

### Products (4 endpoints)
- `GET /api/products` - List products
- `GET /api/products/[id]` - Get product by ID
- `GET /api/products/search` - Search products
- `GET /api/products/categories` - Get categories

### Cart (3 endpoints)
- `GET /api/cart?cartId={id}` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/[id]?cartId={id}` - Update cart item
- `DELETE /api/cart/[id]?cartId={id}` - Remove cart item

### Checkout (1 endpoint)
- `POST /api/checkout` - Process checkout

### Orders (2 endpoints)
- `GET /api/orders` - List orders
- `GET /api/orders/[id]` - Get order by ID

## Quick Test

### 1. Get Products
```bash
curl http://localhost:3000/api/products
```

### 2. Create Cart and Add Item
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

Save the returned `cart.id` for next steps.

### 3. Get Cart
```bash
curl "http://localhost:3000/api/cart?cartId=YOUR_CART_ID"
```

### 4. Process Checkout
```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "cartId": "YOUR_CART_ID",
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

### 5. View Orders
```bash
curl http://localhost:3000/api/orders
```

## Build for Production

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Testing Tools

### Recommended Tools
1. **Postman** - Full-featured API client
2. **Thunder Client** - VS Code extension
3. **REST Client** - VS Code extension
4. **cURL** - Command line testing

### Example Postman Collection

Import these endpoints into Postman:

```
GET     http://localhost:3000/api/products
GET     http://localhost:3000/api/products/550e8400-e29b-41d4-a716-446655440001
GET     http://localhost:3000/api/products/search?q=hoodie
GET     http://localhost:3000/api/products/categories
POST    http://localhost:3000/api/cart
GET     http://localhost:3000/api/cart?cartId={id}
PUT     http://localhost:3000/api/cart/{itemId}?cartId={cartId}
DELETE  http://localhost:3000/api/cart/{itemId}?cartId={cartId}
POST    http://localhost:3000/api/checkout
GET     http://localhost:3000/api/orders
GET     http://localhost:3000/api/orders/{id}
```

## Environment Variables (Future)

Create a `.env.local` file for environment-specific configuration:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/timsmerch

# Authentication
JWT_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Payment Gateway
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email Service
SENDGRID_API_KEY=...

# Redis Cache
REDIS_URL=redis://localhost:6379
```

## Common Issues & Solutions

### Issue 1: Port 3000 Already in Use
```bash
# Use a different port
PORT=3001 npm run dev
```

### Issue 2: TypeScript Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: Module Not Found
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Next Steps

### 1. Database Integration
```bash
# Install Prisma
npm install @prisma/client
npm install -D prisma

# Initialize Prisma
npx prisma init

# Create schema and migrate
npx prisma migrate dev
```

### 2. Authentication
```bash
# Install NextAuth.js
npm install next-auth

# Create auth configuration
# See: https://next-auth.js.org/getting-started/example
```

### 3. Payment Processing
```bash
# Install Stripe
npm install stripe @stripe/stripe-js

# Set up webhook handling
# See: https://stripe.com/docs/webhooks
```

### 4. Testing
```bash
# Install testing libraries
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @types/jest
```

## Documentation

For more information, see:
- **API_DOCUMENTATION.md** - Complete API reference
- **API_README.md** - Quick start guide
- **BACKEND_API_SUMMARY.md** - Implementation details

## Support

If you encounter issues:
1. Check the documentation files
2. Verify all dependencies are installed
3. Ensure the development server is running
4. Check the console for error messages

## Features Included

✅ 10 API endpoints
✅ Full TypeScript support
✅ Zod input validation
✅ 12 mock products
✅ In-memory data storage
✅ Comprehensive error handling
✅ Price calculations (tax, shipping)
✅ Order number generation
✅ Tracking number generation
✅ Complete documentation

## Production Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
- **Netlify**: Configure Next.js plugin
- **AWS**: Use AWS Amplify or EC2
- **Railway**: Direct deployment from Git
- **Render**: Automated deployments

## Security Notes

- All API routes validate inputs with Zod
- UUIDs used for all IDs
- Stock availability checked
- XSS prevention utilities included
- Proper HTTP status codes
- No sensitive data in responses

## Performance Tips

1. **Enable caching**: Add Redis for product data
2. **Optimize images**: Use Next.js Image component
3. **Database indexes**: Add indexes on frequently queried fields
4. **CDN**: Use Vercel Edge or Cloudflare for static assets
5. **Rate limiting**: Implement for production

## License

Part of Tim's Merch e-commerce project.

---

**Ready to build your frontend!**

The backend API is complete and fully functional. Start the dev server and begin integrating with your Next.js frontend.
