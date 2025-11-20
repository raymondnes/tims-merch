import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders the logo text', () => {
    render(<Header />)
    const logoElement = screen.getByText(/Tim's Merch/i)
    expect(logoElement).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument()
  })

  it('renders search and cart icons', () => {
    render(<Header />)
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/view cart/i)).toBeInTheDocument()
  })
})
