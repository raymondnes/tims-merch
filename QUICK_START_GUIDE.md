# Tim's Merch Frontend - Quick Start Guide

A quick reference for developers working with the Tim's Merch component library.

## Setup & Installation

```bash
# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev

# Open browser
# Navigate to http://localhost:3000
```

## Project Structure at a Glance

```
tims-merch/
├── components/     # All React components
├── pages/          # Next.js pages
├── public/         # Static assets (icons, images)
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── tailwind.config.js
```

## Common Tasks

### 1. Creating a New Page

```typescript
// pages/about.tsx
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Tim's Merch</title>
      </Head>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold">About Us</h1>
        {/* Your content */}
      </div>
    </>
  )
}
```

The Layout (Header + Footer) is automatically applied via `_app.js`.

### 2. Using Components

```typescript
import { Button, ProductCard, Card } from '@/components'

// Simple button
<Button>Click Me</Button>

// Button with variants
<Button variant="outline" size="lg">Large Outline</Button>

// Product card
<ProductCard
  id={1}
  name="Cool T-Shirt"
  price={25.99}
  image="/images/tshirt.jpg"
  isNew
/>

// Card container
<Card hover>
  <CardContent>
    Your content here
  </CardContent>
</Card>
```

### 3. Building a Product Grid

```typescript
import { ProductGrid, ProductCard } from '@/components'

const products = [...] // Your product array

export default function Products() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductGrid columns={3}>
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ProductGrid>
    </div>
  )
}
```

### 4. Creating a Form

```typescript
import { Input, Button } from '@/components'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '' })

  return (
    <form className="space-y-4">
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Button type="submit" fullWidth>Submit</Button>
    </form>
  )
}
```

### 5. Adding Images

```typescript
import Image from 'next/image'

// Product image (responsive, optimized)
<div className="relative aspect-square">
  <Image
    src="/images/product.jpg"
    alt="Product name"
    layout="fill"
    objectFit="cover"
  />
</div>

// Fixed size image
<Image
  src="/icons/cart.svg"
  alt="Cart"
  width={24}
  height={24}
/>
```

## Tailwind CSS Quick Reference

### Container Patterns

```typescript
// Page container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Section spacing
<section className="py-16">

// Card spacing
<div className="p-4 md:p-6">
```

### Grid Layouts

```typescript
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Two column layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

### Colors

```typescript
// Primary (Orange/Yellow)
className="bg-primary text-white"
className="text-primary"
className="border-primary"
className="hover:bg-primary-dark"

// Secondary (Dark)
className="bg-secondary text-white"
className="text-secondary"

// Gray shades
className="bg-gray-50"
className="text-gray-600"
className="border-gray-300"
```

### Typography

```typescript
// Headings
className="text-4xl font-bold text-secondary"
className="text-2xl font-semibold"

// Body text
className="text-base text-gray-600"
className="text-sm text-gray-500"

// Special
className="uppercase tracking-wide text-xs"
```

### Spacing

```typescript
// Margin
className="mb-4"      // margin-bottom: 1rem
className="mt-8"      // margin-top: 2rem
className="mx-auto"   // horizontal center

// Padding
className="p-4"       // padding: 1rem
className="px-6 py-3" // horizontal and vertical
```

### Hover & Transitions

```typescript
className="hover:shadow-lg transition-shadow duration-200"
className="hover:bg-primary-dark transition-colors"
className="hover:scale-105 transform transition-transform"
```

## Component Cheat Sheet

### Button Variants

```typescript
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<Button fullWidth>Full Width</Button>
```

### Badge Variants

```typescript
<Badge variant="primary">New</Badge>
<Badge variant="secondary">Sale</Badge>
<Badge variant="success">In Stock</Badge>
<Badge variant="warning">Low Stock</Badge>
<Badge variant="danger">Out of Stock</Badge>
```

### Card Patterns

```typescript
// Simple card
<Card>Content</Card>

// Card with hover effect
<Card hover>Content</Card>

// Card with custom padding
<Card padding="lg">Content</Card>

// Structured card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

### ProductCard Props

```typescript
<ProductCard
  id={product.id}           // required
  name={product.name}       // required
  price={product.price}     // required
  image={product.image}     // required
  category="T-Shirts"       // optional
  isNew                     // optional
  discount={20}             // optional (percentage)
/>
```

## TypeScript Types

### Product Type

```typescript
import { Product } from '@/types/product'

const product: Product = {
  id: 1,
  name: "Product Name",
  description: "Description",
  price: 29.99,
  image: "/images/product.jpg",
  category: "T-Shirts",
  stock: 10,
  isNew: true,
  discount: 15,
}
```

### CartItem Type

```typescript
import { CartItem } from '@/types/product'

const cartItem: CartItem = {
  ...product,              // All product fields
  quantity: 2,
  selectedSize: "M",
  selectedColor: "Blue",
}
```

## Layout Sections

### Standard Page Layout

```typescript
export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary mb-4">
          Page Title
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Description
        </p>
      </div>

      {/* Main Content */}
      <div>
        {/* Content here */}
      </div>
    </div>
  )
}
```

### Two Column Layout

```typescript
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Main Content (2/3 width) */}
  <div className="lg:col-span-2">
    Main content
  </div>

  {/* Sidebar (1/3 width) */}
  <div>
    Sidebar content
  </div>
</div>
```

## Responsive Patterns

### Show/Hide Elements

```typescript
// Show on mobile, hide on desktop
<div className="block lg:hidden">Mobile only</div>

// Hide on mobile, show on desktop
<div className="hidden lg:block">Desktop only</div>

// Different content at different sizes
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>
```

### Responsive Spacing

```typescript
// Responsive padding
<div className="p-4 md:p-6 lg:p-8">

// Responsive margin
<div className="mt-4 md:mt-8 lg:mt-12">

// Responsive gaps
<div className="gap-4 md:gap-6 lg:gap-8">
```

## Common Patterns

### Loading State

```typescript
{isLoading ? (
  <div className="text-center py-12">
    <p className="text-gray-500">Loading...</p>
  </div>
) : (
  <ProductGrid>
    {products.map(product => (
      <ProductCard key={product.id} {...product} />
    ))}
  </ProductGrid>
)}
```

### Empty State

```typescript
{products.length === 0 ? (
  <div className="text-center py-12">
    <p className="text-gray-500 mb-4">No products found</p>
    <Button variant="outline">Browse All Products</Button>
  </div>
) : (
  <ProductGrid>
    {/* Products */}
  </ProductGrid>
)}
```

### Error State

```typescript
{error ? (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <p className="text-red-600">{error.message}</p>
  </div>
) : (
  <div>{/* Content */}</div>
)}
```

## Navigation

### Link to Pages

```typescript
import Link from 'next/link'

// Simple link
<Link href="/products">
  <a className="text-primary hover:underline">
    View Products
  </a>
</Link>

// Link with button styling
<Link href="/cart">
  <a>
    <Button>Go to Cart</Button>
  </a>
</Link>
```

### Programmatic Navigation

```typescript
import { useRouter } from 'next/router'

function MyComponent() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/products')
  }

  return <Button onClick={handleClick}>Go to Products</Button>
}
```

## State Management (Future)

### Using Context (Example)

```typescript
// Create context
const CartContext = createContext()

// Provider in _app.js
<CartProvider>
  <Component {...pageProps} />
</CartProvider>

// Use in component
const { cart, addToCart } = useContext(CartContext)
```

## Debugging Tips

### Check Component Props

```typescript
console.log('Product:', product)
console.log('Props:', { name, price, image })
```

### Tailwind Not Working?

1. Check `tailwind.config.js` content paths
2. Restart dev server after config changes
3. Verify class names are correct (no typos)
4. Check if styles are being purged in production

### Images Not Loading?

1. Verify image path is correct
2. Check image exists in `public/` directory
3. For Next.js Image, check domains in `next.config.js`

## Best Practices

1. **Always use TypeScript interfaces** for component props
2. **Use semantic HTML** (main, section, nav, footer, etc.)
3. **Add ARIA labels** to interactive elements
4. **Keep components small** and focused on one task
5. **Use Tailwind utilities** instead of custom CSS
6. **Optimize images** using Next.js Image component
7. **Test responsive designs** at multiple breakpoints
8. **Follow naming conventions** (PascalCase for components)

## Getting Help

- **Component docs**: `components/README.md`
- **Full summary**: `COMPONENT_BUILD_SUMMARY.md`
- **Component hierarchy**: `COMPONENT_HIERARCHY.md`
- **Tailwind docs**: https://tailwindcss.com/docs
- **Next.js docs**: https://nextjs.org/docs

## Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Useful dev tools
# View at http://localhost:3000
# Auto-reload on file changes
# TypeScript type checking in editor
```

## Example: Complete Product Page

```typescript
// pages/products/index.tsx
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { ProductGrid, ProductCard, Input, Button } from '@/components'
import { Product } from '@/types/product'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch products from API
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Head>
        <title>Products - Tim's Merch</title>
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Our Products
          </h1>
          <p className="text-gray-600 mb-8">
            Browse our collection of high-quality merchandise
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Products */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products found</p>
            <Button variant="outline" onClick={() => setSearch('')}>
              Clear Search
            </Button>
          </div>
        ) : (
          <ProductGrid columns={3}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </ProductGrid>
        )}
      </div>
    </>
  )
}
```

---

**Happy coding!** This guide should get you up and running quickly with the Tim's Merch component library.
