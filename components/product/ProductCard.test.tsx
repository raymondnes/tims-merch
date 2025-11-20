import { render, screen } from '@testing-library/react'
import { ProductCard } from './ProductCard'

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 99.99,
  image: '/test-image.jpg',
  category: 'Testing',
  isNew: true,
  discount: 10,
}

describe('ProductCard', () => {
  it('renders the product name and price', () => {
    render(<ProductCard {...mockProduct} />)
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
    expect(screen.getByText(/\$89.99/)).toBeInTheDocument() // 10% off 99.99
  })

  it('displays new and discount badges', () => {
    render(<ProductCard {...mockProduct} />)
    expect(screen.getByText(/New/i)).toBeInTheDocument()
    expect(screen.getByText(/-10%/i)).toBeInTheDocument()
  })
})
