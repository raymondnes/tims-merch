import { render, screen, fireEvent } from '@testing-library/react'
import { CartItem } from './CartItem'

const mockCartItem = {
  id: 'ci1',
  name: 'Test Cart Item',
  price: 50.00,
  image: '/cart-item.jpg',
  quantity: 2,
  selectedSize: 'M',
  selectedColor: 'Gold',
}

const mockUpdateQuantity = jest.fn()
const mockRemove = jest.fn()

describe('CartItem', () => {
  it('renders item details correctly', () => {
    render(<CartItem item={mockCartItem} onUpdateQuantity={mockUpdateQuantity} onRemove={mockRemove} />)
    expect(screen.getByText(mockCartItem.name)).toBeInTheDocument()
    expect(screen.getByText(/\$50.00/)).toBeInTheDocument()
    expect(screen.getByText(/Size: M/i)).toBeInTheDocument()
    expect(screen.getByText(/Color: Gold/i)).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('calls onRemove when the delete button is clicked', () => {
    render(<CartItem item={mockCartItem} onUpdateQuantity={mockUpdateQuantity} onRemove={mockRemove} />)
    const removeButton = screen.getByLabelText(/Remove item/i)
    fireEvent.click(removeButton)
    expect(mockRemove).toHaveBeenCalledWith(mockCartItem.id)
  })

  it('calls onUpdateQuantity when quantity buttons are clicked', () => {
    render(<CartItem item={mockCartItem} onUpdateQuantity={mockUpdateQuantity} onRemove={mockRemove} />)
    const increaseButton = screen.getByLabelText(/Increase quantity/i)
    const decreaseButton = screen.getByLabelText(/Decrease quantity/i)
    
    fireEvent.click(increaseButton)
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockCartItem.id, 3)
    
    fireEvent.click(decreaseButton)
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockCartItem.id, 1)
  })
})
