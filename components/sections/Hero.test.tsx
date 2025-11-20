import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />)
    const headlineElement = screen.getByRole('heading', { level: 1, name: /Reflect Your Style/i })
    expect(headlineElement).toBeInTheDocument()
  })

  it('renders the call to action button', () => {
    render(<Hero />)
    const buttonElement = screen.getByRole('button', { name: /Order Now/i })
    expect(buttonElement).toBeInTheDocument()
  })
})
