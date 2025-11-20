---
name: test-generator
description: Automatically generates comprehensive unit and integration tests for React components, API routes, and utility functions using Jest and React Testing Library. Activate when writing tests or improving test coverage for the tims-merch project.
---

# Test Generator Skill

Generate comprehensive, maintainable tests for the tims-merch Next.js e-commerce project.

## When to Activate

- User asks to "write tests" or "add test coverage"
- User mentions testing a specific component or function
- User wants to "test" or "verify" functionality
- User asks about test coverage or missing tests

## Testing Stack

- **Framework**: Jest
- **React Testing**: React Testing Library (RTL)
- **Mocking**: Jest mocks
- **API Testing**: MSW (Mock Service Worker) if needed

## Test Types

### 1. Component Tests (React Testing Library)

**File Location**: `__tests__/components/ComponentName.test.tsx`

**Template for UI Component**:
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentName } from '@/components/ComponentName'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByRole('...')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const user = userEvent.setup()
    render(<ComponentName />)

    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)

    expect(screen.getByText(/result/i)).toBeInTheDocument()
  })

  it('displays props correctly', () => {
    render(<ComponentName title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

**Template for Form Component**:
```tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormComponent } from '@/components/FormComponent'

describe('FormComponent', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()

    render(<FormComponent onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
      })
    })
  })

  it('displays validation errors', async () => {
    const user = userEvent.setup()
    render(<FormComponent />)

    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
  })
})
```

### 2. API Route Tests

**File Location**: `__tests__/api/route-name.test.ts`

**Template**:
```tsx
import { GET, POST } from '@/app/api/products/route'
import { NextRequest } from 'next/server'

describe('/api/products', () => {
  describe('GET', () => {
    it('returns products list', async () => {
      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('products')
      expect(Array.isArray(data.products)).toBe(true)
    })

    it('filters products by query', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?category=shirts')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.products.every((p: any) => p.category === 'shirts')).toBe(true)
    })
  })

  describe('POST', () => {
    it('creates a product with valid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test Product',
          price: 29.99,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.product).toHaveProperty('id')
    })

    it('returns 400 for invalid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify({ name: '' }), // Invalid: missing price
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
    })
  })
})
```

### 3. Server Action Tests

**File Location**: `__tests__/actions/action-name.test.ts`

**Template**:
```tsx
import { submitOrder } from '@/app/actions/orders'

describe('submitOrder', () => {
  it('creates order successfully', async () => {
    const formData = new FormData()
    formData.append('productId', '123')
    formData.append('quantity', '2')

    const result = await submitOrder(formData)

    expect(result.success).toBe(true)
    expect(result.orderId).toBeDefined()
  })

  it('validates required fields', async () => {
    const formData = new FormData()
    // Missing required fields

    const result = await submitOrder(formData)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })
})
```

### 4. Utility Function Tests

**File Location**: `__tests__/utils/function-name.test.ts`

**Template**:
```tsx
import { formatCurrency, calculateDiscount } from '@/utils/pricing'

describe('Pricing Utils', () => {
  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      expect(formatCurrency(29.99, 'USD')).toBe('$29.99')
    })

    it('formats EUR correctly', () => {
      expect(formatCurrency(29.99, 'EUR')).toBe('€29.99')
    })

    it('handles zero', () => {
      expect(formatCurrency(0, 'USD')).toBe('$0.00')
    })

    it('handles large numbers', () => {
      expect(formatCurrency(1234567.89, 'USD')).toBe('$1,234,567.89')
    })
  })

  describe('calculateDiscount', () => {
    it('calculates percentage discount', () => {
      expect(calculateDiscount(100, 10)).toBe(90)
    })

    it('handles 100% discount', () => {
      expect(calculateDiscount(100, 100)).toBe(0)
    })

    it('does not allow negative price', () => {
      expect(calculateDiscount(100, 150)).toBe(0)
    })
  })
})
```

### 5. E-commerce Specific Tests

**Shopping Cart**:
```tsx
describe('Shopping Cart', () => {
  it('adds item to cart')
  it('updates item quantity')
  it('removes item from cart')
  it('calculates total correctly')
  it('applies discount codes')
  it('handles out-of-stock items')
  it('persists cart across sessions')
})
```

**Checkout Flow**:
```tsx
describe('Checkout', () => {
  it('validates shipping information')
  it('validates payment information')
  it('creates order on successful checkout')
  it('handles payment failures')
  it('sends confirmation email')
  it('updates inventory after purchase')
})
```

**Product Display**:
```tsx
describe('Product Page', () => {
  it('displays product information')
  it('shows product images')
  it('allows size/color selection')
  it('shows availability status')
  it('displays related products')
})
```

## Testing Best Practices

### RTL Queries Priority
1. **getByRole** (most preferred) - Accessibility-friendly
2. **getByLabelText** - For form fields
3. **getByPlaceholderText** - Form fields without labels
4. **getByText** - Non-interactive text
5. **getByTestId** (least preferred) - Last resort

### Do's
✅ Test user behavior, not implementation
✅ Use semantic queries (getByRole, getByLabelText)
✅ Test accessibility features
✅ Use userEvent over fireEvent
✅ Test error states and edge cases
✅ Keep tests independent (no shared state)
✅ Use descriptive test names
✅ Mock external dependencies (APIs, databases)

### Don'ts
❌ Test implementation details
❌ Use query selectors (.class, #id)
❌ Create brittle tests tied to structure
❌ Share state between tests
❌ Make real API calls in tests
❌ Test library code (React, Next.js)
❌ Over-mock (only mock what's necessary)

## Mocking Patterns

### Mock Next.js Router
```tsx
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/test-path',
  useSearchParams: () => new URLSearchParams(),
}))
```

### Mock API Calls
```tsx
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' }),
    ok: true,
    status: 200,
  })
) as jest.Mock
```

### Mock Next.js Image
```tsx
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))
```

## Workflow

1. **Analyze the code** - Understand what needs testing
2. **Identify test cases**:
   - Happy path (expected behavior)
   - Error cases (validation failures, API errors)
   - Edge cases (empty states, max values, etc.)
3. **Choose appropriate template** - Component, API, utility, etc.
4. **Write tests** - Follow RTL best practices
5. **Ensure coverage** - All critical paths tested
6. **Run tests** - `npm test` or `yarn test`
7. **Report results** - Show test output and coverage

## Test File Organization

```
__tests__/
  components/
    ui/
      Button.test.tsx
      Card.test.tsx
    product/
      ProductCard.test.tsx
  api/
    products/
      route.test.ts
  utils/
    pricing.test.ts
    format.test.ts
  integration/
    checkout-flow.test.tsx
```

## Coverage Goals

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

Focus on testing critical business logic and user-facing features first.

Always generate clean, maintainable, and comprehensive tests.
