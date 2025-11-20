# Components Documentation

This directory contains all reusable React components for the Tim's Merch e-commerce platform.

## Component Structure

```
components/
├── ui/              # Base UI components
├── layout/          # Layout components (Header, Footer)
├── product/         # Product-related components
├── cart/            # Shopping cart components
├── sections/        # Page section components
└── index.ts         # Central export file
```

## Component Categories

### UI Components (`/ui`)

Base-level reusable components used throughout the application.

#### Button
A flexible button component with multiple variants and sizes.

**Usage:**
```tsx
import { Button } from '@/components/ui/Button'

<Button variant="primary" size="lg">
  Click Me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean

#### Input
Form input component with label and error support.

**Usage:**
```tsx
import { Input } from '@/components/ui/Input'

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
/>
```

#### Card
Container component for content grouping.

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

<Card hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

#### Badge
Small status indicator component.

**Usage:**
```tsx
import { Badge } from '@/components/ui/Badge'

<Badge variant="primary">New</Badge>
```

### Layout Components (`/layout`)

#### Header
Site-wide navigation header with responsive menu.

**Features:**
- Responsive mobile menu
- Search icon
- Shopping cart with item count
- Navigation links

#### Footer
Site-wide footer with links and company info.

**Features:**
- Social media links
- Quick links navigation
- Contact information
- Newsletter signup area

#### Layout
Main layout wrapper combining Header and Footer.

**Usage:**
```tsx
import { Layout } from '@/components/layout/Layout'

<Layout>
  <YourPageContent />
</Layout>
```

### Product Components (`/product`)

#### ProductCard
Displays a single product with image, name, and price.

**Usage:**
```tsx
import { ProductCard } from '@/components/product/ProductCard'

<ProductCard
  id={product.id}
  name={product.name}
  price={product.price}
  image={product.image}
  isNew={true}
  discount={20}
/>
```

**Props:**
- `id`: string | number
- `name`: string
- `price`: number
- `image`: string
- `category`: string (optional)
- `isNew`: boolean (optional)
- `discount`: number (optional)

#### ProductGrid
Grid layout for displaying multiple products.

**Usage:**
```tsx
import { ProductGrid } from '@/components/product/ProductGrid'

<ProductGrid columns={3}>
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</ProductGrid>
```

### Cart Components (`/cart`)

#### CartItem
Individual cart item with quantity controls.

**Usage:**
```tsx
import { CartItem } from '@/components/cart/CartItem'

<CartItem
  item={cartItem}
  onUpdateQuantity={handleUpdateQuantity}
  onRemove={handleRemove}
/>
```

#### CartSummary
Order summary with totals and checkout button.

**Usage:**
```tsx
import { CartSummary } from '@/components/cart/CartSummary'

<CartSummary
  subtotal={100}
  shipping={10}
  tax={5}
  onCheckout={handleCheckout}
/>
```

### Section Components (`/sections`)

These are larger, page-specific sections designed to be composed on pages.

#### Hero
Homepage hero section with CTA.

#### Features
Feature highlights section (Quality, Logistics, Support).

#### NewArrivals
Product showcase section.

**Usage:**
```tsx
import { NewArrivals } from '@/components/sections/NewArrivals'

<NewArrivals products={products} />
```

#### DeliveryInfo
Information about delivery services.

#### BusinessSection
Business features and CTA section.

## Styling

All components use Tailwind CSS for styling. The theme is configured in `tailwind.config.js`:

**Primary Colors:**
- Primary: `#F5A623` (Orange/Yellow)
- Secondary: `#1A1A1A` (Dark Gray)

**Usage in Components:**
```tsx
className="bg-primary text-white hover:bg-primary-dark"
```

## TypeScript Types

Product and cart types are defined in `/types/product.ts`:

```typescript
interface Product {
  id: string | number
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  isNew?: boolean
  discount?: number
}
```

## Best Practices

1. **Server vs Client Components**: All components are client components (Pages Router). When migrating to App Router, most can be server components.

2. **Accessibility**: Components include ARIA labels and semantic HTML.

3. **Responsive Design**: Mobile-first approach using Tailwind's responsive utilities.

4. **Performance**: Next.js Image component used for optimized images.

5. **Type Safety**: All components have proper TypeScript interfaces.

## Adding New Components

When creating new components:

1. Place in appropriate category folder
2. Use TypeScript with proper interfaces
3. Follow existing naming conventions
4. Include proper accessibility attributes
5. Export from `components/index.ts`
6. Document usage in this README
