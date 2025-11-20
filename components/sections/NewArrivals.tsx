import { ProductCard } from '../product/ProductCard'
import { ProductGrid } from '../product/ProductGrid'
import { Button } from '../ui/Button'
import { Product } from '../../types/product'

interface NewArrivalsProps {
  products: Product[]
}

export function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            New Arrival
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out our latest collection of trending merchandise
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid columns={4}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              isNew={product.isNew}
              discount={product.discount}
            />
          ))}
        </ProductGrid>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
