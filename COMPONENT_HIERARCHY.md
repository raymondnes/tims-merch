# Tim's Merch Component Hierarchy

This document visualizes how components are organized and used throughout the application.

## Application Structure

```
App (_app.js)
└── Layout
    ├── Header
    │   ├── Logo/Brand
    │   ├── Navigation (Desktop)
    │   ├── Search Icon
    │   ├── Cart Icon (with Badge)
    │   └── Mobile Menu Button
    │       └── Navigation (Mobile)
    │
    ├── Main Content (pages)
    │   └── [Page Components]
    │
    └── Footer
        ├── Company Info
        ├── Quick Links
        ├── Support Links
        ├── Contact Info
        └── Social Media Links
```

## Homepage Component Tree

```
HomePage (index.tsx)
├── Hero
│   ├── Text Content
│   │   ├── Badge (Best Quality)
│   │   ├── Heading
│   │   ├── Description
│   │   └── Button (Order Now)
│   └── Hero Image
│
├── Features
│   └── Grid of 3 Cards
│       ├── Card (High Quality)
│       │   ├── Icon
│       │   ├── CardTitle
│       │   └── CardContent
│       ├── Card (Logistics)
│       └── Card (24/7 Support)
│
├── NewArrivals
│   ├── Section Header
│   ├── ProductGrid (4 columns)
│   │   └── ProductCard (x4)
│   │       ├── Product Image
│   │       ├── Badge (New/Discount)
│   │       ├── Category
│   │       ├── Product Name
│   │       └── Price
│   └── Button (View All)
│
├── DeliveryInfo
│   ├── Text Content
│   │   ├── Heading
│   │   ├── Description
│   │   ├── Features List (3 items)
│   │   └── Button (Request Delivery)
│   └── Image Grid (2x Card)
│
└── BusinessSection
    ├── Heading
    ├── Description
    └── Button (Get Started)
```

## Product Listing Page (Example)

```
ProductsPage
└── Container
    ├── Page Header
    │   ├── Heading
    │   └── Filters (future)
    │
    └── ProductGrid
        └── ProductCard (x12)
            ├── Image
            ├── Badge (if new/discount)
            ├── Category
            ├── Name
            └── Price
```

## Shopping Cart Page (Example)

```
CartPage
└── Grid Layout (2 columns)
    ├── Cart Items (Column 1)
    │   └── CartItem (x3)
    │       ├── Product Image
    │       ├── Product Info
    │       │   ├── Name
    │       │   ├── Size/Color
    │       │   └── Price
    │       ├── Quantity Controls
    │       │   ├── Decrease Button
    │       │   ├── Quantity Display
    │       │   └── Increase Button
    │       └── Remove Button (Icon)
    │
    └── Order Summary (Column 2)
        └── CartSummary
            └── Card
                ├── CardHeader
                │   └── CardTitle
                ├── CardContent
                │   ├── Subtotal
                │   ├── Shipping
                │   ├── Tax
                │   ├── Total
                │   └── Button (Checkout)
```

## Product Detail Page (Future)

```
ProductDetailPage
├── Product Images
│   ├── Main Image
│   └── Thumbnail Gallery
│
├── Product Info
│   ├── Badge (New/Sale)
│   ├── Product Name
│   ├── Category
│   ├── Price
│   ├── Description
│   ├── Size Selector
│   ├── Color Selector
│   ├── Quantity Selector
│   └── Button (Add to Cart)
│
├── Features
│   └── Feature Cards
│
└── Related Products
    └── ProductGrid
        └── ProductCard (x4)
```

## Component Dependency Graph

```
UI Components (Base Layer)
├── Button ────────────────┐
├── Input ─────────────────┤
├── Card ──────────────────┤
└── Badge ─────────────────┤
                           │
                           ↓
Product Components ────────┤
├── ProductCard ───────────┤ (uses Badge, Card)
└── ProductGrid ───────────┤
                           │
                           ↓
Cart Components ───────────┤
├── CartItem ──────────────┤ (uses Badge, Button)
└── CartSummary ───────────┤ (uses Card, Button)
                           │
                           ↓
Layout Components ─────────┤
├── Header ────────────────┤ (uses Badge)
├── Footer ────────────────┤
└── Layout ────────────────┤
                           │
                           ↓
Section Components ────────┤
├── Hero ──────────────────┤ (uses Button)
├── Features ──────────────┤ (uses Card)
├── NewArrivals ───────────┤ (uses ProductGrid, ProductCard, Button)
├── DeliveryInfo ──────────┤ (uses Card, Button)
└── BusinessSection ───────┤ (uses Button)
                           │
                           ↓
Pages (Top Layer) ─────────┘
└── index.tsx (uses all Section Components)
```

## Component Reusability Matrix

| Component | Used In | Reusability Score |
|-----------|---------|-------------------|
| Button | Hero, Features, NewArrivals, DeliveryInfo, BusinessSection, CartSummary, Header | Very High |
| Card | Features, ProductCard, CartSummary, DeliveryInfo | Very High |
| Badge | ProductCard, Header (cart count) | High |
| Input | Forms, Search (future) | High |
| ProductCard | NewArrivals, ProductGrid, Related Products | Very High |
| ProductGrid | Homepage, Product Listing, Category Pages | Very High |
| CartItem | Cart Page, Mini Cart (future) | Medium |
| CartSummary | Cart Page, Checkout Page | Medium |
| Layout | All Pages | Very High |
| Header | Layout | Very High |
| Footer | Layout | Very High |

## Data Flow Patterns

### Product Display Flow
```
API/Mock Data → Product[] → ProductGrid → ProductCard → User Click → Product Detail
```

### Cart Flow
```
Product Detail → Add to Cart → Cart State → CartItem[] → CartSummary → Checkout
```

### Navigation Flow
```
Header → User Click → Next.js Router → Page → Content
```

### Form Flow (Future)
```
Input → Form State → Validation → Submit → API Call → Response
```

## Responsive Breakpoints

All components adapt across these breakpoints:

```
Mobile First Approach:
├── Base (< 640px) ──── 1 column layouts, stacked elements
├── sm (640px+) ──────── 2 column grids start appearing
├── md (768px+) ──────── Tablet view, desktop nav appears
├── lg (1024px+) ─────── 3-4 column grids, full desktop layout
└── xl (1280px+) ─────── Max width containers center content
```

### Responsive Behavior by Component

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Header | Hamburger menu | Hamburger menu | Full nav bar |
| ProductGrid | 1 column | 2 columns | 3-4 columns |
| Hero | Stacked | Stacked | Side-by-side |
| Features | Stacked | 2-up | 3-up |
| Footer | Stacked | 2 columns | 4 columns |
| Cart Layout | Stacked | Stacked | 2 columns |

## Component File Sizes

Approximate line counts:

```
UI Components:
├── Button.tsx ────────── ~40 lines
├── Input.tsx ─────────── ~50 lines
├── Card.tsx ──────────── ~70 lines
└── Badge.tsx ─────────── ~25 lines

Layout Components:
├── Header.tsx ────────── ~110 lines
├── Footer.tsx ────────── ~120 lines
└── Layout.tsx ────────── ~20 lines

Product Components:
├── ProductCard.tsx ───── ~80 lines
└── ProductGrid.tsx ───── ~20 lines

Cart Components:
├── CartItem.tsx ──────── ~70 lines
└── CartSummary.tsx ───── ~60 lines

Section Components:
├── Hero.tsx ──────────── ~50 lines
├── Features.tsx ──────── ~60 lines
├── NewArrivals.tsx ───── ~45 lines
├── DeliveryInfo.tsx ──── ~90 lines
└── BusinessSection.tsx ── ~30 lines
```

## Import Path Examples

All components can be imported from the central index:

```typescript
// Import single component
import { Button } from '@/components'

// Import multiple components
import { ProductCard, ProductGrid, Badge } from '@/components'

// Import from specific category
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'

// Import section components
import { Hero, Features, NewArrivals } from '@/components'
```

## Component Props Summary

### Simple Props (Minimal Configuration)
- Layout, Footer, Hero, Features, BusinessSection

### Medium Props (Some Configuration)
- Button, Badge, Card, ProductGrid

### Complex Props (Full Configuration)
- ProductCard, CartItem, CartSummary, Input, NewArrivals

### Callback Props (User Interaction)
- CartItem (onUpdateQuantity, onRemove)
- CartSummary (onCheckout)
- Input (onChange, onBlur)
- Button (onClick)

## Styling Approach

All components use this consistent pattern:

```typescript
// Base styles (always applied)
const baseStyles = "..."

// Variant styles (conditional)
const variants = { ... }

// Size styles (conditional)
const sizes = { ... }

// Composition
className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
```

This approach ensures:
- Consistency across components
- Easy customization via className prop
- Type-safe variant/size options
- No CSS conflicts
