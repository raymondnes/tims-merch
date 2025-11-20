import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-secondary">Tim&apos;s Merch</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className="text-secondary hover:text-primary transition-colors">Home</a>
            </Link>
            <Link href="/products">
              <a className="text-secondary hover:text-primary transition-colors">Products</a>
            </Link>
            <Link href="/delivery">
              <a className="text-secondary hover:text-primary transition-colors">Delivery</a>
            </Link>
            <Link href="/about">
              <a className="text-secondary hover:text-primary transition-colors">About</a>
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Image src="/icons/search.svg" alt="Search" width={20} height={20} />
            </button>

            {/* Cart Icon */}
            <Link href="/cart">
              <a className="relative p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="View cart">
                <Image src="/icons/cart.svg" alt="Cart" width={20} height={20} />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </a>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/">
                <a className="px-2 py-2 text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                  Home
                </a>
              </Link>
              <Link href="/products">
                <a className="px-2 py-2 text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                  Products
                </a>
              </Link>
              <Link href="/delivery">
                <a className="px-2 py-2 text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                  Delivery
                </a>
              </Link>
              <Link href="/about">
                <a className="px-2 py-2 text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
                  About
                </a>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
